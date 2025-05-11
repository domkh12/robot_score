import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function ButtonBack() {
    const navigate = useNavigate();
    return(
        <Button variant="contained" onClick={() => navigate("/dashboard")} sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
        }}>Back</Button>
    )
}

export default ButtonBack;