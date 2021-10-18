import { useSnackbar } from "notistack";
import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import myAxios from "../../axios/axios";

interface Params {
    token: string,
    email: string
}

export const EmailChangeConfirmation: FC = () => {

    const { email, token } = useParams<Params>()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        console.log(email, token)
        myAxios.get(`/confirmation/${email}/${token}`)
            .then(() => {
                enqueueSnackbar(`You have successfully changed your e-mail address.`, {
                    variant: 'info'
                })
            })
            .catch(err => {
                if (err.response.data === `Provided token has expired.`) {
                    enqueueSnackbar(`Your activation token has expired. Please try to change your e-mail again.`, {
                        variant: 'warning'
                    })
                    return
                }
                enqueueSnackbar(`Oops, something went wrong`, {
                    variant: 'error'
                })
            }).finally(() => {
                history.push('/')
            })
    }, [])

    return null
}