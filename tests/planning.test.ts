import assert from "node:assert/strict";
import test from "node:test";

import { mealLibrary } from "../src/data/meals.ts";
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
