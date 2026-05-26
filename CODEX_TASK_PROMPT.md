# Codex Task: Convert TinyPrep to Production Expo App

You are working in the `rparab151/tinyprep` repository.

## Objective

Convert the current TinyPrep Vite/React prototype into a production-worthy Expo React Native app for both Apple App Store and Google Play Store.

## App concept

TinyPrep is a free toddler meal-prep app for parents. It should help users:

- Build a weekly toddler meal plan
- Plan prep-day batch cooking
- Track accepted, trying, and retry-later foods
- Generate a grocery list
- Save favorites
- Store reheating and freezer notes
- Use the app offline without account signup

## Required implementation

1. Create an Expo React Native app structure.
2. Use TypeScript.
3. Add navigation with either Expo Router or React Navigation.
4. Implement screens:
   - Onboarding
   - Weekly Plan
   - Meal Library
   - Meal Detail
   - Grocery List
   - Prep Day
   - Settings / Privacy
5. Add local persistence using AsyncStorage or SQLite.
6. Add reusable domain models for meals, meal plans, grocery items, and preferences.
7. Add a clean component system for cards, buttons, chips, and list rows.
8. Add App Store and Play Store metadata placeholders.
9. Add basic tests for grocery-list deduping and plan generation.
10. Add disclaimers:
    - Not medical advice
    - Check allergies
    - Follow pediatrician guidance
    - Use age-appropriate texture and choking safety
    - Reheat and store food safely

## Privacy requirements

- Do not add ads.
- Do not add subscriptions.
- Do not add analytics SDKs.
- Do not collect child names, birthdates, health data, or sensitive personal data.
- Default to offline/local-only storage.

## Design direction

Warm, premium, parent-friendly, simple. Avoid copying Little Lunches branding or UI. Keep TinyPrep visually distinct.

## Deliverables

- Working Expo app
- README with local run instructions
- EAS build notes for iOS and Android
- Privacy policy draft
- Store listing draft
- Testable meal-planning and grocery logic
