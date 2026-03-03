"""
NutriAware Data Quality ETL Pipeline
------------------------------------
مستخرج ومنظف بيانات الاستبيان - NutriAware

Usage / الاستخدام:
  pip install pandas numpy python-Levenshtein
  python clean_survey_data.py --input raw_data.csv --output cleaned_data.csv
"""

import pandas as pd
import numpy as np
from datetime import datetime
import json
import argparse
import Levenshtein

def parse_args():
    parser = argparse.ArgumentParser(description="Clean and validate NutriAware survey data")
    parser.add_argument("--input", default="survey_responses_raw.csv", help="Input dataset path")
    parser.add_argument("--output", default="cleaned_dataset.csv", help="Output dataset path")
    return parser.parse_args()

def run_pipeline(input_path, output_path):
    print(f"🔄 Starting ETL Pipeline on: {input_path}")
    
    try:
        df = pd.read_csv(input_path)
    except FileNotFoundError:
        print(f"⚠️ Input file {input_path} not found. Creating a dummy file to demonstrate the pipeline.")
        df = pd.DataFrame({
            "respondentId": ["R1", "R2", "R3", "R4", "R5"],
            "timestamp": ["2026-02-24T10:00:00Z"] * 5,
            "demo_parentAge": [35, 35, 99, 25, 35],
            "demo_relationship": ["أم", "أم ", "أب", "أخ", "أم"],
            "demo_education": ["جامعي", "جامعي", "ابتدائي", "ثانوي", "جامعي"],
            "health_gender": ["ذكر", "ذكر", "أنثى", "ذكر", "ذكر"],
            "nps_score": [10, 10, 15, -1, None],
            "open_challenges": ["لا يوجد", "لا يوجد", "صعوبة في التنوع", "الوقت", "لايوجد"]
        })
        input_path = "dummy_data.csv"
        df.to_csv(input_path, index=False)
        print("✅ Dummy file created for demonstration.\n")

    initial_count = len(df)
    rejected_rows = pd.DataFrame()
    stats = {"initial_rows": initial_count, "rejected": 0, "imputed": 0, "final_rows": 0}

    # 1. Exact Duplicates (excluding ID and Timestamp) / إزالة التكرار التام
    cols_to_check = [c for c in df.columns if c not in ["respondentId", "timestamp"]]
    dupes = df.duplicated(subset=cols_to_check, keep='first')
    
    # Track rejected
    df_dupes = df[dupes].copy()
    if not df_dupes.empty:
        df_dupes["rejection_reason"] = "Exact Duplicate"
        rejected_rows = pd.concat([rejected_rows, df_dupes])
    
    df = df[~dupes].copy()
    stats["rejected_exact_duplicates"] = int(dupes.sum())
    print(f"🗑️ Removed {stats['rejected_exact_duplicates']} exact duplicates.")

    # 2. Normalize Categorical Strings / توحيد النصوص
    if "demo_relationship" in df.columns:
        df["demo_relationship"] = df["demo_relationship"].astype(str).str.strip().str.replace("ام", "أم").replace("اب", "أب")
    
    # 3. Numeric Ranges Validation / التحقق من النطاقات الرقمية
    def validate_range(row, col, min_val, max_val):
        val = row.get(col)
        if pd.isna(val) or val == "":
            return False # Track separately
        try:
            v = float(val)
            return min_val <= v <= max_val
        except:
            return False

    # Example: NPS must be 0-10
    if "nps_score" in df.columns:
        valid_nps = df.apply(lambda r: pd.isna(r["nps_score"]) or validate_range(r, "nps_score", 0, 10), axis=1)
        invalid_nps = df[~valid_nps].copy()
        if not invalid_nps.empty:
            invalid_nps["rejection_reason"] = "NPS Out of Range (0-10)"
            rejected_rows = pd.concat([rejected_rows, invalid_nps])
        
        # Clamp or Drop
        # Let's drop them for strict quality, or clamp them if preferred. We'll drop for quality.
        df = df[valid_nps].copy()
        stats["rejected_out_of_range_nps"] = int((~valid_nps).sum())
        print(f"📉 Removed {stats['rejected_out_of_range_nps']} rows with invalid NPS scores.")

    # 4. Logical Constraints (Relationship vs Gender if applicable)
    # If relationship is 'أم' (Mother), and 'health_gender' refers to the parent, they must be female.
    # Assuming health_gender is child's gender initially, but if it's parent's:
    # df_invalid_gender = df[(df["demo_relationship"] == "أب") & (df["health_gender"] == "أنثى")]

    # 5. Low Entropy / Near-Duplicates in Open Text (Levenshtein)
    if "open_challenges" in df.columns:
        # Normalize text
        df["open_text_norm"] = df["open_challenges"].astype(str).str.replace(" ", "").str.lower()
        # Find too common phrases
        counts = df["open_text_norm"].value_counts()
        too_common = counts[counts > (len(df) * 0.1)].index # e.g., "لايوجد" repeating >10%
        
        # We don't necessarily reject "لا يوجد" but if it's a long string repeating exactly, we flag it.
        # For simplicity, if length > 10 and repeats > 5%, flag it.
        long_repeats = counts[(counts > (len(df) * 0.05)) & (counts.index.str.len() > 10)].index
        
        df_text_dupes = df[df["open_text_norm"].isin(long_repeats)].copy()
        if not df_text_dupes.empty:
            df_text_dupes["rejection_reason"] = "Repeated Open Text Template"
            rejected_rows = pd.concat([rejected_rows, df_text_dupes])
            df = df[~df["open_text_norm"].isin(long_repeats)]
        
        df.drop(columns=["open_text_norm"], inplace=True, errors='ignore')

    # 6. Impute Missing Values (Probabilistic or Mode)
    # If "demo_education" is missing, impute based on distribution
    if "demo_education" in df.columns:
        missing_ed = df["demo_education"].isna() | (df["demo_education"] == "")
        if missing_ed.sum() > 0:
            probs = df.loc[~missing_ed, "demo_education"].value_counts(normalize=True)
            if not probs.empty:
                imputed_vals = np.random.choice(probs.index, size=missing_ed.sum(), p=probs.values)
                df.loc[missing_ed, "demo_education"] = imputed_vals
                stats["imputed"] += int(missing_ed.sum())

    # Finalize
    stats["final_rows"] = len(df)
    stats["rejected"] = len(rejected_rows)
    
    # Save Outputs
    df.to_csv(output_path, index=False)
    rejected_rows.to_csv("rejected_rows.csv", index=False)
    
    with open("quality_summary.json", "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=4, ensure_ascii=False)

    print("\n" + "="*40)
    print("✅ ETL Cleaning Pipeline Completed / اكتمل التنظيف")
    print("="*40)
    print(f"Initial Rows: {stats['initial_rows']}")
    print(f"Final Rows:   {stats['final_rows']} ({(stats['final_rows']/stats['initial_rows'])*100:.1f}%)")
    print(f"Rejected:     {stats['rejected']}")
    print(f"Imputed:      {stats['imputed']}")
    print(f"\nOutputs generated:")
    print(f"- {output_path}")
    print(f"- rejected_rows.csv")
    print(f"- quality_summary.json")

if __name__ == "__main__":
    args = parse_args()
    run_pipeline(args.input, args.output)
