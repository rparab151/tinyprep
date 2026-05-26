import type { Meal } from "../domain/models";

export const mealLibrary: Meal[] = [
  {
    id: "banana-oat-pancake-bites",
    name: "Banana Oat Pancake Bites",
    slot: "breakfast",
    batchYield: "18 mini bites",
    prepMinutes: 18,
    freezerNotes: "Freeze flat, then store up to 1 month.",
    reheatingNotes: "Microwave 20-30 seconds, cool, and check temperature.",
    textureNote: "Soft finger food. Cut to age-appropriate size.",
    tags: ["freezer", "soft", "vegetarian"],
    ingredients: [
      { id: "banana", name: "Bananas", category: "produce" },
      { id: "rolled-oats", name: "Rolled oats", category: "pantry" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "cinnamon", name: "Cinnamon", category: "pantry" },
      { id: "berries", name: "Berries", category: "produce" }
    ],
    servingTip: "Pack with yogurt or berries for a familiar side."
  },
  {
    id: "dal-rice-toddler-cups",
    name: "Dal Rice Toddler Cups",
    slot: "dinner",
    batchYield: "5 small cups",
    prepMinutes: 32,
    freezerNotes: "Fridge 3 days or freeze up to 1 month.",
    reheatingNotes: "Add water, microwave covered, stir well, and cool.",
    textureNote: "Keep loose and mash any firm vegetable pieces.",
    tags: ["freezer", "soft", "budget"],
    ingredients: [
      { id: "moong-dal", name: "Moong dal", category: "pantry" },
      { id: "rice", name: "Rice", category: "pantry" },
      { id: "ghee", name: "Ghee", category: "dairy" },
      { id: "carrot", name: "Carrots", category: "produce" },
      { id: "cumin", name: "Cumin", category: "pantry" }
    ],
    servingTip: "Offer beside a favorite fruit or yogurt when introducing."
  },
  {
    id: "mini-veggie-quesadilla-strips",
    name: "Mini Veggie Quesadilla Strips",
    slot: "lunch",
    batchYield: "6 wedges",
    prepMinutes: 15,
    freezerNotes: "Fridge 2 days. Best reheated from chilled.",
    reheatingNotes: "Toast 2-3 minutes or serve room temperature.",
    textureNote: "Cut into thin strips and avoid large chewy pieces.",
    tags: ["lunchbox", "quick", "vegetarian"],
    ingredients: [
      { id: "tortillas", name: "Small tortillas", category: "bakery" },
      { id: "shredded-cheese", name: "Shredded cheese", category: "dairy" },
      { id: "bell-pepper", name: "Bell pepper", category: "produce" },
      { id: "corn", name: "Corn", category: "frozen" },
      { id: "avocado", name: "Avocado", category: "produce" }
    ],
    servingTip: "Serve avocado separately if mixed textures are tricky."
  },
  {
    id: "soft-egg-veggie-muffins",
    name: "Soft Egg & Veggie Muffins",
    slot: "breakfast",
    batchYield: "12 mini muffins",
    prepMinutes: 24,
    freezerNotes: "Fridge 3 days or freeze up to 1 month.",
    reheatingNotes: "Microwave 15-20 seconds, then cool fully.",
    textureNote: "Soft and moist. Break apart before serving younger toddlers.",
    tags: ["freezer", "protein", "nut-free"],
    ingredients: [
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "spinach", name: "Spinach", category: "produce" },
      { id: "shredded-cheese", name: "Shredded cheese", category: "dairy" },
      { id: "milk", name: "Milk", category: "dairy" },
      { id: "muffin-liners", name: "Muffin liners", category: "pantry" }
    ],
    servingTip: "Call them egg cups and start with a small piece."
  },
  {
    id: "turkey-meatball-stars",
    name: "Turkey Meatball Stars",
    slot: "dinner",
    batchYield: "20 mini meatballs",
    prepMinutes: 28,
    freezerNotes: "Freeze cooked meatballs up to 2 months.",
    reheatingNotes: "Simmer in sauce or microwave covered until hot, then cool.",
    textureNote: "Use small soft pieces and check for firm edges.",
    tags: ["freezer", "protein", "family"],
    ingredients: [
      { id: "ground-turkey", name: "Ground turkey", category: "protein" },
      { id: "breadcrumbs", name: "Breadcrumbs", category: "pantry" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "marinara", name: "Marinara sauce", category: "pantry" },
      { id: "pasta-stars", name: "Pasta stars", category: "pantry" }
    ],
    servingTip: "Keep sauce on the side first if mixed textures cause rejection."
  },
  {
    id: "apple-yogurt-snack-cups",
    name: "Apple Yogurt Snack Cups",
    slot: "snack",
    batchYield: "3 snack cups",
    prepMinutes: 8,
    freezerNotes: "Fridge 2 days. Do not freeze assembled cups.",
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
  },
  {
    id: "salmon-sweet-potato-patties",
    name: "Salmon Sweet Potato Patties",
    slot: "dinner",
    batchYield: "10 small patties",
    prepMinutes: 25,
    freezerNotes: "Freeze in a single layer up to 1 month.",
    reheatingNotes: "Warm in a pan or air fryer, then cool and flake apart.",
    textureNote: "Check carefully for bones and firm browned edges.",
    tags: ["freezer", "protein", "retry"],
    ingredients: [
      { id: "salmon", name: "Salmon", category: "protein" },
      { id: "sweet-potato", name: "Sweet potatoes", category: "produce" },
      { id: "egg", name: "Eggs", category: "protein" },
      { id: "peas", name: "Peas", category: "frozen" },
      { id: "lemon", name: "Lemon", category: "produce" }
    ],
    servingTip: "Offer a tiny piece beside a familiar food, not as the main."
  }
];
