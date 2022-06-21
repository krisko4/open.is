import { FC, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
const options = {
  labels: ['Winners', 'Non-winners'],
  responsive: [
    {
      breakpoint: 100,
      options: {
        chart: {
          width: 100,
          height: 100,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};
interface Props {
  winners: number;
  nonWinners: number;
}
const WinnersChart: FC<Props> = ({ winners, nonWinners }) => {
  const series = useMemo(() => {
    return [winners, nonWinners];
  }, [winners, nonWinners]);
  return <ReactApexChart options={options} series={series} type="donut" />;
};

export default WinnersChart;
