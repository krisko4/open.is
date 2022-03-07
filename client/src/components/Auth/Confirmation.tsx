import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { confirmRegistrationToken } from "../../requests/AuthRequests";
import { useCustomSnackbar } from "../../utils/snackbars";


export const Confirmation: FC = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const {enqueueWarningSnackbar, enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    useEffect(() => {
        confirmRegistrationToken(token as string).then(() => {
            enqueueSuccessSnackbar(`Your account has been activated. You can sign in now.`)
            navigate('/')
        })
            .catch(err => {
                if (err.response.data === `Provided token has expired.`) {
                    enqueueWarningSnackbar(`Your activation token has expired. Please try to sign in again.`)
                    navigate('/')
                    return
                }
                enqueueErrorSnackbar()
                navigate('/')
            })
    }, [])

    return null
}