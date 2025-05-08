const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
};

export const { API_URL, APP_URL } = publicRuntimeConfig;

export default publicRuntimeConfig;
