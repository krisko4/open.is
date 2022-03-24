import { format } from 'date-fns';
import { Image, OpeningHoursProps } from '../redux-toolkit/slices/PlaceProps';

export const defaultNews = [
  {
    title: 'This will be your first news!',
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    content:
      'This is just an example of what your news will look like. It will disappear after your first news is created.',
  },
  {
    title: 'This will be your second news!',
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    content: 'It is going to be fun!',
  },
  {
    title: 'Thank your for using our services 💌',
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    content: 'We appreciate you.',
  },
];

export const defaultImages: Image[] = [
  { img: '', file: null },
  { img: '', file: null },
  { img: '', file: null },
  { img: '', file: null },
];

export const defaultAverageNote = {
  ones: 0,
  twos: 0,
  threes: 0,
  fours: 0,
  fives: 0,
  average: 0,
};

enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}

export const defaultLocations = [
  {
    email: '',
    website: '',
    instagram: '',
    lat: 0,
    lng: 0,
    address: '',
    facebook: '',
    phone: '',
    opinions: [],
    visits: [],
    news: defaultNews,
    isActive: false,
    status: Status.CLOSED,
    visitCount: 0,
    averageNote: defaultAverageNote,
  },
];

const defaultStartHour = new Date(0, 0, 0, 8);
const defaultEndHour = new Date(0, 0, 0, 18);

export const defaultOpeningHours: OpeningHoursProps = {
  monday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
  tuesday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
  wednesday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
  thursday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
  friday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
  saturday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
  sunday: {
    start: defaultStartHour,
    end: defaultEndHour,
    valid: true,
    open: false,
  },
};
