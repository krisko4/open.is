import { RawPlaceDataProps, Image } from '../redux-toolkit/slices/PlaceProps';

export const convertToCurrentPlace = (place: RawPlaceDataProps) => {
  const { locations } = place;
  let images = place.images.map((image) => {
    const returnedVal: Image = {
      img: image as string,
      file: null,
    };
    return returnedVal;
  });
  if (place.images.length === 0) {
    images = [{ img: '', file: null }];
  }
  const currentPlaces = locations.map((location) => {
    return {
      ...location,
      businessId: place._id,
      name: place.name,
      type: place.type,
      description: place.description,
      subtitle: place.subtitle,
      logo: place.logo,
      images: images,
      userId: place.userId,
      isUserOwner: place.isUserOwner,
      isBusinessChain: place.isBusinessChain,
    };
  });
  return currentPlaces;
};
