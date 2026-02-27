# Meal Analyzer Methodology & Scientific Validation

This document outlines the scientific foundation and methodological framework for the AI-powered Meal Analyzer integrated within the NutriAware platform.

## 1. Nutritional Adequacy Assessment
The adequacy of micronutrient and macronutrient intake is calculated by comparing total meal consumption against pediatric-specific Recommended Dietary Allowances (RDAs) and Estimated Average Requirements (EARs).

### Reference Standards
- **Energy and Macronutrients**: Derived from the FAO/WHO Human Energy Requirements (2001) and the Institute of Medicine (IOM) Dietary Reference Intakes (DRIs).
- **Micronutrients**: Based on the EFSA Dietary Reference Values (DRVs) and WHO/FAO Vitamin and Mineral Requirements in Human Nutrition (2nd Edition).

### Citations
- European Food Safety Authority (EFSA). (2017). *Dietary Reference Values for nutrients: Summary report*. EFSA Supporting Publications, 14(12), e15121.
- Food and Agriculture Organization (FAO) & World Health Organization (WHO). (2004). *Vitamin and mineral requirements in human nutrition*. (2nd ed.). World Health Organization. [https://apps.who.int/iris/handle/10665/42716](https://apps.who.int/iris/handle/10665/42716)
- Institute of Medicine (IOM). (2006). *Dietary Reference Intakes: The Essential Guide to Nutrient Requirements*. National Academies Press. [https://doi.org/10.17226/11537](https://doi.org/10.17226/11537)

## 2. Food Safety & Processing Analysis (NOVA)
The Meal Analyzer utilizes the **NOVA classification system** to evaluate the degree of food processing and its impact on pediatric health.

### Scoring Logic
- **NOVA 1 (Unprocessed/Minimally Processed)**: Full safety weighting (100%).
- **NOVA 2 (Processed Culinary Ingredients)**: High safety weighting (80%).
- **NOVA 3 (Processed Foods)**: Moderate safety weighting (50%).
- **NOVA 4 (Ultra-Processed Foods)**: Zero safety weighting (0%).

### Citations
- Monteiro, C. A., Cannon, G., Levy, R. B., Moubarac, J. C., Louzada, M. L., Rauber, F., ... & Jaime, P. C. (2019). *Ultra-processed foods: what they are and how to identify them*. Public Health Nutrition, 22(5), 936-941.
- Food and Agriculture Organization (FAO). (2019). *Ultra-processed foods, diet quality, and health using the NOVA classification system*. Rome.

## 3. Data Sources
Nutritional profiles for Egyptian and international food items are sourced from:
- **USDA FoodData Central** (2023)
- **Egyptian National Nutrition Institute (NNI)** Food Composition Tables.
- **Codex Alimentarius** food safety standards.
