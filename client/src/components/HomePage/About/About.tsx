import makeStyles from '@mui/styles/makeStyles';
import React, { FC, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { AuthContextProvider } from '../../../contexts/AuthContext';
import Header from '../MainPage/Header';
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Team } from "./Team";

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_BASE_URL}/images/team.jpg)`
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: '#494949',
        '&:hover': {
            backgroundColor: '#303030'
        },
        borderRadius: '50%',
        color: 'white'
    }
})
export const About: FC = () => {


    const section1Classes = useSection1Styles()
    const section2Classes = useSection2Styles()
    const section3Classes = useSection3Styles()
    const [index, setIndex] = useState(0)


    const items = [
        <Section1 classes={section1Classes}  />,
        <Section3 classes={section3Classes}  />,
        <Section2 classes={section2Classes}  />,

    ]
    return (
        <AuthContextProvider>
            <Header />
            <Carousel
                index={index}
                onChange={(now) => setIndex(now as number)}
                navButtonsAlwaysVisible
                fullHeightHover={false}
                autoPlay={false}
                indicators={false}
            >
                {items.map((item, i) => <div key={i}>{item}</div>)
                }
            </Carousel>
            {index === 1 && <Team />}
        </AuthContextProvider>
    )
}


