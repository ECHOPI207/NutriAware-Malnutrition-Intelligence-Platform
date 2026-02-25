# NutriAware Survey v3.0 — Variable Coding Table

> **Purpose**: SPSS/R-compatible variable definitions with complete coding instructions  
> **Naming Convention**: `{ConstructPrefix}{ItemNumber}[_R]`

---

## 1. Demographic Variables

| Variable ID | Label (EN) | Label (AR) | Type | Coding |
|-------------|-----------|-----------|------|--------|
| DEM_RELATIONSHIP | Relationship to child | صلة القرابة بالطفل | Nominal | 1=Father, 2=Mother, 3=Other |
| DEM_PARENT_AGE | Parent age group | عمر ولي الأمر | Ordinal | 1=Under 25, 2=25–35, 3=36–45, 4=Over 45 |
| DEM_EDUCATION | Education level | المستوى التعليمي | Ordinal | 1=Below secondary, 2=Secondary, 3=Diploma, 4=University, 5=Postgraduate |
| DEM_EMPLOYMENT | Employment status | الحالة الوظيفية | Nominal | 1=Full-time, 2=Part-time, 3=Self-employed, 4=Unemployed, 5=Retired, 6=Student |
| DEM_INCOME | Monthly household income | الدخل الشهري | Ordinal | 1=<2000, 2=2000–5000, 3=5001–10000, 4=10001–15000, 5=>15000, 99=Prefer not to answer |
| DEM_CHILDREN_COUNT | Number of children | عدد الأطفال | Ordinal | 1=One, 2=2–3, 3=4+ |
| DEM_CHILD_AGE | Target child age | عمر الطفل المستهدف | Ordinal | 1=Under 3, 2=3–6, 3=7–10, 4=11–14 |
| DEM_SCHOOL_TYPE | School type | نوع المدرسة | Nominal | 1=Public, 2=Private, 3=Not enrolled |

## 2. Health Indicator Variables

| Variable ID | Label (EN) | Label (AR) | Type | Coding |
|-------------|-----------|-----------|------|--------|
| HI_GENDER | Child gender | جنس الطفل | Nominal | 1=Male, 2=Female |
| HI_WEIGHT_PERCEPTION | Weight perception | تقييم وزن الطفل | Ordinal | 1=Very underweight, 2=Underweight, 3=Normal, 4=Overweight, 5=Obese, 99=Don't know |
| HI_HEALTH_NONE | No health issues | لا يعاني | Binary | 0/1 |
| HI_HEALTH_ANEMIA | Anemia | أنيميا | Binary | 0/1 |
| HI_HEALTH_VITD | Vitamin D/Calcium deficiency | نقص فيتامين د/كالسيوم | Binary | 0/1 |
| HI_HEALTH_UNDERWEIGHT | Underweight | نحافة | Binary | 0/1 |
| HI_HEALTH_OBESITY | Obesity | سمنة | Binary | 0/1 |
| HI_HEALTH_ALLERGY | Food allergy | حساسية طعام | Binary | 0/1 |
| HI_HEALTH_OTHER | Other health issue | أخرى | Binary | 0/1 |
| HI_INFO_PEDIATRICIAN | Info source: Pediatrician | طبيب أطفال | Binary | 0/1 |
| HI_INFO_NUTRITIONIST | Info source: Nutritionist | أخصائي تغذية | Binary | 0/1 |
| HI_INFO_INTERNET | Info source: Internet | الإنترنت | Binary | 0/1 |
| HI_INFO_FAMILY | Info source: Family/Friends | الأهل والأصدقاء | Binary | 0/1 |
| HI_INFO_BOOKS | Info source: Scientific books | الكتب العلمية | Binary | 0/1 |
| HI_INFO_SCHOOL | Info source: School | المدرسة | Binary | 0/1 |
| HI_FOOD_ILLNESS | Food illness frequency (past month) | تكرار المرض الغذائي | Ordinal | 0=None, 1=1–2 times, 2=3–5 times, 3=>5 times |

## 3. Nutritional Knowledge (KN) — Likert 5-point

