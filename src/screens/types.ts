import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppPreferences, Cuisine, GroceryItem, Meal, MealPlan, RootStackParamList } from "../domain/models";

export type SharedScreenProps = {
  meals: Meal[];
  cuisineLabel: string;
  preferences: AppPreferences;
  weeklyPlan: MealPlan;
  groceryList: GroceryItem[];
  onPatchPreferences: (patch: Partial<AppPreferences>) => void;
  onSetCuisine: (cuisine: Cuisine) => void;
  onShufflePlan: () => void;
  onToggleGroceryItem: (itemId: string) => void;
};

export type ScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
