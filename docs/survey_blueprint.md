# NutriAware Survey — Publication-Grade Research Blueprint

> **Platform**: NutriAware — Malnutrition Intelligence Platform  
> **Target**: Parents/guardians of children (Arabic RTL interface)  
> **Design**: Cross-sectional with retrospective pre-then/post assessment  
> **Estimated Completion Time**: 6–8 minutes  

---

## PHASE 1 — CONSTRUCT RESTRUCTURING

### 1.1 Validated Framework (11 Sections)

| # | Section | Latent Construct | Theoretical Model | Measurement Level | Items |
|---|---------|-----------------|-------------------|-------------------|-------|
| 1 | Demographics | Control Variables | — | Nominal/Ordinal | 7 |
| 2 | Baseline Health & Behavior | Health Status Proxy | KAP Model (Knowledge-Attitude-Practice) | Nominal/Ordinal | 4 |
| 3 | Nutritional Knowledge | Cognitive Domain | KAP Model — Knowledge component | Interval (Likert) | 5 |
| 4 | Dietary Practices | Behavioral Domain | KAP Model — Practice component | Interval (Likert) | 8 |
| 5 | Intervention Exposure | Manipulation Check | Dose-Response Model | Interval (Likert) | 6 |
| 6 | Platform Experience | UX/Usability | TAM (Technology Acceptance Model) | Interval (Likert) | 8 |
| 7 | Satisfaction | Affective Response | Expectation-Confirmation Theory | Interval (Likert) | 4 |
| 8 | Behavioral Intention | Planned Behavior | TPB (Theory of Planned Behavior) | Interval (Likert) | 5 |
| 9 | Net Promoter Score | Advocacy Likelihood | NPS Framework (Reichheld) | Ratio (0–10) | 1 |
| 10 | Retrospective Pre/Post | Self-Assessed Change | Retrospective-Then Design (Howard et al.) | Interval (1–10 slider) | 4 pairs |
| 11 | Open-ended Insights | Qualitative Feedback | Thematic Analysis | Nominal (text) | 4 |

### 1.2 Theoretical Justification

- **KAP Model**: Links nutritional knowledge → attitudes → dietary practices. Used in WHO nutrition interventions.
- **TPB (Ajzen, 1991)**: Behavioral intention as a function of attitude, subjective norms, perceived behavioral control.
- **TAM (Davis, 1989)**: Perceived usefulness + perceived ease of use → technology acceptance.
- **Retrospective-Then Design (Howard, 1980)**: Mitigates response-shift bias in pre/post self-assessment by anchoring both ratings post-intervention.
- **NPS (Reichheld, 2003)**: Single-item loyalty metric for advocacy behavior.

---

## PHASE 2 — QUESTION OPTIMIZATION

### 2.1 Standardized Likert Scale (All Attitudinal Items)

| Code | Arabic | English |
|------|--------|---------|
| 1 | لا أوافق بشدة | Strongly Disagree |
| 2 | لا أوافق | Disagree |
| 3 | محايد | Neutral |
| 4 | أوافق | Agree |
| 5 | أوافق بشدة | Strongly Agree |

### 2.2 Revised Question List

#### Section 3: Nutritional Knowledge (KN)
*Construct: Cognitive domain — parent's understanding of child nutrition*  
*Scale: 5-point Agreement*

| ID | Arabic Text | English | Notes |
|----|------------|---------|-------|
| KN1 | أعلم أن سوء التغذية يشمل نقص العناصر الغذائية الدقيقة وليس فقط نقص الوزن | I know that malnutrition includes micronutrient deficiencies, not just underweight | — |
| KN2 | أعلم أن الغذاء الصحي اليومي للطفل يجب أن يحتوي على خضروات وفواكه طازجة | I know that a child's daily healthy diet must include fresh vegetables and fruits | — |
| KN3 | أعلم أن الإفراط في تناول الوجبات السريعة يؤثر سلباً على صحة الطفل ونموه | I know that excessive fast food consumption negatively affects a child's health and growth | — |
| KN4 | أعلم أن من علامات سوء التغذية عند الأطفال: الإرهاق المستمر وضعف التركيز الدراسي | I know that signs of malnutrition in children include persistent fatigue and poor academic concentration | — |
| KN5_R | لا أعتقد أن نوعية الغذاء تؤثر بشكل كبير على أداء الطفل الدراسي | I do not believe food quality significantly affects a child's academic performance | **Reverse-coded** |
| KN_AC | يرجى اختيار "أوافق" لهذا السؤال للتأكد من انتباهك | Please select "Agree" for this item to confirm your attentiveness | **Attention check** |

