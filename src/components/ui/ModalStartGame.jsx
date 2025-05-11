import {Box, Button, Modal, TextField, Typography, MenuItem, Select, FormControl, InputLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    setIsLocalGamePause, setIsLocalGameStart, setIsLocalReconfig,
    setIsLocalStartingGroup,
    setIsOpenModalNewGame,
    setLocalGroup1Name, setLocalGroup2Name, setLocalReconfigTime,
    setLocalShotTime,
    setLocalTotalTime
} from "../../redux/features/robotSlice.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {setTotalTime} from "../../redux/features/messageSlice.js";

function ModalStartGame({sendMessage}) {
    const open = useSelector((state) => state.robot.isOpenModalNewGame);
    const dispatch = useDispatch();
    const [group1, setGroup1] = useState("");
    const [group2, setGroup2] = useState("");
    const [startingGroup, setStartingGroup] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 24,
        p: 3,
    };

    const handleStartGame = () => {
        if (group1.trim() && group2.trim() && startingGroup.trim()) {
            const messages = [
                { key: "group1", value: group1 },
                { key: "group2", value: group2 },
                { key: "startingGroup", value: startingGroup },
                { key: "totalTime", value: "160" },
                { key: "shotTime", value: "20" },
                { key: "isScore", value: "0" },
                { key: "isReconfig", value: "0" },
                { key: "isGamePause", value: "1" },
                { key: "isGameStarted", value: "0" },
            ];
            sendMessage(messages);
            dispatch(setLocalGroup1Name(group1));
            dispatch(setLocalGroup2Name(group2));
            dispatch(setIsLocalStartingGroup(startingGroup));
            dispatch(setIsLocalGamePause(true));
            dispatch(setIsLocalGameStart(false));
            dispatch(setLocalTotalTime(160))
            dispatch(setLocalShotTime(20))
            dispatch(setIsLocalReconfig(false));
            dispatch(setLocalReconfigTime(0));
            dispatch(setIsOpenModalNewGame(false));
        } else {
            alert("Please enter both group names and select the starting group.");
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => dispatch(setIsOpenModalNewGame(false))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h5" sx={{mb: 2}}>Set Group Name</Typography>
                <TextField
                    fullWidth
                    label="Group1"
                    variant="outlined"
                    sx={{mb: 2}}
                    required
                    onChange={(e) => setGroup1(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Group2"
                    variant="outlined"
                    sx={{mb: 2}}
                    required
                    onChange={(e) => setGroup2(e.target.value)}
                />
                <FormControl fullWidth sx={{mb: 2}}>
                    <InputLabel id="select-start-group-label">Start First</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={startingGroup}
                        label="Start First"
                        onChange={(e) => setStartingGroup(e.target.value)}
                        disabled={!group1 || !group2}
                        variant="outlined"
                    >
                        <MenuItem value="g1">{group1 || "Group 1"}</MenuItem>
                        <MenuItem value="g2">{group2 || "Group 2"}</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
                    <Button variant="outlined" sx={{color: "#000"}}
                            onClick={() => dispatch(setIsOpenModalNewGame(false))}>Cancel</Button>
                    <Button variant="contained" onClick={handleStartGame}>Set up</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalStartGame;
