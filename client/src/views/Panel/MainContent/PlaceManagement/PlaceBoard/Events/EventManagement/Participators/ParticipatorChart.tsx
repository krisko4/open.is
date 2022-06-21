import { FC, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
const options = {
  labels: ['Subscribers', 'Non-subscribers'],
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
  subscribers: number;
  nonSubscribers: number;
}
const ParticipatorChart: FC<Props> = ({ subscribers, nonSubscribers }) => {
  const series = useMemo(() => {
    return [subscribers, nonSubscribers];
  }, [subscribers, nonSubscribers]);
  return <ReactApexChart options={options} series={series} type="donut" />;
};

export default ParticipatorChart;
