import Chart from "react-apexcharts";
import React, { FC, useState } from "react";
import { Button } from "@material-ui/core";


interface Props {
    series: any,
    options: any,
    setOptions: React.Dispatch<any>,
    type: any,
    height?: number,
    width?: number
}

export const StatisticChart: FC<Props> = ({ series, options, setOptions, type, height, width }) => {

    const [selection, setSelection] = useState('one_year')

    const handleChange = (range: number) => {
        switch (range) {
            case 1:
                const newOptions = { ...options }
                options.xaxis = {
                    type: 'datetime',
                    min: new Date('2021-06-10'),
                    max: new Date('2021-09-29'),
                    tickAmount: 7,
                }
                setOptions(newOptions)
                break
            default:
        }
    }



    //     const [options, setOptions] = useState({
    //         chart: {
    //             id: "basic-bar"
    //         },
    //         xaxis: {
    //             categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    //         }
    //     })


    //     const [series, setSeries] = useState([
    //         {
    //         name: "series-1",
    //         data: [30, 40, 45, 50, 49, 60, 70, 91]
    //        },
    //         {
    //         name: "series-2",
    //         data: [10, 20, 30, 40, 50, 60, 70, 91]
    //        },
    // ])



    return (
            <Chart
                options={options}
                series={series}
                type={type}
                height={height}
                width={width}
            />
    )
}