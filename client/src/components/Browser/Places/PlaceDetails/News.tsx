import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import React from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        borderRadius: 10,
        background: '#2C2C2C',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const news = [
    {
        title: 'newsTitle',
        date: 'date',
        content: 'contentcontentcontent contentcontentcontentcontentcontentcontentcontentcontentcontentcontent'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
]


export const News = () => {
    const classes = useStyles();
    return (
        <Timeline align="alternate">
            {news.map((item, index) => {
                return (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot>
                               <AnnouncementIcon/>
                            </TimelineDot>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card elevation={3} className={classes.paper}>
                                <CardContent>
                                    <Typography variant="h6" component="h1" style={{color: 'white'}}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{color: 'grey'}}>
                                        {item.content.length < 50 ? item.content : `${item.content.substring(0, 50)}...`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {item.content.length > 50 &&
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                    }
                                </CardActions>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                )
            })}
        </Timeline>
    );
};