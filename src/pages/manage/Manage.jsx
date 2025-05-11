import ButtonBack from "../../components/ui/ButtonBack.jsx";
import {Button, Divider, Grid, Snackbar, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    setIsLocalGamePause, setIsLocalGameStart,
    setIsLocalReconfig, setIsLocalStartingGroup,
    setIsOpenModalNewGame, setIsScore,
    setLocalReconfigTime,
    setLocalShotTime,
    setLocalTotalTime
} from "../../redux/features/robotSlice.js";
import useWebsocketServer from "../../hook/useWebsocketServer.jsx";
import Loading from "../../components/ui/Loading.jsx";
import ModalStartGame from "../../components/ui/ModalStartGame.jsx";
import GaugeCustom from "../../components/ui/GaugeCustom.jsx";
import {useEffect, useState} from "react";
import {FaPause} from "react-icons/fa6";
import {BsFillCaretRightFill} from "react-icons/bs";
import {RiResetLeftLine} from "react-icons/ri";
import {LuGoal} from "react-icons/lu";
import {GrConfigure, GrGamepad} from "react-icons/gr";
import {MdCelebration} from "react-icons/md";

function Manage() {
    const sessionId = useSelector((state) => state.robot.sessionId);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const group1 = useSelector((state) => state.robot.localGroup1Name);
    const group2 = useSelector((state) => state.robot.localGroup2Name);
    const isShotTimeGroup1Show = useSelector((state) => state.robot.isLocalGroup1Show);
    const isShotTimeGroup2Show = useSelector((state) => state.robot.isLocalGroup2Show);
    const {sendMessage, loading, isConnected} = useWebsocketServer(`/app/chat/${sessionId}`);
    const isReconfig = useSelector((state) => state.robot.isLocalReconfig);
    const reconfigTime = useSelector((state) => state.robot.localReconfigTime);
    const isGamePause = useSelector((state) => state.robot.isLocalGamePause);
    const isGameStarted = useSelector((state) => state.robot.isLocalGameStart);
    const isScore = useSelector((state) => state.robot.isScore);
    const totalTime = useSelector((state) => state.robot.localTotalTime);
    const shotTime = useSelector((state) => state.robot.localShotTime);
    const md = useMediaQuery(theme => theme.breakpoints.down('md'));

    let timer;

    useEffect(() => {
        if (shotTime === 0 && totalTime > 0 && !isGamePause) {
            dispatch(setLocalShotTime(20));
            dispatch(setIsLocalStartingGroup(isShotTimeGroup1Show ? "g2" : "g1"));
        }
        if (totalTime < 20 && !isGamePause) {
            dispatch(setLocalShotTime(totalTime))
        }
        if (isGameStarted && shotTime >= 0 && totalTime >= 0 && !isGamePause) {
            timer = setTimeout(() => {
                if (shotTime === 0 && totalTime === 0) {
                    dispatch(setIsLocalGamePause(true));
                    dispatch(setIsLocalGameStart(false));
                    return;
                }
                dispatch(setLocalShotTime(shotTime - 1));
                dispatch(setLocalTotalTime(totalTime - 1));
            }, 1000);
            sendMessage([
                {key: "isGameStarted", value: isGameStarted ? "1" : "0"},
                {key: "isGamePause", value: isGamePause ? "1" : "0"},
                {key: "isScore", value: isScore ? "1" : "0"},
                {key: "isReconfig", value: isReconfig ? "1" : "0"},
                {key: "totalTime", value: totalTime},
                {key: "shotTime", value: shotTime},
                {key: "startingGroup", value: isShotTimeGroup1Show ? "g1" : "g2"},
                {key: "group1", value: group1},
                {key: "group2", value: group2},
            ]);
        }
        if (isReconfig && reconfigTime > 0 && isGameStarted && isGamePause) {
            timer = setTimeout(() => {
                dispatch(setLocalReconfigTime(reconfigTime - 1));
            }, 1000);
            sendMessage([
                {key: "isReconfig", value: isReconfig ? "1" : "0"},
                {key: "reconfigTime", value: reconfigTime},
                {key: "shotTime", value: shotTime},
                {key: "totalTime", value: totalTime},
                {key: "startingGroup", value: isShotTimeGroup1Show ? "g1" : "g2"},
                ]);
        } else if (isReconfig && reconfigTime === 0 && isGameStarted && isGamePause) {
            dispatch(setIsLocalReconfig(false));
            dispatch(setIsLocalGamePause(false));
        }

        return () => {clearTimeout(timer)}
    }, [isGameStarted, totalTime, shotTime, isGamePause, isReconfig, reconfigTime]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const checkGroupNames = () => {
        if (group1.trim() === "" || group2.trim() === "") {
            setOpen(true);
            setMessage("Please set group name");
            return false;
        }
        return true;
    };

    const checkGameStart = () => {
        if (!checkGroupNames()) return;
        if (!isGameStarted) {
            setOpen(true);
            setMessage("Game is not started");
            return false;
        }
        return true;
    }

    const handleGameStartClick = () => {
        if (!checkGroupNames()) return;
        dispatch(setIsLocalGameStart(true));
        dispatch(setIsLocalGamePause(false));
        sendMessage([
            {key: "twoPointG1", value: 0},
            {key: "threePointG1", value: 0},
            {key: "dunkPointG1", value: 0},
            {key: "twoPointG2", value: 0},
            {key: "threePointG2", value: 0},
            {key: "dunkPointG2", value: 0},
            {key: "isShortestG1", value: "0"},
            {key: "isShortestG2", value: "0"},
            {key: "pointG1", value: "0"},
            {key: "pointG2", value: "0"},
        ])
        setOpen(true);
        setMessage("Game started");
    }

    const handleGamePauseClick = () => {
        if (!checkGameStart()) return;
        sendMessage([{key: "isGamePause", value: isGamePause ? "0" : "1"}])
        dispatch(setIsLocalGamePause(!isGamePause));

    }

    const handleGameResetClick = () => {
        if (!checkGroupNames()) return;
        dispatch(setLocalShotTime(20));
        dispatch(setLocalTotalTime(160));
        dispatch(setLocalReconfigTime(0));
        dispatch(setIsLocalReconfig(false));
        dispatch(setIsLocalGameStart(false));
        sendMessage([
            {key: "isGameStarted", value: "0"},
            {key: "isGamePause", value: "1"},
            {key: "isScore", value: "0"},
            {key: "isReconfig", value: "0"},
            {key: "totalTime", value: "160"},
            {key: "shotTime", value: "20"},
            {key: "startingGroup", value: isShotTimeGroup1Show ? "g1" : "g2"},
            {key: "reconfigTime", value: "0"},
            {key: "twoPointG1", value: 0},
            {key: "threePointG1", value: 0},
            {key: "dunkPointG1", value: 0},
            {key: "twoPointG2", value: 0},
            {key: "threePointG2", value: 0},
            {key: "dunkPointG2", value: 0},
            {key: "isShortestG1", value: "0"},
            {key: "isShortestG2", value: "0"},
            {key: "pointG1", value: "0"},
            {key: "pointG2", value: "0"},
        ])
        setOpen(true);
        setMessage("Game reset");
    }

    const handleReconfigClick = () => {
        if (!checkGameStart()) return;
        if (totalTime > 0 && shotTime > 0) {
            clearTimeout(timer);
            dispatch(setLocalReconfigTime(10));
            dispatch(setIsLocalReconfig(true));
            dispatch(setIsLocalGamePause(true));
            dispatch(setLocalShotTime(20));
            dispatch(setIsLocalStartingGroup(isShotTimeGroup1Show ? "g2" : "g1"));
            setOpen(true);
            setMessage("Reconfig");
        }
    }

    const handleScoreClick = () => {
        if (!checkGameStart()) return;

        if (isGameStarted && totalTime > 0 && shotTime > 0) {
            dispatch(setIsLocalStartingGroup(isShotTimeGroup1Show ? "g2" : "g1"));
            dispatch(setLocalShotTime(20));
            clearTimeout(timer);
            dispatch(setIsScore(true));
        }

        if (!isGameStarted) {
            setOpen(true);
            setMessage("Game is not started");
            return;
        }
    }

    const handleCelebrationClick = () => {
        sendMessage([{key: "isCelebration", value: "1"}]);
    }

    let content;

    if (loading) {
        content = <Loading/>
    }

    if (isConnected) {
        content = (
            <>
                <ButtonBack/>
                <div className="w-full h-full">
                    <Divider textAlign="left" sx={{pt: 10, mb: 4}}>Monitoring</Divider>

                    {/* Reconfig */}
                    <Grid container spacing={2} sx={{py: 4, px: md ? 2 : 10}}>
                        <Grid size={{xs: 6, md: 3}} sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 4
                        }}>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full bg-red-700"></div>
                                    <Typography>{group1 || "_ _"}</Typography>
                                    {isShotTimeGroup1Show &&
                                        <div
                                            className="w-0 h-0 border-t-8 border-b-8 border-r-16 border-t-transparent border-b-transparent border-r-red-700"></div>
                                    }

                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full bg-indigo-700"></div>
                                    <Typography>{group2 || "_ _"}</Typography>

                                    {isShotTimeGroup2Show &&
                                        <div
                                            className="w-0 h-0 border-t-8 border-b-8 border-r-16 border-t-transparent border-b-transparent border-r-indigo-700"></div>}
                                </div>
                            </div>
                        </Grid>
                        <Grid size={{xs: 6, md: 3}}>
                            <GaugeCustom title={"Shot Time"} value={shotTime} valueMax={20}/>
                        </Grid>
                        <Grid size={{xs: 6, md: 3}}>
                            <GaugeCustom title={"Total Time"} value={totalTime} valueMax={160}/>
                        </Grid>
                        <Grid size={{xs: 6, md: 3}}>
                            <GaugeCustom title={"Reconfig"} value={reconfigTime} valueMax={10}/>
                        </Grid>
                    </Grid>
                    <Divider textAlign="left" sx={{mt: 4}}>Game Control</Divider>

                    <Grid container spacing={2} sx={{py: 4, px: 2}}>
                        {
                            isGameStarted ? (
                                <Grid size={{xs: 12, md: 2}}>
                                    {!isGamePause ? <Button onClick={handleGamePauseClick} variant="contained"
                                                            startIcon={<FaPause/>} fullWidth
                                                            size="large">
                                            Pause Game
                                    </Button> :
                                        <Button onClick={handleGamePauseClick} variant="contained"
                                                startIcon={<BsFillCaretRightFill/>} fullWidth
                                                sx={{
                                                    backgroundColor: '#4caf50',
                                                    '&:hover': {backgroundColor: '#43a047'}
                                                }}
                                                size="large"
                                        >
                                            Continue Game
                                        </Button>
                                    }
                                </Grid>

                            ) : (
                                <Grid size={{xs: 12, md: 2}}>
                                    <Button onClick={handleGameStartClick} variant="contained"
                                            startIcon={<BsFillCaretRightFill/>} fullWidth
                                            sx={{backgroundColor: '#2196f3', '&:hover': {backgroundColor: '#1976d2'}}}
                                            size="large"
                                    >Start
                                        Game</Button>
                                </Grid>
                            )
                        }
                        <Grid size={{xs: 12, md: 2}}>
                            <Button onClick={handleScoreClick} variant="contained" startIcon={<LuGoal/>} fullWidth
                                    sx={{backgroundColor: '#9c27b0', '&:hover': {backgroundColor: '#7b1fa2'}}}
                                    size="large"
                            >Score</Button>
                        </Grid>
                        <Grid size={{xs: 12, md: 2}}>
                            <Button onClick={handleReconfigClick} variant="contained"
                                    startIcon={<GrConfigure/>} fullWidth
                                    sx={{backgroundColor: '#ff9800', '&:hover': {backgroundColor: '#fb8c00'}}}
                                    size="large"
                            >Reconfig</Button>
                        </Grid>

                        <Grid size={{xs: 12, md: 2}}>
                            <Button onClick={handleGameResetClick} variant="contained" startIcon={<RiResetLeftLine/>}
                                    fullWidth
                                    sx={{backgroundColor: '#e53935', '&:hover': {backgroundColor: '#d32f2f'}}}
                                    size="large"
                            >Reset Game</Button>
                        </Grid>

                        <Grid size={{xs: 12, md: 2}}>
                            <Button onClick={() => dispatch(setIsOpenModalNewGame(true))} variant="contained"
                                    startIcon={<GrGamepad/>} fullWidth
                                    sx={{backgroundColor: '#3f51b5', '&:hover': {backgroundColor: '#303f9f'}}}
                                    size="large"
                            >
                                New Game
                            </Button>
                        </Grid>

                        <Grid size={{xs: 12, md: 2}}>
                            <Button onClick={handleCelebrationClick} variant="contained"
                                    startIcon={<MdCelebration />} fullWidth
                                    sx={{
                                        backgroundColor: '#f50057', // MUI pink[500]
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#c51162' // darker pink
                                        }
                                    }}
                                    size="large"
                            >
                                Show Celebration
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <ModalStartGame sendMessage={sendMessage}/>
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={message}
                />
            </>
        )
    }

    return content;
}

export default Manage;