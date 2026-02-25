# NutriAware Survey v3.0 — Scoring Manual

> **Purpose**: Complete scoring instructions for all composite indices, KAP scoring, and DDS calculation  
> **Compatibility**: SPSS syntax + R code included

---

## 1. KAP Composite Scoring Overview

The KAP framework separates measurement into three domains:

| Domain | Sections | Items | Scale |
|--------|----------|-------|-------|
| **Knowledge (K)** | Nutritional Knowledge (KN) + Food Safety Knowledge (FSK) | 10 + 5 = 15 | Agreement 1–5 |
| **Attitudes (A)** | Parental Attitudes (ATT) | 5 | Agreement 1–5 |
| **Practices (P)** | Dietary Practices (PR) + Food Safety Practices (FSP) | 7 + 5 = 12 | Agreement/Frequency 1–5 |

---

## 2. Composite Index Definitions

### 2.1 Nutritional Knowledge Score (NKS)

| Property | Value |
|----------|-------|
| **Items** | KN1, KN2, KN3, KN4, KN5, KN6, KN7, KN8, KN9, KN10, KN11_R |
| **Reverse items** | KN11_R (recode: 6 − raw) |
| **Method** | Mean of 11 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Low · 2.1–3.5 = Moderate · 3.6–5.0 = High |
| **Cronbach's α target** | ≥ 0.80 |

### 2.2 Food Safety Knowledge Score (FSKS)

| Property | Value |
|----------|-------|
| **Items** | FSK1, FSK2, FSK3, FSK4, FSK5 |
| **Reverse items** | None |
| **Method** | Mean of 5 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Low · 2.1–3.5 = Moderate · 3.6–5.0 = High |
| **Cronbach's α target** | ≥ 0.75 |

### 2.3 Food Safety Practice Score (FSPS)

| Property | Value |
|----------|-------|
| **Items** | FSP1, FSP2, FSP3, FSP4, FSP5 |
| **Reverse items** | None |
| **Method** | Mean of 5 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Poor · 2.1–3.5 = Fair · 3.6–5.0 = Good |
| **Cronbach's α target** | ≥ 0.75 |

### 2.4 Attitudes Score (ATTS)

| Property | Value |
|----------|-------|
| **Items** | ATT1, ATT2, ATT3, ATT4, ATT5 |
| **Reverse items** | None |
| **Method** | Mean of 5 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Negative · 2.1–3.5 = Neutral · 3.6–5.0 = Positive |
| **Cronbach's α target** | ≥ 0.75 |

### 2.5 Dietary Practice Score (PS)

| Property | Value |
|----------|-------|
| **Items** | PR1, PR2, PR3, PR4, PR5, PR6, PR7_R |
| **Reverse items** | PR7_R (recode: 6 − raw) |
| **Method** | Mean of 7 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Poor · 2.1–3.0 = Fair · 3.1–4.0 = Good · 4.1–5.0 = Excellent |
| **Cronbach's α target** | ≥ 0.80 |

### 2.6 Dietary Diversity Score (DDS)

| Property | Value |
|----------|-------|
| **Items** | DDS1, DDS2, DDS3, DDS4, DDS5, DDS6, DDS7, DDS8 |
| **Method** | Sum of "Yes" (1) responses |
| **Range** | 0 – 8 |
| **Threshold** | ≥ 5 = Adequate dietary diversity |
| **Standard** | FAO Minimum Dietary Diversity Indicator (MDD) |

### 2.7 Engagement Score (ES) — Post-test only

| Property | Value |
|----------|-------|
| **Items** | INT_ST1–6_R, PX_US1–2, PX_CN1–2, PX_TL1–2, PX_CO1–2 (14 items) |
| **Reverse items** | INT_ST6_R |
| **Method** | Mean of 14 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.5 = Low · 2.6–3.5 = Moderate · 3.6–5.0 = High |

### 2.8 Satisfaction Index (SI) — Post-test only

| Property | Value |
|----------|-------|
| **Items** | SAT1, SAT2, SAT3, SAT4_R |
| **Reverse items** | SAT4_R |
| **Method** | Mean of 4 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Dissatisfied · 2.1–3.5 = Neutral · 3.6–5.0 = Satisfied |

