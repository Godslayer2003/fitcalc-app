export interface Faq {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: "Body Composition" | "Nutrition" | "Training" | "Wellness";
  faqs: Faq[];
}

export const tools: Tool[] = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index from height and weight.",
    category: "Body Composition",
    faqs: [
      {
        q: "How is BMI calculated?",
        a: "BMI = weight (kg) ÷ height (m)². It's the standard formula used by the WHO and most health organizations worldwide.",
      },
      {
        q: "Is BMI accurate for everyone?",
        a: "No — it doesn't distinguish muscle from fat, so it can misclassify muscular athletes as \"overweight\" and underestimate body fat in people with low muscle mass. It's a population-level screening tool, not a diagnosis.",
      },
      {
        q: "Is my data uploaded anywhere?",
        a: "No — the calculation happens entirely in your browser. Nothing is sent to a server.",
      },
    ],
  },
  {
    slug: "tdee-calculator",
    name: "TDEE & Calorie Calculator",
    description: "Estimate your daily calorie needs based on activity level.",
    category: "Nutrition",
    faqs: [
      {
        q: "What formula does this use?",
        a: "The Mifflin-St Jeor equation for basal metabolic rate (BMR), multiplied by an activity factor to estimate Total Daily Energy Expenditure (TDEE) — widely considered the most accurate simple BMR formula available.",
      },
      {
        q: "Should I eat exactly this many calories?",
        a: "Treat it as a starting estimate, not a precise target — actual needs vary by individual metabolism, and this isn't personalized medical or nutrition advice.",
      },
      {
        q: "How do I lose or gain weight using this number?",
        a: "A common guideline is roughly a 500 calorie/day deficit for ~1 lb/week of loss, or a similar surplus for gain — adjust from your TDEE based on your goal.",
      },
    ],
  },
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    description: "Split your daily calories into protein, carb, and fat targets.",
    category: "Nutrition",
    faqs: [
      {
        q: "How are macro grams calculated from calories?",
        a: "Protein and carbs provide 4 calories per gram, fat provides 9 — your target percentage split of daily calories is divided by that to get grams.",
      },
      {
        q: "What split should I use?",
        a: "There's no single correct answer — this tool lets you set your own protein/carb/fat percentages; common starting points are 30/40/30 or 40/30/30 depending on goals.",
      },
      {
        q: "Does this account for fiber or micronutrients?",
        a: "No — it only splits total calories into the three macronutrients by weight. It doesn't track fiber, vitamins, or minerals.",
      },
    ],
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    description: "Estimate body fat percentage using the US Navy tape-measure method.",
    category: "Body Composition",
    faqs: [
      {
        q: "How accurate is the tape-measure method?",
        a: "It's typically within a few percentage points of more precise methods like DEXA scans for most people — good for tracking trends over time, less reliable for a single precise reading.",
      },
      {
        q: "What measurements do I need?",
        a: "Neck and waist circumference for men; neck, waist, and hip circumference for women, plus height — all in the same unit (inches or cm).",
      },
      {
        q: "Where exactly should I measure?",
        a: "Neck: just below the larynx. Waist: at the navel. Hips (women): at the widest point. Measure snugly but without compressing the skin.",
      },
    ],
  },
  {
    slug: "one-rep-max-calculator",
    name: "One-Rep Max Calculator",
    description: "Estimate your one-rep max from any weight and rep count.",
    category: "Training",
    faqs: [
      {
        q: "What formula does this use?",
        a: "The Epley formula: 1RM = weight × (1 + reps ÷ 30) — one of the most widely used and validated estimation formulas in strength training.",
      },
      {
        q: "How accurate is an estimated 1RM vs. actually testing it?",
        a: "It's a good estimate for reps in the 1-10 range; accuracy drops for higher rep counts. It won't perfectly match a true tested max, which also depends on technique and fatigue on the day.",
      },
      {
        q: "Should beginners test their actual 1RM?",
        a: "Generally no — estimating from a comfortable working set is safer than attempting a true maximal lift without a spotter or coach.",
      },
    ],
  },
  {
    slug: "heart-rate-zone-calculator",
    name: "Heart Rate Zone Calculator",
    description: "Find your target heart rate training zones.",
    category: "Training",
    faqs: [
      {
        q: "What formula does this use?",
        a: "The Karvonen formula, which factors in your resting heart rate for a more personalized estimate than simply using age alone: target HR = ((max HR − resting HR) × intensity%) + resting HR.",
      },
      {
        q: "How is max heart rate estimated?",
        a: "Using the common estimate of 220 minus your age. It's a population average, not a measured value — actual max heart rate varies by individual.",
      },
      {
        q: "What are the different zones for?",
        a: "Lower zones (50-60%) build an aerobic base and aid recovery, moderate zones (60-80%) build endurance, and higher zones (80%+) build performance and speed.",
      },
    ],
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    description: "Get a general daily water intake guideline based on your weight.",
    category: "Wellness",
    faqs: [
      {
        q: "How is this calculated?",
        a: "Using a common guideline of roughly 30-35 ml of water per kg of body weight, adjusted upward for activity level.",
      },
      {
        q: "Is this a strict requirement?",
        a: "No — it's a general starting guideline. Actual needs vary with climate, activity, diet, and individual health, and you also get water from food and other beverages.",
      },
      {
        q: "Does exercise change how much I need?",
        a: "Yes — this calculator adds extra water for active minutes per day to account for fluid lost through sweat.",
      },
    ],
  },
  {
    slug: "running-pace-calculator",
    name: "Running Pace Calculator",
    description: "Calculate pace, time, or distance for any run, or predict a race time.",
    category: "Training",
    faqs: [
      {
        q: "Can I predict my time for a different race distance?",
        a: "Yes — enter a recent race result and target distance, and it uses a standard race-time prediction formula to estimate your time at the new distance.",
      },
      {
        q: "Does this account for course terrain or weather?",
        a: "No — predictions assume similar conditions to your reference performance. Hills, heat, and altitude will shift actual results.",
      },
      {
        q: "What units does it support?",
        a: "Both miles and kilometers, with pace shown per mile and per kilometer.",
      },
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
