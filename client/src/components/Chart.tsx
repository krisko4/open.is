import { Mode, useColorMode } from 'contexts';
import React, { FC, useMemo } from 'react';
import ApexChart from 'react-apexcharts';

interface Props {
  series: any;
  options: any;
  setOptions?: React.Dispatch<any>;
  type: any;
  height?: number;
  width?: number;
}

export const Chart: FC<Props> = ({ series, options, type, height, width }) => {
  const { mode } = useColorMode();
  const chartOptions = useMemo(() => {
    return {
      ...options,
      chart: {
        ...options.chart,
        foreColor: mode === Mode.LIGHT ? '#00000' : '#fffff',
      },
    };
  }, [mode, options]);
  return <ApexChart options={chartOptions} series={series} type={type} height={height} width={width} />;
};