### 2.9 Behavioral Change Index (BCI) — Post-test only

| Property | Value |
|----------|-------|
| **Items** | BI1, BI2, BI3, BI4, BI5_R |
| **Reverse items** | BI5_R |
| **Method** | Mean of 5 items |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = No Intent · 2.1–3.5 = Moderate · 3.6–5.0 = Strong Intent |

### 2.10 Overall KAP Score

| Property | Value |
|----------|-------|
| **Formula** | (NKS + FSKS + ATTS + PS + FSPS) / 5 |
| **Range** | 1.0 – 5.0 |
| **Cutoffs** | ≤2.0 = Poor · 2.1–3.0 = Below Average · 3.1–4.0 = Good · 4.1–5.0 = Excellent |

---

## 3. SPSS Syntax

```spss
* ============================================.
* NutriAware v3.0 — Complete Scoring Syntax.
* ============================================.

* --- VALUE LABELS ---.
VALUE LABELS
  KN1 TO KN10 FSK1 TO FSK5 ATT1 TO ATT5 PR1 TO PR6 
  INT_ST1 TO INT_ST5 PX_US1 PX_US2 PX_CN1 PX_CN2 
  PX_TL1 PX_TL2 PX_CO1 PX_CO2 SAT1 TO SAT3 BI1 TO BI4
    1 'Strongly Disagree'
    2 'Disagree'
    3 'Neutral'
    4 'Agree'
    5 'Strongly Agree'.

VALUE LABELS
  KN11_R SAT4_R BI5_R INT_ST6_R PR7_R
    1 'Strongly Disagree'
    2 'Disagree'
    3 'Neutral'
    4 'Agree'
    5 'Strongly Agree'.

VALUE LABELS
  FSP1 TO FSP5
    1 'Never'
    2 'Rarely'
    3 'Sometimes'
    4 'Often'
    5 'Always'.

VALUE LABELS
  DDS1 TO DDS8
    0 'No'
    1 'Yes'.

* --- REVERSE CODING ---.
COMPUTE KN11_R_rec = 6 - KN11_R.
COMPUTE PR7_R_rec = 6 - PR7_R.
COMPUTE SAT4_R_rec = 6 - SAT4_R.
COMPUTE BI5_R_rec = 6 - BI5_R.
COMPUTE INT_ST6_R_rec = 6 - INT_ST6_R.
EXECUTE.

* --- COMPOSITE SCORES ---.
COMPUTE NutritionalKnowledgeScore = MEAN(KN1, KN2, KN3, KN4, KN5, KN6, KN7, KN8, KN9, KN10, KN11_R_rec).
COMPUTE FoodSafetyKnowledgeScore = MEAN(FSK1, FSK2, FSK3, FSK4, FSK5).
COMPUTE FoodSafetyPracticeScore = MEAN(FSP1, FSP2, FSP3, FSP4, FSP5).
COMPUTE AttitudesScore = MEAN(ATT1, ATT2, ATT3, ATT4, ATT5).
COMPUTE DietaryPracticeScore = MEAN(PR1, PR2, PR3, PR4, PR5, PR6, PR7_R_rec).
COMPUTE EngagementScore = MEAN(INT_ST1, INT_ST2, INT_ST3, INT_ST4, INT_ST5, INT_ST6_R_rec,
                               PX_US1, PX_US2, PX_CN1, PX_CN2, PX_TL1, PX_TL2, PX_CO1, PX_CO2).
COMPUTE SatisfactionIndex = MEAN(SAT1, SAT2, SAT3, SAT4_R_rec).
COMPUTE BehavioralChangeIndex = MEAN(BI1, BI2, BI3, BI4, BI5_R_rec).
EXECUTE.

* --- DDS SCORE ---.
COMPUTE DDS_Total = SUM(DDS1, DDS2, DDS3, DDS4, DDS5, DDS6, DDS7, DDS8).
RECODE DDS_Total (0 THRU 4 = 0)(5 THRU 8 = 1) INTO DDS_Adequate.
VARIABLE LABELS DDS_Adequate 'Adequate Dietary Diversity (≥5 groups)'.
VALUE LABELS DDS_Adequate 0 'Inadequate' 1 'Adequate'.
EXECUTE.

* --- OVERALL KAP ---.
COMPUTE OverallKAP = MEAN(NutritionalKnowledgeScore, FoodSafetyKnowledgeScore,
                          AttitudesScore, DietaryPracticeScore, FoodSafetyPracticeScore).
EXECUTE.

* --- NPS CATEGORIES ---.
RECODE NPS1 (0 THRU 6 = 1)(7, 8 = 2)(9, 10 = 3) INTO NPS_Category.
VALUE LABELS NPS_Category 1 'Detractor' 2 'Passive' 3 'Promoter'.
EXECUTE.

* --- RETROSPECTIVE CHANGE SCORES ---.
COMPUTE RETRO_KN_Change = RETRO_KN_POST - RETRO_KN_PRE.
COMPUTE RETRO_PR_Change = RETRO_PR_POST - RETRO_PR_PRE.
COMPUTE RETRO_AW_Change = RETRO_AW_POST - RETRO_AW_PRE.
COMPUTE RETRO_CF_Change = RETRO_CF_POST - RETRO_CF_PRE.
EXECUTE.

* --- ATTENTION CHECK FILTER ---.
COMPUTE AttentionPassed = (KN_AC = 4 AND PR_AC = 1).
FILTER BY AttentionPassed.
```