#### Section 4: Dietary Practices (PR)
*Construct: Behavioral domain — actual feeding practices at home*  
*Scale: 5-point Agreement | Time anchor: "خلال الأسبوعين الماضيين" (During the past 2 weeks)*

| ID | Arabic Text | English | Notes |
|----|------------|---------|-------|
| PR1 | خلال الأسبوعين الماضيين، حرصت على توفير الخضروات والفواكه في وجبات طفلي | During the past 2 weeks, I ensured vegetables and fruits were included in my child's meals | — |
| PR2 | خلال الأسبوعين الماضيين، راقبت كمية الحلويات والسكريات التي يتناولها طفلي | During the past 2 weeks, I monitored the amount of sweets and sugars my child consumed | — |
| PR3 | خلال الأسبوعين الماضيين، قللنا من تناول الوجبات السريعة في المنزل | During the past 2 weeks, we reduced fast food consumption at home | — |
| PR4 | خلال الأسبوعين الماضيين، شجعت طفلي على شرب الماء بانتظام بدلاً من المشروبات الغازية | During the past 2 weeks, I encouraged my child to drink water regularly instead of soft drinks | — |
| PR5 | خلال الأسبوعين الماضيين، قرأت البطاقة الغذائية قبل شراء المنتجات لطفلي | During the past 2 weeks, I read the nutrition label before purchasing products for my child | — |
| PR6 | خلال الأسبوعين الماضيين، حرصت على تقديم وجبة إفطار متوازنة لطفلي يومياً | During the past 2 weeks, I ensured my child had a balanced breakfast daily | — |
| PR7_R | خلال الأسبوعين الماضيين، وجدت صعوبة في تقديم أغذية صحية بسبب التكلفة المالية | During the past 2 weeks, I found it difficult to provide healthy food due to financial cost | **Reverse-coded** |
| PR_AC | يرجى اختيار "لا أوافق بشدة" لهذا السؤال | Please select "Strongly Disagree" for this item | **Attention check** |

#### Section 5: Intervention Exposure — Stories (INT_ST)
*Construct: Manipulation check — exposure to illustrated stories*  
*Scale: 5-point Agreement*

| ID | Arabic Text | English | Notes |
|----|------------|---------|-------|
| INT_ST1 | كانت القصص المصورة جذابة بصرياً ومشوقة لطفلي | The illustrated stories were visually attractive and engaging for my child | — |
| INT_ST2 | كانت اللغة والمفاهيم في القصص مناسبة لعمر طفلي | The language and concepts in the stories were age-appropriate for my child | — |
| INT_ST3 | ساهمت القصص في تصحيح مفاهيم غذائية خاطئة لدي أو لدى طفلي | The stories helped correct nutritional misconceptions I or my child had | — |
| INT_ST4 | نقلت القصص رسائل توعوية واضحة حول أهمية التغذية الصحية | The stories conveyed clear awareness messages about healthy nutrition importance | — |
| INT_ST5 | شجعت القصص طفلي على الاهتمام بتناول الطعام الصحي | The stories encouraged my child to be interested in eating healthy food | — |
| INT_ST6_R | لم تضف القصص معلومات جديدة لم أكن أعرفها مسبقاً | The stories did not add any new information I didn't already know | **Reverse-coded** |

#### Section 6: Platform Experience — UX (PX)
*Construct: Technology acceptance — usability, content quality, tools, consultation*  
*Scale: 5-point Agreement*

