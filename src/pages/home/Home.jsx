import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { IoGameControllerSharp, IoSettingsSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setIsOpenModalNewGame } from "../../redux/features/robotSlice.js";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
        >
            <Stack
                direction={md ? "row" : "column"}
                spacing={4}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <Button variant="cus_menu" onClick={() => navigate("game")}>
                    <Stack alignItems="center">
                        <IoGameControllerSharp className="w-40 h-40" />
                        <Typography sx={{ fontSize: "28px" }}>Games</Typography>
                    </Stack>
                </Button>

                <Button variant="cus_menu" onClick={() => navigate("scorer")}>
                    <Stack alignItems="center">
                        <FaUserFriends className="w-40 h-40" />
                        <Typography sx={{ fontSize: "28px" }}>Scorer</Typography>
                    </Stack>
                </Button>

                <Button variant="cus_menu" onClick={() => navigate("manage")}>
                    <Stack alignItems="center">
                        <IoSettingsSharp className="w-40 h-40" />
                        <Typography sx={{ fontSize: "28px" }}>Manage</Typography>
                    </Stack>
                </Button>
            </Stack>
        </Box>
    );
}

export default Home;