| Variable ID | Label (EN) | Reverse | Coding |
|-------------|-----------|---------|--------|
| KN1 | Malnutrition includes micronutrient deficiencies | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN2 | Daily diet needs vegetables and fruits | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN3 | Fast food harms child health | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN4 | Signs include fatigue and poor concentration | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN5 | Proteins support muscles, fats support brain | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN6 | Balanced meal = carbs + protein + vegetables | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN7 | Iron deficiency causes anemia | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN8 | Vitamin A supports immunity, calcium supports bones | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN9 | Dietary diversity > food quantity | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN10 | Child needs ≥5 food groups daily | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| KN11_R | Food quality doesn't affect academics (R) | **Yes** | Recode: 6 − raw value |
| KN_AC | Attention check (expected: 4=Agree) | — | Exclude from scoring |

## 4. Food Safety Knowledge (FSK) — Likert 5-point

| Variable ID | Label (EN) | Reverse | Coding |
|-------------|-----------|---------|--------|
| FSK1 | Handwashing essential before food prep | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| FSK2 | Separate raw meat from ready-to-eat | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| FSK3 | Refrigerate cooked food within 2h, below 5°C | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| FSK4 | Cook meat/poultry to safe temperature | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| FSK5 | Untreated water and expired food cause illness | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |

## 5. Food Safety Practices (FSP) — Frequency 5-point

| Variable ID | Label (EN) | Reverse | Coding |
|-------------|-----------|---------|--------|
| FSP1 | Wash hands before preparing child's food | No | 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always |
| FSP2 | Separate raw meat during prep/storage | No | 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always |
| FSP3 | Check expiration dates before purchasing | No | 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always |
| FSP4 | Refrigerate leftovers properly and timely | No | 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always |
| FSP5 | Wash fruits/vegetables before serving | No | 1=Never, 2=Rarely, 3=Sometimes, 4=Often, 5=Always |

## 6. Attitudes (ATT) — Likert 5-point

| Variable ID | Label (EN) | Reverse | Coding |
|-------------|-----------|---------|--------|
| ATT1 | Food safety as important as nutrition | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| ATT2 | Responsible for improving child nutrition | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| ATT3 | Early healthy habits affect lifelong health | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| ATT4 | Checking expiry dates is essential | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| ATT5 | Micronutrient deficiency affects performance | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |

## 7. Dietary Practices (PR) — Likert 5-point

| Variable ID | Label (EN) | Reverse | Coding |
|-------------|-----------|---------|--------|
| PR1 | Provided vegetables/fruits (2 weeks) | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PR2 | Monitored sweets/sugars (2 weeks) | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PR3 | Reduced fast food (2 weeks) | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PR4 | Encouraged water over soft drinks (2 weeks) | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PR5 | Read nutrition labels (2 weeks) | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PR6 | Balanced breakfast daily (2 weeks) | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PR7_R | Difficulty due to cost (R, 2 weeks) | **Yes** | Recode: 6 − raw value |
| PR_AC | Attention check (expected: 1=SD) | — | Exclude from scoring |

## 8. Dietary Diversity Score (DDS) — Binary

| Variable ID | Label (EN) | Coding |
|-------------|-----------|--------|
| DDS1 | Cereals and grains | 0=No, 1=Yes |
| DDS2 | Legumes | 0=No, 1=Yes |
| DDS3 | Milk and dairy | 0=No, 1=Yes |
| DDS4 | Meat, poultry, fish | 0=No, 1=Yes |
| DDS5 | Eggs | 0=No, 1=Yes |
| DDS6 | Dark green leafy vegetables | 0=No, 1=Yes |
| DDS7 | Vitamin A–rich fruits/vegetables | 0=No, 1=Yes |
| DDS8 | Other fruits or vegetables | 0=No, 1=Yes |
| DDS_TOTAL | DDS Total Score | Sum(DDS1–DDS8), range 0–8 |
| DDS_ADEQUATE | Adequate diversity flag | 0=Inadequate(<5), 1=Adequate(≥5) |

