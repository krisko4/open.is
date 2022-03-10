import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LocationProps, RawPlaceDataProps } from 'contexts/PlaceProps'
import { ContactData } from 'requests/PlaceRequests'

interface SelectedLocationsProps {
    locationIds: string[],
    placeId: string
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
export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}` }),
    tagTypes: ['Places', 'SelectedBusinessChain', 'SelectedPlace'],
    endpoints: (builder) => ({
        getPlacesByUserId: builder.query<RawPlaceDataProps[], string>({
            query: (uid) => `places?uid=${uid}`,
            providesTags: [{ type: 'Places', id: 'LIST' }]
        }),
        getPlaceById: builder.query<RawPlaceDataProps, string>({
            query: (id) => `places/${id}`,
            providesTags: [{ type: 'SelectedBusinessChain', id: 'BUSINESS_CHAIN' }]
        }),
        getPlaceByIdAndSelectedLocation: builder.query<RawPlaceDataProps, PlaceAndLocationProps>({
            query: ({ placeId, locationId }) => `places/${placeId}/locations/${locationId}`,
            providesTags: [{ type: 'SelectedPlace' }]
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
                { type: 'Places', id: 'LIST' },
                { type: 'SelectedPlace' }
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
                { type: 'Places', id: 'LIST' },
                { type: 'SelectedPlace' }
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

