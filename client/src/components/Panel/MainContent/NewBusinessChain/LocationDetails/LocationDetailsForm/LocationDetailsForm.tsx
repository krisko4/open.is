import { Grid, Typography, TextField, Button } from "@mui/material"
import { useFormikContext, Form, Field } from "formik"
import { FC, useState } from "react"


enum Fields {
    PHONE = 0,
    EMAIL = 1,
    WEBSITE = 2,
    FACEBOOK = 3,
    INSTAGRAM = 4
}

export const LocationDetailsForm: FC = () => {
    // const { values } = useFormikContext()
    const [clickedButtons, setClickedButtons] = useState<number[]>([])

    // const addButton = (button: Buttons) => {
    //     clickedButtons.includes(button) ? delete clickedButtons[clickedButtons.indexOf(button)] : clickedButtons.push(button)
    //     setClickedButtons([...clickedButtons])
    // }

    const setValueToAllFields = (value : string, fieldIndex : Fields) => {
        

    }

    return (
        <Form style={{ flexGrow: 1, marginBottom: 10 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={5}>
                    <Button
                        size="small"
                        // color={clickedButtons.includes(Buttons.PHONE) ? "primary" : "default"}
                        // onClick={() => addButton(Buttons.PHONE)}
                        style={{ marginTop: 15 }}
                        variant="outlined"
                    >Phone number</Button>
                    {/* <Typography style={{ paddingTop: 15 }} variant="subtitle2">Phone number</Typography> */}
                </Grid>
                <Grid item lg={5}>
                    <Field as={TextField} label="Phone number" name="phone" fullWidth />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={5}>
                    <Button
                        size="small"
                        // color={clickedButtons.includes(Buttons.EMAIL) ? "primary" : "default"}
                        // onClick={() => addButton(Buttons.EMAIL)}
                        style={{ marginTop: 15 }}
                        variant="outlined">
                        E-mail address</Button>
                    {/* <Typography style={{ paddingTop: 15 }} variant="subtitle2">E-mail address</Typography> */}
                </Grid>
                <Grid item lg={5}>
                    <Field as={TextField} label="example@mail.com" name="email" fullWidth />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={5}>
                    <Button
                        size="small"
                        // color={clickedButtons.includes(Buttons.WEBSITE) ? "primary" : "default"}
                        style={{ marginTop: 15 }}
                        variant="outlined"
                        // onClick={() => addButton(Buttons.WEBSITE)}
                    >Website</Button>
                    {/* <Typography style={{ paddingTop: 15 }} variant="subtitle2">Website</Typography> */}
                </Grid>
                <Grid item lg={5}>
                    <Field as={TextField} label="https://example.com" name="website" fullWidth />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={5}>
                    <Button
                        // color={clickedButtons.includes(Buttons.FACEBOOK) ? "primary" : "default"}
                        size="small"
                        style={{ marginTop: 15 }}
                        variant="outlined"
                        // onClick={() => addButton(Buttons.FACEBOOK)}
                    >Facebook</Button>
                    {/* <Typography style={{ paddingTop: 15 }} variant="subtitle2">Facebook</Typography> */}
                </Grid>
                <Grid item lg={5}>
                    <Field as={TextField} label="https://facebook.com/my-profile" name="facebook" fullWidth />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={5}>
                    <Button
                        // color={clickedButtons.includes(Buttons.INSTAGRAM) ? "primary" : "default"}
                        size="small"
                        style={{ marginTop: 15 }}
                        variant="outlined"
                        // onClick={() => addButton(Buttons.INSTAGRAM)}
                    >Instagram</Button>
                    {/* <Typography style={{ paddingTop: 15 }} variant="subtitle2">Instagram</Typography> */}
                </Grid>
                <Grid item lg={5}>
                    <Field as={TextField} label="https://instagram.com/my-profile" name="instagram" fullWidth />
                </Grid>
            </Grid>

        </Form>
    );
}