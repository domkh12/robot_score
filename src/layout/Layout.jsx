import {Outlet} from "react-router-dom";
import useWebsocketServer from "../hook/useWebsocketServer.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "../redux/features/messageSlice.js";
import Loading from "../components/ui/Loading.jsx";

function Layout() {
    const dispatch = useDispatch();
    const sessionId = useSelector((state) => state.robot.sessionId);

    const {messages, loading, isConnected} = useWebsocketServer(`/topic/messages/${sessionId}`);
    useEffect(() => {
        if (messages) {
            dispatch(setMessage(messages));
        }
    }, [messages]);

    let content;

    if (loading) {
        content = <Loading/>
    }

    if (isConnected) {
        content = <>
            <main className="h-screen overflow-y-auto ">
                <Outlet/>
            </main>
        </>
    }

    return content;
}

export default Layout;