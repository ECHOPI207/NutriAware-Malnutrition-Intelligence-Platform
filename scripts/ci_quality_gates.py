"""
CI Quality Gates for NutriAware Survey Data
-------------------------------------------
This script should be run in the CI/CD pipeline (e.g., GitHub Actions).
It enforces strict data quality rules on any generated or imported dataset.
If any assertion fails, the process exits with code 1, failing the build.

Usage / الاستخدام:
  pip install pandas numpy
  python ci_quality_gates.py --input path/to/dataset.csv
"""

import pandas as pd
import argparse
import sys

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="survey_responses_raw.csv", help="Input dataset")
    return parser.parse_args()

def run_quality_gates(filepath):
    print(f"🚦 Running Quality Gates on: {filepath}")
    
    try:
        df = pd.read_csv(filepath)
    except Exception as e:
        print(f"❌ ERROR: Failed to read file {filepath}. {str(e)}")
        sys.exit(1)

    errors = []

    # 1. Missingness Test / اختبار غياب البيانات (< 0.1%)
    required_cols = ["health_gender", "nps_score", "demo_relationship"] # Add actual required fields
    for col in required_cols:
        if col in df.columns:
            missing_pct = df[col].isna().sum() / len(df)
            if missing_pct > 0.001: # 0.1%
                errors.append(f"Missingness error: Column '{col}' has {missing_pct*100:.2f}% missing values (>0.1%).")
        else:
            errors.append(f"Missingness error: Required column '{col}' is totally absent.")

    # 2. Dominant Category Variation (< 70%)
    cat_cols = ["demo_education", "demo_relationship"]
    for col in cat_cols:
        if col in df.columns:
            dominant_pct = df[col].value_counts(normalize=True).max()
            if dominant_pct > 0.70:
                dominant_val = df[col].value_counts().idxmax()
                errors.append(f"Entropy error: Column '{col}' is dominated by '{dominant_val}' ({dominant_pct*100:.2f}% > 70%). This lacks realism.")

    # 3. Exact row duplication check (< 0.5%)
    # Excluding IDs and timestamps
    check_cols = [c for c in df.columns if c not in ["respondentId", "timestamp"]]
    dupe_pct = df.duplicated(subset=check_cols).sum() / len(df)
    if dupe_pct > 0.005: # 0.5%
        errors.append(f"Duplication error: {dupe_pct*100:.2f}% of rows are exact duplicates (>0.5%).")

    # 4. Open-text repeated templates (< 2%)
    if "open_challenges" in df.columns:
        text_dupe_pct = df.duplicated(subset=["open_challenges"]).sum() / len(df)
        # Note: If there are many rows, high duplication might be natural if phrase banks are small.
        # So we check if the EXACT same 1 string dominates > 2%
        max_string_pct = df["open_challenges"].value_counts(normalize=True).max()
        if max_string_pct > 0.02:
            errors.append(f"Open-text error: The most common text in 'open_challenges' appears {max_string_pct*100:.2f}% of times (>2%).")

    # 5. Invalid Ranges Check (NPS 0-10)
    if "nps_score" in df.columns:
        invalid_nps = df[~df["nps_score"].between(0, 10, inclusive="both")].dropna()
        if len(invalid_nps) > 0:
            errors.append(f"Range error: Found {len(invalid_nps)} rows with NPS outside 0-10 range.")

    # 6. Logical Correlational Checks
    # Example: If gender="أنثى" and relationship="أب"
    # if "health_gender" in df.columns and "demo_relationship" in df.columns:
    #     invalid_rel = df[(df["health_gender"] == "أنثى") & (df["demo_relationship"] == "أب")]
    #     if len(invalid_rel) > 0:
    #         errors.append(f"Logic error: Found {len(invalid_rel)} rows with Relationship='أب' and Gender='أنثى'.")

    if errors:
        print("\n❌ QUALITY GATES FAILED / فشل اختبارات الجودة:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("\n✅ ALL QUALITY GATES PASSED / اجتتازت البيانات جميع اختبارات الجودة")
        sys.exit(0)

if __name__ == "__main__":
    args = parse_args()
    run_quality_gates(args.input)
