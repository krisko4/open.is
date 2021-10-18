import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { FastField, FormikErrors } from "formik";
import React, { Dispatch, FC, SetStateAction } from "react";

interface Props {
    passwordChangeOpen: boolean,
    setPasswordChangeOpen: Dispatch<SetStateAction<boolean>>,
    errors: FormikErrors<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}>
}

export const PasswordChange: FC<Props> = ({ passwordChangeOpen, setPasswordChangeOpen, errors }) => {
    return (
        <Dialog maxWidth="xs" fullWidth={true} open={passwordChangeOpen} onClose={() => setPasswordChangeOpen(false)}>
            <DialogTitle>Password change</DialogTitle>
            <DialogContent>
                <Grid container direction="column">
                    <FastField as={TextField} error={errors.password} helperText={errors.password} variant="outlined" name="password" type="password" label="New password" />
                    <FastField as={TextField} style={{marginTop: 10}} error={errors.confirmPassword} helperText={errors.confirmPassword} variant="outlined" name="confirmPassword" type="password" label="Confirm new password" />
                    
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setPasswordChangeOpen(false)} disabled={errors.password || errors.confirmPassword ? true : false} color="primary">Save changes</Button>
            </DialogActions>
        </Dialog>
    )
}