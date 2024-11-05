'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar, dayjsLocalizer, View, ToolbarProps, Views, NavigateAction } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs, { Dayjs } from 'dayjs';
import { Chip, Box, Paper, Typography, Stack, IconButton } from '@mui/material';
import { Plus, SkipBack, SkipForward } from '@phosphor-icons/react/dist/ssr';
import CustomModal from '@/components/dashboard/properties/manage-properties/custom-dialog';
import type { Event } from '@/types/event';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EventForm from '@/components/dashboard/calendar/event-form';
import { useUser } from '@/hooks/use-user';
import { User } from '@/types/user';
import './styles.css';

const localizer = dayjsLocalizer(dayjs);

interface CustomToolbarProps extends ToolbarProps<Event, object> {
  onAddEvent: () => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, view, onNavigate, onView, onAddEvent }) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs(date));

  const dateText = React.useMemo(() => {
    if (view === Views.DAY) return dayjs(date).format(
      'dddd, MMMM DD'
    );
    if (view === Views.WEEK) {
      const from = dayjs(date).startOf('week');
      const to = dayjs(date).endOf('week');
      return `${from.format('MMM D')} - ${to.format('MMM D, YYYY')}`;
    }
    if (view === Views.MONTH) return dayjs(date).format(
      'MMMM YYYY'
    );
  }, [date, view])

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDateValue(newDate); // Update the DatePicker's value
      onNavigate('DATE', newDate.toDate()); // Correctly pass 'DATE' as the NavigateAction
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ width: '100%', padding: '4px 7x' }} mb={2}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Calendar</Typography>
        </Stack>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Date picker"
                value={dateValue}
                onChange={handleDateChange}
                sx={{
                  width: '100%', // Make width responsive
                  borderRadius: 2,
                  '& .MuiInputBase-root': {
                    height: '35px', // Set the height of the root input element
                    '& .MuiInputBase-input': {
                      height: '35px', // Set the height of the input element
                      textAlign: 'left',
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        display: 'none', // Hide the spinner buttons for Chrome, Safari, Edge, Opera
                      },
                      '&[type=number]': {
                        MozAppearance: 'textfield', // Hide the spinner buttons for Firefox
                      },
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '35px', // Set the height of the outlined input element
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ width: '100%', padding: '4px 7x' }} mb={2}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <IconButton onClick={() => onNavigate('PREV')}>
            <SkipBack />
          </IconButton>
          <Typography variant="body2">{dateText}</Typography>
          <IconButton onClick={() => onNavigate('NEXT')}>
            <SkipForward />
          </IconButton>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5
          }
        }}>
          <Chip
            label="Month View"
            variant={view === 'month' ? 'filled' : 'outlined'}
            color={view === 'month' ? 'primary' : 'default'}
            onClick={() => {
              if (onView) {
                onView('month');
              }
            }}
            sx={{
              p: 0,
              fontSize: {
                xs: '0.5rem',
                sm: '0.7rem',
                md: '0.8rem',
                lg: '0.9rem',
                xl: '1rem'
              }
            }}
          />
          <Chip
            label="Week View"
            variant={view === 'week' ? 'filled' : 'outlined'}
            color={view === 'week' ? 'primary' : 'default'}
            onClick={() => {
              if (onView) {
                onView('week');
              }
            }}
            sx={{
              p: 0,
              fontSize: {
                xs: '0.5rem',
                sm: '0.7rem',
                md: '0.8rem',
                lg: '0.9rem',
                xl: '1rem'
              }
            }}
          />
          <Chip
            label="Day View"
            variant={view === 'day' ? 'filled' : 'outlined'}
            color={view === 'day' ? 'primary' : 'default'}
            onClick={() => {
              if (onView) {
                onView('day');
              }
            }}
            sx={{
              p: 0,
              fontSize: {
                xs: '0.5rem',
                sm: '0.7rem',
                md: '0.8rem',
                lg: '0.9rem',
                xl: '1rem'
              }
            }}
          />
          <Chip
            label="Agenda"
            variant={view === 'agenda' ? 'filled' : 'outlined'}
            color={view === 'agenda' ? 'primary' : 'default'}
            onClick={() => {
              if (onView) {
                onView('agenda');
              }
            }}
            sx={{
              p: 0,
              fontSize: {
                xs: '0.5rem',
                sm: '0.7rem',
                md: '0.8rem',
                lg: '0.9rem',
                xl: '1rem'
              }
            }}
          />
          <IconButton onClick={onAddEvent}>
            <Plus size={24} />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