| ID | Sub-construct | Arabic Text | English |
|----|--------------|------------|---------|
| PX_US1 | Usability | كان الدخول إلى المنصة عبر رمز QR سهلاً ومباشراً | Accessing the platform via QR code was easy and straightforward |
| PX_US2 | Usability | كانت المنصة سهلة الاستخدام والتنقل بين أقسامها المختلفة | The platform was easy to use and navigate between its sections |
| PX_CN1 | Content | كانت المعلومات الغذائية المقدمة في المنصة موثوقة ومفيدة | The nutritional information provided on the platform was reliable and useful |
| PX_CN2 | Content | كانت خطط الوجبات المقترحة واقعية وقابلة للتطبيق في حياتنا اليومية | The suggested meal plans were realistic and applicable to our daily life |
| PX_TL1 | Tools | كانت أدوات التقييم الغذائي سهلة الفهم والاستخدام | The nutritional assessment tools were easy to understand and use |
| PX_TL2 | Tools | ساعدتني نتائج التقييم على فهم الحالة الغذائية لطفلي بوضوح | The assessment results helped me clearly understand my child's nutritional status |
| PX_CO1 | Consultation | كانت وسائل التواصل مع المختصين واضحة وسهلة الوصول | The communication channels with specialists were clear and accessible |
| PX_CO2 | Consultation | شعرت بالاطمئنان لتوفر إمكانية طلب استشارة غذائية متخصصة | I felt reassured by the availability of specialist nutritional consultation |

#### Section 7: Satisfaction (SAT)
*Construct: Affective response — overall satisfaction with the project*  
*Scale: 5-point Agreement*

| ID | Arabic Text | English | Notes |
|----|------------|---------|-------|
| SAT1 | أنا راضٍ بشكل عام عن تجربتي مع مشروع NutriAware | I am generally satisfied with my experience with the NutriAware project | — |
| SAT2 | حقق المشروع توقعاتي فيما يخص تحسين معرفتي بتغذية طفلي | The project met my expectations regarding improving my knowledge of my child's nutrition | — |
| SAT3 | أنصح أولياء الأمور الآخرين بالاطلاع على المنصة والاستفادة منها | I recommend other parents to explore and benefit from the platform | — |
| SAT4_R | لم يقدم المشروع فائدة واضحة تستحق الوقت المستثمر فيه | The project did not provide clear benefits worth the time invested | **Reverse-coded** |

#### Section 8: Behavioral Intention (BI)
*Construct: Planned behavior change — intention to modify dietary practices*  
*Scale: 5-point Agreement*

| ID | Arabic Text | English | Notes |
|----|------------|---------|-------|
| BI1 | أنوي تطبيق تغييرات غذائية صحية داخل المنزل بناءً على ما تعلمته | I intend to implement healthy dietary changes at home based on what I learned | — |
| BI2 | أنوي تقليل استهلاك الوجبات السريعة والحلويات لأطفالي | I intend to reduce fast food and sweets consumption for my children | — |
| BI3 | أنوي تشجيع أطفالي على تناول المزيد من الخضروات والفواكه يومياً | I intend to encourage my children to eat more vegetables and fruits daily | — |
| BI4 | أنوي استخدام منصة NutriAware بشكل منتظم لمتابعة تغذية أطفالي | I intend to use the NutriAware platform regularly to monitor my children's nutrition | — |
| BI5_R | لا أعتقد أنني سأغير عاداتنا الغذائية الحالية بناءً على هذا المشروع | I do not think I will change our current dietary habits based on this project | **Reverse-coded** |

#### Section 9: NPS
| ID | Arabic Text | English |
|----|------------|---------|
| NPS1 | على مقياس من 0 إلى 10، ما مدى احتمال أن توصي بمنصة NutriAware لصديق أو فرد من عائلتك؟ | On a scale of 0–10, how likely are you to recommend NutriAware to a friend or family member? |

#### Section 11: Open-ended
| ID | Arabic Text | English |
|----|------------|---------|
| OE1 | ما أكثر ما أعجبك في مشروع NutriAware؟ | What did you like most about NutriAware? |
| OE2 | ما التحديات التي تواجهك في تطبيق العادات الغذائية الصحية لأطفالك؟ | What challenges do you face in implementing healthy dietary habits for your children? |
| OE3 | ما اقتراحاتك لتحسين المنصة أو المحتوى التوعوي؟ | What are your suggestions for improving the platform or awareness content? |
| OE4 | كيف تعرفت على منصة NutriAware لأول مرة؟ | How did you first learn about the NutriAware platform? |

---

## PHASE 3 — PRE/POST SCIENTIFIC DESIGN

### 3.1 Retrospective-Then Design (Section 10)

