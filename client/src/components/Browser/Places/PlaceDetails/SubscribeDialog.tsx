import { DialogTitle, DialogContent, DialogActions, Dialog, SlideProps, Slide, Grid, Typography, CardMedia, Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles"
import React, { FC } from "react"

interface Props {
    isDialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const useStyles = makeStyles({
    dialog: {
        background: '#2C2C2C'
    },
    title: {
        color: 'white'
    },
    content: {
        color: 'grey'
    }
})

export const SubscribeDialog: FC<Props> = ({ isDialogOpen, setDialogOpen }) => {
    const classes = useStyles()
    return (
        <Dialog
            TransitionComponent={Transition}
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            PaperProps={
                {
                    classes: { root: classes.dialog }
                }
            }
        >
            <DialogTitle>
                <Grid container direction="column">
                    <Typography variant="h6" className={classes.title}>
                        Subscribe to a new place
                    </Typography>
                    <Typography variant="caption" className={classes.content}>
                        Set a subscription and benefit from regular visits
                    </Typography>
                </Grid>
            </DialogTitle>
            <Grid container justify="center">
                <Typography variant="h6" className={classes.title}>
                    Why should I subscribe?
                </Typography>
                <CardMedia style={{ height: 300, marginTop: 20 }} component="img" src="https://cdn.dribbble.com/users/7709373/screenshots/15601987/media/2866e963d360e43b8ceb08eedbc3b673.gif">

                </CardMedia>
            </Grid>
            <DialogContent>
                <Typography variant="h6" className={classes.title}>
                    You will:
                </Typography>
                <Grid container justify="center" style={{marginTop: 10}}>
                    <Alert variant="outlined" style={{flexGrow: 1}}> 
                        receive notifications whenever a new event or important information is added
                    </Alert>
                    <Alert variant="outlined" style={{flexGrow: 1, marginTop: 10}}> 
                        always be informed about bargains and special offers
                    </Alert>
                    <Alert variant="outlined" style={{flexGrow: 1, marginTop: 10}}> 
                        receive personal coupons and promo codes 
                    </Alert>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button color="primary">
                    Subscribe
                </Button>

            </DialogActions>
        </Dialog>
    )
}