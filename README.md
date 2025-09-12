# Online Calendar

A simple React calendar demo built with Vite and TailwindCSS.  
Displays upcoming events, allows viewing details in a modal, and lets users download events as ICS files.

## Features

- **Event List:** Shows upcoming events with title, date, location, and description.
- **Event Details Modal:** Click an event to view full details in a modal dialog.
- **ICS Download:** Download any event as a `.ics` calendar file.
- **Event Data:** Fetches events from an API (configured in .env).
- **Responsive UI:** Styled with TailwindCSS.
- **Performance Optimizations:** Efficient rendering and state management for smooth user experience.

## Project Structure

- `src/components/CalendarModule.jsx` — Main calendar UI and modal logic.
- `src/components/EventCard.jsx` — Displays individual event cards.
- `src/components/EventModal.jsx` — Modal for event details (styled with TailwindCSS).
- `src/hooks/useCalendarEvents.js` — Fetches calendar events.
- `src/hooks/useEventSelection.js` — Handles event selection and modal state.
- `src/hooks/useICSExporter.js` — Generates and downloads ICS files.
- `src/utils/dateUtils.js` — Date formatting utilities.
- `src/App.jsx` — Loads the calendar module with context.
- `vite.config.js` — Vite configuration for React and TailwindCSS.

## How It Works

1. **Events are loaded** (fetched from API) and shown as cards.
2. **Click an event** to open a modal with details.
3. **Download ICS:** In the modal, click "Add to calendar" to save the event to your calendar.
4. **Close modal:** Click "✕" or outside the modal to return to the event list.

## Getting Started

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
