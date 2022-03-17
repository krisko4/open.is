import { CurrentPlaceProps } from 'redux-toolkit/slices/PlaceProps';
import { FC, useMemo } from 'react';
import { useCurrentPlaceSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { Step5 } from './Step5/Step5';

interface Props {
  isEditionMode?: boolean,
  logoFile: File | null,
  initialPlaceData? : CurrentPlaceProps
}

export const Step5Container: FC<Props> = ({ initialPlaceData, isEditionMode, logoFile }) => {

  const currentPlace = useCurrentPlaceSelector();

  const formData = useMemo(() => {
    const images: any = currentPlace.images.filter(image => image.file !== null).map(image => image.file);
    const place = {
      logo: logoFile as File,
      name: currentPlace.name,
      subtitle: currentPlace.subtitle,
      description: currentPlace.description,
      type: currentPlace.type as string,
      isBusinessChain: 'false',
    };
    const locations = [
      {
        address: currentPlace.address,
        addressId: currentPlace.addressId,
        addressLanguage: currentPlace.addressLanguage,
        lat: currentPlace.lat,
        lng: currentPlace.lng,
        phone: currentPlace.phone,
        email: currentPlace.email,
        website: currentPlace.website,
        facebook: `https://facebook.com/${currentPlace.facebook}`,
        instagram: `https://instagram.com/${currentPlace.instagram}`,

      },
    ];
    const form = new FormData();
    let key: keyof typeof place;
    for (key in place) form.append(key, place[key]);
    form.append('locations', JSON.stringify(locations));
    for (const image of images) {
      form.append('images', image);
    }
    return form;
  }, [logoFile, currentPlace.images ]);

  return <Step5 initialPlaceData={initialPlaceData} isEditionMode={isEditionMode} formData={formData} />;

};