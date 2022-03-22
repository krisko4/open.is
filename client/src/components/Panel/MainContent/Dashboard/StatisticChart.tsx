import Chart from 'react-apexcharts';
import React, { FC } from 'react';

interface Props {
  series: any;
  options: any;
  setOptions: React.Dispatch<any>;
  type: any;
  height?: number;
  width?: number;
}

export const StatisticChart: FC<Props> = ({ series, options, type, height, width }) => {
  return <Chart options={options} series={series} type={type} height={height} width={width} />;
};
