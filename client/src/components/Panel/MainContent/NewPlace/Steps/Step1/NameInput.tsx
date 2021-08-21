import { InputAdornment, TextField } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React, { FC, useEffect, useRef } from "react";




interface Props {
    isNameCorrect: boolean,
    setNameCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>,
    placeName: string,
    setPlaceName: React.Dispatch<React.SetStateAction<string>>
}



export const NameInput: FC<Props> = ({ isNameCorrect, placeName, setPlaceName, setNameCorrect, setButtonLoading }) => {

    const firstRenderRef = useRef(true)

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
            firstRenderRef.current = false
            return
        }
        setNameCorrect(false)
        setButtonLoading(true)
        console.log(placeName)
        const delaySearch = setTimeout(() => {
            //    await validatePlaceName(placeName)
            setButtonLoading(false)
            placeName ? setNameCorrect(true) : setNameCorrect(false)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [placeName])

    return (
        <TextField
            style={{ marginTop: 10 }}
            label="Enter the name of your place"
            fullWidth={true}
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
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