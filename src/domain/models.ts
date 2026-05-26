export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";
export type FoodStatus = "accepted" | "trying" | "retryLater";
export type PrepDay = "Saturday" | "Sunday" | "Monday";

export type Ingredient = {
  id: string;
  name: string;
  amount?: string;
  category: "produce" | "dairy" | "protein" | "pantry" | "frozen" | "bakery";
};

export type Meal = {
  id: string;
  name: string;
  slot: MealSlot;
  batchYield: string;
  prepMinutes: number;
  freezerNotes: string;
  reheatingNotes: string;
  textureNote: string;
  tags: string[];
  ingredients: Ingredient[];
  servingTip: string;
};

export type PlannedDay = {
  day: string;
  meals: Record<MealSlot, Meal>;
};

export type MealPlan = {
  days: PlannedDay[];
};

export type GroceryItem = {
  id: string;
  name: string;
  category: Ingredient["category"];
  mealCount: number;
  mealNames: string[];
};

export type AppPreferences = {
  hasCompletedOnboarding: boolean;
  prepDay: PrepDay;
  favoriteMealIds: string[];
  foodStatuses: Record<string, FoodStatus>;
  groceryCheckedIds: string[];
};

export type PersistedAppState = {
  preferences: AppPreferences;
  planSeed: number;
};

export type RootStackParamList = {
  Onboarding: undefined;
  WeeklyPlan: undefined;
  MealLibrary: undefined;
  MealDetail: { mealId: string };
  GroceryList: undefined;
  PrepDay: undefined;
  SettingsPrivacy: undefined;
};
