import assert from "node:assert/strict";
import test from "node:test";

import { buildGroceryList } from "../src/domain/grocery.ts";
import type { Meal, MealPlan } from "../src/domain/models.ts";

const baseMeal: Meal = {
  id: "meal-a",
  name: "Meal A",
  cuisine: "american",
  slot: "breakfast",
  batchYield: "1",
  prepMinutes: 10,
  freezerNotes: "Freeze safely.",
  reheatingNotes: "Reheat safely.",
  textureNote: "Soft.",
  tags: [],
  servingTip: "Serve cool.",
  ingredients: [
    { id: "egg", name: "Eggs", category: "protein" },
    { id: "banana", name: "Bananas", category: "produce" }
  ]
};

const secondMeal: Meal = {
  ...baseMeal,
  id: "meal-b",
  name: "Meal B",
  slot: "dinner",
  ingredients: [
    { id: "egg", name: "Eggs", category: "protein" },
    { id: "rice", name: "Rice", category: "pantry" }
  ]
};

test("buildGroceryList dedupes ingredients and tracks meal usage", () => {
  const plan: MealPlan = {
    days: [
      {
        day: "Mon",
        meals: {
          breakfast: baseMeal,
          lunch: baseMeal,
          dinner: secondMeal,
          snack: baseMeal
        }
      }
    ]
  };

  const groceries = buildGroceryList(plan);
  const eggs = groceries.find((item) => item.id === "egg");

  assert.equal(groceries.length, 3);
  assert.equal(eggs?.mealCount, 4);
  assert.deepEqual(eggs?.mealNames.sort(), ["Meal A", "Meal B"]);
});
