import React from "react";

export default function EventModal({ selected, onClose, onDownload }) {
  if (!selected) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-300 bg-opacity-50 z-[9998]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[900px] h-auto max-h-[90vh] z-[9999] rounded-xl bg-[#f8f8f8] overflow-hidden">
        <div className="relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl z-10 cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="flex flex-col">
            {/* Top section: Banner + Event Info */}
            <div className="flex w-full">
              {/* Banner image */}
              <div className="flex-1 bg-gray-100 rounded-tl-lg overflow-hidden">
                {selected.BannerUrl ? (
                  <img
                    src={selected.BannerUrl}
                    alt={selected.Title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center text-gray-500 italic">
                    No image available
                  </div>
                )}
                {/* Description */}
                <div className="p-6 bg-white">
                  <div className="font-semibold text-xs text-gray-700 mb-2">
                    DESCRIPTION
                  </div>
                  <div
                    className="max-h-32 overflow-y-auto prose font-light text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        selected.Description ||
                        "<p>No description available.</p>",
                    }}
                  />
                </div>
              </div>
              {/* Event Info */}
              <div className="w-96 bg-gray-50 rounded-tr-lg relative flex flex-col px-8 py-6">
                <div className="text-xs text-gray-500 font-extrabold mb-1 uppercase">
                  {selected.EventStartDate
                    ? new Date(selected.EventStartDate).toLocaleString(
                        "en-GB",
                        {
                          month: "short",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </div>
                <div className="font-semibold text-lg mb-2">
                  {selected.Title || "Untitled"}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {selected.Category || "Meeting"}
                </div>
                <div className="mb-4 text-xs text-gray-700">
                  <span className="font-semibold">DATE AND TIME</span>
                  <div className="text-sm mb-1">
                    {selected.EventStartDate
                      ? new Date(selected.EventStartDate).toLocaleDateString(
                          "en-GB",
                          {
                            weekday: "short",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : ""}
                    {selected.FullDayEvent === "TRUE"
                      ? " - Full Day Event"
                      : ""}
                  </div>
                  <button
                    className="text-blue-600 text-xs underline mb-2 cursor-pointer"
                    onClick={() => onDownload()}
                    type="button"
                  >
                    Add to calendar
                  </button>
                </div>
                <div className="mb-4 text-xs text-gray-700">
                  <span className="font-semibold">LOCATION</span>
                  <div className="text-sm">
                    {selected.AddressLine1 || ""}
                    <br />
                    {selected.City || ""}
                    <br />
                    {selected.PostCode || ""}
                    <br />
                    {selected.Country || ""}
                  </div>
                  <a
                    className="text-blue-600 text-xs underline mb-2"
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
