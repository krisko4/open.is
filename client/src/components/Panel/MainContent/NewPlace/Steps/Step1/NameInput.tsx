import { InputAdornment, TextField } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { clearPlace, usePanelContext } from "../../../../../../contexts/PanelContext";




interface Props {
    isNameCorrect: boolean,
    setNameCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>
}



export const NameInput: FC<Props> = ({ isNameCorrect, setNameCorrect, setButtonLoading }) => {

    const { currentPlace, setCurrentPlace } = usePanelContext()
    const firstRenderRef = useRef(true)
    const [input, setInput] = useState('')

    useEffect(() => {
        setInput(currentPlace.name)
    }, [currentPlace])

    

    // const validatePlaceName = async(name : string) => {
    //     try{
    //         const places = await getPlacesByName(name)
    //         console.log(places)
    //         places.length === 0 ? setNameCorrect(true) : setNameCorrect(false)

    //     } catch(err) {
    //         console.error(err)
    //     } finally{
    //         setButtonLoading(false)
    //     }

    // }

    



    useEffect(() => {
        if (firstRenderRef.current) {
            input ? setNameCorrect(true) : setNameCorrect(false)
            firstRenderRef.current = false
            return
        }
        setNameCorrect(false)
        setButtonLoading(true)
        const delaySearch = setTimeout(() => {
            //    await validatePlaceName(placeName)
            input ? setNameCorrect(true) : setNameCorrect(false)
            const newCurrentPlace = { ...currentPlace }
            //console.log(newCurrentPlace)
            newCurrentPlace.name = input
            setCurrentPlace(newCurrentPlace)
            setButtonLoading(false)

        }, 500)
        return () => clearTimeout(delaySearch)
    },  [input])

    return (
        <TextField
            style={{ marginTop: 10 }}
            label="Enter the name of your place"
            fullWidth={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            InputProps={{
                endAdornment:
                    <div>
                        {isNameCorrect &&
                            <InputAdornment position="end">
                                <DoneIcon style={{ color: '#32de84' }} />
                            </InputAdornment>
                        }
                    </div>
            }}
        >
        </TextField>
    )
}

