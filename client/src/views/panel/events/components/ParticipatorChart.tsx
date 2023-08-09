import { Chart } from 'components/Chart';
import { FC, useMemo } from 'react';
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
  return <Chart options={options} series={series} type="donut" />;
};

export default ParticipatorChart;
