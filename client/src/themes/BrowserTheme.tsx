import { createTheme, ThemeProvider } from "@mui/material";
import { FC, useMemo } from "react";
import { useColorMode } from "../contexts/ColorModeContext";


export const BrowserTheme : FC = ({children}) => {
    const { mode } = useColorMode()
    const theme = useMemo(() => (
        createTheme({
           palette: {
               mode: mode
           } 
        })

    ), [mode])

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>

    )
}
