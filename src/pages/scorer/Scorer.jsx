import ButtonBack from "../../components/ui/ButtonBack.jsx";
import {
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel, MenuItem,
    Select, Snackbar,
    Typography,

} from "@mui/material";
import {useEffect, useState} from "react";
import useWebsocketServer from "../../hook/useWebsocketServer.jsx";
import Loading from "../../components/ui/Loading.jsx";
import {useDispatch, useSelector} from "react-redux";
import {indigo, red} from "@mui/material/colors";
import SwitchCustom from "../../components/ui/SwitchCustom.jsx";
import {
    setIsLocalShortestG1, setIsLocalShortestG2,
    setLocalDunkPointG1, setLocalDunkPointG2,
    setLocalThreePointG1, setLocalThreePointG2,

    setLocalTwoPointG1, setLocalTwoPointG2
} from "../../redux/features/robotSlice.js";

function Scorer() {
    const sessionId = useSelector((state) => state.robot.sessionId);
    const dispatch = useDispatch();
    const localTwoPointG1 = useSelector((state) => state.robot.localTwoPointG1);
    const localThreePointG1 = useSelector((state) => state.robot.localThreePointG1);
    const localDunkPointG1 = useSelector((state) => state.robot.localDunkPointG1);
    const [pointGroup1, setPointGroup1] = useState('');
    const [pointGroup2, setPointGroup2] = useState('');
    const {loading, isConnected, sendMessage} = useWebsocketServer(`/app/chat/${sessionId}`);
    const group1 = useSelector((state) => state.message.group1);
    const group2 = useSelector((state) => state.message.group2);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const isLocalShortestG1 = useSelector((state) => state.robot.isLocalShortestG1);
    const isLocalShortestG2 = useSelector((state) => state.robot.isLocalShortestG2);
    const localTwoPointG2 = useSelector((state) => state.robot.localTwoPointG2);
    const localThreePointG2 = useSelector((state) => state.robot.localThreePointG2);
    const localDunkPointG2 = useSelector((state) => state.robot.localDunkPointG2);
    const isGameStarted = useSelector((state) => state.message.isGameStarted);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleShortestG1Change = (event) => {
        dispatch(setIsLocalShortestG1(event.target.checked));
        console.log(event.target.checked);
        const messages = [
            {key: "isShortestG1", value: event.target.checked ? "1" : "0"},
        ]
        sendMessage(messages);
        setOpen(true);
        setMessage("Shortest is set");
    }

    useEffect(() => {
        if (isGameStarted) {
            dispatch(setIsLocalShortestG1(false));
            dispatch(setIsLocalShortestG2(false));
        }
    }, [isGameStarted]);

    const handleShortestG2Change = (event) => {
        dispatch(setIsLocalShortestG2(event.target.checked));
        const messages = [
            {key: "isShortestG2", value: event.target.checked ? "1" : "0"},
        ]
        sendMessage(messages);
        setOpen(true);
        setMessage("Shortest is set");
    }

    const handleSubmitGroup1 = () => {
        const messages = []
        if (pointGroup1 === 2) {
            dispatch(setLocalTwoPointG1(localTwoPointG1 + 1));
            messages.push({key: "twoPointG1", value: 1});
        } else if (pointGroup1 === 3) {
            dispatch(setLocalThreePointG1(localThreePointG1 + 1));
            messages.push({key: "threePointG1", value: 1});
        } else if (pointGroup1 === 7) {
            dispatch(setLocalDunkPointG1(localDunkPointG1 + 1));
            messages.push({key: "dunkPointG1", value: 1});
        }
        if (messages.length > 0) {
            sendMessage(messages);
        }
        setPointGroup1('');
        setOpen(true);
        setMessage("Score submitted");
    }

    const handleSubmitGroup2 = () => {
        const messages = []
        if (pointGroup2 == 2){
            dispatch(setLocalTwoPointG2(1));
            messages.push({key: "twoPointG2", value: 1});
        }else if (pointGroup2 == 3){
            dispatch(setLocalThreePointG2(localThreePointG2 + 1));
            messages.push({key: "threePointG2", value: 1});
        }else if (pointGroup2 == 7){
            dispatch(setLocalDunkPointG2(localDunkPointG2 + 1));
            messages.push({key: "dunkPointG2", value: 1});
        }
        if (messages.length > 0) {
            sendMessage(messages);
        }
        setPointGroup2('');
        setOpen(true);
        setMessage("Score submitted");
    }

    let content;

    if (loading) {
        content = <Loading/>
    }

    if (isConnected) {
        content = (
            <div className="w-full h-full">
                <ButtonBack/>
                <Grid container spacing={2} sx={{
                    py: 10,
                    px: 2,
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Grid size={{xs: 12, md: 4}}>
                        <Card sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 4}}>
                            <Typography variant="h5" sx={{
                                backgroundColor: red[700],
                                padding: 2,
                                color: "#fff",
                                width: "100%",
                                fontWeight: "bold"
                            }}
                                        textAlign={"center"}>{group1 || "_ _"}</Typography>
                            <div className="w-full flex justify-center items-center gap-4">
                                <FormControl sx={{width: "100%", m: 1}}>
                                    <InputLabel id="demo-simple-select-label">Select Point</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={pointGroup1}
                                        label="Age"
                                        disabled={!isGameStarted}
                                        onChange={(event) => setPointGroup1(event.target.value)}
                                    >
                                        <MenuItem value={2}>2 Point</MenuItem>
                                        <MenuItem value={3}>3 Point</MenuItem>
                                        <MenuItem value={7}>Dunk</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={handleSubmitGroup1} disabled={!isGameStarted}>Submit</Button>
                            </div>
                            <SwitchCustom onChange={handleShortestG1Change} checked={isLocalShortestG1} isDisabled={!isGameStarted}/>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Card sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 4}}>
                            <Typography variant="h5" sx={{
                                backgroundColor: indigo[700],
                                padding: 2,
                                color: "#fff",
                                width: "100%",
                                fontWeight: "bold"
                            }}
                                        textAlign={"center"}>{group2 || "_ _"}</Typography>
                            <div className="flex w-full justify-center items-center gap-4">
                                <FormControl sx={{width: "100%", m: 1}}>
                                    <InputLabel id="demo-simple-select-label">Select Point</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={pointGroup2}
                                        label="Age"
                                        disabled={!isGameStarted}
                                        onChange={(event) => setPointGroup2(event.target.value)}
                                    >
                                        <MenuItem value={2}>2 Point</MenuItem>
                                        <MenuItem value={3}>3 Point</MenuItem>
                                        <MenuItem value={7}>Dunk</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={handleSubmitGroup2} disabled={!isGameStarted}>Submit</Button>
                            </div>
                            <SwitchCustom onChange={handleShortestG2Change} checked={isLocalShortestG2} isDisabled={!isGameStarted}/>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={message}
                />
            </div>
        )
    }
    return content;
}

export default Scorer;