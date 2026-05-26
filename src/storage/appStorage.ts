import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PersistedAppState } from "../domain/models";

const storageKey = "tinyprep.app-state.v1";

export async function loadAppState(): Promise<PersistedAppState | null> {
  try {
    const raw = await AsyncStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as PersistedAppState) : null;
  } catch {
    return null;
  }
}

export async function saveAppState(state: PersistedAppState): Promise<void> {
  await AsyncStorage.setItem(storageKey, JSON.stringify(state));
}
