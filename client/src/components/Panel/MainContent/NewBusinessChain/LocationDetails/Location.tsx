import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@material-ui/core"
import { FC } from "react"
import { ExpandMore } from "@material-ui/icons"

interface Props{
    address : string
}

export const Location: FC<Props> = ({address}) => {
    return (
        <Accordion style={{width: '100%'}}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{address}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}