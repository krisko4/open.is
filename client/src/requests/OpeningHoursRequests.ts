import myAxios from '../axios/axios';

export const changeOpeningHours = (locationId: string, hours: any) => {
  console.log({ openingHours: hours });
  return myAxios.patch(`/places/${locationId}/opening-hours`, { openingHours: hours });
};


export const changeOpeningHoursForSelectedLocations = (businessId: string, openingHours: any, locationIds: string[]) =>
  myAxios.patch(`/places/${businessId}/locations/opening-hours`, {
    openingHours: openingHours,
    locationIds: locationIds,
  });

export const setSelectedLocationsAlwaysOpen = (businessId: string, locationIds: string[]) =>
  myAxios.patch(`/places/${businessId}/locations/always-open`, {
    locationIds: locationIds,
  });

export const setPlaceAlwaysOpen = (locationId: string) =>
  myAxios.patch(`/places/${locationId}/always-open`);