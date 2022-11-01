import { ContactData } from 'api';
import { EventProps } from 'store/slices/eventSlice';
import { FormLocationProps } from 'store/slices/formLocationsSlice';
import { Opinion, OpinionProps, RawPlaceDataProps, VisitCount, VisitProps } from 'store/slices/PlaceProps';
import { string } from 'yup';

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
  address: string;
  locationId: string;
  place: RawPlaceDataProps;
}

export interface Participator {
  _id: string;
  img: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  isSubscriber: boolean;
}

export interface EventData extends Event {
  participators: Participator[];
}

export interface EventDetails extends Event {
  participators: Participator[];
  isUserOwner: boolean;
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

export interface Code {
  _id: string;
}

export interface PlaceAndLocationProps {
  placeId: string;
  locationId: string;
}

export interface AddLocationsProps {
  placeId: string;
  locations: FormLocationProps[];
}

export interface RewardPayload {
  scheduledFor?: Date;
  date?: Date;
  description: string;
  eventId: string;
  rewardPercentage: number;
}

export interface Reward extends RewardPayload {
  _id: string;
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

export enum NotificationType {
  EVENT = 'event',
  REWARD = 'reward',
  EVENT_TODAY_NEARBY = 'event_today_nearby',
}

export type NotificationStatistics = {
  all: number;
  received: number;
  clicked: number;
  type: NotificationType;
};

export interface VisitLocationProps {
  name: string;
  visits: VisitCount[];
}

export interface Invitation {
  referrer: string;
  invitedUsers: string[];
}

export interface ReferralPayload {
  locationId: string;
  description: string;
  requiredMembersCount: number;
}
export interface Referral extends ReferralPayload {
  _id: string;
  createdAt: Date;
  invitations: Invitation[];
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
