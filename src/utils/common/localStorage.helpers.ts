// Localstorage
export const getLocalStorageItem = <T>(
  key: string,
  defaultValue?: T
): T | undefined => {
  try {
    if (typeof window !== "undefined") {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }

      return JSON.parse(serializedValue) as T;
    } else {
      return defaultValue;
    }
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return defaultValue;
  }
};

export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    if (typeof window !== "undefined") {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    }
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};

export const removeLocalStorageItem = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Error removing item from local storage: ${error}`);
  }
};
