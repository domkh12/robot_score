import {Paper, Typography} from "@mui/material";

function Navbar() {
    return(
        <>
        <Paper component="nav" variant="cus_nav" elevation={0} sx={{px: 5, py: 1}}>
            <img src="/images/logo.jpeg" alt="logo" className="w-16 h-16"/>
            <Typography variant="h4">Robot Basketball 🏀</Typography>
            <div></div>
        </Paper>
        </>
    )
}

export default Navbar;