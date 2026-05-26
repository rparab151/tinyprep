import type { GroceryItem, MealPlan } from "./models";

function normalizeIngredientId(id: string): string {
  return id.trim().toLowerCase().replace(/\s+/g, "-");
}

export function buildGroceryList(plan: MealPlan): GroceryItem[] {
  const items = new Map<string, GroceryItem>();

  for (const day of plan.days) {
    for (const meal of Object.values(day.meals)) {
      for (const ingredient of meal.ingredients) {
        const id = normalizeIngredientId(ingredient.id || ingredient.name);
        const existing = items.get(id);

        if (existing) {
          existing.mealCount += 1;
          if (!existing.mealNames.includes(meal.name)) {
            existing.mealNames.push(meal.name);
          }
        } else {
          items.set(id, {
            id,
            name: ingredient.name,
            category: ingredient.category,
            mealCount: 1,
            mealNames: [meal.name]
          });
        }
      }
    }
  }

  return [...items.values()].sort((a, b) => {
    const categorySort = a.category.localeCompare(b.category);
    return categorySort === 0 ? a.name.localeCompare(b.name) : categorySort;
  });
}
