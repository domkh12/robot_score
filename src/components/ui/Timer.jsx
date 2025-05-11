import React, {useState} from "react";
import {
    Dialog,
    Slide,
} from "@mui/material";
import {useSelector} from "react-redux";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Timer() {
    const open = useSelector((state) => state.message.isOpenTimer);
    console.log("open", open);
    return (
        <>
            <Dialog
                fullScreen
                open={open}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 0,
                        backgroundColor: "#fff",
                    }
                }}
                slots={{
                    transition: Transition,
                }}
            >

            </Dialog>
        </>
    );
}

export default Timer;