"use client";

import { useState, useEffect, useCallback } from 'react';

function isServer(): boolean {
  return typeof window === 'undefined';
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isServer()) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isServer()) return;

    const item = window.localStorage.getItem(key);
    if (item) {
        try {
            setStoredValue(JSON.parse(item));
        } catch (error) {
            console.error(`Error parsing localStorage key “${key}”:`, error);
        }
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (isServer()) return;
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
