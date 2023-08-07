import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function Ymap() {
  const mapState = { center: [59.9414, 30.2767], zoom: 16 };
  return (
    <YMaps>
      <Map defaultState={mapState}>
        <Placemark
          geometry={{
            type: 'Point',
            coordinates: [59.941461, 30.276797],
          }}
          properties={{
            iconContent: 'Русское вино',
          }}
        />
      </Map>
    </YMaps>
  );
}

export default Ymap;
