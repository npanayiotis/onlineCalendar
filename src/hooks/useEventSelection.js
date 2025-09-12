import { useState } from "react";

export function useEventSelection() {
  const [selected, setSelected] = useState(null);

  // Functions to open and close event details

  const openEvent = (event) => setSelected(event);
  const closeEvent = () => setSelected(null);

  return { selected, openEvent, closeEvent };
}
