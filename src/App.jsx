import React, { Suspense, lazy } from "react";

// creating the lazy component for performance optimization
const CalendarModule = lazy(() => import("./components/CalendarModule"));

export default function App() {
  return (
    <div className="text-center my-6 flex flex-col items-center">
      {/* fallback UI until lazy component is loaded */}
      <Suspense
        fallback={
          <div className="text-center text-2xl text-gray-600 mt-20">
            Loading your meetings...
          </div>
        }
      >
        <CalendarModule />
      </Suspense>
    </div>
  );
}
