import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import myAxios from "../../axios/axios";

interface Params {
    token: string
}

export const Confirmation: FC = () => {

    const { token } = useParams<Params>()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        myAxios.get(`/confirmation/${token}`)
            .then(() => history.push('/'))
            .catch(err => {
                if (err.response.data === `Provided token has expired.`) {
                    console.log('xd')
                    return
                }
                enqueueSnackbar(`Oops, something went wrong`, {
                    variant: 'error'
                })
                history.push('/')
            })
    }, [])

    return null
}