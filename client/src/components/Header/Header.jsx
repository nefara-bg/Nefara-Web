import { AppBar, Box, Button, Stack, styled, Toolbar, Typography } from "@mui/material"
import { HashLink } from "react-router-hash-link"
import logo from "../../../img/logo.webp"

const Header = () => {
    const NavigationBar = styled(AppBar)(({ theme }) => ({
        backgroundColor: theme.palette.background.secondary,
        padding: `${theme.spacing(1)} ${theme.spacing(9)}`
    }))



    return (
        <NavigationBar elevation={0} position="sticky">
            <Toolbar>
                <Box sx={{ width: "156px" }}>
                    <img src={logo} alt="Our logo" className="image" />
                </Box>
                <Stack flex={1} direction={"row"} alignItems={"center"} justifyContent={"end"} gap={5}>
                    <Stack direction={"row"} gap={4}>
                        <HashLink to="/#hero"><Typography variant="body2">Home</Typography></HashLink>
                        <HashLink to="/#services"><Typography variant="body2">Services</Typography></HashLink>
                        <HashLink to="/#about"><Typography variant="body2">About</Typography></HashLink>
                        <HashLink to="/#contact"><Typography variant="body2">Contact</Typography></HashLink>
                    </Stack>
                    <HashLink to="/#contact"><Button variant="contained" size="small" color="primary">Get Started</Button></HashLink>
                </Stack>

            </Toolbar>
        </NavigationBar>
    )
}

export default Header