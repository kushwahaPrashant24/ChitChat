import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID, // Ensure this is correctly set in the .env file
  url: import.meta.env.VITE_APPWRITE_URL,             // Ensure this is correctly set in the .env file
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,

  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,

  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

// Ensure both project ID and URL exist


export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
