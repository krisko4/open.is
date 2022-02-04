import myAxios from "../axios/axios";

export const changeOpeningHours = (locationId: string, hours : any) =>
    myAxios.patch(`/places/${locationId}/opening-hours`, hours)