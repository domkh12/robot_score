import {Button, Card, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setSessionId} from "../../redux/features/robotSlice.js";
import {useNavigate} from "react-router-dom";

function Auth() {
    const sessionId = useSelector((state) => state.robot.sessionId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEnter = () => {
        localStorage.setItem("sessionId", sessionId);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen flex justify-center items-center">
        <Card sx={{width: 400, p: 4, display: "flex", flexDirection: "column", gap: 3,}}>
            <div className="flex justify-start items-center gap-5">
            <img src="/images/logo.jpeg" alt="logo" width="60px"/>
            <Typography variant="h5">Robot Score</Typography>
            </div>
        <TextField
            sx={{mt:2}}
            id="outlined-basic"
            label="Enter session id"
            value={sessionId}
            onChange={(e) => dispatch(setSessionId(e.target.value))}
        />
            <Button variant="contained" onClick={handleEnter} size="large">Enter</Button>
        </Card>
    </div>;
}

export default Auth;