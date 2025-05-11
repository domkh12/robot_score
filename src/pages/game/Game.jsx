import {useDispatch, useSelector} from "react-redux";
import {Box, Card, Grid, Typography} from "@mui/material";
import {indigo, red} from "@mui/material/colors";
import Navbar from "../../components/ui/Navbar.jsx";
import sound from "../../assets/sound.mp3";
import {useEffect, useRef} from "react";
import {confetti} from "@tsparticles/confetti";
import {setIsCelebration} from "../../redux/features/messageSlice.js";

function Game() {
    const dispatch = useDispatch();
    const totalTime = useSelector((state) => state.message.totalTime);
    const shotTime = useSelector((state) => state.message.shotTime);
    const isReConfig = useSelector((state) => state.message.reConfig);
    const group1 = useSelector((state) => state.message.group1);
    const group2 = useSelector((state) => state.message.group2);
    const isShotTimeGroup1Show = useSelector((state) => state.message.isShotTimeGroup1Show);
    const isShotTimeGroup2Show = useSelector((state) => state.message.isShotTimeGroup2Show);
    const reconfigTime = useSelector((state) => state.message.reConfigTime);
    const twoPointG1 = useSelector((state) => state.message.twoPointG1);
    const threePointG1 = useSelector((state) => state.message.threePointG1);
    const dunkPointG1 = useSelector((state) => state.message.dunkPointG1);
    const isShortestG1 = useSelector((state) => state.message.isShortestG1);
    const isShortestG2 = useSelector((state) => state.message.isShortestG2);
    const twoPointG2 = useSelector((state) => state.message.twoPointG2);
    const threePointG2 = useSelector((state) => state.message.threePointG2);
    const dunkPointG2 = useSelector((state) => state.message.dunkPointG2);
    const pointG1 = useSelector((state) => state.message.pointG1);
    const pointG2 = useSelector((state) => state.message.pointG2);
    const isGamePause = useSelector((state) => state.message.isGamePause);
    const audioRef = useRef(null);
    const isCelebration = useSelector((state) => state.message.isCelebration);

    useEffect(() => {
        if (isCelebration) {
            confetti("tsparticles", {
                angle: 90,
                count: 100,
                position: {
                    x: 50,
                    y: 80,
                },
                spread: 70,
                startVelocity: 75,
                decay: 0.9,
                gravity: 2,
                drift: 0,
                ticks: 200,
                colors: [
                    "#ffffff", "#ff0000", "#00ff00", "#0000ff",
                    "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#800080"
                ],
                shapes: ["square", "circle", "triangle", "line", "star"],
                scalar: 1.2,
                zIndex: 100,
                disableForReducedMotion: true,
            });
            dispatch(setIsCelebration(false));
        }
    }, [isCelebration]);

    useEffect(() => {
        audioRef.current = new Audio(sound);
    }, []);

    useEffect(() => {
        if (shotTime === 3 && audioRef.current) {
            audioRef.current.play().catch((err) => console.warn("Audio play failed:", err));
        }
    }, [shotTime]);

    return (
        <div className=" h-full">
            <Navbar/>

            {/* Group1 name */}
            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid size={{md: 5}}>
                    <Card sx={{
                        backgroundColor: red[700],
                        padding: 2,
                        color: "#fff"
                    }}>
                        <Typography variant="h3" textAlign={"center"}>{group1 || "_ _"}</Typography>
                    </Card>
                </Grid>
                <Grid size={{md: 1}}>
                    {isShotTimeGroup1Show &&
                        <Card sx={{
                            backgroundColor: red[700],
                            padding: 2,
                            color: "#fff"
                        }}>
                            <Typography variant="h3" textAlign={"center"}>{shotTime}</Typography>
                        </Card>
                    }

                </Grid>
                <Grid size={{md: 1}}>
                    {isShotTimeGroup2Show &&
                        <Card sx={{
                            backgroundColor: indigo[700],
                            padding: 2,
                            color: "#fff"
                        }}>
                            <Typography variant="h3" textAlign={"center"}>{shotTime}</Typography>
                        </Card>
                    }
                </Grid>
                <Grid size={{md: 5}}>
                    <Card sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 5,
                        backgroundColor: indigo[700],
                        padding: 2,
                        color: "#fff"
                    }}>
                        <Typography variant="h3" textAlign={"center"}>{group2 || "_ _"}</Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Group 1 */}

            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid size={{xs: 12, md: 4}}>
                    <Card sx={{justifyContent: "start", alignItems: "start", flexDirection: "column", gap: 5}}>

                        <Box sx={{
                            backgroundColor: red[700], width: "100%", color: "#fff", padding: 0, display: "flex",
                            justifyContent: "center", alignItems: "center",
                        }}><Typography
                            variant="h5" sx={{fontSize: "20rem"}}>{pointG1 || 0}</Typography>
                        </Box>

                        <Grid container spacing={2} sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            px: 5,
                            py: 5
                        }}>
                            <Grid size={3}>
                                <Typography variant="h5">2 Point</Typography>
                            </Grid>
                            <Grid size={2}>
                                <Box sx={{
                                    backgroundColor: red[700],
                                    padding: 2,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Typography variant="h4">{twoPointG1 || 0}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={7}></Grid>
                            <Grid size={3}>
                                <Typography variant="h5">3 Point</Typography>
                            </Grid>
                            <Grid size={2}>
                                <Box sx={{
                                    backgroundColor: red[700],
                                    padding: 2,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}><Typography
                                    variant="h4">{threePointG1 || 0}</Typography></Box>
                            </Grid>
                            <Grid size={7}>
                                {isShortestG1 && <Typography variant="h5" textAlign={"center"}>Shortest</Typography>}
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="h5">Dunk</Typography>
                            </Grid>
                            <Grid size={2}>
                                <Box sx={{
                                    backgroundColor: red[700],
                                    padding: 2,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}><Typography
                                    variant="h4">{dunkPointG1 || 0}</Typography></Box>
                            </Grid>
                            <Grid size={7}></Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Timer */}

                <Grid size={{xs: 12, md: 4}}>
                    <Card sx={{
                        height: "100%"
                    }}>
                        <div className="w-full h-full flex flex-col justify-between items-center">
                            <Box sx={{
                                width: "100%", color: "#000", padding: 0, display: "flex",
                                justifyContent: "center", alignItems: "center",
                            }}><Typography
                                variant="h5" sx={{fontSize: "14rem"}}>{totalTime}</Typography>
                            </Box>

                            <Grid container spacing={2}
                                  sx={{px: 5, pb: 5, justifyContent: "center", alignItems: "center", width: "100%"}}>
                                {isReConfig &&
                                    <Grid size={12}
                                          sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              mb: 10
                                          }}>
                                        <Typography variant="h4">Reconfig: {reconfigTime || 0}</Typography>
                                    </Grid>
                                }
                                {
                                    isGamePause &&
                                    <Grid size={12}
                                          sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              mb: 10
                                          }}>
                                        <Typography variant="h4">Pause</Typography>
                                    </Grid>
                                }

                                <Grid size={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <img src="/images/basketball.png" alt="basketball" className="w-[33%]"/>
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </Grid>

                {/* Group 2 */}

                <Grid size={{xs: 12, md: 4}}>
                    <Card sx={{justifyContent: "start", alignItems: "start", flexDirection: "column", gap: 5}}>

                        <Box sx={{
                            backgroundColor: indigo[700], width: "100%", color: "#fff", padding: 0, display: "flex",
                            justifyContent: "center", alignItems: "center",
                        }}>
                            <Typography variant="h5" sx={{fontSize: "20rem"}}>{pointG2 || 0}</Typography>
                        </Box>

                        <Grid container spacing={2}
                              sx={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  px: 5, py: 5
                              }}>
                            <Grid size={3}>
                                <Typography variant="h5">2 Point</Typography>
                            </Grid>
                            <Grid size={2}>
                                <Box sx={{
                                    backgroundColor: indigo[700],
                                    padding: 2,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Typography variant="h4">{twoPointG2 || 0}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={7}></Grid>
                            <Grid size={3}>
                                <Typography variant="h5">3 Point</Typography>
                            </Grid>
                            <Grid size={2}>
                                <Box sx={{
                                    backgroundColor: indigo[700],
                                    padding: 2,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}><Typography
                                    variant="h4">{threePointG2 || 0}</Typography></Box>
                            </Grid>
                            <Grid size={7}>
                                {isShortestG2 && <Typography variant="h5" textAlign={"center"}>Shortest</Typography>}
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="h5">Dunk</Typography>
                            </Grid>
                            <Grid size={2}>
                                <Box sx={{
                                    backgroundColor: indigo[700],
                                    padding: 2,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}><Typography
                                    variant="h4">{dunkPointG2 || 0}</Typography></Box>
                            </Grid>
                            <Grid size={7}></Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <audio controls src={sound} className="hidden"></audio>
        </div>
    );
}

export default Game;