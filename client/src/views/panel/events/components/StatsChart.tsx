import { FC, useState } from 'react';
import { StatisticChart } from 'views/panel/dashboard/components/StatisticChart';

interface Props {
  series: number[];
}

const Chart: FC<Props> = ({ series }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    labels: ['yes', 'no'],
    fill: {
      type: 'gradient',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });
  return <StatisticChart type="donut" width={400} options={options} setOptions={setOptions} series={series} />;
};

export default Chart;
