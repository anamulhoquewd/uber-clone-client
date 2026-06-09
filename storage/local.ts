// Set to local storage
export const setStorage = (key: string, value: object) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  return null;
};

// Get from local storage
export const getStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

// Remove from local storage
export const removeStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Set a cookie (readable by Next.js middleware)
export const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
};

// Delete a cookie
export const deleteCookie = (name: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};
