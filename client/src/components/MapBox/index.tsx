import 'leaflet/dist/leaflet.css';
import { FC, useMemo, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapDataSelector } from 'store/slices/mapSlice';
import { useSelectedLocationsSelector } from 'store/slices/selectedLocationsSlice';
import { useColorMode } from '../../contexts/ColorModeContext';
import { PlaceMarker } from './PlaceMarker';
import { SetViewOnClick } from './SetViewOnClick';

interface Props {
  isMarkerDraggable?: boolean;
}

export const MapBox: FC<Props> = ({ isMarkerDraggable }) => {
  const mapData = useMapDataSelector();
  const selectedLocations = useSelectedLocationsSelector();
  const layerRef = useRef<any>(null);
  const { mode } = useColorMode();

  const tileLayer = useMemo(() => {
    const attribution = 'copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const url =
      mode === 'dark'
        ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    if (layerRef.current) {
      layerRef.current.setUrl(url);
    }
    return {
      attribution: attribution,
      url: url,
    };
  }, [mode]);

  return (
    <MapContainer
      style={{ height: '100%', flexGrow: 1 }}
      center={{ lat: mapData.lat, lng: mapData.lng }}
      zoom={mapData.zoom}
      scrollWheelZoom={true}
    >
      <TileLayer attribution={tileLayer.attribution} ref={layerRef} url={tileLayer.url} />
      {selectedLocations.map((location, index) => (
        <PlaceMarker
          isMarkerDraggable={isMarkerDraggable}
          key={location.locationId}
          index={index}
          location={location}
        />
      ))}
      {/* <SetViewOnClick /> */}
    </MapContainer>
  );
};
