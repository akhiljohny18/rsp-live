import axios from 'axios';
import { config } from 'dotenv';

interface Product {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };  // Add more fields as needed based on the API response structure
}

export async function getProducts(): Promise<Product[]> {
  config();
  try {
    const port = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${port}/api/globals/loginContent`;
    const response = await axios.get<Product[]>(url);
    console.log("data123456" ,response.data); // Log the fetched data to the server-side console
    return response.data; // Optionally return the data for client-side use
  } catch (error) {
    console.error(error); // Log any errors to the server-side console
    return []; // Return an empty array in case of errors
  }
}
