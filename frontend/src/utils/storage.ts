import Cookie from "js-cookie";
// import type { CookieAttributes } from "js-cookie";

export const storage = {
  localStorage: {
    set: <Item>(key: string, value: Item): void => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    get: <Item>(key: string): Item | null => {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      return null;
    },
    remove: (key: string): void => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    },
  },
  cookieStorage: {
    set: (key: string, value: string, options?: any) =>
      Cookie?.set(key, value, options),
    get: (key: string) => Cookie?.get(key) || "",
    remove: (key: string, options?: any): void => Cookie.remove(key, options),
  },
};

// user: storage["localStorage"].get("user_info") || null,
// access_token: storage["cookieStorage"].get("access_token") || null,

// so this is a storage function, and it's use to store data from anywhere in the app
// the methods are stated below
// get from localStorage = storage["localStorage"].get("user_info")
// set from localStorage = storage["localStorage"].set("user_info", data)
// remove  from localStorage = storage["localStorage"].remove("user_info")
// get from cookieStorage = storage["cookieStorage"].get("user_info")
// set  cookieStorage = storage["cookieStorage"].set("user_info", data)
// remove from cookieStorage = storage["cookieStorage"].remove("user_info")
