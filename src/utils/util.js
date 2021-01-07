import numeral from 'numeral';

export const CaseTypes = {
	CASES: 'cases',
	RECOVERED: 'recovered',
	DEATHS: 'deaths',
};

export const CaseTitles = {
  cases: 'Coronavirus Cases',
  recovered: 'Recovered',
  deaths: 'Deaths'
}

export const CaseTypeColors = {
	cases: {
		hex: '#CC1034',
		rgb: 'rgb(204, 16, 52)',
		half_op: 'rgba(204, 16, 52, 0.5)',
		multiplier: 400,
	},
	recovered: {
		hex: '#7dd71d',
		rgb: 'rgb(125, 215, 29)',
		half_op: 'rgba(125, 215, 29, 0.5)',
		multiplier: 400,
	},
	deaths: {
		hex: '#fb4443',
		rgb: 'rgb(251, 68, 67)',
		half_op: 'rgba(251, 68, 67, 0.5)',
		multiplier: 800,
	},
};

export const sortData = data => (
  [...data].sort((a, b) => b.cases - a.cases)
)

export const longPrintStat = stat => (
  stat ? `${numeral(stat).format('0,0')}` : '0'
);

export const prettyPrintStat = stat => (
	stat
		? stat > 999
			? `${numeral(stat).format('0.0a')}`
			: `${numeral(stat).format('0a')}`
    : '0'
)

export const capitalize = string => (
  string.charAt(0).toUpperCase() + string.slice(1)
)

export const getCaseTypeColor = caseType => {
  return CaseTypeColors[caseType].hex;
};
