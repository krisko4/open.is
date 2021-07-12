
import React, {useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import FirstHeader from "./FirstHeader";
import SecondHeader from "./SecondHeader";
import PlacesBox from "./Places/PlacesBox";
import MapBox from "./MapBox";
import myAxios from "../../axios/axios";


const Browser = () => {

    const [inputValue, setInputValue] = useState('')
    const [chosenCriterias, setChosenCriterias] = useState([])
    const [selectedPlaces, setSelectedPlaces] = useState([])
    const [mapCenter, setMapCenter] = useState([53.13333, 23.16433])
    const isFirstFind = useRef(true)



    useEffect(() => {
        console.log(inputValue)

        const findSelectedPlaces = () => {
            if (isFirstFind.current) {
                isFirstFind.current = false
                return
            }
            if(inputValue === ''){
                setSelectedPlaces([])
                return
            }
            myAxios.get('/places', {
                params: {
                    name: inputValue
                }
            }).then((response) => {
                console.log(response.data)
                setSelectedPlaces(response.data)

            })
        }

        const delaySearch = setTimeout(() => {
            findSelectedPlaces()
        }, 500)
        return () => clearTimeout(delaySearch)

    }, [inputValue])

    return (
        <Grid container direction="column" style={{height: '100vh', background: 'indigo'}}>
            <FirstHeader/>
            <SecondHeader setChosenCriterias={setChosenCriterias} selectedPlaces={selectedPlaces} setInputValue={setInputValue}/>
            <Grid container direction="row" style={{flex: '1 1 auto'}}>
              <PlacesBox setMapCenter={setMapCenter} chosenCriterias={chosenCriterias}/>
              <MapBox mapCenter={mapCenter} chosenCriterias={chosenCriterias}/>
            </Grid>

        </Grid>
    )

}

export default Browser