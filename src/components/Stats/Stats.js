import React from 'react'
import InfoBox from '../InfoBox/InfoBox';
import { CaseTypes } from '../../utils/util';

import './Stats.css';

function Stats({ caseType, setCaseType, countryInfo }) {
  return (
		<div className="stats">
			<InfoBox
				active={caseType === CaseTypes.CASES}
				onClick={() => setCaseType(CaseTypes.CASES)}
				caseType={CaseTypes.CASES}
				cases={countryInfo.todayCases}
				total={countryInfo.cases}
			></InfoBox>
			<InfoBox
				active={caseType === CaseTypes.RECOVERED}
				onClick={() => setCaseType(CaseTypes.RECOVERED)}
				caseType={CaseTypes.RECOVERED}
				cases={countryInfo.todayRecovered}
				total={countryInfo.recovered}
			></InfoBox>
			<InfoBox
				active={caseType === CaseTypes.DEATHS}
				onClick={() => setCaseType(CaseTypes.DEATHS)}
				caseType={CaseTypes.DEATHS}
				cases={countryInfo.todayDeaths}
				total={countryInfo.deaths}
			></InfoBox>
		</div>
  );
}

export default Stats;