Uses identical wording with explicit temporal anchors to minimize response-shift bias.

| ID | Anchor | Arabic Text | English |
|----|--------|------------|---------|
| RETRO_KN_PRE | قبل استخدام NutriAware | مستوى معرفتي بأساسيات تغذية الأطفال السليمة | My level of knowledge about child nutrition fundamentals |
| RETRO_KN_POST | بعد استخدام NutriAware | مستوى معرفتي بأساسيات تغذية الأطفال السليمة | My level of knowledge about child nutrition fundamentals |
| RETRO_PR_PRE | قبل استخدام NutriAware | مستوى ممارساتي الغذائية الصحية في المنزل | My level of healthy dietary practices at home |
| RETRO_PR_POST | بعد استخدام NutriAware | مستوى ممارساتي الغذائية الصحية في المنزل | My level of healthy dietary practices at home |
| RETRO_AW_PRE | قبل استخدام NutriAware | مستوى وعيي بمخاطر سوء التغذية على أطفالي | My level of awareness about malnutrition risks for my children |
| RETRO_AW_POST | بعد استخدام NutriAware | مستوى وعيي بمخاطر سوء التغذية على أطفالي | My level of awareness about malnutrition risks for my children |
| RETRO_CF_PRE | قبل استخدام NutriAware | مستوى ثقتي في قدرتي على تخطيط وجبات صحية لأطفالي | My confidence level in my ability to plan healthy meals for my children |
| RETRO_CF_POST | بعد استخدام NutriAware | مستوى ثقتي في قدرتي على تخطيط وجبات صحية لأطفالي | My confidence level in my ability to plan healthy meals for my children |

**Scale**: 1–10 slider (1 = منخفض جدًا / Very Low, 10 = مرتفع جدًا / Very High)

### 3.2 Statistical Analysis Preparation

| Analysis | Purpose | Assumptions |
|----------|---------|-------------|
| Paired t-test | Mean difference PRE vs POST | Normal distribution of differences |
| Wilcoxon signed-rank | Non-parametric alternative | Ordinal data, non-normal differences |
| Cohen's d | Effect size | d = (M_post - M_pre) / SD_diff |

**Interpretation**: d < 0.2 = negligible, 0.2–0.5 = small, 0.5–0.8 = medium, > 0.8 = large

---

## PHASE 4 — COMPOSITE INDEX CREATION

### 4.1 Knowledge Score (KS)

| Property | Value |
|----------|-------|
| Items | KN1, KN2, KN3, KN4, KN5_R (reverse-coded) |
| Scoring | Mean of 5 items (1–5 scale) |
| Range | 1.0 – 5.0 |
| Cutoffs | ≤2.0 = Low, 2.1–3.5 = Moderate, 3.6–5.0 = High |

### 4.2 Practice Score (PS)

| Property | Value |
|----------|-------|
| Items | PR1, PR2, PR3, PR4, PR5, PR6, PR7_R (reverse-coded) |
| Scoring | Mean of 7 items (1–5 scale) |
| Range | 1.0 – 5.0 |
| Cutoffs | ≤2.0 = Poor, 2.1–3.0 = Fair, 3.1–4.0 = Good, 4.1–5.0 = Excellent |

### 4.3 Engagement Score (ES)

| Property | Value |
|----------|-------|
| Items | INT_ST1–INT_ST6_R + PX_US1–PX_CO2 (14 items) |
| Scoring | Mean of all items (1–5 scale) |
| Range | 1.0 – 5.0 |
| Cutoffs | ≤2.5 = Low Engagement, 2.6–3.5 = Moderate, 3.6–5.0 = High |

### 4.4 Satisfaction Index (SI)

| Property | Value |
|----------|-------|
| Items | SAT1, SAT2, SAT3, SAT4_R (reverse-coded) |
| Scoring | Mean of 4 items (1–5 scale) |
| Range | 1.0 – 5.0 |
| Cutoffs | ≤2.0 = Dissatisfied, 2.1–3.5 = Neutral, 3.6–5.0 = Satisfied |

### 4.5 Behavioral Change Index (BCI)

