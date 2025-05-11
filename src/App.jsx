import {Routes, Route} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "./config/theme.js";
import Home from "./pages/home/Home.jsx";
import Game from "./pages/game/Game.jsx";
import Scorer from "./pages/scorer/Scorer.jsx";
import Manage from "./pages/manage/Manage.jsx";
import Layout from "./layout/Layout.jsx";
import Notfound from "./pages/notfound/Notfound.jsx";
import Auth from "./pages/auth/Auth.jsx";
import RequireAuth from "./pages/auth/RequireAuth.jsx";
import Unauthorize from "./pages/auth/Unauthorize.jsx";

function App() {

    return (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Auth/>}/>
                    <Route element={<RequireAuth/>}>
                        <Route path="/dashboard" element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path="game" element={<Game/>}/>
                            <Route path="scorer" element={<Scorer/>}/>
                            <Route path="manage" element={<Manage/>}/>
                        </Route>
                    </Route>
                    <Route path="/unauthorize" element={<Unauthorize/>}/>
                    <Route path="*" element={<Notfound/>}/>
                </Routes>
            </ThemeProvider>
        </>
    )
}

export default App
