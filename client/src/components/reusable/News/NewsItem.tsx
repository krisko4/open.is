import { TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab"
import { Button, Card, CardContent, Typography, CardActions } from "@mui/material"
import { NewsProps } from "contexts/PlaceProps"
import { FC, useState } from "react"
import { NewsDetailsDialog } from "./NewsDetailsDialog"
import AnnouncementIcon from '@mui/icons-material/Announcement';

interface Props {
    item: NewsProps
}
export const NewsItem: FC<Props> = ({ item }) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot>
                    <AnnouncementIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Card>
                    <CardContent>
                        <Typography variant="h6" >
                            {item.title}
                        </Typography>
                        <Typography variant="caption" >
                            {item.date}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: 10 }} >
                            {item.content.length < 100 ? item.content : `${item.content.substring(0, 100)}...`}
                        </Typography>
                    </CardContent>
                    {item.content.length > 50 &&
                        <CardActions>
                            <Button size="small" onClick={() => setDialogOpen(true)} color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    }
                </Card>
                <NewsDetailsDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} news={item} />
            </TimelineContent>
        </TimelineItem >
    )
}