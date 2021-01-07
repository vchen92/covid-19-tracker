import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import { CaseTypeColors } from '../../../utils/util';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          toolTipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data, caseType) => {
	const chartData = [];
	let lastDataPoint;

	for (let date in data[caseType]) {
		if (lastDataPoint) {
			const newDataPoint = {
				x: date,
				y: data[caseType][date] - lastDataPoint,
			};
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[caseType][date];
	}

	return chartData;
};

function LineGraph({ caseType = 'cases' }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res => res.json())
        .then(data => {
          const chartData = buildChartData(data, caseType);
          setData(chartData);
        });
    };

    fetchData();
  }, [caseType]);

  return (
		<div className="line-graph">
			{data?.length > 0 && (
				<Line
					options={options}
					data={{
						datasets: [
							{
								data: data,
								backgroundColor: CaseTypeColors[caseType].half_op,
								borderColor: CaseTypeColors[caseType].hex,
							},
						],
					}}
				/>
			)}
		</div>
  );
}

export default LineGraph
