import { NextRequest } from "next/server";

export function isAuthenticated(req: NextRequest): boolean {
  // Check if code is running on the client side
  if (typeof window !== "undefined") {
    const userDetails = localStorage.getItem("userDetails");
    
    if (userDetails) {
      const user = JSON.parse(userDetails); // Convert string to object
      console.log(user.email);  // Access individual properties
      console.log(user.id);
      console.log(user.name);
      console.log(user.phone);
    }
  }
  
  // If it's on the server, return false or handle it appropriately
  return false;
}
