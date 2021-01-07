import React from 'react';
import './Map.css';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import ToolTipCircle from './ToolTipCircle/ToolTipCircle';

function Map({ countries, options, caseType, ...props }) {
  return (
		<div className="map">
			<LeafletMap center={options.center} zoom={options.zoom}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{countries.map(country => (
					<ToolTipCircle
            key={country.country}
            selectCountry={props.selectCountry}
						country={country}
						caseType={caseType}
					></ToolTipCircle>
				))}
			</LeafletMap>
		</div>
  );
}

export default Map;
