import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";

import { Text, Box, Spacer, Avatar, Heading, HStack } from "@chakra-ui/react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./css/calendar.css";
import { Tooltip } from "@chakra-ui/react";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function EventComponent({ event }) {
  return (
    <>
      <HStack h={2}>
        <Heading fontWeight="bold" fontSize={"sm"} pt={1}>
          {event.title}
        </Heading>
        <Spacer />
        <Avatar
          size="md"
          name={event.organizerName}
          src={event.organizerAvatar}
        />
      </HStack>
    </>
  );
}

const DnDCalendar = withDragAndDrop(Calendar);
const Calendar2 = () => {
  const today = new Date();
  today.setHours(9, 0, 0, 0);

  const [allEvents, setAllEvents] = useState([
    {
      title: "Installation",
      organizerName: "Organizer 1",
      organizerAvatar: "https://bit.ly/dan-abramov",
      start: new Date(today),
      end: new Date(today.getTime() + 1 * 60 * 60 * 1000),
    },
    {
      title: "Electrical",
      organizerName: "Organizer 2",
      organizerAvatar: "https://bit.ly/dan-abramov3",
      start: new Date(today.getTime() + 2 * 60 * 60 * 1000),
      end: new Date(today.getTime() + 3 * 60 * 60 * 1000),
    },

    {
      title: "Plumbing",
      organizerName: "Organizer 3",
      organizerAvatar: "https://bit.ly/dan-abramov",
      start: new Date(today.getTime() + 4 * 60 * 60 * 1000),
      end: new Date(today.getTime() + 5 * 60 * 60 * 1000),
    },
  ]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "white",
      borderRadius: "5px",
      opacity: 1,
      border: "0px",
      height: "120px",
      color: "black",
      display: "block",
      marginLeft: "5px",
    };

    return {
      style,
    };
  };

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.DAY}
        toolbar={false}
        selectable
        components={{
          event: EventComponent,
        }}
        eventPropGetter={eventStyleGetter}
        resizable
        style={{ height: 300, width: "100%" }}
        min={new Date(2023, 8, 13, 9, 0, 0)}
        max={new Date(2023, 8, 13, 17, 0, 0)}
      />
    </div>
  );
};

export default Calendar2;