---

## 4. R Code

```r
# ============================================
# NutriAware v3.0 — Complete Scoring in R
# ============================================

library(tidyverse)

score_survey <- function(df) {
  
  # --- Reverse Coding ---
  df <- df %>% mutate(
    KN11_R_rec   = 6 - KN11_R,
    PR7_R_rec    = 6 - PR7_R,
    SAT4_R_rec   = 6 - SAT4_R,
    BI5_R_rec    = 6 - BI5_R,
    INT_ST6_R_rec = 6 - INT_ST6_R
  )
  
  # --- Nutritional Knowledge Score (NKS) ---
  kn_items <- c("KN1","KN2","KN3","KN4","KN5","KN6","KN7","KN8","KN9","KN10","KN11_R_rec")
  df$NutritionalKnowledgeScore <- rowMeans(df[, kn_items], na.rm = TRUE)
  
  # --- Food Safety Knowledge Score (FSKS) ---
  fsk_items <- c("FSK1","FSK2","FSK3","FSK4","FSK5")
  df$FoodSafetyKnowledgeScore <- rowMeans(df[, fsk_items], na.rm = TRUE)
  
  # --- Food Safety Practice Score (FSPS) ---
  fsp_items <- c("FSP1","FSP2","FSP3","FSP4","FSP5")
  df$FoodSafetyPracticeScore <- rowMeans(df[, fsp_items], na.rm = TRUE)
  
  # --- Attitudes Score (ATTS) ---
  att_items <- c("ATT1","ATT2","ATT3","ATT4","ATT5")
  df$AttitudesScore <- rowMeans(df[, att_items], na.rm = TRUE)
  
  # --- Dietary Practice Score (PS) ---
  pr_items <- c("PR1","PR2","PR3","PR4","PR5","PR6","PR7_R_rec")
  df$DietaryPracticeScore <- rowMeans(df[, pr_items], na.rm = TRUE)
  
  # --- DDS Score ---
  dds_items <- c("DDS1","DDS2","DDS3","DDS4","DDS5","DDS6","DDS7","DDS8")
  df$DDS_Total <- rowSums(df[, dds_items], na.rm = TRUE)
  df$DDS_Adequate <- ifelse(df$DDS_Total >= 5, 1, 0)
  
  # --- Engagement Score (Post-test) ---
  eng_items <- c("INT_ST1","INT_ST2","INT_ST3","INT_ST4","INT_ST5","INT_ST6_R_rec",
                 "PX_US1","PX_US2","PX_CN1","PX_CN2","PX_TL1","PX_TL2","PX_CO1","PX_CO2")
  df$EngagementScore <- rowMeans(df[, eng_items], na.rm = TRUE)
  
  # --- Satisfaction Index (Post-test) ---
  sat_items <- c("SAT1","SAT2","SAT3","SAT4_R_rec")
  df$SatisfactionIndex <- rowMeans(df[, sat_items], na.rm = TRUE)
  
  # --- Behavioral Change Index (Post-test) ---
  bi_items <- c("BI1","BI2","BI3","BI4","BI5_R_rec")
  df$BehavioralChangeIndex <- rowMeans(df[, bi_items], na.rm = TRUE)
  
  # --- Overall KAP ---
  df$OverallKAP <- rowMeans(df[, c("NutritionalKnowledgeScore",
                                    "FoodSafetyKnowledgeScore",
                                    "AttitudesScore",
                                    "DietaryPracticeScore",
                                    "FoodSafetyPracticeScore")], na.rm = TRUE)
  
  # --- NPS Category ---
  df$NPS_Category <- case_when(
    df$NPS1 <= 6 ~ "Detractor",
    df$NPS1 <= 8 ~ "Passive",
    df$NPS1 >= 9 ~ "Promoter"
  )
  
  # --- Retrospective Change ---
  df$RETRO_KN_Change <- df$RETRO_KN_POST - df$RETRO_KN_PRE
  df$RETRO_PR_Change <- df$RETRO_PR_POST - df$RETRO_PR_PRE
  df$RETRO_AW_Change <- df$RETRO_AW_POST - df$RETRO_AW_PRE
  df$RETRO_CF_Change <- df$RETRO_CF_POST - df$RETRO_CF_PRE
  
  # --- Attention Check ---
  df$AttentionPassed <- (df$KN_AC == 4) & (df$PR_AC == 1)
  
  # --- Score Labels (helper) ---
  label_score <- function(score, cutoffs, labels) {
    cut(score, breaks = c(-Inf, cutoffs, Inf), labels = labels, right = TRUE)
  }
  
  df$NKS_Label <- label_score(df$NutritionalKnowledgeScore, c(2.0, 3.5), c("Low","Moderate","High"))
  df$FSKS_Label <- label_score(df$FoodSafetyKnowledgeScore, c(2.0, 3.5), c("Low","Moderate","High"))
  df$ATTS_Label <- label_score(df$AttitudesScore, c(2.0, 3.5), c("Negative","Neutral","Positive"))
  df$PS_Label <- label_score(df$DietaryPracticeScore, c(2.0, 3.0, 4.0), c("Poor","Fair","Good","Excellent"))
  df$FSPS_Label <- label_score(df$FoodSafetyPracticeScore, c(2.0, 3.5), c("Poor","Fair","Good"))
  
  return(df)
}

# --- Cronbach's Alpha ---
cronbach_alpha <- function(df, items) {
  item_data <- df[, items, drop = FALSE]
  item_data <- na.omit(item_data)
  k <- ncol(item_data)
  total_var <- var(rowSums(item_data))
  item_vars <- sum(apply(item_data, 2, var))
  alpha <- (k / (k - 1)) * (1 - item_vars / total_var)
  return(round(alpha, 3))
}
```

