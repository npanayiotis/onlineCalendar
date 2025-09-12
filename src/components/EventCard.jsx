import React from "react";
import { friendlyDateString } from "../utils/dateUtils";

export default function EventCard({ event, onClick }) {
  // Format date for display
  const dateText = friendlyDateString(event.EventStartDate);

  return (
    // Displaying event title and date with click handlers
    <div
      className="group bg-[#F3F2F1] hover:bg-[#E9E7E9] px-4 py-2 rounded cursor-pointer transition-colors"
      onClick={() => onClick(event)}
    >
      <a
        className="text-[14px] font-normal text-[#03787C] group-hover:text-[#D5111F] transition-colors"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick(event);
        }}
      >
        {event.Title}
      </a>
      <span className="block text-[14px] font-normal text-[#333333]">
        {dateText}
      </span>
    </div>
  );
}
