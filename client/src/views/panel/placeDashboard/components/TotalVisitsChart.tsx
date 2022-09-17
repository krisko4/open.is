import React, { FC, useState } from 'react';
import { Chart } from '../../../../components/Chart';

export const TotalVisitsChart: FC<any> = ({ visits }) => {
  const [totalVisitsOptions, setTotalVisitsOptions] = useState({
    chart: {
      type: 'area',
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },

    plotOptions: {
      dataLabels: {
        show: false,
      },
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
  });

  const totalVisitsSeries = [
    {
      name: 'visits',
      data: visits.map((visit: any) => visit.visitCount),
    },
  ];

  return (
    <Chart
      height={100}
      width={150}
      type="area"
      options={totalVisitsOptions}
      setOptions={setTotalVisitsOptions}
      series={totalVisitsSeries}
    />
  );
};
