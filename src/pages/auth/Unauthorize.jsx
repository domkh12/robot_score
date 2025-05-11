import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Unauthorize() {
    const navigate = useNavigate();
    return(
        <>
            <Typography variant="h4">Unauthorize</Typography>
            <Button variant="contained" onClick={() => navigate("/")}>Back</Button>
        </>
    )
}

export default Unauthorize;