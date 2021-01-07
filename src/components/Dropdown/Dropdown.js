import React from 'react';
import { MenuItem, Select, FormControl } from '@material-ui/core';

function Dropdown({countries, country, ...props}) {
  return (
		<FormControl className="app__dropdown">
			<Select
				variant="outlined"
				value={country}
				onChange={e => props.onCountryChange(e.target.value)}
			>
				<MenuItem value="worldwide">Worldwide</MenuItem>
				{countries.map(country => (
					<MenuItem key={country.name} value={country.symbol}>
						{country.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
  );
}

export default Dropdown
