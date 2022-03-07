import { FC, useState } from "react"
import { useAverageNoteSelector } from "redux-toolkit/slices/currentPlaceSlice"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { StatisticChart } from "../../Dashboard/StatisticChart"

const defaultOptions = {
    ones : 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0
}

export const RatingChart: FC = () => {


    const [ratingOptions, setRatingOptions] = useState({
        chart: {
            width: 380,
            type: 'donut',
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
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        labels: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
        fill: {
            type: 'gradient',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    })

    const averageNote = useAverageNoteSelector()
    const { ones, twos, threes, fours, fives } = averageNote || defaultOptions
    const ratingSeries = [ones, twos, threes, fours, fives]

    return (
        <>
            {averageNote &&
                <StatisticChart type="donut" width={380} options={ratingOptions} setOptions={setRatingOptions} series={ratingSeries} />
            }
        </>
    )
}