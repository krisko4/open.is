import myAxios from "../axios/axios";

export const changeOpeningHours = (locationId: string, hours: any) => {
    console.log({ openingHours: hours })
    return myAxios.patch(`/places/${locationId}/opening-hours`, { openingHours: hours })
}

export const setPlaceAlwaysOpen = (locationId: string, alwaysOpen: boolean) =>
    myAxios.patch(`/places/${locationId}/always-open`, { alwaysOpen: alwaysOpen })