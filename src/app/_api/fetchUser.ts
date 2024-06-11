import { GRAPHQL_API_URL } from './shared';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${GRAPHQL_API_URL}/api/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.docs; // Assuming 'docs' is the key containing the array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
