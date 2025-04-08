const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_URL: "http://localhost:5173/",
};

export const { API_URL, APP_URL } = publicRuntimeConfig;

export default publicRuntimeConfig;
