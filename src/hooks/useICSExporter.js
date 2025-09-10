export const useICSExporter = () => {
  const generateICS = (event) => {
    /* 
      - Extract and format event details for ICS:
      - Title: Use event title, or fallback to a timestamped default
      - Description: Replace line breaks with ICS-compliant "\n"
      - Location: Use event location, or empty string if missing
      - Start: Convert event start to a Date object 
    
    */
    const title = event.title || new Date().toISOString() + "Event";
    const description = (event.description || "").replace(/\r?\n/g, "\\n");
    const location = event.location || "";
    const start = new Date(event.start);

    // If end time not provided, default to 1 hour after start
    const end = new Date(event.end || start.getTime() + 60 * 60 * 1000);

    /*
      - Helper function to convert a Date object to ICS date format
      - ICS requires UTC format, so we use getUTC* methods
     */
    const toICSDate = (dt) => {
      const yyyy = dt.getUTCFullYear();
      const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(dt.getUTCDate()).padStart(2, "0");
      const hh = String(dt.getUTCHours()).padStart(2, "0");
      const min = String(dt.getUTCMinutes()).padStart(2, "0");
      const sec = String(dt.getUTCSeconds()).padStart(2, "0");
      return `${yyyy}${mm}${dd}T${hh}${min}${sec}Z`;
    };
    // Unique identifier for the event
    const uid =
      (event.id || Math.random().toString(36).slice(2)) + "@calendar-module";

    // Timestamp for when this ICS file is generated
    const now = toICSDate(new Date());

    // Construct ICS content as an array of lines, then join with CRLF
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CalendarModule//EN",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART:${toICSDate(start)}`,
      `DTEND:${toICSDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
  };

  // This function generates an ICS file for the given event and triggers a download in the browser.
  const downloadEventICS = (event) => {
    // Generate the ICS file content for the given event
    const ics = generateICS(event);
    // Create a Blob object containing the ICS data, specifying the correct MIME type for calendar files
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    // Create a temporary URL for the Blob so it can be downloaded
    const url = URL.createObjectURL(blob);
    // Create an anchor element, set its href to the Blob URL, and set the filename for download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(event.title || "event").replace(/\s+/g, "_")}.ics`;
    // Programmatically click the anchor to trigger the download
    a.click();
    // Clean up the temporary URL object after download to free resources
    URL.revokeObjectURL(url);
  };

  return { generateICS, downloadEventICS };
};
