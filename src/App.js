import React, { useEffect, useState } from 'react';
import Dropdown from './components/Dropdown/Dropdown';
import GlobalStats from './components/GlobalStats/GlobalStats';
import Stats from './components/Stats/Stats';

import Map from './components/Map/Map';

import { sortData, getCaseTypeColor } from './utils/util';

import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapOptions, setMapOptions] = useState(null);
	const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState('cases');
  const [worldwide, setWorldwide] = useState({});

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then(res => res.json())
				.then(data => {
					const countries = data.map(country => ({
						name: country.country,
						symbol: country.countryInfo.iso2,
					}));

					const sortedData = sortData(data);
					setMapCountries(data);
					setTableData(sortedData);
					setCountries(countries);
        });
		};

		getCountriesData();
	}, []);

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then(res => res.json())
			.then(data => {
        setCountryInfo(data);
        setWorldwide(data.cases)
				setMap();
			});
	}, []);

	const onCountryChange = async countryCode => {
		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: 'https://disease.sh/v3/covid-19/countries/' + countryCode;

		await fetch(url)
			.then(res => res.json())
			.then(data => {
				setCountry(countryCode);
        setCountryInfo(data);
        setMap(countryCode === 'worldwide', data.countryInfo?.lat, data.countryInfo?.long);
			});
  };
  
  const setMap = (worldwide=true, lat=34, long=-40) => {
		setMapOptions({ 
      center: [lat, long], 
      zoom: worldwide ? 2 : 4
    });
  };

	return (
		<div className="app">
			<div className="app__left">
				<div
					className="app__header"
					style={{ color: getCaseTypeColor(caseType) }}
				>
					<h1>COVID 19-Tracker</h1>
					<Dropdown
						countries={countries}
						country={country}
						onCountryChange={onCountryChange}
					/>
				</div>

				{countryInfo ? (
					<Stats
						caseType={caseType}
						setCaseType={setCaseType}
						countryInfo={countryInfo}
					/>
				) : null}

				{mapOptions && caseType ? (
					<Map
            selectCountry={onCountryChange}
						caseType={caseType}
						countries={mapCountries}
						options={mapOptions}
					/>
				) : null}
			</div>

			<GlobalStats
				className
				onCountryChange={onCountryChange}
				data={tableData}
        caseType={caseType}
        total={worldwide}
			/>
		</div>
	);
}

export default App;
