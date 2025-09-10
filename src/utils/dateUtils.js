export function friendlyDateString(dateISO) {
  if (!dateISO) return "No date";

  // Convert the ISO string into a JavaScript Date object
  const d = new Date(dateISO);
  const now = new Date();
  // Calculate the difference in milliseconds between the given date and now
  const diffMs = d - now;

  // Convert the difference into seconds, minutes, hours, and days
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHrs = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHrs / 24);
  const absDays = Math.abs(diffDays);

  /*
    If the date is within 7 days in the past or future, use relative time
    This block checks if the absolute difference in days is less than 7.
    If so, it returns a human-friendly relative time string (e.g., "in 2 days", "3 hours ago").
    For future dates (diffSec > 0), it uses "in X days/hours/minutes" or "in a few seconds".
    For past dates, it uses "X days/hours/minutes ago" or "just now". 
  */
  if (absDays < 7) {
    if (diffSec > 0) {
      if (absDays >= 1) return `in ${absDays} day${absDays > 1 ? "s" : ""}`;
      if (Math.abs(diffHrs) >= 1)
        return `in ${Math.abs(diffHrs)} hour${
          Math.abs(diffHrs) > 1 ? "s" : ""
        }`;
      if (Math.abs(diffMin) >= 1)
        return `in ${Math.abs(diffMin)} minute${
          Math.abs(diffMin) > 1 ? "s" : ""
        }`;
      return "in a few seconds";
    } else {
      if (absDays >= 1) return `${absDays} day${absDays > 1 ? "s" : ""} ago`;
      if (Math.abs(diffHrs) >= 1)
        return `${Math.abs(diffHrs)} hour${
          Math.abs(diffHrs) > 1 ? "s" : ""
        } ago`;
      if (Math.abs(diffMin) >= 1)
        return `${Math.abs(diffMin)} minute${
          Math.abs(diffMin) > 1 ? "s" : ""
        } ago`;
      return "just now";
    }
  }

  /*
    If the date is more than 7 days away (past or future), show the full date
    This block formats the date as DD/MM/YYYY for dates outside the 7-day relative window.
    It pads the day and month with a leading zero if needed, and returns the formatted string.
  */
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
