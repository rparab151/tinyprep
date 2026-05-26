import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { mealLibrary } from "./src/data/meals";
import { buildGroceryList } from "./src/domain/grocery";
import type { AppPreferences, FoodStatus, MealPlan, RootStackParamList } from "./src/domain/models";
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
  prepDay: "Sunday",
  favoriteMealIds: ["banana-oat-pancake-bites", "dal-rice-toddler-cups"],
  foodStatuses: {
    "banana-oat-pancake-bites": "accepted",
    "dal-rice-toddler-cups": "accepted",
    "soft-egg-veggie-muffins": "trying",
    "salmon-sweet-potato-patties": "retryLater"
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

  const weeklyPlan: MealPlan = useMemo(() => generateWeeklyPlan(mealLibrary, planSeed), [planSeed]);
  const groceryList = useMemo(() => buildGroceryList(weeklyPlan), [weeklyPlan]);

  function patchPreferences(patch: Partial<AppPreferences>) {
    setPreferences((current) => ({ ...current, ...patch }));
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
    meals: mealLibrary,
    preferences,
    weeklyPlan,
    groceryList,
    onToggleFavorite: toggleFavorite,
    onSetFoodStatus: setFoodStatus,
    onPatchPreferences: patchPreferences,
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
              onComplete={() => patchPreferences({ hasCompletedOnboarding: true })}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="WeeklyPlan" options={{ title: "Weekly Plan" }}>
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
        <Stack.Screen name="PrepDay" options={{ title: "Prep Day" }}>
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
