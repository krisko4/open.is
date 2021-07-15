import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CardMedia from "@material-ui/core/CardMedia";




const clientBenefits = [
    {
        title: 'Stay tuned',
        content: 'Be the first to access information about events, bargains and more'
    },
    {
        title: 'Stay tuned',
        content: 'Be the first to access information about events, bargains and more'
    },
    {
        title: 'Stay tuned',
        content: 'Be the first to access information about events, bargains and more'
    },

]

const ownerBenefits = [
    {
        title: 'Stay fresh',
        content: 'Keep your clients informed about the most recent events in your company'
    },
    {
        title: 'Spread your wings',
        content: 'Expand your business using our services '
    },
    {
        title: 'Stay fresh',
        content: 'Keep your clients informed about the most recent events in your company'
    },

]

const Section2 = ({image}) => {
    return (
        <Grid
            container
            style={{
                alignItems: 'center',
                background: 'radial-gradient(ellipse at center,#585858 0,#232323 100%)'
            }}
            justify="center"
        >
            <Grid item lg={6} xs={12} style={{color: 'white'}}>
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                    Convenience & <span style={{color: '#2196f3', textDecoration: 'underline'}}>benefits.</span>
                </Typography>
                <Typography variant="body1" style={{textTransform: 'uppercase', fontWeight: 'bold', marginTop: 5}}>
                    Bidirectional chain of advantages
                </Typography>
                <Grid item container lg={12} xs={11} style={{marginTop: 20}}>
                    <Grid item lg={6}>
                        <span>As a client:</span>
                        {clientBenefits.map((benefit, index) => {
                            return (
                                <div style={{marginBottom: 10}}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <CheckCircleOutlineIcon/>
                                        <Typography variant="h6" style={{color: 'lightgrey', marginLeft: 10}}>
                                            {benefit.title}
                                        </Typography>
                                    </div>
                                    <Grid item lg={9}>
                                        <Typography variant="h6" style={{color: 'white'}}>
                                            {benefit.content}
                                        </Typography>
                                    </Grid>
                                </div>
                            )
                        })}

                    </Grid>
                    <Grid item lg={6}>
                        <span>As an owner:</span>
                        {ownerBenefits.map((benefit, index) => {
                            return (
                                <div style={{marginBottom: 10}}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <CheckCircleOutlineIcon/>
                                        <Typography variant="h6" style={{color: 'lightgrey', marginLeft: 10}}>
                                            {benefit.title}
                                        </Typography>
                                    </div>
                                    <Grid item lg={9}>
                                        <Typography variant="h6" style={{color: 'white'}}>
                                            {benefit.content}
                                        </Typography>
                                    </Grid>
                                </div>
                            )
                        })}
                    </Grid>

                </Grid>

            </Grid>
            <Grid item lg={5} xs={10} style={{marginTop: 50, marginBottom: 50}} align="center">
                <CardMedia className={image} image="https://images.unsplash.com/photo-1605369817409-504bfc7a165d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80"
                />
            </Grid>
        </Grid>
    )
}

export default Section2