---

## 5. DDS Calculation Detail (FAO Standard)

### Step-by-step:

1. **Administer** the 24-hour recall checklist (8 food groups)
2. **Code** each response: Yes = 1, No = 0
3. **Sum** all binary responses → DDS_Total (range 0–8)
4. **Classify**: 
   - DDS_Total ≥ 5 → `DDS_Adequate = 1` (Adequate diversity)
   - DDS_Total < 5 → `DDS_Adequate = 0` (Inadequate diversity)

### Interpretation:

| DDS Score | Classification | Risk Level |
|-----------|---------------|------------|
| 0–2 | Very Low Diversity | High risk of micronutrient deficiency |
| 3–4 | Low Diversity | Moderate risk |
| 5–6 | Adequate Diversity | Low risk |
| 7–8 | High Diversity | Minimal risk |

### Reference:
> FAO & FHI 360. (2016). *Minimum Dietary Diversity for Women: A Guide for Measurement*. Adapted for child populations per WHO/UNICEF guidelines.

---

## 6. Anthropometric Z-Score Interpretation

### WHO Classification Thresholds:

| Indicator | Classification | Z-score range |
|-----------|---------------|---------------|
| WAZ (Weight-for-Age) | Severely underweight | Z < −3 |
| | Underweight | −3 ≤ Z < −2 |
| | Normal weight | −2 ≤ Z ≤ 2 |
| | Overweight | Z > 2 |
| HAZ (Height-for-Age) | Severely stunted | Z < −3 |
| | Stunted | −3 ≤ Z < −2 |
| | Normal height | −2 ≤ Z ≤ 2 |
| | Tall | Z > 2 |
| BAZ (BMI-for-Age) | Severely wasted | Z < −3 |
| | Wasted | −3 ≤ Z < −2 |
| | Normal | −2 ≤ Z ≤ 1 |
| | Risk of overweight | 1 < Z ≤ 2 |
| | Overweight | 2 < Z ≤ 3 |
| | Obese | Z > 3 |

