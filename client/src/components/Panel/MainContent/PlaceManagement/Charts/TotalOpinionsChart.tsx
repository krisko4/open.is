import { FC, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { StatisticChart } from "../../Dashboard/StatisticChart"

export const TotalOpinionsChart: FC = () => {

    const { currentPlace } = useCurrentPlaceContext()
    const { ones, twos, threes, fours, fives } = currentPlace.averageNote
    const totalOpinionsSeries = [
        {
            data: [ones, twos, threes, fours, fives]
        }
    ]


    const [totalOpinionsOptions, setTotalOpinionsOptions] = useState({
        chart: {
            toolbar: {
                show: false
            },
            height: 100,
            type: 'bar',
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
            },
            sparkline: {
                enabled: true
            },

        },
        plotOptions: {
            // bar: {
            //     distributed: true
            // }
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ['One'], ['Two'], ['Three'], ['Four'], ['Five']],
            crosshairs: {
                width: 1
            },
            min: 0
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            y: {
                title: {
                    formatter: function (seriesName: string) {
                        return ''
                    }
                }
            },

        },

        dataLabels: {
            enabled: false
        }
    })

    return (
        <StatisticChart height={100} width={200} type="bar" options={totalOpinionsOptions} setOptions={setTotalOpinionsOptions} series={totalOpinionsSeries} />
    )
}