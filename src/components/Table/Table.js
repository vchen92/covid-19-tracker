import React from 'react';
import './Table.css';
import { longPrintStat } from '../../utils/util';

function Table({ total, countries, ...props }) {
  return (
		<div className="table">
			<table>
				<tbody>
					<tr
						onClick={() => props.selectCountry('worldwide')}
						key="worldwide"
					>
						<td>Worldwide</td>
						<td>
							<strong>{longPrintStat(total)}</strong>
						</td>
					</tr>
					{countries.map(({ country, cases, countryInfo }) => (
						<tr
							onClick={() =>
								props.selectCountry(countryInfo.iso2)
							}
							key={country}
						>
							<td>{country}</td>
							<td>
								<strong>{longPrintStat(cases)}</strong>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
  );
}

export default Table;
