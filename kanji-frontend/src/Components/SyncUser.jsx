import { useUser } from "@clerk/clerk-react";
 import axios from "axios";
import { useEffect } from "react";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("Syncing user:", user);
      axios.post("http://localhost:3000/api/v1/sync", {
        clerkId: user.id,
        username: user.username || user.firstName || "Anonymous",
        email: user.primaryEmailAddress?.emailAddress,
      });
    }
  }, [user]);

  return null; 
}
