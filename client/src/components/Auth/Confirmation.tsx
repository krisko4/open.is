import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { confirmRegistrationToken } from "../../requests/AuthRequests";
import { useCustomSnackbar } from "../../utils/snackbars";

interface Params {
    token: string
}

export const Confirmation: FC = () => {

    const { token } = useParams<Params>()
    const history = useHistory()
    const {enqueueWarningSnackbar, enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    useEffect(() => {
        confirmRegistrationToken(token).then(() => {
            enqueueSuccessSnackbar(`Your account has been activated. You can sign in now.`)
            history.push('/')
        })
            .catch(err => {
                if (err.response.data === `Provided token has expired.`) {
                    enqueueWarningSnackbar(`Your activation token has expired. Please try to sign in again.`)
                    history.push('/')
                    return
                }
                enqueueErrorSnackbar()
                history.push('/')
            })
    }, [])

    return null
}