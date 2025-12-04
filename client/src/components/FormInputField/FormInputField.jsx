"use client"

import { Stack, TextField, Typography } from "@mui/material"

const FormInputField = ({ label = "", placeholder = "", inputRef = null, multiline = false, rows = 1, name = "", type = "text" }) => {
    const inputProps = {
        style: {
            fontSize: "0.875rem",
        }
    }



    return (
        <Stack sx={{ width: "100%" }}>
            <Typography variant="body1" fontSize={"0.875rem"} mb={1} color="primary" fontWeight={500}>{label} *</Typography>
            <TextField
                variant="outlined"
                placeholder={placeholder}
                inputRef={inputRef}
                inputProps={inputProps}
                InputLabelProps={{ shrink: false }}
                size="small"
                multiline={multiline}
                rows={rows}
                required={true}
                name={name}
                type={type}
            />
        </Stack>
    )
}

export default FormInputField