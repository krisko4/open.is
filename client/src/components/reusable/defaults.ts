import {format} from 'date-fns'

export const defaultNews = [
    {
        title: 'This will be my first news!',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        content: 'This is just an example of what your news will look like. It will disappear after your first news is created.'
    },
    {
        title: 'This will be my second news!',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        content: 'It is going to be fun!'

    },
    {
        title: 'Thank your for using our services 💌',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        content: 'We appreciate you.'

    }

]

export const defaultOpinions = [
    {
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        author: 'Administration',
        content: 'This is just an example of what opinions will look like in the browser once your place is created.',
        note: 5,
        averageNote: 0,
        authorImg: `${[process.env.REACT_APP_BASE_URL]}/images/admin.png`
    },
    {
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        author: 'Happy client',
        content: 'This is a lovely place!',
        note: 5,
        averageNote: 0,
        authorImg: `${[process.env.REACT_APP_BASE_URL]}/images/client.jpg`
    },
    {
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        author: 'Administration',
        content: 'Thank you for using our services💌',
        note: 5,
        averageNote: 0,
        authorImg: `${[process.env.REACT_APP_BASE_URL]}/images/admin.png`
    },


]
