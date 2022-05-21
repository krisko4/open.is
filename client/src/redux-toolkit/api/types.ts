import { UserData } from 'contexts';
import { EventProps } from 'redux-toolkit/slices/eventSlice';
import { FormLocationProps } from 'redux-toolkit/slices/formLocationsSlice';
import { OpinionProps, VisitProps, VisitCount, Opinion } from 'redux-toolkit/slices/PlaceProps';
import { ContactData } from 'requests';

export interface SelectedLocationsProps {
  locationIds: string[];
  placeId: string;
}

export type Status = 'open' | 'closed';

export interface StatusProps {
  locationId: string;
  status: Status;
}

export interface OpinionData {
  opinions: OpinionProps[];
  today: number;
}

export interface VisitData {
  visits: VisitProps[];
  total: number;
  today: number;
  yesterday: number;
}

interface Event {
  _id: string;
  title: string;
  content: string;
  img: string;
  startDate: Date;
  endDate: Date;
  locationId: string;
}

export interface EventData extends Event {
  participators: string[];
}

export interface EventDetails extends Event {
  participators: UserData[];
}

export interface ChangeContactDetailsProps {
  contactDetails: ContactData;
  placeId: string;
  locationIds: string[];
}
export interface ChangeOpeningHoursProps {
  openingHours: any;
  placeId: string;
  locationIds: string[];
}

export interface PlaceAndLocationProps {
  placeId: string;
  locationId: string;
}

export interface AddLocationsProps {
  placeId: string;
  locations: FormLocationProps[];
}

export interface GetSelectedLocationsProps {
  start: number;
  limit: number;
}

export interface AddNewsProps {
  content: string;
  locationId: string;
  title: string;
}

export interface OpeningHoursResponse {
  openingHours: any;
  alwaysOpen: boolean;
  isActive: boolean;
}

export interface AddOpinionProps {
  authorId: string;
  locationId: string;
  content: string;
  note: number;
}

export interface VisitLocationProps {
  name: string;
  visits: VisitCount[];
}

export interface OpinionLocationProps {
  name: string;
  opinions: Opinion[];
}
export interface AllOpinionsProps {
  total: number;
  today: number;
  locations: OpinionLocationProps[];
}

export interface AllVisitsProps {
  total: number;
  today: number;
  locations: VisitLocationProps[];
}

export interface Subscriber {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  placeId: string;
  locationId: string;
  subscribedAt: Date;
  birthdate: Date;
}

export interface Subscription {
  user: string;
  locationId: string;
  subscribedAt: Date;
}
