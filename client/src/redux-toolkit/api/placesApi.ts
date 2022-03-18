import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AverageNoteProps, CurrentPlaceProps, LocationProps, NewsProps, Opinion, OpinionProps, RawPlaceDataProps, VisitCount, VisitProps } from 'redux-toolkit/slices/PlaceProps';
import { SelectedLocationProps } from 'redux-toolkit/slices/selectedLocationsSlice';
import { ContactData } from 'requests/PlaceRequests';
import { convertToCurrentPlace } from 'utils/place_data_utils';

interface SelectedLocationsProps {
  locationIds: string[],
  placeId: string
}

type Status = 'open' | 'closed';

interface StatusProps {
  locationId: string,
  status: Status
}

interface OpinionData {
  opinions: OpinionProps[],
  today: number,
}

interface VisitData {
  visits: VisitProps[],
  total: number,
  today: number,
  yesterday: number
}
interface ChangeContactDetailsProps {
  contactDetails: ContactData,
  placeId: string,
  locationIds: string[]

}
interface ChangeOpeningHoursProps {
  openingHours: any,
  placeId: string,
  locationIds: string[]
}

interface PlaceAndLocationProps {
  placeId: string,
  locationId: string
}

interface AddLocationsProps {
  placeId: string,
  locations: LocationProps[]
}

interface GetSelectedLocationsProps {
  start: number,
  limit: number
}

interface AddNewsProps {
  content: string,
  locationId: string,
  title: string
}

interface OpeningHoursResponse {
  openingHours: any,
  alwaysOpen: boolean,
  isActive: boolean
}

interface AddOpinionProps {
  authorId: string,
  locationId: string,
  content: string,
  note: number
}


interface VisitLocationProps{
  name: string,
  visits: VisitCount[]
}


interface OpinionLocationProps{
  name: string,
  opinions: Opinion[]
}
interface AllOpinionsProps{
  total: number,
  today: number,
  locations: OpinionLocationProps[]
}

interface AllVisitsProps{
  total: number,
  today: number,
  locations: VisitLocationProps[]
}


export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    credentials: 'include',
  }),
  tagTypes: ['Places', 'Subscription', 'AllOpinions', 'AllVisits', 'OpeningHours', 'Visits', 'Status', 'SelectedBusinessChain', 'Opinions', 'SelectedPlace', 'SelectedLocations', 'News', 'AverageNote'],
  endpoints: (builder) => ({
    getPlacesByUserId: builder.query<RawPlaceDataProps[], string>({
      query: (uid) => `/places?uid=${uid}`,
      providesTags: [{ type: 'Places', id: 'LIST' }],
    }),
    getPlaceById: builder.query<RawPlaceDataProps, string>({
      query: (id) => `/places/${id}`,
      providesTags: [{ type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' }],
    }),
    getNewsByLocationId: builder.query<NewsProps[], string>({
      query: (locationId) => ({
        url: '/news',
        params: {
          locationId: locationId,
        },
      }),
      providesTags: ['News'],
    }),
    editPlaceData: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/places',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['SelectedPlace'],
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
      invalidatesTags: ['News'],
    }),
    addOpinion: builder.mutation<void, AddOpinionProps>({
      query: (opinion) => ({
        url: '/opinions',
        method: 'POST',
        body: opinion,
      }),
      invalidatesTags: ['Opinions', 'AverageNote'],
    }),
    getPlaceByIdAndSelectedLocation: builder.query<CurrentPlaceProps, PlaceAndLocationProps>({
      query: ({ placeId, locationId }) => `/places/${placeId}/locations/${locationId}`,
      providesTags: [{ type: 'SelectedPlace' }],
      transformResponse: (response: RawPlaceDataProps) => convertToCurrentPlace(response)[0],
    }),
    getSelectedLocations: builder.query<SelectedLocationProps[], GetSelectedLocationsProps>({
      query: ({ start, limit }) => ({
        url: '/places/active/popular',
        params: {
          start: start,
          limit: limit,
        },
      }),
      providesTags: ['SelectedLocations'],
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
        { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
        { type: 'Places', id: 'LIST' },
        { type: 'SelectedPlace' },
      ],
    }),
    changeOpeningHoursForSelectedLocations: builder.mutation<void, ChangeOpeningHoursProps>({
      query: ({ placeId, openingHours, locationIds }) => ({
        url: `/places/${placeId}/locations/opening-hours`,
        method: 'PATCH',
        body: {
          locationIds: locationIds,
          openingHours: openingHours,
        },
      }),
      invalidatesTags: [
        { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
        { type: 'OpeningHours' },
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
        { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
        { type: 'Places', id: 'LIST' },
      ],
    }),
    getOpinionsForSelectedLocation: builder.query<OpinionData, string>({
      query: (locationId) => ({
        url: '/opinions',
        params: {
          locationId: locationId,
        },
      }),
      providesTags: ['Opinions'],

    }),
    getAllOpinionsByUserId: builder.query<AllOpinionsProps, void>({
      query: () => ({
        url: '/opinions',
        params: {
          uid: localStorage.getItem('uid'), 
        },
      }),
      providesTags: ['AllOpinions'],
    }),
    getVisitsForSelectedLocation: builder.query<VisitData, string>({
      query: (locationId) => ({
        url: '/visits',
        params: {
          locationId: locationId,
        },
      }),
      providesTags: ['Visits'],

    }),
    getAllVisitsByUserId: builder.query<AllVisitsProps, void>({
      query: () => ({
        url: '/visits',
        params: {
          uid: localStorage.getItem('uid'), 
        },
      }),
      providesTags: ['AllVisits'],
    }),
    getOpeningHoursForSelectedLocation: builder.query<OpeningHoursResponse, string>({
      query: (locationId) => `/places/${locationId}/opening-hours`,
      providesTags: ['OpeningHours'],
    }),
    getAverageNoteForSelectedLocation: builder.query<AverageNoteProps, string>({
      query: (locationId) => ({
        url: `/places/${locationId}/average-note`,
      }),
      providesTags: ['AverageNote'],
    }),
    getStatusForSelectedLocation: builder.query<string, string>({
      query: (locationId) => ({
        url: `/places/${locationId}/status`,
      }),
      providesTags: ['Status'],
    }),
    setStatusForSelectedLocation: builder.mutation<void, StatusProps>({
      query: ({ locationId, status }) => ({
        url: `/places/${locationId}/status`,
        method: 'PATCH',
        body: {
          status: status,
        },
      }),
      invalidatesTags: ['Status'],
    }),

    setSelectedLocationsAlwaysOpen: builder.mutation<void, SelectedLocationsProps>({
      query: ({ placeId, locationIds }) => ({
        url: `/places/${placeId}/locations/always-open`,
        method: 'PATCH',
        body: {
          locationIds: locationIds,
        },
      }),
      invalidatesTags: [
        { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
        { type: 'OpeningHours' },
      ],
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
        url: `/users/${localStorage.getItem('uid')}/subscriptions`,
        method: 'PATCH',
        body: {
          locationId: locationId,
        },
      }),
      invalidatesTags: ['Subscription'],
    }),
    unsubscribeLocation: builder.mutation<void, string>({
      query: (locationId) => ({
        url: `/users/${localStorage.getItem('uid')}/subscriptions/${locationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),
    isUserSubscriber: builder.query<boolean, string>({
      query: (locationId) => `/users/${localStorage.getItem('uid')}/subscriptions/${locationId}`,
      providesTags: ['Subscription'],
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
} = placesApi;

