import React, { FC } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid, Typography, createStyles, makeStyles } from '@material-ui/core'
import { AuthContextProvider } from '../../../contexts/AuthContext';
import Header from '../MainPage/Header';
import { Section1 } from "./Section1"
import {Section2} from "./Section2"
import {Section3} from "./Section3"

const useSection1Styles = makeStyles({
    background: {
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.6)), url(${process.env.REACT_APP_BASE_URL}/images/me.jpg)`
    }
})

const useSection2Styles = makeStyles({
    background: {
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6)), url(${process.env.REACT_APP_BASE_URL}/images/office.jpg)`
    }
})
const useSection3Styles = makeStyles({
    background: {
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/team.jpg)`
    }
})
export const About: FC = (props) => {

    const section1Classes = useSection1Styles()
    const section2Classes = useSection2Styles()
    const section3Classes = useSection3Styles()

    const items = [
       <Section1 classes={section1Classes} />,
       <Section3 classes={section3Classes} />,
       <Section2 classes={section2Classes} />,

    ]
    return (
        <AuthContextProvider>
            <Header />
            <Carousel animation="slide" indicators={false}>
                { items.map((item, i) => <div key={i}>{item}</div>)
                    // items.map((item, i) => <Grid container align)
                }
            </Carousel>
        </AuthContextProvider>
    )
}

// interface Props {
//     item: {
//         name: string,
//         description: string,
//         backgroundImage: string,
//         content: any
//     }
// }

// const Item: FC<Props> = ({ item }) => {
//     return (
//         <Grid container alignItems="center" className={item.} }}>
//             { item.content }

//         </Grid >
//     )
// }

