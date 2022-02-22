import { createTheme, ThemeProvider } from "@mui/material";
import { FC, useMemo } from "react";
import { useColorMode } from "../contexts/ColorModeContext";


export const BrowserTheme: FC = ({ children }) => {
    const { mode } = useColorMode()
    const theme = useMemo(() => (
        createTheme({
            palette: {
                mode: mode,
                background: {
                    default: mode === 'light' ? '#fafafa' : '#121212'
                }
            }
        })

    ), [mode])

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>

    )
}
