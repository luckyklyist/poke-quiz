const config = {
  apiBaseUrl: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_DATABASE_ID),
  collectionId: String(import.meta.env.VITE_COLLECTION_ID),
  sucessRedirectOauthUrl: String(
    import.meta.env.VITE_OUATH_SUCCESS_REDIRECT_URL
  ),
  failureRedirectOauthUrl: String(
    import.meta.env.VITE_OUATH_FAILED_REDIRECT_URL
  ),
};

export default config;
