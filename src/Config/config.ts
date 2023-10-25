const config = {
  apiBaseUrl: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_DATABASE_ID),
  collectionId: String(import.meta.env.VITE_COLLECTION_ID),
};

export default config;
