import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { confirmEmailChange } from "../../requests/AuthRequests";
import { useCustomSnackbar } from "../../utils/snackbars";

interface Params {
    token: string,
    email: string
}

export const EmailChangeConfirmation: FC = () => {

    const { email, token } = useParams<Params>()
    const history = useHistory()
    const {enqueueSuccessSnackbar, enqueueWarningSnackbar, enqueueErrorSnackbar} = useCustomSnackbar()

    useEffect(() => {
        console.log(email, token)
        confirmEmailChange(email, token).then(() => {
            enqueueSuccessSnackbar(`You have successfully changed your e-mail address.`)
        })
            .catch(err => {
                if (err.response.data === `Provided token has expired.`) {
                    enqueueWarningSnackbar(`Your activation token has expired. Please try to change your e-mail again.`)
                    return
                }
                enqueueErrorSnackbar()
            }).finally(() => {
                history.push('/')
            })
    }, [])

    return null
}