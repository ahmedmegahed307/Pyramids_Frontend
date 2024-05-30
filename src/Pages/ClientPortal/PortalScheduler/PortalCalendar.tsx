import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../PortalScheduler/css/calendar.css";
import { Badge, Card, HStack } from "@chakra-ui/react";
import EventInfo from "./PortalEvents/EventInfo";
import EventStyling from "./PortalEvents/EventStyling";
import { useEffect, useState } from "react";

import IsLoading from "../../GeneralComponents/IsLoading";
import IsError from "../../GeneralComponents/IsError";
import useClientJobs from "../../../hooks/ClientPortal/useClientJobs";

const PortalCalendar = () => {
  const { data: clientJobs, isLoading, isFetched, isError } = useClientJobs();
  console.log("clientJobs::", clientJobs);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  useEffect(() => {
    if (clientJobs && isFetched) {
      const events = clientJobs?.map((job: any) => {
        const endDate = new Date(job?.scheduleDateEnd);
        endDate.setHours(endDate.getHours() + 2);
        return {
          ...job,
          id: job.id,
          title: job.jobType,
          startDate: new Date(job?.scheduleDateEnd),
          endDate: endDate,
        };
      });
      setAllEvents(events);
    }
  }, [isFetched, clientJobs]);

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  return (
    <>
      <Card
        m={5}
        shadow={"none"}
        border={"1px solid  #E2E2E2"}
        borderRadius={12}
      >
        <HStack p={2} pl={6} mb={-5} spacing={1}>
          <Badge
            variant={"subtle"}
            borderRadius={"5px"}
            px={5}
            py={1.5}
            color={"#01565B"}
            background={"#D3F7F4"}
          >
            Pending
          </Badge>
          <Badge
            variant={"subtle"}
            borderRadius={"5px"}
            px={5}
            py={1.5}
            color={"#01565B"}
            background="#FFE0DC"
          >
            Open
          </Badge>
          <Badge
            variant={"subtle"}
            borderRadius={"5px"}
            px={5}
            py={1.5}
            color={"#01565B"}
            background="#E1F296"
          >
            Assigned
          </Badge>
          <Badge
            variant={"subtle"}
            borderRadius={"5px"}
            px={5}
            py={1.5}
            color={"#01565B"}
            background="#BAEDBD"
          >
            Resolved
          </Badge>
          <Badge
            variant={"subtle"}
            borderRadius={"5px"}
            px={5}
            py={1.5}
            color={"#01565B"}
            background="#B1E3FF"
          >
            Closed
          </Badge>
          <Badge
            variant={"subtle"}
            borderRadius={"5px"}
            px={5}
            py={1.5}
            color={"#01565B"}
            background="#B3CCCE"
          >
            Cancelled
          </Badge>
        </HStack>
        <DnDCalendar
          views={["month", "work_week", "week", "day", "agenda"]}
          dayLayoutAlgorithm="no-overlap"
          events={allEvents}
          eventPropGetter={EventStyling}
          startAccessor="startDate"
          endAccessor="endDate"
          resizable={false}
          selectable={false}
          components={{
            event: EventInfo,
          }}
          min={new Date(2000, 0, 1, 8, 0, 0)}
          max={new Date(2026, 0, 1, 19, 0, 0)}
          formats={{
            // 24-hour format
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "HH:mm", culture),
            eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
              const startTime = localizer.format(start, "HH:mm", culture);
              const endTime = localizer.format(end, "HH:mm", culture);
              return `${startTime} - ${endTime}`;
            },
          }}
          // defaultView="week"
          localizer={localizer}
          style={{ height: 1000, margin: "20px" }}
        />
      </Card>
    </>
  );
};

export default PortalCalendar;

//configuration for the calendar
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
const DnDCalendar = withDragAndDrop(Calendar);
