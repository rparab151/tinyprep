# TinyPrep

TinyPrep is a free, offline-first toddler meal-prep planner for busy parents. It helps plan a weekly toddler menu, organize prep-day batch cooking, track accepted/trying/retry-later foods, generate a deduplicated grocery list, save favorites, and keep reheating/freezer notes close.

TinyPrep is for general meal-prep organization only. It is not medical advice.

## Current App

This repository is now structured as an Expo React Native app targeting iOS and Android.

Implemented:

- TypeScript Expo app entrypoint
- React Navigation native stack
- Onboarding, Weekly Plan, Meal Library, Meal Detail, Grocery List, Prep Day, and Settings / Privacy screens
- AsyncStorage persistence for local preferences, favorites, food status labels, grocery checklist state, and plan seed
- Reusable cards, buttons, chips, list rows, and disclaimer banner
- Testable meal-planning and grocery-list domain logic
- Store listing and privacy policy drafts in `docs/`
- EAS build placeholder config

## Privacy Posture

- No ads
- No subscriptions
- No analytics SDKs
- No account signup
- No collection of child names, birthdates, health data, or sensitive personal data
- Local-only storage by default

## Safety Disclaimer

TinyPrep is not medical advice. Check allergies, follow pediatrician guidance, use age-appropriate texture and choking safety practices, and reheat and store food safely.

## Run Locally

```bash
npm install
npm run start
```

Then open the app with Expo Go or an Expo development build.

## Tests

```bash
npm test
```

The current tests cover grocery-list ingredient deduping and weekly plan generation.

## EAS Build Notes

1. Install and authenticate EAS CLI:

   ```bash
   npm install --global eas-cli
   eas login
   ```

2. Replace `extra.eas.projectId` in `app.json` after running:

   ```bash
   eas init
   ```

3. Add production icon, adaptive icon, and splash assets before submission.

4. Build:

   ```bash
   eas build --platform ios --profile production
   eas build --platform android --profile production
   ```

5. Submit after completing App Store Connect and Play Console metadata:

   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## Store Materials

- Privacy policy draft: `docs/privacy-policy.md`
- Store listing draft: `docs/store-listing.md`
- Asset placeholder notes: `assets/README.md`
