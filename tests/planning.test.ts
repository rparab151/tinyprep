import assert from "node:assert/strict";
import test from "node:test";

import { cuisineOptions } from "../src/data/cuisines.ts";
import { mealLibrary, mealsForCuisine } from "../src/data/meals.ts";
import { generateWeeklyPlan } from "../src/domain/planning.ts";

test("generateWeeklyPlan creates seven days with all meal slots", () => {
  const plan = generateWeeklyPlan(mealLibrary, 1);

  assert.equal(plan.days.length, 7);
  for (const day of plan.days) {
    assert.ok(day.meals.breakfast);
    assert.ok(day.meals.lunch);
    assert.ok(day.meals.dinner);
    assert.ok(day.meals.snack);
  }
});

test("each cuisine can generate a full weekly plan using only that cuisine", () => {
  for (const cuisine of cuisineOptions) {
    const cuisineMeals = mealsForCuisine(mealLibrary, cuisine.id);
    const plan = generateWeeklyPlan(cuisineMeals, 1);

    assert.equal(plan.days.length, 7);
    for (const day of plan.days) {
      assert.equal(day.meals.breakfast.cuisine, cuisine.id);
      assert.equal(day.meals.lunch.cuisine, cuisine.id);
      assert.equal(day.meals.dinner.cuisine, cuisine.id);
      assert.equal(day.meals.snack.cuisine, cuisine.id);
    }
  }
});

test("generateWeeklyPlan changes rotation when seed changes", () => {
  const first = generateWeeklyPlan(mealLibrary, 1);
  const second = generateWeeklyPlan(mealLibrary, 2);

  const firstDay = first.days[0];
  const secondDay = second.days[0];

  if (!firstDay || !secondDay) {
    throw new Error("Expected generated plans to include a first day");
  }

  assert.notEqual(firstDay.meals.breakfast.id, secondDay.meals.breakfast.id);
});

test("meal library only includes 15-20 minute options", () => {
  for (const meal of mealLibrary) {
    assert.ok(meal.prepMinutes >= 15, `${meal.name} is under 15 minutes`);
    assert.ok(meal.prepMinutes <= 20, `${meal.name} is over 20 minutes`);
  }
});

test("each cuisine has at least six meal options", () => {
  for (const cuisine of cuisineOptions) {
    assert.ok(
      mealsForCuisine(mealLibrary, cuisine.id).length >= 6,
      `${cuisine.label} needs more meal options`
    );
  }
});

test("generated day avoids duplicate meals when enough options exist", () => {
  const plan = generateWeeklyPlan(mealsForCuisine(mealLibrary, "indian"), 1);
  const firstDay = plan.days[0];

  if (!firstDay) {
    throw new Error("Expected generated plans to include a first day");
  }

  const mealIds = Object.values(firstDay.meals).map((meal) => meal.id);
  assert.equal(new Set(mealIds).size, mealIds.length);
});
