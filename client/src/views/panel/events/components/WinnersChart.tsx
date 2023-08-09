import { Chart } from 'components/Chart';
import { FC, useMemo } from 'react';
const options = {
  chart: {
    foreColor: '#ccc',
  },
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
          labels: {
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            useSeriesColors: false,
          },
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
  return <Chart options={options} series={series} type="donut" />;
};

export default WinnersChart;