const MyCalendar: React.FC = () => {
  const { user } = useUser();
  const [localUser, setLocalUser] = useState<User | null>(user);
  React.useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const [events, setEvents] = useState<Event[]>([]); // State to store events
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [view, setView] = useState<View>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [eventData, setEventData] = useState<Event | null>({
    title: '',
    allDay: false,
    start: new Date(),
    end: new Date(),
    resources: {
      id: '',
      userId: localUser?.userId || 'user1',
      userName: `${localUser?.name} ${localUser?.surname}`,
      image: `${localUser?.avatar}` || 'assets/avatar.png',
      description: '',
      status: 'active',
      isFeatured: false,
    }
  });

  React.useEffect(() => {
    const fetchEvents = async () => {
      if (!localUser) return; // Exit if there is no user

      try {
        const response = await fetch('/api/events'); // Adjust the endpoint if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json() as Event[];
        console.log('Fetched events:', data);
        const formattedEvents = data.map(event => {
          const start = event.start ? new Date(event.start) : new Date(); // Use current date if undefined
          const end = event.end ? new Date(event.end) : new Date(); // Use current date if undefined
          return {
            ...event,
            start,
            end,
          };
        });

        setEvents(formattedEvents); // Set the fetched events to the state
      } catch (err) {
        setError(err as string); // Set error message if there's an error
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchEvents(); // Call the fetch function
  }, [localUser, dialogOpen, addEventOpen]);

  const handleDateSelection = ({ start, end }: { start: Date; end: Date }) => {
    setEventData({
      title: '',
      allDay: false,
      start,
      end,
      resources: {
        id: '',
        userId: localUser?.userId || 'user1',
        userName: `${localUser?.name} ${localUser?.surname}`,
        image: `${localUser?.avatar}` || 'assets/avatar.png',
        description: '',
        status: 'active',
        isFeatured: false,
      }
    });
    setDialogOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setEventData(event);
    setAddEventOpen(true);
  };

  const handleAddEvent = () => {
    setDialogOpen(true);
  };

  return (
    <Box height="100%" flexDirection="column" width="100%" gap={2} p={1}>
      <Box flex={1} width="100%" overflow="auto" position={'relative'}>
        <Paper style={{ width: '100%', minWidth: '500px', height: '100%' }}>
          <Calendar
            events={events}
            components={{
              toolbar: (props) => <CustomToolbar {...props} onAddEvent={handleAddEvent} />,
            }}
            onNavigate={(newDate) => setSelectedDate(newDate)}
            localizer={localizer}
            style={{ height: 500 }}
            toolbar
            view={view}
            date={selectedDate || new Date()}
            startAccessor="start"
            endAccessor="end"
            onView={(newView) => setView(newView)}
            onDrillDown={(date) => setSelectedDate(date)}
            selectable
            onSelectSlot={handleDateSelection}
            onSelectEvent={handleEventClick}
            getDrilldownView={() => 'day'}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: 'none',
              },
            })}
          />
        </Paper>
      </Box>
      <CustomModal open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <EventForm initialEventData={eventData} />
      </CustomModal>

      <CustomModal open={addEventOpen} onClose={() => setAddEventOpen(false)}>
        <EventForm initialEventData={eventData} isEditing={true} />
      </CustomModal>
    </Box>
  );
};

export default MyCalendar;
