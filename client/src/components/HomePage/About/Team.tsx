import { Avatar, CardMedia, Grid, Typography } from "@material-ui/core"
import React, { FC } from "react"

export const Team: FC = () => {
    return (
        <>
            <Grid container justify="space-evenly" style={{ paddingTop: 40, paddingBottom: 40 }}>


                <Grid item container lg={5} justify="center" alignItems="center" direction="column">
                    <Typography variant="h3">Krzysztof Wyszyński</Typography>
                    <Typography variant="h5" style={{fontStyle: 'italic'}}>CEO</Typography>
                    <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
                        I believe that great things can be achieved through simple ideas. 
                        Our concept is super simple, which gives us lot of room to grow and develop.
                    </Typography>
                </Grid>
                <CardMedia image={`${process.env.REACT_APP_BASE_URL}/images/ja.jpg`} style={{ height: 600, width: 500, backgroundSize: 'contain ' }} />
            </Grid>
            <Grid container justify="space-evenly" style={{ paddingTop: 40, paddingBottom: 40, background: 'whitesmoke' }}>
                <Avatar src={`https://i.pinimg.com/564x/27/24/9e/27249e6089986d6d7bdd8adf7578a75d.jpg`} style={{ height: 500, width: 500 }} />
                {/* <CardMedia style={{ height: 600, width: 600 }} image={`https://i.pinimg.com/564x/27/24/9e/27249e6089986d6d7bdd8adf7578a75d.jpg`} /> */}
                <Grid item container lg={5} justify="center" alignItems="center" direction="column">
                    <Typography variant="h3">Christopher Cononovitz</Typography>
                    <Typography variant="h5" style={{fontStyle: 'italic'}}>Development manager</Typography>
                    <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
                        Nice to meet you. My name is Christopher Cononovitz.
                        I'm a development manager, which makes me responsible for all the stuff connected with proper development of our services.
                        I love programming and creating innovative solutions. I find myself lucky to have an opportunity to lead a team of great developers.
                        I believe we will be capable of expanding our platform and provide new ideas to make it better everyday.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="space-evenly" style={{ paddingTop: 20 }}>
                <Grid item container lg={5} justify="center" alignItems="center" direction="column">
                    <Typography variant="h3">George Suchodolsky</Typography>
                    <Typography variant="h5" style={{fontStyle: 'italic'}}>Promotion manager</Typography>
                    <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
                        Hi, my name is George Suchodolsky and I'm a Promotion manager.
                        My primary duty is to encourage you to use our services and provide you
                        with all the benefits you can gain by cooperating with us. I spend most of my free time
                        reading books and chilling with my homies.

                    </Typography>
                </Grid>
                <CardMedia style={{ height: 600, width: 600 }} image={`https://yt3.ggpht.com/a/AGF-l78NQAy60mopFW0l90704VozNKFKp5_Z37IrMg=s400-c-k-c0xffffffff-no-rj-mo`} />
            </Grid>
        </>
    )
}