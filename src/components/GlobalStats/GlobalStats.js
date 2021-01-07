import React from 'react';
import LineGraph from './LineGraph/LineGraph';
import { Card, CardContent } from '@material-ui/core';
import { capitalize } from '../../utils/util';
import Table from '../Table/Table';

import './GlobalStats.css';

function GlobalStats({ total, caseType, data, ...props }) {
	return (
		<Card className="global-stats">
			<Card className="country-stats">
				<CardContent>
					<h3>Live Cases By Country</h3>
					<Table
						selectCountry={props.onCountryChange}
            countries={data}
            total={total}
					/>
				</CardContent>
			</Card>
			<Card className="graph-stats">
				<CardContent>
					<h3>Worldwide New {capitalize(caseType)}</h3>
					<LineGraph caseType={caseType}></LineGraph>
				</CardContent>
			</Card>
		</Card>
	);
}

export default GlobalStats;
