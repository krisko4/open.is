import { FC, useState } from "react"
import { VisitProps } from "../../../../../contexts/PlaceProps"
import { StatisticChart } from "../../Dashboard/StatisticChart"

interface Props{
    visits: VisitProps[]
}

const generateVisitsData = (visits : VisitProps[]) => {
    let count = 0;
    return visits.map(visit => {
        count += visit.visitCount
        return [visit.date, count]
    })
}

export const ActivityChart: FC<Props> = ({visits}) => {
    const [options, setOptions] = useState({
        chart: {
            id: 'area-datetime',
            type: 'area',
            zoom: {
                autoScaleYaxis: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            min: 0
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        }
        
    })

    const series = [{
        name: 'visits',
        data: generateVisitsData(visits)
    }]

    return (
        <StatisticChart type="area" height={500} options={options} setOptions={setOptions} series={series} />
    )
}