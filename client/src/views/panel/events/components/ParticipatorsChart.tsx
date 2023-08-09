import { Chart } from 'components/Chart';
import { FC, useMemo } from 'react';
const options = {
  labels: ['Real participators', 'Participation declarers'],
  legend: {
    position: 'bottom',
  },
  chart: {
    height: '200px',
  },
};
interface Props {
  participators: number;
  realParticipators: number;
}
const ParticipatorsChart: FC<Props> = ({ participators, realParticipators }) => {
  const series = useMemo(() => {
    return [realParticipators, participators];
  }, [participators, realParticipators]);
  return <Chart options={options} series={series} type="donut" />;
};

export default ParticipatorsChart;
