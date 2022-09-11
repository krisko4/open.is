import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearcherOptionsProps } from 'store/slices/searcherOptionsSlice';
import myAxios from '../axios/axios';

export interface ContactData {
  website?: string;
  phone?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
}

const provider = new OpenStreetMapProvider({
  params: {
    addressdetails: 1,
  },
});

export const getPaginatedPlaces = async (
  fetchUrl: string,
  start: number,
  limit: number,
  searcherOptions: SearcherOptionsProps[]
) => {
  const searchParams: any = {};
  searcherOptions.forEach((option) => {
    const key = option.foundBy;
    const value = option.name;
    searchParams[key] = value;
  });
  return myAxios.get(fetchUrl, {
    params: {
      start: start,
      limit: limit,
      ...searchParams,
    },
  });
};

export const findByAddress = async (inputValue: string) => {
  const result = await provider.search({ query: inputValue });
  if (result) {
    const inputArray = inputValue.split(' ');
    const upperCasedInputArray = inputArray.map((input) => {
      return input.charAt(0).toUpperCase() + input.slice(1);
    });
    const upperCasedInput = upperCasedInputArray.toString().replace(/,/gi, ' ');
    result.forEach((address: any) => {
      const addressArray = address.label.split(', ');
      const filteredAddressArray = addressArray.filter((adr: any) => {
        return !upperCasedInputArray.includes(adr);
      });
      filteredAddressArray.splice(0, 0, upperCasedInput);
      address.name = filteredAddressArray.toString();
      address.type = 'address';
    });
  }
  return result;
};

const getPlacesWithParams = async (url: string, params: any) => {
  try {
    const response = await myAxios.get(url, {
      params: params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPlacesBySearchParams = async (searchParams: SearcherOptionsProps[]) => {
  const names: string[] = [];
  const addresses: string[] = [];
  const types: string[] = [];
  searchParams.forEach((param) =>
    param.foundBy === 'name'
      ? names.push(param.name)
      : param.foundBy === 'type'
      ? types.push(param.name)
      : addresses.push(param.name)
  );
  const params: any = {};
  if (addresses.length > 0) params.address = addresses.join('|');
  if (names.length > 0) params.name = names.join('|');
  if (types.length > 0) params.type = types.join('|');
  params.start = 0;
  params.limit = 10;
  return getPlacesWithParams('/places/active/paginated', params);
};

export const getPlacesByAddress = (address: string) => {
  return myAxios.get('/places/active', {
    params: {
      address: address,
    },
  });
};

export const getPlaceById = (placeId: string) => myAxios.get(`/places/${placeId}`);

export const getPlaceByIdAndSelectedLocation = (placeId: string, locationId: string) =>
  myAxios.get(`/places/${placeId}/locations/${locationId}`);

export const getPlaceByLatLng = (lat: number, lng: number) => {
  return myAxios.get('/places/by-coords', {
    params: {
      lat: lat,
      lng: lng,
    },
  });
};

export const incrementVisitCount = (placeId: string) => {
  return myAxios.patch(`/places/${placeId}/visit-count`);
};

export const getPlaces = async (url: string) => {
  try {
    const response = await myAxios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFoundPlaceNamesOrTypes = (inputValue: string) =>
  getPlacesWithParams('/places/active/name-or-type', { inputValue: inputValue });

export const getPlacesByUserId = (uid: string) => getPlacesWithParams('/places', { uid: uid });
