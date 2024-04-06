import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { enIE, enUS } from "date-fns/locale";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Scheduler/css/calendar.css";
import {
  Badge,
  Button,
  Card,
  HStack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import EventInfo from "./Events/EventInfo";
import EventStyling from "./Events/EventStyling";
import { useCallback, useEffect, useState } from "react";
import CalendarFilterMain, {
  FilterFormData,
} from "./CalendarFilter/CalendarFilterMain";
import { AddIcon } from "@chakra-ui/icons";
import useScheduler from "../../hooks/Scheduler/useScheduler";
import IsLoading from "../GeneralComponents/IsLoading";
import IsError from "../GeneralComponents/IsError";
import { SchedulerEventCreate } from "../../models/Interfaces/Scheduler/SchedulerEventCreate";
import useAuthStore from "../../hooks/Authentication/store";
import useCreateEvent from "../../hooks/Scheduler/useCreateEvent";
import CreateEventMain from "./Events/CreateEvent/CreateEventMain";
import UpdateEventMain from "./Events/UpdateEvent/UpdateEventMain";
import { SchedulerEventUpdate } from "../../models/Interfaces/Scheduler/SchedulerEventUpdate";
import BadgeTypes from "./BadgeTypes";
import useEventMutation from "../../hooks/Scheduler/useEventMutation";
import moment from "moment";
import useJobScheduleDateMutation from "../../hooks/Jobs/useJobScheduleDateMutation";

const CalendarMain = () => {
  const { user } = useAuthStore();
  //filter data(clients, engineers)
  const [filterData, setFilterData] = useState<FilterFormData>();
  const handleFilterData = (data: FilterFormData) => {
    console.log("filter data", data);
    setFilterData(data);
  };

  //calling all events and passing filter data to it
  const { data: schedulerData, isLoading, isFetched, isError } = useScheduler();
  const [allEvents, setAllEvents] = useState<any[]>([]);
  console.log("allEvents::", allEvents);
  useEffect(() => {
    if (isFetched && filterData) {
      // Check if filterData is defined
      const events = schedulerData
        ?.map((item) => {
          if (item.event !== undefined) {
            return {
              ...item,
              eventType: item.event.eventType,
              startDate: new Date(item.event.startDate),
              endDate: new Date(item.event.endDate),
            };
          } else if (item.job !== undefined) {
            if (
              (!filterData.engineersId ||
                filterData.engineersId.length === 0 ||
                filterData.engineersId.includes(item.job.engineerId)) &&
              (!filterData.clientsId ||
                filterData.clientsId.length === 0 ||
                filterData.clientsId.includes(item.job.clientId))
            ) {
              return {
                ...item,
                eventType: "Job",
                startDate: new Date(item.job.startDate),
                endDate: new Date(item.job.endDate),
              };
            }
          }
          return null;
        })
        .filter((event) => event !== null);

      // Apply eventType filter if filterData.eventTypes is not empty
      let filteredEvents = [...events];
      if (filterData.eventTypes && filterData.eventTypes.length > 0) {
        filteredEvents = filteredEvents.filter((event) =>
          filterData.eventTypes.includes(event.eventType)
        );
      }

      setAllEvents([...filteredEvents]);
    }
  }, [isFetched, schedulerData, filterData]);

  //create event
  const createEventModal = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelectSlot = useCallback(({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
    createEventModal.onOpen();
  }, []);

  const createEventMutation = useCreateEvent();
  const handleCreateEventForm = async (data: SchedulerEventCreate) => {
    const newEvent: SchedulerEventCreate = {
      eventType: data.eventType,
      title: data.title,
      startDate: moment(data.startDate).format("YYYY-MM-DDTHH:mm"),
      endDate: moment(data.endDate).format("YYYY-MM-DDTHH:mm"),
      description: data.description,
      employeesId: data?.employeesId !== "" ? data.employeesId : null,
      companyId: user?.companyId,
      createdByUserId: user?.id,
    };
    console.log("create event data", newEvent);

    createEventMutation.mutateAsync(newEvent);
    createEventModal.onClose();
  };
  //update event
  const eventMutation = useEventMutation(() => {}, true);
  const jobMutation = useJobScheduleDateMutation();
  const updateEventModal = useDisclosure();
  const [updateEvent, setUpdateEvent] = useState();
  const handleSelectEvent = useCallback((event) => {
    console.log("selected event", event);
    setUpdateEvent(event);
    updateEventModal.onOpen();
  }, []);
  const handleUpdateEventForm = async (data) => {
    let employeesId;

    if (data.employeesId) {
      employeesId = data?.employeesId !== "" ? data.employeesId : null;
    } else {
      employeesId = data.employees.map((employee) => employee.id).join(",");
    }
    console.log("employeesId", employeesId);
    const eventToUpdate: SchedulerEventUpdate = {
      id: data.id,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
      employeesId: employeesId,
      modifiedByUserId: user?.id,
    };
    console.log("eventToUpdateFinal", eventToUpdate);
    eventMutation.mutateAsync(eventToUpdate);
    updateEventModal.onClose();
  };

  // resize
  const onEventResize = async (data) => {
    console.log("resize data", data);
    const { start, end, event } = data;

    try {
      if (event?.eventType === "Job") {
        console.log("job drop data", event);
        const jobToUpdate = {
          id: event?.job?.id,
          ScheduleDateEnd: moment(start).format("YYYY-MM-DDTHH:mm"),
        };
        console.log("jobToUpdate", jobToUpdate);
        jobMutation.mutateAsync(jobToUpdate);
      } else {
        const eventToUpdate: SchedulerEventUpdate = {
          id: event?.event?.id,
          title: event?.event?.title,
          startDate: moment(start).format("YYYY-MM-DDTHH:mm"),
          endDate: moment(end).format("YYYY-MM-DDTHH:mm"),
          description: event?.event?.description,
          employeesId: event?.event?.employees
            .map((employee) => employee.id)
            .join(","),
          modifiedByUserId: user?.id,
        };
        console.log("eventToUpdateFinal", eventToUpdate);
        eventMutation.mutateAsync(eventToUpdate);
      }
    } catch (error) {
      console.error("Error resizing event:", error);
    }
  };

  // drag & drop

  const onEventDrop = async (data) => {
    const { start, end, event } = data;
    console.log("drop data", data);
    try {
      if (event?.eventType === "Job") {
        console.log("job drop data", event);
        const jobToUpdate = {
          id: event?.job?.id,
          ScheduleDateEnd: moment(start).format("YYYY-MM-DDTHH:mm"),
        };
        console.log("jobToUpdate", jobToUpdate);
        jobMutation.mutateAsync(jobToUpdate);
      } else {
        const eventToUpdate: SchedulerEventUpdate = {
          id: event?.event?.id,
          title: event?.event?.title,
          startDate: moment(start).format("YYYY-MM-DDTHH:mm"),
          endDate: moment(end).format("YYYY-MM-DDTHH:mm"),
          description: event?.event?.description,
          employeesId: event?.event?.employees
            .map((employee) => employee.id)
            .join(","),
          modifiedByUserId: user?.id,
        };
        eventMutation.mutateAsync(eventToUpdate);
      }
    } catch (error) {
      console.error("Error dropping event:", error);
    }
  };

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError />;

  return (
    <Card mr={12} mb={5} p={10} borderRadius={8} boxShadow={"none"}>
      <HStack mb={3} spacing={4}>
        <CalendarFilterMain onFilterData={handleFilterData} />
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          mt={6}
          size={"md"}
          variant={"outline"}
          fontSize={"md"}
          onClick={() => {
            createEventModal.onOpen();
          }}
        >
          Add
        </Button>
      </HStack>

      <BadgeTypes />
      <DnDCalendar
        // showAllEvents -> scrollable cell if events are more than 3
        // defaultView={"work_week"}
        views={["month", "work_week", "week", "day", "agenda"]}
        dayLayoutAlgorithm="no-overlap"
        events={allEvents}
        eventPropGetter={EventStyling}
        startAccessor="startDate"
        endAccessor="endDate"
        components={{
          event: EventInfo,
        }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        selectable
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

      <CreateEventMain
        createEventModal={createEventModal}
        onEventSubmit={handleCreateEventForm}
        startDateDefault={startDate}
        endDateDefault={endDate}
      />

      <UpdateEventMain
        updateEventModal={updateEventModal}
        eventMain={updateEvent}
        onEventSubmit={handleUpdateEventForm}
      />
    </Card>
  );
};

export default CalendarMain;

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
