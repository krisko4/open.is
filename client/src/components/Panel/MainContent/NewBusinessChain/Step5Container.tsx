import { CurrentPlaceProps } from 'redux-toolkit/slices/PlaceProps';
import { FC, useMemo } from 'react';
import { useCurrentPlaceSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { Step5 } from '../NewPlace/Steps/Step5/Step5';
import { useFormLocationsSelector } from 'redux-toolkit/slices/formLocationsSlice';

interface Props {
  isEditionMode?: boolean;
  logoFile: File | null;
  initialPlaceData?: CurrentPlaceProps;
}

export const Step5Container: FC<Props> = ({ isEditionMode, initialPlaceData, logoFile }) => {
  const currentPlace = useCurrentPlaceSelector();
  const formLocations = useFormLocationsSelector();

  const formData = useMemo(() => {
    const data = new FormData();
    const images: any = currentPlace.images.filter((image) => image.file).map((image) => image.file);
    const place = {
      logo: logoFile as File,
      name: currentPlace.name,
      subtitle: currentPlace.subtitle,
      description: currentPlace.description,
      type: currentPlace.type as string,
      isBusinessChain: 'true',
    };
    const locations = Object.values(formLocations).map((location) => {
      const newLocation = { ...location };
      newLocation.facebook = 'https://facebook.com/' + newLocation.facebook;
      newLocation.instagram = 'https://instagram.com/' + newLocation.instagram;
      return newLocation;
    });
    let key: keyof typeof place;
    for (key in place) data.append(key, place[key]);
    data.append('locations', JSON.stringify(locations));
    for (const image of images) {
      data.append('images', image);
    }
    return data;
  }, [logoFile, currentPlace.images]);
  return <Step5 initialPlaceData={initialPlaceData} isEditionMode={isEditionMode} formData={formData} />;
};
