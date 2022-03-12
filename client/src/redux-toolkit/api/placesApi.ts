import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AverageNoteProps, CurrentPlaceProps, LocationProps, NewsProps, OpinionProps, RawPlaceDataProps, VisitProps } from 'contexts/PlaceProps'
import { SelectedLocationProps } from 'redux-toolkit/slices/selectedLocationsSlice'
import { ContactData } from 'requests/PlaceRequests'
import { convertToCurrentPlace } from 'utils/place_data_utils'

interface SelectedLocationsProps {
    locationIds: string[],
    placeId: string
}

type Status = 'open' | 'closed'

interface StatusProps {
    locationId: string,
    status: Status
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


export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}` }),
    tagTypes: ['Places', 'OpeningHours', 'Visits', 'Status', 'SelectedBusinessChain', 'Opinions', 'SelectedPlace', 'SelectedLocations', 'News', 'AverageNote'],
    endpoints: (builder) => ({
        getPlacesByUserId: builder.query<RawPlaceDataProps[], string>({
            query: (uid) => `places?uid=${uid}`,
            providesTags: [{ type: 'Places', id: 'LIST' }]
        }),
        getPlaceById: builder.query<RawPlaceDataProps, string>({
            query: (id) => `places/${id}`,
            providesTags: [{ type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' }]
        }),
        getNewsByLocationId: builder.query<NewsProps[], string>({
            query: (locationId) => ({
                url: 'news',
                params: {
                    locationId: locationId
                }
            }),
            providesTags: ['News']
        }),
        addNews: builder.mutation<void, AddNewsProps>({
            query: ({ locationId, content, title }) => ({
                url: `news`,
                method: 'POST',
                body: {
                    locationId: locationId,
                    content: content,
                    title: title
                }
            }),
            invalidatesTags: ['News'],
        }),
        getPlaceByIdAndSelectedLocation: builder.query<CurrentPlaceProps, PlaceAndLocationProps>({
            query: ({ placeId, locationId }) => `places/${placeId}/locations/${locationId}`,
            providesTags: [{ type: 'SelectedPlace' }],
            transformResponse: (response: RawPlaceDataProps) => convertToCurrentPlace(response)[0]
        }),
        getSelectedLocations: builder.query<SelectedLocationProps[], GetSelectedLocationsProps>({
            query: ({ start, limit }) => ({
                url: `places/active/popular`,
                params: {
                    start: start,
                    limit: limit
                }
            }),
            providesTags: ['SelectedLocations']
        }),
        changeContactDetailsForSelectedLocations: builder.mutation<void, ChangeContactDetailsProps>({
            query: ({ placeId, contactDetails, locationIds }) => ({
                url: `places/${placeId}/locations/contact-details`,
                method: 'PATCH',
                body: {
                    locationIds: locationIds,
                    contactDetails: contactDetails
                },
            }),
            invalidatesTags: [
                { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
                { type: 'Places', id: 'LIST' },
                { type: 'SelectedPlace' }
            ]
        }),
        changeOpeningHoursForSelectedLocations: builder.mutation<void, ChangeOpeningHoursProps>({
            query: ({ placeId, openingHours, locationIds }) => ({
                url: `places/${placeId}/locations/opening-hours`,
                method: 'PATCH',
                body: {
                    locationIds: locationIds,
                    openingHours: openingHours
                },
            }),
            invalidatesTags: [
                { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
                { type: 'OpeningHours' }
            ]
        }),
        addLocations: builder.mutation<void, AddLocationsProps>({
            query: ({ placeId, locations }) => ({
                url: `places/${placeId}/locations`,
                method: 'PATCH',
                body: {
                    locations: locations
                }
            }),
            invalidatesTags: [
                { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
                { type: 'Places', id: 'LIST' }
            ],
        }),
        getOpinionsForSelectedLocation: builder.query<OpinionProps[], string>({
            query: (locationId) => ({
                url: 'opinions',
                params: {
                    locationId: locationId
                }
            }),
            providesTags: ['Opinions']

        }),
        getVisitsForSelectedLocation: builder.query<VisitProps[], string>({
            query: (locationId) => ({
                url: 'visits',
                params: {
                    locationId: locationId
                }
            }),
            providesTags: ['Visits']

        }),
        getOpeningHoursForSelectedLocation: builder.query<OpeningHoursResponse, string>({
            query: (locationId) => `places/${locationId}/opening-hours`,
            providesTags: ['OpeningHours']
        }),
        getAverageNoteForSelectedLocation: builder.query<AverageNoteProps, string>({
            query: (locationId) => ({
                url: `places/${locationId}/average-note`,
            }),
            providesTags: ['AverageNote']
        }),
        getStatusForSelectedLocation: builder.query<string, string>({
            query: (locationId) => ({
                url: `places/${locationId}/status`,
            }),
            providesTags: ['Status']
        }),
        setStatusForSelectedLocation: builder.mutation<void, StatusProps>({
            query: ({ locationId, status }) => ({
                url: `places/${locationId}/status`,
                method: 'PATCH',
                body: {
                    status: status
                }
            }),
            invalidatesTags: ['Status']
        }),

        setSelectedLocationsAlwaysOpen: builder.mutation<void, SelectedLocationsProps>({
            query: ({ placeId, locationIds }) => ({
                url: `places/${placeId}/locations/always-open`,
                method: 'PATCH',
                body: {
                    locationIds: locationIds
                }
            }),
            invalidatesTags: [
                { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
                { type: 'OpeningHours' }
            ],
        }),
        addPlace: builder.mutation<RawPlaceDataProps, FormData>({
            query: (formData) => ({
                url: 'places',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [{ type: 'Places', id: 'LIST' }],
        }),
        deletePlace: builder.mutation<void, string>({
            query: (id) => ({
                url: `places/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Places', id: 'LIST' }],
        }),
        deleteSelectedLocations: builder.mutation<void, SelectedLocationsProps>({
            query: ({ placeId, locationIds }) => ({
                url: `places/${placeId}/locations`,
                method: 'DELETE',
                body: {
                    locationIds: locationIds
                }
            }),
            invalidatesTags: [
                { type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' },
                { type: 'Places', id: 'LIST' }
            ],
        })
    }),

})

export const useGetPlacesByUserId = () => {
    const uid = localStorage.getItem('uid')
    const { useGetPlacesByUserIdQuery } = placesApi
    return useGetPlacesByUserIdQuery(uid as string)
}

export const {

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
    useGetPlaceByIdAndSelectedLocationQuery
} = placesApi

