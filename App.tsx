import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { cuisineLabels } from "./src/data/cuisines";
import { mealLibrary } from "./src/data/meals";
import { mealsForCuisine } from "./src/data/meals";
import { buildGroceryList } from "./src/domain/grocery";
import type { AppPreferences, Cuisine, FoodStatus, MealPlan, RootStackParamList } from "./src/domain/models";
import { generateWeeklyPlan } from "./src/domain/planning";
import { GroceryListScreen } from "./src/screens/GroceryListScreen";
import { MealDetailScreen } from "./src/screens/MealDetailScreen";
import { MealLibraryScreen } from "./src/screens/MealLibraryScreen";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { PrepDayScreen } from "./src/screens/PrepDayScreen";
import { SettingsPrivacyScreen } from "./src/screens/SettingsPrivacyScreen";
import { WeeklyPlanScreen } from "./src/screens/WeeklyPlanScreen";
import { loadAppState, saveAppState } from "./src/storage/appStorage";
import { colors } from "./src/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const initialPreferences: AppPreferences = {
  hasCompletedOnboarding: false,
  cuisine: "indian",
  prepDay: "Sunday",
  favoriteMealIds: ["indian-moong-dal-khichdi-cups", "indian-paneer-veggie-paratha-bites"],
  foodStatuses: {
    "indian-moong-dal-khichdi-cups": "accepted",
    "indian-ragi-banana-dosa-strips": "trying",
    "indian-paneer-veggie-paratha-bites": "accepted"
  },
  groceryCheckedIds: []
};

export default function App() {
  const [preferences, setPreferences] = useState<AppPreferences>(initialPreferences);
  const [planSeed, setPlanSeed] = useState(3);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadAppState().then((state) => {
      if (state) {
        setPreferences({ ...initialPreferences, ...state.preferences });
        setPlanSeed(state.planSeed);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveAppState({ preferences, planSeed });
    }
  }, [hydrated, preferences, planSeed]);

  const selectedMeals = useMemo(
    () => mealsForCuisine(mealLibrary, preferences.cuisine),
    [preferences.cuisine]
  );
  const weeklyPlan: MealPlan = useMemo(() => generateWeeklyPlan(selectedMeals, planSeed), [selectedMeals, planSeed]);
  const groceryList = useMemo(
    () => buildGroceryList({ days: weeklyPlan.days.slice(0, 1) }),
    [weeklyPlan]
  );

  function patchPreferences(patch: Partial<AppPreferences>) {
    setPreferences((current) => ({ ...current, ...patch }));
  }

  function setCuisine(cuisine: Cuisine) {
    setPreferences((current) => ({
      ...current,
      cuisine,
      favoriteMealIds: current.favoriteMealIds.filter((mealId) =>
        mealLibrary.some((meal) => meal.id === mealId && meal.cuisine === cuisine)
      ),
      groceryCheckedIds: []
    }));
    setPlanSeed((seed) => seed + 1);
  }

  function toggleFavorite(mealId: string) {
    setPreferences((current) => {
      const exists = current.favoriteMealIds.includes(mealId);
      return {
        ...current,
        favoriteMealIds: exists
          ? current.favoriteMealIds.filter((id) => id !== mealId)
          : [...current.favoriteMealIds, mealId]
      };
    });
  }

  function setFoodStatus(mealId: string, status: FoodStatus) {
    setPreferences((current) => ({
      ...current,
      foodStatuses: {
        ...current.foodStatuses,
        [mealId]: status
      }
    }));
  }

  function toggleGroceryItem(itemId: string) {
    setPreferences((current) => {
      const checked = current.groceryCheckedIds.includes(itemId);
      return {
        ...current,
        groceryCheckedIds: checked
          ? current.groceryCheckedIds.filter((id) => id !== itemId)
          : [...current.groceryCheckedIds, itemId]
      };
    });
  }

  const sharedProps = {
    meals: selectedMeals,
    cuisineLabel: cuisineLabels[preferences.cuisine],
    preferences,
    weeklyPlan,
    groceryList,
    onToggleFavorite: toggleFavorite,
    onSetFoodStatus: setFoodStatus,
    onPatchPreferences: patchPreferences,
    onSetCuisine: setCuisine,
    onShufflePlan: () => setPlanSeed((seed) => seed + 1),
    onToggleGroceryItem: toggleGroceryItem
  };

  if (!hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName={preferences.hasCompletedOnboarding ? "WeeklyPlan" : "Onboarding"}
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTitleStyle: { color: colors.ink, fontWeight: "800" },
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="Onboarding" options={{ title: "TinyPrep" }}>
          {(props) => (
            <OnboardingScreen
              {...props}
              selectedCuisine={preferences.cuisine}
              onSelectCuisine={setCuisine}
              onComplete={() => patchPreferences({ hasCompletedOnboarding: true })}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="WeeklyPlan" options={{ title: "Today" }}>
          {(props) => <WeeklyPlanScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="MealLibrary" options={{ title: "Meal Library" }}>
          {(props) => <MealLibraryScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="MealDetail" options={{ title: "Meal Detail" }}>
          {(props) => <MealDetailScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="GroceryList" options={{ title: "Grocery List" }}>
          {(props) => <GroceryListScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="PrepDay" options={{ title: "Cook" }}>
          {(props) => <PrepDayScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="SettingsPrivacy" options={{ title: "Settings & Privacy" }}>
          {(props) => <SettingsPrivacyScreen {...props} {...sharedProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background
  }
});
