import React, { useMemo, useCallback } from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { useEventSelection } from "../hooks/useEventSelection";
import { useICSExporter } from "../hooks/useICSExporter";

export default function CalendarModule() {
  // Destructure state and actions from custom hooks
  const { events, error } = useCalendarEvents();
  const { selected, openEvent, closeEvent } = useEventSelection();
  const { downloadEventICS } = useICSExporter();

  // Render event cards
  // Checking if events is an array to avoid runtime errors and using useMemo for performance optimization
  const eventCards = useMemo(() => {
    if (!Array.isArray(events)) return null;
    return events.map((event) => (
      // Displaying event cards
      <EventCard key={event.ID} event={event} onClick={openEvent} />
    ));
  }, [events, openEvent]);

  // handlers for modal actions with useCallback for performance optimization
  const handleClose = useCallback(() => closeEvent(), [closeEvent]);
  const handleDownload = useCallback(
    () => downloadEventICS(selected),
    [downloadEventICS, selected]
  );

  // showing error state as fallback
  if (error) {
    return (
      <div className="p-4 text-red-500 flex flex-col items-center text-2xl">
        Error loading events.
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-4 font-sans">
      {/* Header */}
      <div className="mx-auto mt-8" style={{ maxWidth: 380 }}>
        <h2 className="flex items-center text-[20px] font-semibold text-[#333333] mb-4">
          🗓️ Upcoming Events
        </h2>
        <div className="flex flex-col gap-2">{eventCards}</div>
      </div>
      {/* Rendering selected event Modal, passing required props to EventModal component */}
      <EventModal
        selected={selected}
        onClose={handleClose}
        onDownload={handleDownload}
      />
    </div>
  );
}
