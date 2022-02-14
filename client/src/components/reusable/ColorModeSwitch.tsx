import { Switch } from "@mui/material"
import { FC, useState } from "react"
import { useColorMode } from "../../contexts/ColorModeContext"

export const ColorModeSwitch: FC = () => {
    
    const { toggleColorMode } = useColorMode()
    const [checked, setChecked] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleColorMode()
        setChecked(event.target.checked)
    }
    return (

        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    )
}