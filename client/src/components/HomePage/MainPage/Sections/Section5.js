import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import React from "react";


const opinions = [
    {
        name: 'Paul Johnson',
        content: '   Open.is is a great platform which has made my life easier several times.\n' +
            '                        Before, I used to check if the place I wanted to visit was open via Google Maps.\n' +
            '                        However, there were some situations when places which should theoretically be open,\n' +
            '                        were actually closed. It was really frustrating... I\'m so glad Open.is has found a solution to my problem!',
        image: 'https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg'
    },
    {
        name: 'Robert Buk',
        content: 'I\'m an owner of a club in Białystok. I find it important to\n' +
            '                        keep my clients informed regularly about upcoming events in my place. Open.is\n' +
            '                        is a great platform with user-friendly interface, which allows me to do it. What\'s more -\n' +
            '                        the more popular platform gets, the more potential clients I can have!',
        image: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg'
    },
    {
        name: 'Kate Sidney',
        content: 'I really like the concept of being able to update the state of my place regularly.\n' +
            '                        There are some situations when I have to close my shop earlier for some reason -\n' +
            '                        I feel obliged to inform my clients about some unusual events. Open.is lets me do it\n' +
            '                        online, so they don\'t have to drive to my place and loose their precious time to see that\n' +
            '                        it\'s closed.',
        image: 'https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI'
    }
]

const createOpinions = ({image}) => {
    return opinions.map((opinion, i) => {
        return (<Grid item xs={3} key={i}>
            <Grid container direction="row" justify="center">
                      <Avatar
                          src={opinion.image}
                          className={image}/>
                      <Grid item xs={6} style={{marginLeft: 10}}>
                          <h2 style={{color: 'white'}}>{opinion.name}</h2>
                          <div style={{fontStyle: 'italic', color: 'lightgrey'}}>{opinion.content}</div>
                      </Grid>
                  </Grid>
        </Grid>)
    })
}

const Section5 = ({image}) => {


    return (


        <Grid
            container
            style={{marginTop: 100, marginBottom: 100}}
            justify="center"
        >
            <Grid item xs={12} align="center">
                <Typography variant="h2" style={{fontWeight: 'bold', color: 'white'}}>
                    Trusted by people
                </Typography>
            </Grid>
            <Grid item xs={7} align="center">
                <Typography variant="h5" style={{marginTop: 20, color: 'lightgray'}}>
                    We are extremely grateful for the feedback provided by our users. Your opinions are highly
                    appreciated.
                    Below you can find some of them:
                </Typography>
            </Grid>
            <Grid container style={{marginTop: 100}} justify="space-around">
                {createOpinions({image})}
            </Grid>
        </Grid>
    )
}

export default Section5