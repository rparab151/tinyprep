import type { Meal, MealPlan, MealSlot } from "./models";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots: MealSlot[] = ["breakfast", "lunch", "dinner", "snack"];

function rotate<T>(items: T[], seed: number): T[] {
  if (items.length === 0) return [];
  const offset = Math.abs(seed) % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

function mealsForSlot(meals: Meal[], slot: MealSlot): Meal[] {
  const relatedSlots: Record<MealSlot, MealSlot[]> = {
    breakfast: ["breakfast", "snack"],
    lunch: ["lunch", "dinner"],
    dinner: ["dinner", "lunch"],
    snack: ["snack", "breakfast"]
  };
  const direct = meals.filter((meal) => relatedSlots[slot].includes(meal.slot));
  return direct.length > 0 ? direct : meals;
}

export function generateWeeklyPlan(meals: Meal[], seed = 0): MealPlan {
  if (meals.length === 0) {
    throw new Error("generateWeeklyPlan requires at least one meal");
  }

  return {
    days: weekDays.map((day, dayIndex) => {
      const usedMealIds = new Set<string>();
      const dayMeals = slots.reduce<Record<MealSlot, Meal>>((acc, slot, slotIndex) => {
        const pool = rotate(mealsForSlot(meals, slot), seed + dayIndex + slotIndex);
        const selected = pool.find((meal) => !usedMealIds.has(meal.id)) ?? pool[0];
        if (!selected) {
          throw new Error(`No meal available for ${slot}`);
        }
        usedMealIds.add(selected.id);
        acc[slot] = selected;
        return acc;
      }, {} as Record<MealSlot, Meal>);

      return { day, meals: dayMeals };
    })
  };
}
