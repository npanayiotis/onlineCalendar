import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

export const useEventSelection = () => {
  const { selected, setSelected } = useContext(CalendarContext);

  /*
    Functions to open and close the event details modal, 
    onClick of event card setting the selected event to state 
  */
  const openEvent = (event) => setSelected(event);
  const closeEvent = () => setSelected(null);

  return { selected, openEvent, closeEvent };
};
