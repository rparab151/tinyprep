import type { Cuisine, Meal } from "../domain/models";

const commonTags = ["toddler", "mild"];

function meal(mealData: Meal): Meal {
  return {
    ...mealData,
    tags: [...commonTags, mealData.cuisine, ...mealData.tags]
  };
}

export function mealsForCuisine(meals: Meal[], cuisine: Cuisine): Meal[] {
  return meals.filter((item) => item.cuisine === cuisine);
}

export const mealLibrary: Meal[] = [
  meal({
    id: "indian-ragi-banana-dosa-strips",
    cuisine: "indian",
    name: "Ragi Banana Dosa Strips",
    slot: "breakfast",
    batchYield: "8 soft strips",
    prepMinutes: 18,
    freezerNotes: "Refrigerate leftovers up to 2 days and warm gently with a splash of water or milk.",
    reheatingNotes: "Warm on a pan with a few drops of water, then cool.",
    textureNote: "Soft strips. Cut narrow for self-feeding.",
    tags: ["finger-food", "iron", "vegetarian"],
    ingredients: [
      { id: "ragi-flour", name: "Ragi flour", category: "pantry" },
      { id: "banana", name: "Bananas", category: "produce" },
      { id: "yogurt", name: "Plain yogurt", category: "dairy" },
      { id: "ghee", name: "Ghee", category: "dairy" }
    ],
    servingTip: "Keep it lightly sweet from banana, not added sugar."
  }),
  meal({
    id: "indian-moong-dal-khichdi-cups",
    cuisine: "indian",
    name: "Moong Dal Khichdi Cups",
    slot: "lunch",
    batchYield: "5 toddler cups",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Add water, microwave covered, stir well, and cool.",
    textureNote: "Loose mash with no firm vegetable chunks.",
    tags: ["quick", "soft", "vegetarian"],
    ingredients: [
      { id: "moong-dal", name: "Moong dal", category: "pantry" },
      { id: "rice", name: "Rice", category: "pantry" },
      { id: "carrot", name: "Carrots", category: "produce" },
      { id: "peas", name: "Peas", category: "frozen" },
      { id: "cumin", name: "Cumin", category: "pantry" }
    ],
    servingTip: "Serve beside yogurt if your toddler likes cooling flavors."
  }),
  meal({
    id: "indian-paneer-veggie-paratha-bites",
    cuisine: "indian",
    name: "Paneer Veggie Paratha Bites",
    slot: "dinner",
    batchYield: "10 small wedges",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Toast until warm, then cool and soften with yogurt if needed.",
    textureNote: "Small soft wedges. Avoid crisp hard edges.",
    tags: ["quick", "vegetarian", "protein"],
    ingredients: [
      { id: "whole-wheat-flour", name: "Whole wheat flour", category: "pantry" },
      { id: "paneer", name: "Paneer", category: "dairy" },
      { id: "spinach", name: "Spinach", category: "produce" },
      { id: "carrot", name: "Carrots", category: "produce" },
      { id: "ghee", name: "Ghee", category: "dairy" }
    ],
    servingTip: "Use mild filling and cut into tiny squares for easier chewing."
  }),
  meal({
    id: "indian-mango-lassi-oat-cups",
    cuisine: "indian",
    name: "Mango Lassi Oat Cups",
    slot: "snack",
    batchYield: "4 snack cups",
    prepMinutes: 15,
    freezerNotes: "Best served fresh; refrigerate components separately up to 2 days.",
    reheatingNotes: "Serve cold and discard leftovers from the bowl.",
    textureNote: "Thick spoonable texture with softened oats.",
    tags: ["no-cook", "vegetarian", "snack"],
    ingredients: [
      { id: "mango", name: "Mango", category: "produce" },
      { id: "yogurt", name: "Plain yogurt", category: "dairy" },
      { id: "rolled-oats", name: "Rolled oats", category: "pantry" },
      { id: "cardamom", name: "Cardamom", category: "pantry" }
    ],
    servingTip: "Use a tiny pinch of cardamom and keep the texture smooth."
  }),

  meal({
    id: "mexican-sweet-potato-egg-tacos",
    cuisine: "mexican",
    name: "Sweet Potato Egg Tacos",
    slot: "breakfast",
    batchYield: "6 mini tacos",
    prepMinutes: 18,
    freezerNotes: "Refrigerate leftovers up to 2 days and warm gently with a splash of water or milk.",
    reheatingNotes: "Warm filling, then cool before adding to soft tortillas.",
    textureNote: "Use soft tortillas and mashed sweet potato.",
    tags: ["vegetarian", "soft", "protein"],
    ingredients: [
      { id: "sweet-potato", name: "Sweet potatoes", category: "produce" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "corn-tortillas", name: "Corn tortillas", category: "bakery" },
      { id: "avocado", name: "Avocado", category: "produce" }
    ],
    servingTip: "Skip spicy salsa and serve avocado on the side."
  }),
  meal({
    id: "mexican-black-bean-rice-bowls",
    cuisine: "mexican",
    name: "Black Bean Rice Bowls",
    slot: "lunch",
    batchYield: "5 small bowls",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Add water, heat covered, mash beans lightly, and cool.",
    textureNote: "Mash beans and keep rice moist.",
    tags: ["quick", "vegetarian", "budget"],
    ingredients: [
      { id: "black-beans", name: "Black beans", category: "pantry" },
      { id: "rice", name: "Rice", category: "pantry" },
      { id: "corn", name: "Corn", category: "frozen" },
      { id: "zucchini", name: "Zucchini", category: "produce" },
      { id: "cheese", name: "Mild cheese", category: "dairy" }
    ],
    servingTip: "Add lime for adults after serving toddler portions."
  }),
  meal({
    id: "mexican-turkey-picadillo-scoops",
    cuisine: "mexican",
    name: "Mild Turkey Picadillo Scoops",
    slot: "dinner",
    batchYield: "5 toddler portions",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Warm covered, stir, and cool before serving.",
    textureNote: "Keep meat finely crumbled and vegetables soft.",
    tags: ["quick", "protein", "family"],
    ingredients: [
      { id: "ground-turkey", name: "Ground turkey", category: "protein" },
      { id: "potato", name: "Potatoes", category: "produce" },
      { id: "tomato-sauce", name: "Tomato sauce", category: "pantry" },
      { id: "peas", name: "Peas", category: "frozen" },
      { id: "cumin", name: "Cumin", category: "pantry" }
    ],
    servingTip: "Keep seasoning mild and serve with soft rice or tortilla pieces."
  }),
  meal({
    id: "mexican-avocado-yogurt-bean-dip",
    cuisine: "mexican",
    name: "Avocado Yogurt Bean Dip",
    slot: "snack",
    batchYield: "4 snack cups",
    prepMinutes: 15,
    freezerNotes: "Best served fresh; refrigerate components separately up to 2 days.",
    reheatingNotes: "Serve cool with soft tortilla strips.",
    textureNote: "Smooth dip with no whole beans.",
    tags: ["no-cook", "vegetarian", "snack"],
    ingredients: [
      { id: "avocado", name: "Avocado", category: "produce" },
      { id: "pinto-beans", name: "Pinto beans", category: "pantry" },
      { id: "yogurt", name: "Plain yogurt", category: "dairy" },
      { id: "tortillas", name: "Small tortillas", category: "bakery" }
    ],
    servingTip: "Offer as a spread on soft tortilla instead of chips."
  }),

  meal({
    id: "japanese-tamago-rice-fingers",
    cuisine: "japanese",
    name: "Tamago Rice Fingers",
    slot: "breakfast",
    batchYield: "8 soft fingers",
    prepMinutes: 18,
    freezerNotes: "Refrigerate leftovers up to 2 days and warm gently with a splash of water or milk.",
    reheatingNotes: "Warm briefly with a damp towel, then cool.",
    textureNote: "Soft rice fingers with thin egg strips.",
    tags: ["finger-food", "protein", "soft"],
    ingredients: [
      { id: "rice", name: "Sushi rice", category: "pantry" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "nori", name: "Nori", category: "pantry" },
      { id: "sesame-oil", name: "Sesame oil", category: "pantry" }
    ],
    servingTip: "Use very small nori pieces and avoid tight sticky clumps."
  }),
  meal({
    id: "japanese-salmon-rice-bowl",
    cuisine: "japanese",
    name: "Flaked Salmon Rice Bowl",
    slot: "lunch",
    batchYield: "4 small bowls",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Warm rice and salmon separately, flake finely, and cool.",
    textureNote: "Flake salmon carefully and check for bones.",
    tags: ["protein", "soft", "family"],
    ingredients: [
      { id: "salmon", name: "Salmon", category: "protein" },
      { id: "rice", name: "Sushi rice", category: "pantry" },
      { id: "edamame", name: "Shelled edamame", category: "frozen" },
      { id: "carrot", name: "Carrots", category: "produce" }
    ],
    servingTip: "Mash edamame for younger toddlers and skip salty sauces."
  }),
  meal({
    id: "japanese-tofu-veggie-udon",
    cuisine: "japanese",
    name: "Tofu Veggie Udon",
    slot: "dinner",
    batchYield: "4 toddler bowls",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Heat broth fully, add noodles, then cool before serving.",
    textureNote: "Cut noodles short and keep tofu cubes small.",
    tags: ["vegetarian", "soft", "warm"],
    ingredients: [
      { id: "udon", name: "Udon noodles", category: "pantry" },
      { id: "tofu", name: "Firm tofu", category: "protein" },
      { id: "mushrooms", name: "Mushrooms", category: "produce" },
      { id: "spinach", name: "Spinach", category: "produce" },
      { id: "low-sodium-broth", name: "Low-sodium broth", category: "pantry" }
    ],
    servingTip: "Use low-sodium broth and cut noodles before serving."
  }),
  meal({
    id: "japanese-sweet-potato-yogurt-mash",
    cuisine: "japanese",
    name: "Murasaki Sweet Potato Mash",
    slot: "snack",
    batchYield: "4 snack bowls",
    prepMinutes: 20,
    freezerNotes: "Best served fresh; refrigerate components separately up to 2 days.",
    reheatingNotes: "Warm with a splash of milk, stir, and cool.",
    textureNote: "Smooth mash with no dry chunks.",
    tags: ["vegetarian", "quick", "snack"],
    ingredients: [
      { id: "sweet-potato", name: "Japanese sweet potatoes", category: "produce" },
      { id: "yogurt", name: "Plain yogurt", category: "dairy" },
      { id: "milk", name: "Milk", category: "dairy" }
    ],
    servingTip: "Thin with milk or yogurt if the mash feels dense."
  }),

  meal({
    id: "chinese-pumpkin-congee-cups",
    cuisine: "chinese",
    name: "Pumpkin Congee Cups",
    slot: "breakfast",
    batchYield: "5 soft cups",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days and warm gently with a splash of water or milk.",
    reheatingNotes: "Add water, warm covered, stir until loose, and cool.",
    textureNote: "Very soft porridge texture with no firm chunks.",
    tags: ["quick", "soft", "vegetarian"],
    ingredients: [
      { id: "rice", name: "Rice", category: "pantry" },
      { id: "pumpkin", name: "Pumpkin", category: "produce" },
      { id: "ginger", name: "Ginger", category: "produce" },
      { id: "low-sodium-broth", name: "Low-sodium broth", category: "pantry" }
    ],
    servingTip: "Use only a tiny slice of ginger for aroma, then remove it before serving."
  }),
  meal({
    id: "chinese-steamed-egg-rice-bowl",
    cuisine: "chinese",
    name: "Steamed Egg Rice Bowl",
    slot: "lunch",
    batchYield: "4 small bowls",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Warm gently covered, then cool and check temperature.",
    textureNote: "Custardy egg with soft rice. Mash vegetables finely.",
    tags: ["soft", "protein", "budget"],
    ingredients: [
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "rice", name: "Rice", category: "pantry" },
      { id: "peas", name: "Peas", category: "frozen" },
      { id: "carrot", name: "Carrots", category: "produce" },
      { id: "sesame-oil", name: "Sesame oil", category: "pantry" }
    ],
    servingTip: "Keep soy sauce out of toddler portions or use only a tiny low-sodium amount."
  }),
  meal({
    id: "chinese-chicken-dumpling-bowl",
    cuisine: "chinese",
    name: "Chicken Dumpling Bowl",
    slot: "dinner",
    batchYield: "5 toddler bowls",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Warm filling with broth, stir well, and cool.",
    textureNote: "Serve deconstructed with soft wrapper strips, not chewy whole dumplings.",
    tags: ["quick", "protein", "family"],
    ingredients: [
      { id: "ground-chicken", name: "Ground chicken", category: "protein" },
      { id: "dumpling-wrappers", name: "Dumpling wrappers", category: "bakery" },
      { id: "napa-cabbage", name: "Napa cabbage", category: "produce" },
      { id: "carrot", name: "Carrots", category: "produce" },
      { id: "low-sodium-broth", name: "Low-sodium broth", category: "pantry" }
    ],
    servingTip: "Cut wrappers into soft strips and avoid round slippery dumplings for young toddlers."
  }),
  meal({
    id: "chinese-sesame-banana-tofu-cups",
    cuisine: "chinese",
    name: "Sesame Banana Tofu Cups",
    slot: "snack",
    batchYield: "4 snack cups",
    prepMinutes: 15,
    freezerNotes: "Best served fresh; refrigerate components separately up to 2 days.",
    reheatingNotes: "Serve cool and discard leftovers from the bowl.",
    textureNote: "Smooth spoonable tofu with mashed banana.",
    tags: ["no-cook", "vegetarian", "snack"],
    ingredients: [
      { id: "silken-tofu", name: "Silken tofu", category: "protein" },
      { id: "banana", name: "Bananas", category: "produce" },
      { id: "sesame-paste", name: "Sesame paste", category: "pantry" },
      { id: "cinnamon", name: "Cinnamon", category: "pantry" }
    ],
    servingTip: "Blend smooth and use sesame only after allergy comfort is established."
  }),

  meal({
    id: "american-banana-oat-pancake-bites",
    cuisine: "american",
    name: "Banana Oat Pancake Bites",
    slot: "breakfast",
    batchYield: "18 mini bites",
    prepMinutes: 18,
    freezerNotes: "Refrigerate leftovers up to 2 days and warm gently with a splash of water or milk.",
    reheatingNotes: "Microwave 20-30 seconds, cool, and check temperature.",
    textureNote: "Soft finger food. Cut to age-appropriate size.",
    tags: ["quick", "soft", "vegetarian"],
    ingredients: [
      { id: "banana", name: "Bananas", category: "produce" },
      { id: "rolled-oats", name: "Rolled oats", category: "pantry" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "cinnamon", name: "Cinnamon", category: "pantry" },
      { id: "berries", name: "Berries", category: "produce" }
    ],
    servingTip: "Pack with yogurt or berries for a familiar side."
  }),
  meal({
    id: "american-turkey-meatball-stars",
    cuisine: "american",
    name: "Turkey Meatball Stars",
    slot: "lunch",
    batchYield: "20 mini meatballs",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Simmer in sauce or microwave covered until hot, then cool.",
    textureNote: "Use small soft pieces and check for firm edges.",
    tags: ["quick", "protein", "family"],
    ingredients: [
      { id: "ground-turkey", name: "Ground turkey", category: "protein" },
      { id: "breadcrumbs", name: "Breadcrumbs", category: "pantry" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "marinara", name: "Marinara sauce", category: "pantry" },
      { id: "pasta-stars", name: "Pasta stars", category: "pantry" }
    ],
    servingTip: "Keep sauce on the side first if mixed textures cause rejection."
  }),
  meal({
    id: "american-soft-egg-veggie-muffins",
    cuisine: "american",
    name: "Soft Egg & Veggie Muffins",
    slot: "dinner",
    batchYield: "12 mini muffins",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Microwave 15-20 seconds, then cool fully.",
    textureNote: "Soft and moist. Break apart before serving younger toddlers.",
    tags: ["quick", "protein", "nut-free"],
    ingredients: [
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "spinach", name: "Spinach", category: "produce" },
      { id: "shredded-cheese", name: "Shredded cheese", category: "dairy" },
      { id: "milk", name: "Milk", category: "dairy" },
      { id: "muffin-liners", name: "Muffin liners", category: "pantry" }
    ],
    servingTip: "Call them egg cups and start with a small piece."
  }),
  meal({
    id: "american-apple-yogurt-snack-cups",
    cuisine: "american",
    name: "Apple Yogurt Snack Cups",
    slot: "snack",
    batchYield: "3 snack cups",
    prepMinutes: 15,
    freezerNotes: "Best served fresh; refrigerate components separately up to 2 days.",
    reheatingNotes: "Serve cold and discard leftovers from the bowl.",
    textureNote: "Grate or soften apple for younger toddlers.",
    tags: ["no-cook", "quick", "snack"],
    ingredients: [
      { id: "greek-yogurt", name: "Greek yogurt", category: "dairy" },
      { id: "apple", name: "Apples", category: "produce" },
      { id: "cinnamon", name: "Cinnamon", category: "pantry" },
      { id: "granola", name: "Soft granola", category: "pantry" },
      { id: "sunflower-butter", name: "Sunflower butter", category: "pantry" }
    ],
    servingTip: "Keep toppings soft and skip hard clusters."
  }),

  meal({
    id: "mediterranean-greek-yogurt-oat-bowls",
    cuisine: "mediterranean",
    name: "Greek Yogurt Oat Bowls",
    slot: "breakfast",
    batchYield: "4 bowls",
    prepMinutes: 15,
    freezerNotes: "Refrigerate leftovers up to 2 days and warm gently with a splash of water or milk.",
    reheatingNotes: "Serve cold with softened fruit.",
    textureNote: "Thick spoonable texture with soft fruit.",
    tags: ["no-cook", "vegetarian", "soft"],
    ingredients: [
      { id: "greek-yogurt", name: "Greek yogurt", category: "dairy" },
      { id: "rolled-oats", name: "Rolled oats", category: "pantry" },
      { id: "berries", name: "Berries", category: "produce" },
      { id: "olive-oil", name: "Olive oil", category: "pantry" }
    ],
    servingTip: "Use a tiny drizzle of olive oil for richness, not honey."
  }),
  meal({
    id: "mediterranean-lentil-couscous-cups",
    cuisine: "mediterranean",
    name: "Lentil Couscous Cups",
    slot: "lunch",
    batchYield: "5 small cups",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Add water or broth, warm covered, stir, and cool.",
    textureNote: "Soft lentils and fluffy couscous. Mash if needed.",
    tags: ["quick", "vegetarian", "budget"],
    ingredients: [
      { id: "lentils", name: "Red lentils", category: "pantry" },
      { id: "couscous", name: "Couscous", category: "pantry" },
      { id: "zucchini", name: "Zucchini", category: "produce" },
      { id: "carrot", name: "Carrots", category: "produce" },
      { id: "olive-oil", name: "Olive oil", category: "pantry" }
    ],
    servingTip: "Keep lemon and salt light for toddler portions."
  }),
  meal({
    id: "mediterranean-chicken-kofta-rice",
    cuisine: "mediterranean",
    name: "Mini Chicken Kofta Rice",
    slot: "dinner",
    batchYield: "16 mini kofta",
    prepMinutes: 20,
    freezerNotes: "Refrigerate leftovers up to 2 days in small containers; refresh with a little water when warming.",
    reheatingNotes: "Warm covered with a splash of broth, then cool.",
    textureNote: "Tiny tender pieces with soft rice.",
    tags: ["quick", "protein", "family"],
    ingredients: [
      { id: "ground-chicken", name: "Ground chicken", category: "protein" },
      { id: "rice", name: "Rice", category: "pantry" },
      { id: "parsley", name: "Parsley", category: "produce" },
      { id: "yogurt", name: "Plain yogurt", category: "dairy" },
      { id: "breadcrumbs", name: "Breadcrumbs", category: "pantry" }
    ],
    servingTip: "Use mild herbs and serve yogurt sauce separately."
  }),
  meal({
    id: "mediterranean-hummus-pita-soft-plate",
    cuisine: "mediterranean",
    name: "Hummus Pita Soft Plate",
    slot: "snack",
    batchYield: "4 snack plates",
    prepMinutes: 15,
    freezerNotes: "Best served fresh; refrigerate components separately up to 2 days.",
    reheatingNotes: "Serve pita soft and room temperature.",
    textureNote: "Smooth hummus with soft pita strips.",
    tags: ["no-cook", "vegetarian", "snack"],
    ingredients: [
      { id: "chickpeas", name: "Chickpeas", category: "pantry" },
      { id: "tahini", name: "Tahini", category: "pantry" },
      { id: "pita", name: "Soft pita", category: "bakery" },
      { id: "cucumber", name: "Cucumber", category: "produce" },
      { id: "olive-oil", name: "Olive oil", category: "pantry" }
    ],
    servingTip: "Spread hummus thinly on pita strips instead of serving hard dippers."
  })
];
