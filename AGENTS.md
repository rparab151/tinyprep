# Codex Agent Instructions

You are working on TinyPrep, a free toddler meal-prep app.

## Goals

1. Convert the current Vite React prototype into a production Expo React Native app.
2. Target both Apple App Store and Google Play Store.
3. Keep the app free, offline-first, and privacy-preserving.
4. Do not add ads, subscriptions, analytics SDKs, or account signup unless explicitly requested.

## Product constraints

- The app is for general parenting meal-prep organization, not medical or nutrition advice.
- Add clear allergy, choking-risk, and reheating safety disclaimers before production release.
- Avoid collecting child names, birthdates, health data, or sensitive personal information.
- Store preferences locally on-device first.

## Engineering expectations

- Use TypeScript.
- Prefer Expo Router or React Navigation.
- Use AsyncStorage or SQLite for local persistence.
- Add a clean design system with reusable components.
- Add unit-testable meal planning and grocery-list logic.
- Add App Store / Play Store metadata placeholders.
- Add privacy policy placeholder text and a clear no-data-sale stance.

## Do not

- Copy Little Lunches branding, text, layout, or proprietary content.
- Add external recipe APIs until app privacy posture is reviewed.
- Make medical claims about child nutrition or sleep.
