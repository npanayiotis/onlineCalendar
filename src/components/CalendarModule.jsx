import React, { useMemo, useCallback } from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

// naming export of custom hooks
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { useEventSelection } from "../hooks/useEventSelection";
import { useICSExporter } from "../hooks/useICSExporter";

export default function CalendarModule() {
  // Using custom hooks to manage state and logic
  const { events, error } = useCalendarEvents();
  const { selected, openEvent, closeEvent } = useEventSelection();
  const { downloadEventICS } = useICSExporter();

  // Render event cards
  const eventCards = useMemo(() => {
    if (!Array.isArray(events)) return null;
    return events.map((event) => (
      // mapping  over events to create EventCard components
      <EventCard key={event.ID} event={event} onClick={openEvent} />
    ));
  }, [events, openEvent]);

  // Handlers for modal, passing them as callbacks to avoid unnecessary re-renders
  const handleClose = useCallback(() => closeEvent(), [closeEvent]);
  const handleDownload = useCallback(
    () => downloadEventICS(selected),
    [downloadEventICS, selected]
  );

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

      {/* Modal */}
      <EventModal
        selected={selected}
        onClose={handleClose}
        onDownload={handleDownload}
      />
    </div>
  );
}
