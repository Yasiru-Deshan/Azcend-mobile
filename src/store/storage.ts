import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistStorage, StorageValue } from 'zustand/middleware';

export function makePersistStorage<T>(): PersistStorage<T> {
  return {
    getItem: async (name: string): Promise<StorageValue<T> | null> => {
      const value = await AsyncStorage.getItem(name);
      if (value === null) return null;
      try {
        return JSON.parse(value) as StorageValue<T>;
      } catch {
        return null;
      }
    },
    setItem: async (name: string, value: StorageValue<T>): Promise<void> => {
      await AsyncStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: async (name: string): Promise<void> => {
      await AsyncStorage.removeItem(name);
    },
  };
}
