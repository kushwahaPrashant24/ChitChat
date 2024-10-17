import { ID, Query } from "appwrite";
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

function validateUserData(user: INewUser): void {
    if (!user.email.includes("@") || user.email.trim().length === 0) {
        throw new Error("Invalid email format.");
    }

    if (user.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    if (user.name.length > 36) {
        throw new Error("Name cannot be longer than 36 characters.");
    }

    if (/[^\w.-]/.test(user.name)) {
        throw new Error("Name can only contain letters, numbers, periods, hyphens, and underscores.");
    }
}

// Function to create a new user account
export async function createUserAccount(user: INewUser): Promise<any> {
    try {
        // Validate the user input data
        validateUserData(user);

        // Log the generated ID and user data for debugging
       

        // Create an account with a unique ID and provided credentials
        const newAccount = await account.create(
            
            user.email,
            user.password,
            user.name
        );

        // Check if account creation was successful
        if (!newAccount) throw new Error("Account creation failed");

        // Generate avatar URL based on user name
        const avatarUrl = avatars.getInitials(user.name);

        // Save the user to the database
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        });

        return newUser; // Return the created user document
    } catch (error) {
        console.error("Error creating user account:", error);
        throw error; // Throw the error for further handling
    }
}

// Save user to the database
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: string;
    username?: string;
}): Promise<any> {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(), // Ensure unique ID for the document
            user,
        );
        return newUser; // Return the created user document
    } catch (error) {
        console.error("Error saving user to DB:", error);
        throw error; // Throwing the error for further handling
    }
}

// Sign in user
export async function signInAccount(user: { email: string; password: string; }): Promise<any> {
    try {
        // Use the Appwrite SDK to create a session
        const session = await account.createSession(user.email, user.password);
        return session; // Return session data if successful
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error; // Handle and re-throw the error
    }
}

// Get the currently logged-in user
export async function getCurrentUser(): Promise<any> {
    try {
        // Get the current account
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error("No current account found");

        // Query the database for the user using the accountId
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || !currentUser.documents.length) {
            throw new Error("No user found in the database");
        }

        return currentUser.documents[0]; // Return the found user document
    } catch (error) {
        console.error("Error getting current user:", error);
        throw error; // Throw the error for further handling
    }
}
