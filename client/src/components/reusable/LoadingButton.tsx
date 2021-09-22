import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


export const LoadingButton : FC<any> = (props) => {
    const {
        children,
        loading,
        ...rest
    } = props
    return (
        <Button {...rest}>
            {!loading && children}
            {loading && <CircularProgress size={20}/>}
        </Button>
    )
}