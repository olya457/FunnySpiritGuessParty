import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoredState} from '../types';

const STORAGE_KEY = 'funny_spirit_guess_party_state';

async function getRaw(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}

async function setRaw(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value);
}

async function removeRaw(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function loadStoredState(): Promise<Partial<StoredState> | null> {
  const raw = await getRaw(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as Partial<StoredState>;
  } catch {
    await removeRaw(STORAGE_KEY);
    return null;
  }
}

export async function saveStoredState(state: StoredState): Promise<void> {
  await setRaw(STORAGE_KEY, JSON.stringify(state));
}

export async function clearStoredState(): Promise<void> {
  await removeRaw(STORAGE_KEY);
}
