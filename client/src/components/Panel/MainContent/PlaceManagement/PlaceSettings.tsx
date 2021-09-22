import { Slide, SlideProps, Typography } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Dialog from "@material-ui/core/Dialog";
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { usePanelContext } from "../../../../contexts/PanelContext";
import { StepContextProvider } from "../../../../contexts/StepContext";
import { EditPlace } from "./EditPlace";

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const PlaceSettings: FC<Props> = ({ open, setOpen }) => {

    const { currentPlace, setCurrentPlace } = usePanelContext()
    const [currentPlaceCopy, setCurrentPlaceCopy] = useState(currentPlace)
    const { enqueueSnackbar } = useSnackbar()



    const closeSettings = () => {
        setCurrentPlace(currentPlaceCopy)
        enqueueSnackbar('Your changes have not been saved', {
            variant: 'warning'
        })
        setOpen(false)
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            fullScreen
        >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => closeSettings()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Place settings
                    </Typography>

                </Toolbar>
            </AppBar>
            <StepContextProvider>
                <EditPlace />
            </StepContextProvider>
        </Dialog>
    )
}