import type { Ingredient, Meal } from "./models";

const amountByIngredientId: Record<string, string> = {
  avocado: "1/2 ripe",
  banana: "1 small",
  bananas: "1 small",
  berries: "1/3 cup",
  breadcrumbs: "1/4 cup",
  broccoli: "1 cup finely chopped",
  cardamom: "tiny pinch",
  carrot: "1/2 cup grated",
  carrots: "1/2 cup grated",
  cheese: "1/3 cup shredded",
  chickpeas: "1/2 cup rinsed",
  cinnamon: "pinch",
  corn: "1/3 cup",
  couscous: "1/2 cup cooked",
  cucumber: "1/4 cup finely chopped",
  cumin: "pinch",
  "dumpling-wrappers": "4 wrappers",
  edamame: "1/3 cup shelled",
  egg: "1 large",
  "flour-tortillas": "2 small",
  ghee: "1 tsp",
  granola: "2 tbsp soft",
  "greek-yogurt": "1/2 cup",
  "ground-chicken": "1/2 cup cooked",
  "ground-turkey": "1/2 cup",
  hummus: "1/3 cup",
  idli: "3 mini",
  lentils: "1/2 cup cooked",
  "low-sodium-broth": "1/2 cup",
  mango: "1/2 cup diced",
  milk: "1/4 cup",
  miso: "1/4 tsp",
  "moong-dal": "1/4 cup",
  mushrooms: "1/3 cup minced",
  "napa-cabbage": "1/2 cup shredded",
  noodles: "1/2 cup cooked",
  nori: "1 small sheet",
  "olive-oil": "1 tsp",
  orzo: "1/2 cup cooked",
  paneer: "1/3 cup grated",
  parsley: "1 tbsp minced",
  "pasta-stars": "1/2 cup cooked",
  peas: "1/3 cup",
  pita: "1 small",
  potato: "1/2 cup diced",
  pumpkin: "1/2 cup cooked",
  "ragi-flour": "1/3 cup",
  rice: "1/2 cup cooked",
  "rolled-oats": "1/4 cup",
  salmon: "1/2 cup cooked",
  "sesame-oil": "1/4 tsp",
  "sesame-paste": "1 tsp",
  "shredded-cheese": "1/3 cup",
  "shredded-chicken": "1/2 cup",
  "silken-tofu": "1/2 cup",
  "small-pasta": "1/2 cup cooked",
  soba: "1/2 cup cooked",
  "soft-bread": "1 slice",
  spinach: "1/2 cup chopped",
  "sunflower-butter": "1 tbsp",
  "sweet-potato": "1/2 cup cooked",
  tahini: "1 tsp",
  tofu: "1/2 cup diced",
  "tomato-sauce": "1/4 cup",
  tomatoes: "1/2 cup chopped",
  tortillas: "2 small",
  turmeric: "pinch",
  udon: "1/2 cup cooked",
  "white-beans": "1/2 cup rinsed",
  "whole-wheat-flour": "1/2 cup",
  yogurt: "1/2 cup",
  zucchini: "1/2 cup grated"
};

const ingredientNameById: Record<string, string> = {
  banana: "banana",
  idli: "idli",
  "whole-wheat-flour": "whole wheat flour"
};

export function ingredientLine(ingredient: Ingredient): string {
  const amount = ingredient.amount ?? amountByIngredientId[ingredient.id];
  const name = ingredientNameById[ingredient.id] ?? ingredient.name.toLowerCase();
  return amount ? `${amount} ${name}` : ingredient.name;
}

export function recipeStepsForMeal(meal: Meal): string[] {
  if (meal.recipeSteps) return meal.recipeSteps;

  const [first, second, third] = meal.ingredients;
  const firstName = first ? first.name.toLowerCase() : "main ingredients";
  const secondName = second ? second.name.toLowerCase() : "remaining ingredients";
  const thirdName = third ? third.name.toLowerCase() : "the final ingredients";
  const measuredIngredients = meal.ingredients.map(ingredientLine).join(", ");

  if (meal.tags.includes("no-cook")) {
    return [
      `Measure: ${measuredIngredients}.`,
      `Mash or blend the ${firstName} with the ${secondName} until mostly smooth.`,
      third ? `Fold in the ${thirdName}, then rest 5 minutes so dry ingredients soften.` : "Rest 5 minutes so the texture softens.",
      "Stir once more, adding 1-2 tsp water, milk, or yogurt if it feels too thick.",
      "Portion into small bowls."
    ];
  }

  if (meal.tags.includes("finger-food")) {
    return [
      `Measure: ${measuredIngredients}.`,
      "Mix the base ingredients into a soft batter or mash.",
      third ? `Fold in the ${thirdName} and remaining ingredients.` : "Fold in the remaining ingredients.",
      "Cook as small spoonfuls, strips, or patties over medium-low heat until set and tender.",
      "Rest 2 minutes so the pieces hold together before moving."
    ];
  }

  if (meal.tags.includes("soft") || meal.slot === "lunch" || meal.slot === "dinner") {
    return [
      `Measure: ${measuredIngredients}.`,
      "Chop, grate, mash, or shred ingredients before cooking so they soften quickly.",
      meal.reheatingNotes,
      "Adjust with 1-3 tbsp water, milk, yogurt, or broth until the mixture is moist.",
      "Cook 1-2 minutes longer if watery, or loosen with 1 tbsp liquid if dry."
    ];
  }

  return [
    `Measure: ${measuredIngredients}.`,
    `Prep the ${firstName}, ${secondName}, and ${thirdName}.`,
    "Cook over medium-low heat until warm and tender.",
    meal.reheatingNotes,
    "Adjust moisture and cook 1-2 minutes longer if needed."
  ];
}
