
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
import KanjiResourcesPage from "./Pages/KanjiResourcesPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import SyncUser from "./Components/SyncUser.jsx";
import ProgressPage from "./Components/ProgressComponent.jsx";
import { useState } from "react";
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
import { dark ,shadesOfPurple} from '@clerk/themes'
import QuizPage from "./Pages/QuizPage.jsx";
import LearnPage from "./Pages/LearnPage.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
  
      <ClerkProvider publishableKey={clerkKey} >
        <Navbar />
        <SyncUser />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/resources" element={<KanjiResourcesPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/progress"
            element={<ProgressPage/>}
          />
           <Route
            path="/quiz"
            element={<QuizPage/>}
          />
          <Route path="/learn/:level" element={<LearnPage />} />
          <Route path="/quiz" element={<QuizPage/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
);
