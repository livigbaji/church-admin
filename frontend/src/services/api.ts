import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { storage } from "@/utils";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "same-origin",
  mode: "cors",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");

    return headers;
  },
  // Implement a token refresh logic
  validateStatus: (status: any) => {
    if (status.status === 401) {
      storage["localStorage"].remove("retopin_user_profile");
      // storage["localStorage"].remove("user_type");
      storage["cookieStorage"].remove("retopin_accessToken");
      // toast.error("Your Token has expired");
      location.assign("/");
      throw new Error("Unauthorized");
    }
    return status;
    // return status >= 200 && status < 300;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const API = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "Api",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: [
    "authentication",
    "reports",
    "dashboard",
    "profile",
    "employee-list",
    "admin-company-list",
    "admin-company-details",
    "admin-bouquet-list",
    "admin-company-payments",
    "retopin-settings",
    "employee-dashboard-dependant-list",
    "employee-dashboard-transactions-history",
    "data-bundles",
    "employee-dashboard-data",
    "audit-trail",
  ],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

// export const enhancedApi = API.enhanceEndpoints({
// 	endpoints: () => ({
// 		getPost: () => 'test',
// 	}),
// })

export const ApiPrefixes = {
  authentication: "company",
  dashboard: "company/dashboard-data",
  companyProfile: "company/profile",
  employee: "company/employee",
  company: "company",
  reports: "company/reports",
  demo: "demo",
  contact: "contact-form",
  settings: "company/settings",
  employeeDashboard: "employee",
};
