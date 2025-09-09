import React, { useState } from "react";
import ProgressComponent from "../Components/ProgressComponent";

const ProgressPage = () => {
  const { user } = useUser(); // 👈 Clerk user object

  const [userProgress, setUserProgress] = useState({
    N5: 45,
    N4: 23,
    N3: 12,
    N2: 5,
    N1: 20,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 text-white">
     
      {/* Progress */}
      <ProgressComponent userProgress={userProgress} />
    </div>
  );
};

export default ProgressPage;
