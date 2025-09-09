// src/pages/SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" >
      
      <SignIn  redirectUrl={window.sessionStorage.getItem("redirectPath") || "/"} />
    </div>
  );
}
