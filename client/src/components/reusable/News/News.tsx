import Timeline from "@mui/lab/Timeline";
import { Slide, Grid } from "@mui/material";
import React, { FC } from "react";
import Scrollbars from 'react-custom-scrollbars';
import { NewsItem } from './NewsItem';
import { format } from 'date-fns'





export const news = [
    {
        title: 'This will be your first news!',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        content: 'This is just an example of what your news will look like. It will disappear after your first news is created.'
    },
    {
        title: 'This will be your second news!',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        content: 'It is going to be fun!'

    },
    {
        title: 'Thank your for using our services 💌',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        content: 'We appreciate you.'

    }

]

export const News: FC = () => {



    return (
        <Slide timeout={1000} in={true}>
            <Grid container item style={{ height: '100%' }} justifyContent="center">
                <Timeline position="alternate">
                    {news.map((item, index) => <NewsItem item={item} key={index} />
                    )}
                </Timeline>
            </Grid>
        </Slide>

    );


}




