import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventProps } from 'redux-toolkit/slices/eventSlice';
import { AverageNoteProps, CurrentPlaceProps, NewsProps, RawPlaceDataProps } from 'redux-toolkit/slices/PlaceProps';
import { SelectedLocationProps } from 'redux-toolkit/slices/selectedLocationsSlice';
import { convertToCurrentPlace } from 'utils/place_data_utils';
import { TagTypes } from './tag-types';
import {
  AddNewsProps,
  AddOpinionProps,
  PlaceAndLocationProps,
  GetSelectedLocationsProps,
  ChangeContactDetailsProps,
  ChangeOpeningHoursProps,
  AddLocationsProps,
  OpinionData,
  AllOpinionsProps,
  VisitData,
  AllVisitsProps,
  OpeningHoursResponse,
  StatusProps,
  SelectedLocationsProps,
  Subscription,
  Subscriber,
  EventData,
} from './types';

export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    credentials: 'include',
  }),
  tagTypes: Object.keys(TagTypes),
  // tagTypes: [
  //   'Places',
  //   'Subscription',
  //   'AllOpinions',
  //   'AllVisits',
  //   'OpeningHours',
  //   'Visits',
  //   'Status',
  //   'SelectedBusinessChain',
  //   'Opinions',
  //   'SelectedPlace',
  //   'SelectedLocations',
  //   'News',
  //   'AverageNote',
  //   'Subscribers',
  //   'Events',
  // ],
  endpoints: (builder) => ({
    getPlacesByUserId: builder.query<RawPlaceDataProps[], string>({
      query: (uid) => `/places/search?uid=${uid}`,
      providesTags: [{ type: TagTypes.PLACES, id: 'LIST' }],
    }),
    getPlaceById: builder.query<RawPlaceDataProps, string>({
      query: (id) => `/places/${id}`,
      providesTags: [{ type: TagTypes.SELECTED_BUSINESS_CHAIN, id: 'BUSINESS_CHAIN' }],
    }),
    getNewsByLocationId: builder.query<NewsProps[], string>({
      query: (locationId) => ({
        url: '/news',
        params: {
          locationId: locationId,
        },
      }),
      providesTags: [TagTypes.NEWS],
    }),
    editPlaceData: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/places',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: [TagTypes.SELECTED_PLACE, { type: TagTypes.PLACES, id: 'LIST' }],
    }),
    addNews: builder.mutation<void, AddNewsProps>({
      query: ({ locationId, content, title }) => ({
        url: '/news',
        method: 'POST',
        body: {
          locationId: locationId,
          content: content,
          title: title,
        },
      }),
      invalidatesTags: [TagTypes.NEWS],
    }),
    addOpinion: builder.mutation<void, AddOpinionProps>({
      query: (opinion) => ({
        url: '/opinions',
        method: 'POST',
        body: opinion,
      }),
      invalidatesTags: [TagTypes.OPINIONS, TagTypes.AVERAGE_NOTE],
    }),
    getPlaceByIdAndSelectedLocation: builder.query<CurrentPlaceProps, PlaceAndLocationProps>({
      query: ({ placeId, locationId }) => `/places/${placeId}/locations/${locationId}`,
      providesTags: [{ type: TagTypes.SELECTED_PLACE }],
      transformResponse: (response: RawPlaceDataProps) => convertToCurrentPlace(response)[0],
    }),
    getSelectedLocations: builder.query<SelectedLocationProps[], GetSelectedLocationsProps>({
      query: ({ start, limit }) => ({
        url: '/places/popular',
        params: {
          start: start,
          limit: limit,
        },
      }),
      providesTags: [TagTypes.SELECTED_LOCATIONS],
    }),
    changeContactDetailsForSelectedLocations: builder.mutation<void, ChangeContactDetailsProps>({
      query: ({ placeId, contactDetails, locationIds }) => ({
        url: `/places/${placeId}/locations/contact-details`,
        method: 'PATCH',
        body: {
          locationIds: locationIds,
          contactDetails: contactDetails,
        },
      }),
      invalidatesTags: [
        { type: TagTypes.SELECTED_BUSINESS_CHAIN, id: 'BUSINESS_CHAIN' },
        { type: TagTypes.PLACES, id: 'LIST' },
        TagTypes.SELECTED_PLACE,
      ],
    }),
    changeOpeningHoursForSelectedLocations: builder.mutation<void, ChangeOpeningHoursProps>({
      query: ({ placeId, openingHours, locationIds }) => ({
        url: `/places/${placeId}/opening-hours`,
        method: 'PATCH',
        body: {
          locationIds: locationIds,
          openingHours: openingHours,
        },
      }),
      invalidatesTags: [
        { type: TagTypes.SELECTED_BUSINESS_CHAIN, id: 'BUSINESS_CHAIN' },
        TagTypes.OPENING_HOURS,
        { type: TagTypes.PLACES, id: 'LIST' },
      ],
    }),
    addLocations: builder.mutation<void, AddLocationsProps>({
      query: ({ placeId, locations }) => ({
        url: `/places/${placeId}/locations`,
        method: 'PATCH',
        body: {
          locations: locations,
        },
      }),
      invalidatesTags: [
        { type: TagTypes.SELECTED_BUSINESS_CHAIN, id: 'BUSINESS_CHAIN' },
        { type: TagTypes.PLACES, id: 'LIST' },
      ],
    }),
    getOpinionsForSelectedLocation: builder.query<OpinionData, string>({
      query: (locationId) => ({
        url: '/opinions/search',
        params: {
          locationId: locationId,
        },
      }),
      providesTags: [TagTypes.OPINIONS],
    }),
    getAllOpinionsByUserId: builder.query<AllOpinionsProps, void>({
      query: () => ({
        url: '/opinions/search',
        params: {
          uid: localStorage.getItem('uid'),
        },
      }),
      providesTags: [TagTypes.ALL_OPINIONS],
    }),
    getVisitsForSelectedLocation: builder.query<VisitData, string>({
      query: (locationId) => ({
        url: '/visits/search',
        params: {
          locationId: locationId,
        },
      }),
      providesTags: [TagTypes.VISITS],
    }),
    getAllVisitsByUserId: builder.query<AllVisitsProps, void>({
      query: () => ({
        url: '/visits/search',
        params: {
          uid: localStorage.getItem('uid'),
        },
      }),
      providesTags: [TagTypes.ALL_VISITS],
    }),
    getOpeningHoursForSelectedLocation: builder.query<OpeningHoursResponse, string>({
      query: (locationId) => `/places/${locationId}/opening-hours`,
      providesTags: [TagTypes.OPENING_HOURS],
    }),
    getAverageNoteForSelectedLocation: builder.query<AverageNoteProps, string>({
      query: (locationId) => ({
        url: `/places/${locationId}/average-note`,
      }),
      providesTags: [TagTypes.AVERAGE_NOTE],
    }),
    getStatusForSelectedLocation: builder.query<string, string>({
      query: (locationId) => ({
        url: `/places/${locationId}/status`,
        responseHandler: (response) => response.text(),
      }),
      providesTags: [TagTypes.STATUS],
    }),
    setStatusForSelectedLocation: builder.mutation<void, StatusProps>({
      query: ({ locationId, status }) => ({
        url: `/places/${locationId}/status`,
        method: 'PATCH',
        body: {
          status: status,
        },
      }),
      invalidatesTags: [TagTypes.STATUS],
    }),

    setSelectedLocationsAlwaysOpen: builder.mutation<void, SelectedLocationsProps>({
      query: ({ placeId, locationIds }) => ({
        url: `/places/${placeId}/always-open`,
        method: 'PATCH',
        body: {
          locationIds: locationIds,
        },
      }),
      invalidatesTags: [{ type: TagTypes.SELECTED_BUSINESS_CHAIN, id: 'BUSINESS_CHAIN' }, TagTypes.OPENING_HOURS],
    }),
    addEvent: builder.mutation<EventProps, FormData>({
      query: (formData) => ({
        url: '/events',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [TagTypes.EVENTS],
    }),
    getEventsByLocationId: builder.query<EventData[], string>({
      query: (locationId) => ({
        url: '/events',
        params: {
          locationId,
        },
      }),
      providesTags: [TagTypes.EVENTS],
    }),
    addPlace: builder.mutation<RawPlaceDataProps, FormData>({
      query: (formData) => ({
        url: '/places',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Places', id: 'LIST' }],
    }),
    subscribeLocation: builder.mutation<void, string>({
      query: (locationId) => ({
        url: `/subscriptions`,
        method: 'POST',
        body: {
          userId: localStorage.getItem('uid'),
          locationId: locationId,
        },
      }),
      invalidatesTags: ['Subscription'],
    }),
    unsubscribeLocation: builder.mutation<void, string>({
      query: (locationId) => ({
        url: `/subscriptions`,
        method: 'DELETE',
        params: {
          userId: localStorage.getItem('uid'),
          locationId: locationId,
        },
      }),
      invalidatesTags: ['Subscription'],
    }),
    isUserSubscriber: builder.query<boolean, string>({
      query: (locationId) => ({
        url: `/subscriptions`,
        method: 'GET',
        params: {
          userId: localStorage.getItem('uid'),
          locationId: locationId,
        },
      }),
      transformResponse: (response: Subscription | null) => response !== null,
      providesTags: ['Subscription'],
    }),
    getSubscribersForSelectedLocation: builder.query<Subscriber[], string>({
      query: (locationId) => `/places/${locationId}/subscribers`,
      providesTags: ['Subscribers'],
    }),
    deletePlace: builder.mutation<void, string>({
      query: (id) => ({
        url: `/places/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Places', id: 'LIST' }],
    }),
    deleteSelectedLocations: builder.mutation<void, SelectedLocationsProps>({
      query: ({ placeId, locationIds }) => ({
        url: `/places/${placeId}/locations`,
        method: 'DELETE',
        body: {
          locationIds: locationIds,
        },
      }),
      invalidatesTags: [
        { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
        { type: 'Places', id: 'LIST' },
      ],
    }),
  }),
});

export const useGetPlacesByUserId = () => {
  const uid = localStorage.getItem('uid');
  const { useGetPlacesByUserIdQuery } = placesApi;
  return useGetPlacesByUserIdQuery(uid as string);
};

export const {
  useGetSubscribersForSelectedLocationQuery,
  useAddOpinionMutation,
  useIsUserSubscriberQuery,
  useSubscribeLocationMutation,
  useEditPlaceDataMutation,
  useGetOpeningHoursForSelectedLocationQuery,
  useGetAverageNoteForSelectedLocationQuery,
  useGetStatusForSelectedLocationQuery,
  useSetStatusForSelectedLocationMutation,
  useGetOpinionsForSelectedLocationQuery,
  useGetVisitsForSelectedLocationQuery,
  useAddNewsMutation,
  useGetNewsByLocationIdQuery,
  useGetSelectedLocationsQuery,
  useSetSelectedLocationsAlwaysOpenMutation,
  useChangeOpeningHoursForSelectedLocationsMutation,
  useDeletePlaceMutation,
  useGetPlaceByIdQuery,
  useDeleteSelectedLocationsMutation,
  useGetPlacesByUserIdQuery,
  useAddPlaceMutation,
  useAddLocationsMutation,
  useChangeContactDetailsForSelectedLocationsMutation,
  useGetPlaceByIdAndSelectedLocationQuery,
  useUnsubscribeLocationMutation,
  useGetAllVisitsByUserIdQuery,
  useGetAllOpinionsByUserIdQuery,
  useAddEventMutation,
  useGetEventsByLocationIdQuery,
} = placesApi;
