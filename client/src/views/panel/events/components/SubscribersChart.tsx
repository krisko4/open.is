import { Chart } from 'components/Chart';
import { FC, useMemo } from 'react';
const options = {
  labels: ['Subscribers', 'Non-subscribers'],
  legend: {
    position: 'bottom',
  },
};
interface Props {
  subscribers: number;
  nonSubscribers: number;
}
const SubscribersChart: FC<Props> = ({ subscribers, nonSubscribers }) => {
  const series = useMemo(() => {
    return [subscribers, nonSubscribers];
  }, [subscribers, nonSubscribers]);
  return <Chart options={options} series={series} type="donut" />;
};

export default SubscribersChart;
