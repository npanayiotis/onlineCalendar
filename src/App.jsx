import React, { Suspense, lazy } from "react";
import { CalendarProvider } from "./context/CalendarContext";

const CalendarModule = lazy(() => import("./components/CalendarModule"));

export default function App() {
  return (
    // Wrap in Context Provider to share state across components
    <CalendarProvider>
      <div className="text-center my-6 flex flex-col items-center"></div>
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
    </CalendarProvider>
  );
}
