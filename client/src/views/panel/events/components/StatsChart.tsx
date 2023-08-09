import { Chart } from 'components/Chart';
import { FC, useState } from 'react';

interface Props {
  series: number[];
  legend: string[];
}

const StatsChart: FC<Props> = ({ series, legend }) => {
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
    labels: legend,
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
  return <Chart type="donut" width={400} options={options} setOptions={setOptions} series={series} />;
};

export default StatsChart;