| Property | Value |
|----------|-------|
| Items | BI1, BI2, BI3, BI4, BI5_R (reverse-coded) |
| Scoring | Mean of 5 items (1–5 scale) |
| Range | 1.0 – 5.0 |
| Cutoffs | ≤2.0 = No Intent, 2.1–3.5 = Moderate Intent, 3.6–5.0 = Strong Intent |

---

## PHASE 5 — PSYCHOMETRIC STRENGTHENING

### 5.1 Reliability (Internal Consistency)

| Construct | # Items | Target α | Minimum α |
|-----------|---------|----------|-----------|
| Knowledge (KN) | 5 | ≥ 0.75 | ≥ 0.70 |
| Practices (PR) | 7 | ≥ 0.80 | ≥ 0.70 |
| Intervention Stories (INT_ST) | 6 | ≥ 0.80 | ≥ 0.70 |
| Platform Experience (PX) | 8 | ≥ 0.85 | ≥ 0.70 |
| Satisfaction (SAT) | 4 | ≥ 0.80 | ≥ 0.70 |
| Behavioral Intention (BI) | 5 | ≥ 0.80 | ≥ 0.70 |

### 5.2 Factor Analysis Plan

**EFA (Exploratory Factor Analysis)**:
- Extraction: Principal Axis Factoring
- Rotation: Promax (oblique — constructs are theoretically correlated)
- Retention criteria: Eigenvalue > 1, scree plot, parallel analysis
- Factor loading threshold: ≥ 0.40, cross-loading < 0.30

**CFA (Confirmatory Factor Analysis)**:
- 6-factor model: KN, PR, INT_ST, PX, SAT, BI
- Expected fit indices:

| Index | Acceptable | Good |
|-------|-----------|------|
| CFI | ≥ 0.90 | ≥ 0.95 |
| TLI | ≥ 0.90 | ≥ 0.95 |
| RMSEA | ≤ 0.08 | ≤ 0.06 |
| SRMR | ≤ 0.10 | ≤ 0.08 |

### 5.3 SEM Path Model

```
Knowledge (KN) ──→ Practices (PR) ──→ Satisfaction (SAT) ──→ Behavioral Intention (BI)
       │                                        ↑
       └──────── Platform Experience (PX) ──────┘
```

### 5.4 Sample Size

- **Minimum for CFA/SEM**: n ≥ 200 (5:1 ratio with ~40 observed variables)
- **Recommended**: n ≥ 300 (for robust SEM estimation via ML)
- **Power analysis**: For medium effect (f² = 0.15), α = .05, power = .80 → n ≥ 150

---

## PHASE 6 — UX & FLOW OPTIMIZATION

### 6.1 Section Flow Design

| Step | Section | Est. Time | Cognitive Load |
|------|---------|-----------|----------------|
| 1 | Consent | 30s | Low (read + check) |
| 2 | Demographics | 60s | Low (select options) |
| 3 | Health Indicators | 45s | Low (select options) |
| 4 | Nutritional Knowledge | 60s | Medium (Likert reflection) |
| 5 | Dietary Practices | 75s | Medium (Likert + time anchor) |
| 6 | Intervention Stories | 60s | Medium (Likert reflection) |
| 7 | Platform Experience | 75s | Medium (Likert evaluation) |
| 8 | Satisfaction | 30s | Low (4 items) |
| 9 | Behavioral Intention | 30s | Low (5 items) |
| 10 | NPS | 10s | Low (single item) |
| 11 | Retrospective Pre/Post | 40s | Medium (slider pairs) |
| 12 | Open-ended | 60s | High (text input, optional) |
| | **Total** | **~8 min** | |

### 6.2 Mobile & RTL Optimization

- All form elements use `dir="rtl"` with proper text alignment
- Likert grids collapse to 2-column on mobile (`grid-cols-2 md:grid-cols-5`)
- Touch targets ≥ 48px for mobile accessibility
- Section transitions use `framer-motion` for smooth scrolling
- Progress indicator shows percentage completion

### 6.3 Drop-off Prevention

- **Save progress**: Auto-save to localStorage every section
- **Mandatory consent gate**: Prevents scroll/interaction until consent given
- **Section validation**: Validate per-section before allowing progression
- **Completion incentive**: Show progress bar and estimated remaining time

---

## PHASE 7 — DATA STRUCTURE OUTPUT

### 7.1 Variable Naming Convention

