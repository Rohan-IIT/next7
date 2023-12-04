// types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
    };
    // Add more fields as needed based on the JSONPlaceholder API or your chosen API
  }