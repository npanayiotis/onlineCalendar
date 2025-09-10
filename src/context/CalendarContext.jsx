import React, { createContext, useState } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  // Initiating state variables to be shared via context
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CalendarContext.Provider
      // Providing state and setters to context consumers
      value={{
        events,
        setEvents,
        selected,
        setSelected,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