Format: `{ConstructPrefix}{ItemNumber}[_R]`

| Prefix | Construct | Example |
|--------|-----------|---------|
| DEM_ | Demographics | DEM_AGE, DEM_EDU |
| HI_ | Health Indicators | HI_GENDER, HI_WEIGHT |
| KN | Knowledge | KN1, KN5_R |
| PR | Practices | PR1, PR7_R |
| INT_ST | Intervention Stories | INT_ST1, INT_ST6_R |
| PX_US | Platform Usability | PX_US1, PX_US2 |
| PX_CN | Platform Content | PX_CN1, PX_CN2 |
| PX_TL | Platform Tools | PX_TL1, PX_TL2 |
| PX_CO | Platform Consultation | PX_CO1, PX_CO2 |
| SAT | Satisfaction | SAT1, SAT4_R |
| BI | Behavioral Intention | BI1, BI5_R |
| NPS | Net Promoter Score | NPS1 |
| RETRO_ | Retrospective | RETRO_KN_PRE, RETRO_KN_POST |
| OE | Open-ended | OE1, OE2 |

### 7.2 Coding Guide

| Variable Type | Coding |
|--------------|--------|
| Likert (agreement) | 1=SD, 2=D, 3=N, 4=A, 5=SA |
| Reverse-coded | Original: 1→5, 2→4, 3→3, 4→2, 5→1 |
| NPS | 0–10 numeric |
| Slider (retro) | 1–10 numeric |
| Demographics (nominal) | Category index (1, 2, 3...) |
| Health issues (multi-select) | Binary dummy: HI_ISSUE_1=0/1, HI_ISSUE_2=0/1... |
| Open-ended | Raw text (UTF-8) |

### 7.3 SPSS Variable Definitions

```spss
VARIABLE LABELS
  KN1 'Knowledge: Malnutrition includes micronutrient deficiency'
  KN2 'Knowledge: Daily diet needs vegetables and fruits'
  KN3 'Knowledge: Fast food harms child health'
  KN4 'Knowledge: Signs include fatigue and poor concentration'
  KN5_R 'Knowledge: Food quality does not affect academics (R)'
  PR1 'Practice: Provided vegetables and fruits (2 weeks)'
  PR7_R 'Practice: Difficulty due to cost (R, 2 weeks)'
  SAT1 'Satisfaction: Overall satisfied'
  SAT4_R 'Satisfaction: No clear benefit (R)'
  BI1 'Intention: Implement dietary changes'
  BI5_R 'Intention: Will not change habits (R)'.

VALUE LABELS
  KN1 TO BI5_R
    1 'Strongly Disagree'
    2 'Disagree'
    3 'Neutral'
    4 'Agree'
    5 'Strongly Agree'.

COMPUTE KN5_R_recoded = 6 - KN5_R.
COMPUTE PR7_R_recoded = 6 - PR7_R.
COMPUTE SAT4_R_recoded = 6 - SAT4_R.
COMPUTE BI5_R_recoded = 6 - BI5_R.
COMPUTE INT_ST6_R_recoded = 6 - INT_ST6_R.

COMPUTE KnowledgeScore = MEAN(KN1, KN2, KN3, KN4, KN5_R_recoded).
COMPUTE PracticeScore = MEAN(PR1, PR2, PR3, PR4, PR5, PR6, PR7_R_recoded).
COMPUTE SatisfactionIndex = MEAN(SAT1, SAT2, SAT3, SAT4_R_recoded).
COMPUTE BehavioralChangeIndex = MEAN(BI1, BI2, BI3, BI4, BI5_R_recoded).
```

### 7.4 Python Pandas Column Naming

