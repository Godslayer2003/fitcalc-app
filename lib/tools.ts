export interface Faq {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  body: string[];
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: "Body Composition" | "Nutrition" | "Training" | "Wellness";
  sections: ContentSection[];
  faqs: Faq[];
}

export const tools: Tool[] = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index from height and weight.",
    category: "Body Composition",
    sections: [
      {
        heading: "What BMI actually measures",
        body: [
          "Body Mass Index is a simple ratio of weight to height, developed in the 1830s by the statistician Adolphe Quetelet as a way to describe body size across a population — not to assess any one individual's health. It's still used today because it's cheap, fast, and correlates reasonably well with body fat at a population level.",
          "The formula is weight in kilograms divided by height in meters squared (kg/m²). Because it only uses two numbers, it can't tell the difference between weight from muscle, fat, bone, or water — which is the main reason it should be read as a screening number, not a diagnosis.",
        ],
      },
      {
        heading: "How to read your result",
        body: [
          "The World Health Organization's standard adult ranges are: below 18.5 is classified underweight, 18.5–24.9 is normal weight, 25–29.9 is overweight, and 30 or above is classified obese. These bands are the same ones doctors and public health agencies use for general screening.",
          "A result outside the 'normal' band isn't an automatic health verdict — it's a prompt to look at the fuller picture: waist circumference, body composition, activity level, and family history all matter more for an individual than BMI alone.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "Take someone who is 1.75 m tall and weighs 70 kg. Height squared is 1.75 × 1.75 = 3.0625. Dividing weight by that gives 70 ÷ 3.0625 ≈ 22.9, which falls in the normal weight range (18.5–24.9).",
          "If that same person weighed 95 kg instead, the calculation becomes 95 ÷ 3.0625 ≈ 31.0 — just into the obese range — despite no change in height. This is exactly why the number needs context: two people with identical BMI can have very different amounts of muscle and fat.",
        ],
      },
      {
        heading: "Where BMI falls short",
        body: [
          "BMI systematically misclassifies muscular people — athletes and bodybuilders often score 'overweight' or 'obese' despite low body fat, because muscle is denser than fat and the formula can't distinguish tissue type.",
          "It can also underestimate risk in older adults or people with low muscle mass, who may have a 'normal' BMI while carrying a higher percentage of body fat than the number suggests. It's also not validated for children, pregnant women, or people under 5 feet tall in the same way as the general adult population. If you want a fuller picture, pair this with our [body fat calculator](/tools/body-fat-calculator), which estimates composition directly from measurements.",
        ],
      },
    ],
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
        q: "What's a healthy BMI range?",
        a: "For most adults, 18.5–24.9 is classified as normal weight by the WHO. Ranges above or below that aren't automatically unhealthy for a given individual — they're a signal to look at the broader picture.",
      },
      {
        q: "Does BMI differ for men and women?",
        a: "The standard WHO ranges are the same formula for adult men and women. Some researchers argue women's healthy body fat percentage is naturally higher than men's at the same BMI, but the calculation itself doesn't adjust by sex.",
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
    sections: [
      {
        heading: "What TDEE means",
        body: [
          "Total Daily Energy Expenditure is the number of calories your body burns in a full day — including the calories you'd burn lying in bed all day (your basal metabolic rate), plus digestion, plus every step, workout, and fidget on top of that.",
          "It's the single most useful number for anyone trying to lose, maintain, or gain weight deliberately, because it tells you the calorie intake at which your weight should, on average, stay roughly stable.",
        ],
      },
      {
        heading: "How the estimate is built",
        body: [
          "This calculator first estimates your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation — widely regarded as the most accurate simple BMR formula for the general population, outperforming the older Harris-Benedict equation in validation studies.",
          "BMR is then multiplied by an activity factor: roughly 1.2 for sedentary (little to no exercise), 1.375 for light activity (1-3 days/week), 1.55 for moderate activity (3-5 days/week), 1.725 for heavy activity (6-7 days/week), and 1.9 for very heavy physical activity or a physical job. The result is your TDEE.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "A 30-year-old man, 80 kg, 180 cm tall, with moderate activity: Mifflin-St Jeor gives a BMR of roughly (10 × 80) + (6.25 × 180) − (5 × 30) + 5 = 800 + 1125 − 150 + 5 = 1780 calories/day.",
          "Multiplying by the moderate-activity factor of 1.55 gives a TDEE of about 2760 calories/day — the estimated intake needed to maintain his current weight given his activity level.",
        ],
      },
      {
        heading: "Turning TDEE into a goal",
        body: [
          "One pound of body fat represents roughly 3,500 calories. A commonly used guideline is eating around 500 calories/day below TDEE for about 1 lb/week of fat loss, or 250 below for a slower, more sustainable ~0.5 lb/week.",
          "For gaining weight, a surplus of 250-500 calories/day above TDEE is a typical starting point for lean gains without excessive fat gain. Whichever direction you're headed, treat the number as a starting estimate — re-check it every few weeks against your actual results, since real-world metabolism varies from any formula. For splitting that target into protein, carbs, and fat, see the [macro calculator](/tools/macro-calculator).",
        ],
      },
    ],
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
      {
        q: "Why does the same activity level give different results for two people?",
        a: "BMR depends on your age, sex, height, and weight, so two people at the same activity level will still get different TDEE numbers if any of those inputs differ.",
      },
      {
        q: "How often should I recalculate?",
        a: "Recalculate whenever your weight changes by more than a few pounds, or every 4-6 weeks, since BMR shifts as your body weight and composition change.",
      },
    ],
  },
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    description: "Split your daily calories into protein, carb, and fat targets.",
    category: "Nutrition",
    sections: [
      {
        heading: "Why macros matter beyond total calories",
        body: [
          "Total calories determine whether you gain, lose, or maintain weight — but the mix of protein, carbohydrate, and fat that makes up those calories affects hunger, muscle retention, energy levels, and training performance.",
          "Protein in particular has a well-documented role in preserving lean muscle during a calorie deficit and in supporting muscle growth during a surplus, which is why it's usually prioritized first when setting a macro split.",
        ],
      },
      {
        heading: "How the split is calculated",
        body: [
          "Each gram of protein and carbohydrate provides about 4 calories, while each gram of fat provides about 9 calories — roughly double, gram for gram. This calculator takes your total daily calories (start from the [TDEE calculator](/tools/tdee-calculator) if you don't have one) and your chosen percentage split, then converts each percentage into grams using those conversion factors.",
          "For example, a 30% protein target on a 2,400 calorie diet is 720 calories from protein, divided by 4 calories/gram = 180 g of protein per day.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "Take a 2,000 calorie/day target with a 30/40/30 split (protein/carb/fat). Protein: 30% of 2,000 = 600 calories ÷ 4 = 150 g. Carbs: 40% of 2,000 = 800 calories ÷ 4 = 200 g. Fat: 30% of 2,000 = 600 calories ÷ 9 ≈ 67 g.",
          "Those three numbers — 150 g protein, 200 g carbs, 67 g fat — are the daily grams to aim for across meals, however you choose to distribute them.",
        ],
      },
      {
        heading: "Choosing a split for your goal",
        body: [
          "There's no universally 'correct' split — this calculator lets you set your own percentages. A common starting point for general fitness is 30/40/30. Strength and physique-focused eaters often push protein higher (0.7-1g per pound of bodyweight is a frequently cited target) and adjust carbs and fat around training demands.",
          "Endurance athletes often run higher carbohydrate percentages to fuel long training sessions. Whatever split you choose, it only accounts for the three macronutrients by weight — it doesn't track fiber, sugar, sodium, or micronutrients, which still matter for overall diet quality.",
        ],
      },
    ],
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
      {
        q: "Where do I get my total daily calorie number?",
        a: "Use the TDEE & Calorie Calculator to estimate your maintenance calories first, then adjust up or down for your goal before splitting into macros here.",
      },
      {
        q: "Why is protein usually prioritized in a macro split?",
        a: "Protein helps preserve lean muscle during a calorie deficit and supports muscle growth during a surplus, so most approaches set a protein target first and split the remaining calories between carbs and fat.",
      },
    ],
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    description: "Estimate body fat percentage using the US Navy tape-measure method.",
    category: "Body Composition",
    sections: [
      {
        heading: "How the Navy method works",
        body: [
          "The U.S. Navy body fat formula was developed by the Naval Health Research Center as a fast, low-cost alternative to underwater weighing for estimating body composition in large groups of recruits. It uses a handful of circumference measurements and a log-based formula rather than expensive equipment.",
          "It's not as precise as a DEXA scan, but it's far more accessible, repeatable, and free — which makes it well suited to tracking your own trend over time rather than getting a lab-grade single reading.",
        ],
      },
      {
        heading: "Taking accurate measurements",
        body: [
          "For men, you need neck and waist circumference plus height. For women, you need neck, waist, and hip circumference plus height. Use a flexible tape measure and keep it parallel to the floor.",
          "Measure the neck just below the larynx (Adam's apple), the waist at the navel, and — for women — the hips at their widest point. Keep the tape snug against the skin without compressing it, and measure at the same time of day (ideally before eating) for consistent results between check-ins.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "For a man who is 180 cm tall with a 38 cm neck and 90 cm waist, the Navy formula works out to roughly 20% body fat — landing in the 'acceptable' range on most body composition charts for adult men.",
          "The same formula for women adds the hip measurement: a woman 165 cm tall with a 33 cm neck, 75 cm waist, and 95 cm hips comes out to roughly 24% body fat, within the 'fitness' range commonly cited for adult women.",
        ],
      },
      {
        heading: "Accuracy and limitations",
        body: [
          "Studies comparing the Navy method to DEXA scans generally find it within about 3-4 percentage points for most body types — good enough to track whether you're trending up or down over weeks and months.",
          "It tends to be less accurate at the extremes — very lean or very heavy individuals — and doesn't account for individual differences in fat distribution. For a quick companion number that only needs height and weight, try the [BMI calculator](/tools/bmi-calculator); for the most accurate reading, a DEXA scan or hydrostatic weighing at a lab remains the gold standard.",
        ],
      },
    ],
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
      {
        q: "Why does the formula ask for different measurements for men and women?",
        a: "Men and women tend to store fat differently, so the Navy method uses hip circumference as an additional factor for women to improve the estimate's accuracy.",
      },
      {
        q: "How often should I re-measure?",
        a: "Every 2-4 weeks is usually enough to see a meaningful trend — body fat percentage doesn't shift much day to day, and measuring too often mostly captures measurement noise rather than real change.",
      },
    ],
  },
  {
    slug: "one-rep-max-calculator",
    name: "One-Rep Max Calculator",
    description: "Estimate your one-rep max from any weight and rep count.",
    category: "Training",
    sections: [
      {
        heading: "What a one-rep max is",
        body: [
          "Your one-rep max (1RM) is the heaviest weight you can lift for a single complete repetition of a given exercise with good form. It's a standard reference point in strength training for programming intensity, tracking progress, and comparing lifts.",
          "Testing a true 1RM directly is time-consuming and carries injury risk, especially without a spotter — which is why estimating it from a lighter, higher-rep set is the more common approach for most lifters.",
        ],
      },
      {
        heading: "The Epley formula explained",
        body: [
          "This calculator uses the Epley formula: 1RM = weight × (1 + reps ÷ 30). It's one of the most widely used and validated estimation formulas in strength training, alongside alternatives like the Brzycki formula.",
          "The logic is straightforward: the more reps you can do at a given weight, the further that weight is from your true max, and the formula scales the gap accordingly.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "If you bench press 100 kg for 5 reps, the estimate is 100 × (1 + 5 ÷ 30) = 100 × 1.1667 ≈ 117 kg estimated 1RM.",
          "The same set at 8 reps instead of 5 would estimate higher — 100 × (1 + 8 ÷ 30) ≈ 127 kg — because more reps at the same weight implies more strength in reserve relative to a single max effort.",
        ],
      },
      {
        heading: "Using your 1RM for training",
        body: [
          "Once you have an estimated 1RM, training programs typically prescribe work sets as a percentage of it: roughly 60-70% for endurance/hypertrophy-focused sets of 8-12+ reps, 70-85% for strength-hypertrophy work in the 6-8 rep range, and 85%+ for low-rep, near-maximal strength work.",
          "Accuracy holds up best for sets in the 1-10 rep range; estimates from very high-rep sets (15+) are less reliable. And remember this is still an estimate — true 1RM also depends on technique, fatigue, and readiness on the day, so beginners are generally better off estimating from a comfortable working set rather than attempting a true maximal lift without a coach or spotter.",
        ],
      },
    ],
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
      {
        q: "What percentage of my 1RM should I train with?",
        a: "It depends on your goal: roughly 60-70% for higher-rep endurance/hypertrophy work, 70-85% for strength-hypertrophy in the 6-8 rep range, and 85%+ for low-rep maximal strength work.",
      },
      {
        q: "Does this work for any exercise?",
        a: "The formula is most reliable for compound barbell lifts like the squat, bench press, and deadlift, where technique is consistent across a set. It's less predictable for machine or isolation exercises.",
      },
    ],
  },
  {
    slug: "heart-rate-zone-calculator",
    name: "Heart Rate Zone Calculator",
    description: "Find your target heart rate training zones.",
    category: "Training",
    sections: [
      {
        heading: "Why heart rate zones matter",
        body: [
          "Training at a deliberate intensity — rather than just 'going hard' every session — is one of the most consistent findings in endurance training research. Heart rate zones translate abstract effort levels into a number you can watch in real time, whether on a chest strap, watch, or by taking your pulse.",
          "Different zones stress different systems: easy zones build aerobic base and aid recovery between hard sessions, while higher zones build the top end of your performance.",
        ],
      },
      {
        heading: "The Karvonen formula",
        body: [
          "This calculator uses the Karvonen formula, which factors in your resting heart rate for a more personalized result than simply using age alone: target HR = ((max HR − resting HR) × intensity%) + resting HR.",
          "Max heart rate is estimated using the common '220 minus age' formula. It's a population average rather than a measured value, so if you know your actual max heart rate from a lab test or max-effort event, using that will give a more personalized result.",
        ],
      },
      {
        heading: "The five zones explained",
        body: [
          "Zone 1 (50-60% intensity): very light effort, active recovery and warm-ups. Zone 2 (60-70%): builds aerobic base, the pace you can hold while still talking in full sentences. Zone 3 (70-80%): moderate, 'tempo' effort that builds endurance.",
          "Zone 4 (80-90%): hard effort, improves your lactate threshold and race-pace ability. Zone 5 (90-100%): maximal effort, short high-intensity intervals that build top-end speed and power.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "A 35-year-old with a resting heart rate of 60 bpm has an estimated max HR of 220 − 35 = 185 bpm. For a Zone 2 session at 65% intensity: ((185 − 60) × 0.65) + 60 = (125 × 0.65) + 60 ≈ 141 bpm target.",
          "For a harder Zone 4 session at 85% intensity, the same person's target becomes ((185 − 60) × 0.85) + 60 ≈ 166 bpm. Pairing this with a recent race effort can also help predict pacing — see the [running pace calculator](/tools/running-pace-calculator).",
        ],
      },
    ],
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
      {
        q: "How do I find my actual resting heart rate?",
        a: "Check your pulse first thing in the morning before getting out of bed, ideally averaged over a few days — most fitness trackers and watches also measure this automatically overnight.",
      },
      {
        q: "Why use Karvonen instead of just a percentage of max heart rate?",
        a: "The simple '% of max HR' method ignores your resting heart rate entirely, which can be quite different between a very fit and a sedentary person of the same age — Karvonen adjusts for that using your actual resting rate.",
      },
    ],
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    description: "Get a general daily water intake guideline based on your weight.",
    category: "Wellness",
    sections: [
      {
        heading: "How much water do you actually need",
        body: [
          "Water needs vary by body size, activity level, climate, and diet — there's no single number that's right for everyone, despite the popular '8 glasses a day' rule of thumb. Larger bodies and more active people generally need more fluid to replace what's lost through sweat and normal bodily function.",
          "This calculator gives a weight-based starting estimate rather than a fixed number, so it scales with you rather than applying the same target to everyone.",
        ],
      },
      {
        heading: "The formula behind this calculator",
        body: [
          "It uses a commonly cited guideline of roughly 30-35 ml of water per kilogram of body weight per day, then adds extra fluid for time spent exercising to account for sweat losses.",
          "This total includes water from all beverages, not just plain water — and roughly 20% of daily fluid intake typically comes from food, especially fruits, vegetables, and soups.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "A 70 kg person with no exercise that day: 70 × 32.5 ml (the midpoint of the 30-35 ml/kg range) ≈ 2,275 ml, or about 2.3 liters (roughly 9-10 cups).",
          "If that same person does 45 minutes of exercise, the calculator adds extra fluid to cover sweat losses during activity — pushing the daily target higher, typically by several hundred milliliters depending on intensity and duration.",
        ],
      },
      {
        heading: "Signs you need more — or less",
        body: [
          "Thirst, dark yellow urine, headaches, and fatigue can all be signs of under-hydration, though they're not exclusively caused by low fluid intake. Pale yellow urine is a commonly used rough indicator of adequate hydration.",
          "This is a general starting guideline, not a strict medical requirement — hot climates, illness, pregnancy, and certain medical conditions can all shift real needs meaningfully higher or lower, so check with a healthcare professional if you have a specific medical concern about fluid intake.",
        ],
      },
    ],
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
      {
        q: "Does coffee or tea count toward my daily total?",
        a: "Yes — despite the old myth that caffeine causes net fluid loss, research shows moderate caffeinated beverages still contribute positively to daily hydration.",
      },
      {
        q: "How can I tell if I'm drinking enough?",
        a: "Pale yellow urine and infrequent thirst are commonly used rough indicators of adequate hydration for most healthy adults, though they're not a substitute for medical advice if you have specific health concerns.",
      },
    ],
  },
  {
    slug: "running-pace-calculator",
    name: "Running Pace Calculator",
    description: "Calculate pace, time, or distance for any run, or predict a race time.",
    category: "Training",
    sections: [
      {
        heading: "Pace, time, and distance — how they relate",
        body: [
          "Pace, time, and distance are three sides of the same equation: pace = time ÷ distance. Knowing any two lets you solve for the third, which is why this calculator can go in whichever direction is useful — figuring out your finishing time for a target pace, or your pace given a finishing time goal.",
          "Runners typically think in pace per mile or per kilometer, so this calculator converts and displays both, since training plans and race markers don't always use the same unit.",
        ],
      },
      {
        heading: "Race time prediction",
        body: [
          "To predict a time at a new distance from a recent result, this calculator uses a standard race-time prediction formula (in the style of the widely used Riegel formula): T2 = T1 × (D2 ÷ D1)^1.06.",
          "The exponent slightly above 1 reflects that pace naturally slows over longer distances due to fatigue and pacing strategy — so predictions aren't a simple straight-line scale-up from a shorter race.",
        ],
      },
      {
        heading: "Worked example",
        body: [
          "Say you recently ran a 5K (5 km) in 25 minutes and want to predict your 10K (10 km) time. Using the formula: T2 = 25 × (10 ÷ 5)^1.06 ≈ 25 × 2.085 ≈ 52.1 minutes.",
          "Notice that's a bit more than double your 5K time (which would be exactly 50 minutes at the same pace) — the extra 2 minutes reflects the realistic slowdown over the longer distance.",
        ],
      },
      {
        heading: "Using splits to train smarter",
        body: [
          "Predictions assume broadly similar conditions to your reference run — significant hills, heat, humidity, or altitude at the new race will shift your actual result away from the prediction.",
          "Even so, a predicted goal pace is genuinely useful for structuring workouts: even splits (running each mile or kilometer at roughly the same pace) tend to produce better race outcomes than starting too fast and fading, so use the predicted pace as a pacing target in training long before race day. Pairing your training pace with the [heart rate zone calculator](/tools/heart-rate-zone-calculator) can help you keep easy runs genuinely easy.",
        ],
      },
    ],
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
      {
        q: "Why isn't my predicted 10K time just double my 5K time?",
        a: "Race time predictions use an exponent slightly above 1 (the Riegel-style formula) because pace naturally slows over longer distances — a straight-line double underestimates a realistic longer-distance time.",
      },
      {
        q: "How should I use a predicted pace in training?",
        a: "Use it as a pacing target for even splits — running each segment at a consistent pace rather than starting fast and fading tends to produce better race results than uneven pacing.",
      },
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
