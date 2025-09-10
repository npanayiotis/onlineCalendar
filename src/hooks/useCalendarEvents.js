import { useState, useEffect } from "react";

export function useCalendarEvents() {
  const [events, setEvents] = useState(() => {
    /*
      Getting cached events from localStorage
      If none exist, we start with an empty array
      Preventing unnecessary API calls on initial load  
    */
    const cached = localStorage.getItem("calendarEvents");
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let mounted = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Making a POST request to fetch events
        const resp = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        });

        const data = await resp.json();
        const evts = Array.isArray(data.value) ? data.value : [];

        if (mounted) {
          // Only update if there are new events
          const currentIds = events.map((event) => event.ID);
          const newEvents = evts.filter(
            (event) => !currentIds.includes(event.ID)
          );

          // If there are any new events, we merge them with existing events (updatedEvents) and update both state and localStorage
          if (newEvents.length > 0) {
            const updatedEvents = [...events, ...newEvents];
            setEvents(updatedEvents);
            localStorage.setItem(
              "calendarEvents",
              JSON.stringify(updatedEvents)
            );
          }
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch events");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEvents();
    // Cleanup function to avoid setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, [API_URL, events]);

  return { events, loading, error };
}
