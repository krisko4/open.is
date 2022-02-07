import { SlideProps, Slide, Grid, Typography, Dialog, DialogTitle, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ClassNameMap } from '@mui/styles';
import React, { FC, useState } from 'react';
import { useLoginContext } from "../../../contexts/LoginContext";
import { CurrentPlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import { OpeningHoursCard } from './OpeningHoursCard';
import { OpeningHoursForm } from './OpeningHoursForm';
const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);


interface Props {
    currentPlace?: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<any>,
    classes: ClassNameMap<"title" | "container" | "divider" | "days" | "hours" | "content" | "dialog">,
}



export const OpeningHours: FC<Props> = ({ currentPlace, setCurrentPlace, classes }) => {

    const { isUserLoggedIn } = useLoginContext()
    const openingHours = currentPlace && currentPlace.openingHours
    const [dialogOpen, setDialogOpen] = useState(false)


    return (
        <Grid container direction="column" style={{ height: '100%' }} alignItems="center">
            {currentPlace?.isUserOwner && isUserLoggedIn && openingHours &&
                <Grid container justifyContent="flex-end" >
                    <Grid item style={{ paddingRight: 30, paddingTop: 30 }}>
                        <Button startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} variant="contained" color="primary">Set opening hours</Button>
                    </Grid>
                </Grid>
            }
            {
                openingHours ?
                    <Grid item container style={{ flexGrow: 1 }} alignItems="center" lg={5} md={8} >
                        <OpeningHoursCard classes={classes} openingHours={openingHours} />
                    </Grid>

                    : <>
                        {currentPlace?.isUserOwner ?
                            <Grid justifyContent="center" style={{ height: '100%' }} direction="column" alignItems="center" container>
                                <Typography variant="h6">This place has not set opening hours yet.</Typography>
                                <Typography className={classes.content} variant="subtitle1">Press the button below to set opening hours.</Typography>
                                <Button startIcon={<AddIcon />} style={{ marginTop: 10 }} onClick={() => setDialogOpen(true)} variant="contained" color="primary">Set opening hours</Button>
                            </Grid>

                            :
                            <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                                {/* <Grid item lg={5}>
                                    <Card className={classes.container} style={{ flexGrow: 1 }} elevation={10}>
                                        <CardContent>
                                            <Typography variant="h5" className={classes.title}>Opening hours</Typography>
                                            <Divider className={classes.divider} />
                                            <Grid container justify="center">
                                                <Grid item className={classes.days} lg={6}>
                                                    {days.map((day, index) => <Typography key={index} variant="h6">{day}</Typography>)}
                                                </Grid>
                                                <Grid item lg={5} style={{ textAlign: 'center' }} container direction="column" className={classes.hours}>
                                                    {hours.map((hour, index) => <div key={index}>
                                                        {hour === 'closed' ?
                                                            <Typography variant="h6" style={{ color: 'red' }}>CLOSED</Typography>
                                                            :
                                                            <Typography variant="h6">{hour}</Typography>
                                                        }
                                                    </div>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Typography variant="caption"><span style={{ color: 'red' }}>*</span>You will be able to specify the opening state of your place once it is registered. This is just an example.</Typography>
                                </Grid> */}
                            </Grid>
                        }
                    </>
            }

            {isUserLoggedIn && currentPlace?.isUserOwner &&
                <Dialog
                    open={dialogOpen}
                    maxWidth="sm"
                    TransitionComponent={Transition}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={
                        {
                            classes: { root: classes.dialog }
                        }
                    }

                >
                    <DialogTitle className="dialogTitle">Opening hours management</DialogTitle>
                    <OpeningHoursForm
                        currentPlace={currentPlace}
                        openingHours={openingHours}
                        setCurrentPlace={setCurrentPlace}
                        setDialogOpen={setDialogOpen}
                        classes={classes}
                    />

                </Dialog>
            }
        </Grid >
    );
};

