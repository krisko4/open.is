import Chart from "react-apexcharts";
import React, {FC, useState} from "react";



export const StatisticChart : FC = () => {

    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    })


    const [series, setSeries] = useState([{
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }])



    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height={500}
        />
    )
}