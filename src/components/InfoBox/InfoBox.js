import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';
import { longPrintStat, CaseTitles, getCaseTypeColor } from './../../utils/util';

function InfoBox({ caseType, active, cases, total, ...props }) {
  return (
		<Card onClick={props.onClick} className="infoBox" style={active ? {borderTop: `10px solid ${getCaseTypeColor(caseType)}`} : {}}>
			<CardContent>
				<Typography className="infoBox__title" color="textSecondary">
					{CaseTitles[caseType]}
				</Typography>

				<h2 className={"infoBox__amount infoBox__"+caseType}>+{longPrintStat(cases)}</h2>
        
				<Typography className="infoBox__total" color="textSecondary">
					{longPrintStat(total)} Total
				</Typography>
			</CardContent>
		</Card>
  );
}

export default InfoBox
