import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useMapDataSelector } from 'store/slices/mapSlice';

export const SetViewOnClick: FC = () => {
  const mapData = useMapDataSelector();
  const map = useMap();
  map.options.minZoom = 5;
  useEffect(() => {
    map.setView({ lat: mapData.lat, lng: mapData.lng }, mapData.zoom);
  }, [mapData]);
  return null;
};