### Software: 
Use **WHO AnthroPlus** (v3.2.2+) or R package `anthro` for automated Z-score computation.

---

## 7. Pre-test vs Post-test Analysis Protocol

### Paired Comparisons:

| Measure | Pre-test | Post-test | Analysis |
|---------|----------|-----------|----------|
| NKS | ✅ | ✅ | Paired t-test / Wilcoxon |
| FSKS | ✅ | ✅ | Paired t-test / Wilcoxon |
| ATTS | ✅ | ✅ | Paired t-test / Wilcoxon |
| PS | ✅ | ✅ | Paired t-test / Wilcoxon |
| FSPS | ✅ | ✅ | Paired t-test / Wilcoxon |
| DDS_Total | ✅ | ✅ | Paired t-test / McNemar |
| Overall KAP | ✅ | ✅ | Paired t-test / Wilcoxon |

### Effect Size:
- **Cohen's d** = (M_post − M_pre) / SD_diff
- Interpretation: d < 0.2 = Negligible · 0.2–0.5 = Small · 0.5–0.8 = Medium · > 0.8 = Large

---

## 8. Construct Validity Map (Updated v3.0)

| Variable | Construct | KAP Domain | Index | Reverse |
|----------|-----------|------------|-------|---------|
| KN1–KN10 | Nutritional Knowledge | Knowledge | NKS | No |
| KN11_R | Nutritional Knowledge | Knowledge | NKS | **Yes** |
| FSK1–FSK5 | Food Safety Knowledge | Knowledge | FSKS | No |
| ATT1–ATT5 | Attitudes | Attitudes | ATTS | No |
| PR1–PR6 | Dietary Practices | Practices | PS | No |
| PR7_R | Dietary Practices | Practices | PS | **Yes** |
| FSP1–FSP5 | Food Safety Practices | Practices | FSPS | No |
| DDS1–DDS8 | Dietary Diversity | — | DDS | — |
| INT_ST1–5 | Intervention | — | ES | No |
| INT_ST6_R | Intervention | — | ES | **Yes** |
| PX_US/CN/TL/CO | Platform UX | — | ES | No |
| SAT1–3 | Satisfaction | — | SI | No |
| SAT4_R | Satisfaction | — | SI | **Yes** |
| BI1–4 | Behavioral Intent | — | BCI | No |
| BI5_R | Behavioral Intent | — | BCI | **Yes** |
| NPS1 | Advocacy | — | — | No |
| RETRO_*_PRE/POST | Self-Assessment | — | — | No |
| OE1–4 | Qualitative | — | — | No |
| ANTH_* | Anthropometry | — | — | No |

---

## 9. Reliability Targets (Cronbach's α)

| Construct | # Items | Target α | Minimum α |
|-----------|---------|----------|-----------|
| Nutritional Knowledge (KN) | 11 | ≥ 0.80 | ≥ 0.70 |
| Food Safety Knowledge (FSK) | 5 | ≥ 0.75 | ≥ 0.70 |
| Food Safety Practices (FSP) | 5 | ≥ 0.75 | ≥ 0.70 |
| Attitudes (ATT) | 5 | ≥ 0.75 | ≥ 0.70 |
| Dietary Practices (PR) | 7 | ≥ 0.80 | ≥ 0.70 |
| Intervention Stories (INT_ST) | 6 | ≥ 0.80 | ≥ 0.70 |
| Platform Experience (PX) | 8 | ≥ 0.85 | ≥ 0.70 |
| Satisfaction (SAT) | 4 | ≥ 0.80 | ≥ 0.70 |
| Behavioral Intention (BI) | 5 | ≥ 0.80 | ≥ 0.70 |
