import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";
import Section6 from "./Sections/Section6";
import './styles.css';



const Content = () => {

    const [isVisible1, setVisible1] = useState(false)
    const [isVisible2, setVisible2] = useState(false)
    const [isVisible3, setVisible3] = useState(false)
    const [isVisible6, setVisible6] = useState(false)

    const handleScroll = () => {
        window.scrollY > 300 ? setVisible1(true) : setVisible1(false)
        window.scrollY > 500 ? setVisible2(true) : setVisible2(false)
        window.scrollY > 1900 ? setVisible3(true) : setVisible3(false)
        window.scrollY > 3000 ? setVisible6(true) : setVisible6(false)

    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <Grid container justify="center" style={{ background: '#480000' }}>
            <Section1 isVisible1={isVisible1} />
            <Section2 />
            <Section3 isVisible3={isVisible3} />
            <Section6 isVisible6={isVisible6} />
            <Section4 />
            <Section5 />
        </Grid >
    )
}

export default Content