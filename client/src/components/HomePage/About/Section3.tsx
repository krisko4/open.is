
import { Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { FC } from "react";


const items = [
    {
        name: 'Krzysztof Wyszyński',
        role: 'CEO',
        image: `https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg`
    },
    {
        name: 'Christopher Cononovitz',
        role: 'Development manager',
        image: `https://ocdn.eu/pulscms-transforms/1/zMSktkqTURBXy9kMzBjNzkyOWJjZTgxMGNiZTNkYzViZGJmZjZmYmMxMS5qcGVnkpUDAA3NAVjMwpMFzQGkzQEs`
    },
    {
        name: 'George Suchodolsky',
        role: 'Design manager',
        image: `https://yt3.ggpht.com/a/AGF-l78NQAy60mopFW0l90704VozNKFKp5_Z37IrMg=s400-c-k-c0xffffffff-no-rj-mo`
    },
]

export const Section3: FC<any> = ({ classes }) => {
    return (
        <Grid container alignItems="center" className={classes.background}>
            <Grid container justify="center">
                <Grid item container justify="center" lg={5} style={{ textAlign: 'center', marginBottom: 120 }}>
                    <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold' }}>Who are we?</Typography>
                    <Grid item lg={10} style={{ marginTop: 20 }}>
                        <Typography variant="h6" style={{ color: 'white' }}>
                            We are a group of young creative people. Programming and constant development is our passion.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container justify="center">
                    <Grid item lg={7}>
                        <Card>
                            <CardContent>
                                <Grid container alignItems="center" direction="column">
                                    <Typography variant="h3" style={{ textAlign: 'center' }}>Meet our team</Typography>
                                    <Divider style={{ width: '80%', marginBottom: 20, marginTop: 10, background: 'red' }} />
                                </Grid>
                                <Grid container>
                                    {items.map((item, index) => <Grid item lg={4} container alignItems="center" direction="column" key={index}>
                                        <CardMedia style={{ height: 200, width: 200 }} image={item.image} />
                                        <div style={{marginTop: 10, textAlign: 'center'}}>
                                            {item.name}<br/><span style={{fontStyle: 'italic'}}>{item.role}</span>
                                            </div>
                                        </Grid>
                                        )}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}