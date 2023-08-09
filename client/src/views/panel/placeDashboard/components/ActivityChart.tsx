import { CircularProgress } from '@mui/material';
import { Chart } from 'components/Chart';
import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVisitsForSelectedLocationQuery } from 'store/api';

export const ActivityChart: FC = () => {
  const { locationId } = useParams();
  const { data: visits, isFetching } = useGetVisitsForSelectedLocationQuery(locationId as string);
  const [options, setOptions] = useState({
    chart: {
      id: 'area-datetime',
      type: 'area',
      zoom: {
        autoScaleYaxis: true,
      },
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
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: 0,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  });

  const visitData = useMemo(() => {
    let count = 0;
    if (visits) {
      return visits.visits.map((visit) => {
        count += visit.visitCount;
        return [visit.date, count];
      });
    }
  }, [visits]);

  const series = useMemo(() => {
    if (visits) {
      return [
        {
          name: 'visits',
          data: visitData,
        },
      ];
    }
  }, [visits]);

  return (
    <>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Chart type="area" height={500} options={options} setOptions={setOptions} series={series} />
      )}
    </>
  );
};