import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppPreferences, FoodStatus, GroceryItem, Meal, MealPlan, RootStackParamList } from "../domain/models";

export type SharedScreenProps = {
  meals: Meal[];
  preferences: AppPreferences;
  weeklyPlan: MealPlan;
  groceryList: GroceryItem[];
  onToggleFavorite: (mealId: string) => void;
  onSetFoodStatus: (mealId: string, status: FoodStatus) => void;
  onPatchPreferences: (patch: Partial<AppPreferences>) => void;
  onShufflePlan: () => void;
  onToggleGroceryItem: (itemId: string) => void;
};

export type ScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