## 9–12. Post-test Likert Sections

| Variable ID | Label (EN) | Reverse | Coding |
|-------------|-----------|---------|--------|
| INT_ST1–5 | Intervention Stories items | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| INT_ST6_R | Stories no new info (R) | **Yes** | Recode: 6 − raw value |
| PX_US1–2 | Platform Usability | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PX_CN1–2 | Platform Content | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PX_TL1–2 | Platform Tools | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| PX_CO1–2 | Platform Consultation | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| SAT1–3 | Satisfaction items | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| SAT4_R | No clear benefit (R) | **Yes** | Recode: 6 − raw value |
| BI1–4 | Behavioral Intention items | No | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| BI5_R | Will not change habits (R) | **Yes** | Recode: 6 − raw value |
| NPS1 | Net Promoter Score | — | 0–10 numeric |

## 13. Retrospective Pre/Post

| Variable ID | Label (EN) | Coding |
|-------------|-----------|--------|
| RETRO_KN_PRE | Knowledge (before) | 1–10 slider |
| RETRO_KN_POST | Knowledge (after) | 1–10 slider |
| RETRO_PR_PRE | Practices (before) | 1–10 slider |
| RETRO_PR_POST | Practices (after) | 1–10 slider |
| RETRO_AW_PRE | Awareness (before) | 1–10 slider |
| RETRO_AW_POST | Awareness (after) | 1–10 slider |
| RETRO_CF_PRE | Confidence (before) | 1–10 slider |
| RETRO_CF_POST | Confidence (after) | 1–10 slider |

## 14. Intervention Fidelity

| Variable ID | Label (EN) | Coding |
|-------------|-----------|--------|
| IF_LOGINS | Login count (6 weeks) | 0=None, 1=1–3, 2=4–6, 3=7–10, 4=>10 |
| IF_SECTIONS_MEALS | Used: Meal Plans | 0/1 |
| IF_SECTIONS_ASSESS | Used: Assessment | 0/1 |
| IF_SECTIONS_STORIES | Used: Stories | 0/1 |
| IF_SECTIONS_CONSULT | Used: Consultation | 0/1 |
| IF_SECTIONS_ARTICLES | Used: Articles | 0/1 |
| IF_SECTIONS_BMI | Used: BMI Calculator | 0/1 |
| IF_STORIES | Stories read count | 0=None, 1=1–2, 2=3–5, 3=6–8, 4=All |

## 15. Open-ended

| Variable ID | Label (EN) | Coding |
|-------------|-----------|--------|
| OE1 | Most liked about NutriAware | Raw text (UTF-8) |
| OE2 | Challenges in healthy habits | Raw text (UTF-8) |
| OE3 | Improvement suggestions | Raw text (UTF-8) |
| OE4 | How discovered NutriAware | Raw text (UTF-8) |

## 16. Anthropometric Variables (Researcher form)

| Variable ID | Label (EN) | Type | Coding |
|-------------|-----------|------|--------|
| ANTH_WEIGHT | Child weight | Ratio | kg (1 decimal) |
| ANTH_HEIGHT | Child height | Ratio | cm (1 decimal) |
| ANTH_DOB | Date of birth | Date | dd/mm/yyyy |
| ANTH_AGE | Age in months | Ratio | Auto-calculated |
| ANTH_SEX | Child sex | Nominal | 1=Male, 2=Female |
| ANTH_DATE | Measurement date | Date | dd/mm/yyyy |
| ANTH_WAZ | Weight-for-Age Z-score | Interval | WHO AnthroPlus |
| ANTH_HAZ | Height-for-Age Z-score | Interval | WHO AnthroPlus |
| ANTH_BAZ | BMI-for-Age Z-score | Interval | WHO AnthroPlus |

---

## Key Abbreviations

| Code | Meaning |
|------|---------|
| SD | Strongly Disagree (1) |
| D | Disagree (2) |
| N | Neutral (3) |
| A | Agree (4) |
| SA | Strongly Agree (5) |
| R | Reverse-coded item |
| AC | Attention check item |