```python
columns = {
    # Demographics
    'DEM_RELATIONSHIP': 'object', 'DEM_PARENT_AGE': 'object',
    'DEM_PROFESSION': 'object', 'DEM_EDUCATION': 'object',
    'DEM_CHILDREN_COUNT': 'object', 'DEM_CHILD_AGE': 'object',
    # Health
    'HI_GENDER': 'object', 'HI_WEIGHT_PERCEPTION': 'object',
    # Likert scales (int)
    **{f'KN{i}': 'int64' for i in range(1, 6)},
    **{f'PR{i}': 'int64' for i in range(1, 8)},
    **{f'INT_ST{i}': 'int64' for i in range(1, 7)},
    **{f'PX_US{i}': 'int64' for i in range(1, 3)},
    **{f'PX_CN{i}': 'int64' for i in range(1, 3)},
    **{f'PX_TL{i}': 'int64' for i in range(1, 3)},
    **{f'PX_CO{i}': 'int64' for i in range(1, 3)},
    **{f'SAT{i}': 'int64' for i in range(1, 5)},
    **{f'BI{i}': 'int64' for i in range(1, 6)},
    'NPS1': 'int64',
    # Retrospective (float for slider)
    **{f'RETRO_{d}_{t}': 'float64' for d in ['KN','PR','AW','CF'] for t in ['PRE','POST']},
    # Open-ended
    **{f'OE{i}': 'object' for i in range(1, 5)},
}
```

### 7.5 Missing Data Protocol

| Condition | Action |
|-----------|--------|
| Missing ≤ 5% per variable | Listwise deletion acceptable |
| Missing 5–20% | Multiple Imputation (MICE) |
| Missing > 20% | Flag variable; consider exclusion |
| Attention check failed | Exclude entire response |
| All items in construct missing | Exclude respondent from that construct |

**MCAR Test**: Little's MCAR test (p > .05 → MCAR assumption holds)

### 7.6 Outlier Detection Rules

| Method | Rule | Action |
|--------|------|--------|
| IQR Method | Value < Q1 - 1.5×IQR or > Q3 + 1.5×IQR | Flag for review |
| Straightlining | Same response for ≥ 80% of Likert items | Flag for exclusion |
| Response time | < 2 minutes total | Flag for exclusion |
| Mahalanobis distance | p < .001 | Flag multivariate outlier |

---

## PHASE 8 — EDIT CONTROL SYSTEM

### 8.1 Dynamic Editing Matrix

The survey supports the following dynamic modifications via `SurveyManagement.tsx`:

| Capability | Implementation |
|-----------|---------------|
| Change question type | `type` field: likert, nps, open, slider, mcq |
| Convert open → scaled | Change `type` from 'open' to 'likert', add scaleType |
| Adjust Likert range | `scaleLength`: 3, 5, or 7 points |
| Reverse scoring | `reverseScored`: true/false toggle |
| Custom labels | `customLabels` override per question |
| Scale type | `scaleType`: agreement, frequency, satisfaction, intensity, quality, importance |
| Reweight indices | Modify `COMPOSITE_INDICES` weights in `surveyResearchConfig.ts` |
| Conditional logic | `conditionalOn` field referencing parent question ID + value |
| Randomize options | `randomizeOptions`: true/false per question |
| Export JSON schema | Full survey exported to `surveySchema.json` |

### 8.2 JSON Schema Structure

See `docs/surveySchema.json` for the complete exportable schema with all sections, questions, conditional logic, and composite index definitions.

---

## APPENDIX: Construct Mapping Table

| Variable | Construct | Theoretical Model | Index Membership | Reverse |
|----------|-----------|-------------------|------------------|---------|
| KN1–KN4 | Knowledge | KAP (K) | Knowledge Score | No |
| KN5_R | Knowledge | KAP (K) | Knowledge Score | **Yes** |
| PR1–PR6 | Practices | KAP (P) | Practice Score | No |
| PR7_R | Practices | KAP (P) | Practice Score | **Yes** |
| INT_ST1–5 | Intervention | Dose-Response | Engagement Score | No |
| INT_ST6_R | Intervention | Dose-Response | Engagement Score | **Yes** |
| PX_US1–CO2 | Platform UX | TAM | Engagement Score | No |
| SAT1–3 | Satisfaction | ECT | Satisfaction Index | No |
| SAT4_R | Satisfaction | ECT | Satisfaction Index | **Yes** |
| BI1–4 | Behavioral Intent | TPB | Behavioral Change Index | No |
| BI5_R | Behavioral Intent | TPB | Behavioral Change Index | **Yes** |
| NPS1 | Advocacy | NPS Framework | — (standalone) | No |
| RETRO_*_PRE/POST | Self-Assessment | Retro-Then Design | — (paired analysis) | No |
| OE1–4 | Qualitative | Thematic Analysis | — (qualitative) | No |
