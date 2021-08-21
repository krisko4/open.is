import { Dialog, Slide, SlideProps } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import { ClassNameMap } from "@material-ui/styles";
import React, { FC, useState } from "react";


type NewsType = {
    title: string,
    date: string,
    content: string

}

interface Props {
    news: NewsType[],
    classes: ClassNameMap<"paper" | "content" | "title" | "dialog">
}

type OpenNews = {
    isOpen: boolean,
    newsIndex: number
}


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const News: FC<Props> = ({ news, classes }) => {

    const [openNews, setOpenNews] = useState<OpenNews>({
        isOpen: false,
        newsIndex: 0
    })

    return (
        <Timeline align="alternate">
            {news.map((item, index) => {
                return (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot>
                                <AnnouncementIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card elevation={3} className={classes.paper}>
                                <CardContent>
                                    <Typography variant="h6" className={classes.title}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="caption" className={classes.content}>
                                        {item.date}
                                    </Typography>
                                    <Typography variant="body2" style={{ marginTop: 10 }} className={classes.content}>
                                        {item.content.length < 50 ? item.content : `${item.content.substring(0, 50)}...`}
                                    </Typography>
                                </CardContent>
                                {item.content.length > 50 &&
                                    <CardActions>
                                        <Button size="small" onClick={() => setOpenNews({ isOpen: true, newsIndex: index })} color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                }
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                )
            })}
            <Dialog
                open={openNews.isOpen}
                onClose={() => setOpenNews({ isOpen: false, newsIndex: 0 })}
                TransitionComponent={Transition}
            >
                <Card className={classes.dialog}>
                    <CardContent>
                        <Typography variant="h6" className={classes.title}>
                            {news[openNews.newsIndex].title}
                        </Typography>
                        <Typography variant="caption" className={classes.content}>
                            {news[openNews.newsIndex].date}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: 10 }} className={classes.content}>
                            {news[openNews.newsIndex].content}
                        </Typography>
                    </CardContent>
                </Card>
            </Dialog>
        </Timeline>

    );
};