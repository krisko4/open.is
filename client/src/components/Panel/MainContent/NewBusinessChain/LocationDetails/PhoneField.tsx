import { Theme, TextField } from "@mui/material";
import {withStyles} from "@mui/styles"
import React from "react";
import ReactPhoneInput from "react-phone-input-material-ui";


const styles = (theme : Theme) => ({
    field: {
        margin: '10px 0',
    },
    countryList: {
        ...theme.typography.body1,
    },
});


function PhoneField(props : any) {
    const { value, defaultCountry, onChange, classes } = props;

    return (
        <React.Fragment>
            {/* Simple usage */}
            <ReactPhoneInput
                value={value}
                onChange={onChange} // passed function receives the phone value
                component={TextField}
            />

            {/* Configure more */}
            <ReactPhoneInput
                value={value}
                defaultCountry={defaultCountry || 'gb'}
                onChange={onChange}
                inputClass={classes.field}
                dropdownClass={classes.countryList}
                component={TextField}
            />
        </React.Fragment>
    );
}

//@ts-ignore
export default withStyles(styles)(PhoneField);