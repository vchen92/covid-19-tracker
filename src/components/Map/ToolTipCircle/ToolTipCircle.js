import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import { CaseTypeColors, getCaseTypeColor, longPrintStat } from '../../../utils/util';

import './ToolTipCircle.css'

function ToolTipCircle({ country, caseType, ...props }) {
	return (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			onclick={() => props.selectCountry(country.countryInfo.iso2)}
			onMouseOver={e => e.target.openPopup()}
			onMouseOut={e => e.target.closePopup()}
			color={getCaseTypeColor(caseType)}
			fillColor={getCaseTypeColor(caseType)}
			radius={
				Math.sqrt(country[caseType]) *
					CaseTypeColors[caseType].multiplier +
				100000
			}
		>
			<Popup>
				<div className="info-container">
					<div
						className="info-flag"
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}
					/>
					<div className="info-name">{country.country}</div>
					<div className="info-confirmed">
						<b>Cases:</b>
						<strong>{longPrintStat(country.cases)}</strong>
					</div>
					<div className="info-recovered">
						<b>Recover:</b>
						<strong>{longPrintStat(country.recovered)}</strong>
					</div>
					<div className="info-deaths">
						<b>Deaths:</b>
						<strong>{longPrintStat(country.deaths)}</strong>
					</div>
				</div>
			</Popup>
		</Circle>
	);
}

export default ToolTipCircle;
