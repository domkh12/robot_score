import {createSlice} from "@reduxjs/toolkit";

const robotSlice = createSlice({
    name: "robot",

    // initial data
    initialState: {
        sessionId: localStorage.getItem("sessionId") || "",
        isOnline: false,
        isOpenModalNewGame: false,
        localShotTime: localStorage.getItem("localShotTime") || 0,
        localTotalTime: localStorage.getItem("localTotalTime") || 0,
        localReconfigTime: localStorage.getItem("localReconfigTime") || 0,
        isLocalReconfig: localStorage.getItem("isLocalReconfig") === "true" || false,
        isScore: localStorage.getItem("isScore") === "true" || false,
        localTwoPointG1: localStorage.getItem("localTwoPointG1") || 0,
        localThreePointG1: localStorage.getItem("localThreePointG1") || 0,
        localDunkPointG1: localStorage.getItem("localDunkPointG1") || 0,
        isLocalShortestG1: localStorage.getItem("isLocalShortestG1") === "true" || false,
        localTwoPointG2: localStorage.getItem("localTwoPointG2") || 0,
        localThreePointG2: localStorage.getItem("localThreePointG2") || 0,
        localDunkPointG2: localStorage.getItem("localDunkPointG2") || 0,
        isLocalShortestG2: localStorage.getItem("isLocalShortestG2") === "true" || false,
        isLocalGameStart: localStorage.getItem("isLocalGameStart") === "true" || false,
        isLocalGamePause: localStorage.getItem("isLocalGamePause") === "true" || false,
        localGroup1Name: localStorage.getItem("localGroup1Name") || "",
        localGroup2Name: localStorage.getItem("localGroup2Name") || "",
        isLocalGroup1Show: localStorage.getItem("isLocalGroup1Show") === "true" || false,
        isLocalGroup2Show: localStorage.getItem("isLocalGroup2Show") === "true" || false,
        isLocalStartingGroup: localStorage.getItem("isLocalStartingGroup") || "",
    },

    // function
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setIsLocalGamePause: (state, action) => {
            state.isLocalGamePause = action.payload;
            localStorage.setItem("isLocalGamePause", action.payload);
        },
        setIsLocalGameStart: (state, action) => {
            state.isLocalGameStart = action.payload;
            localStorage.setItem("isLocalGameStart", action.payload);
        },
        setLocalThreePointG2: (state, action) => {
            state.localThreePointG2 = action.payload;
            localStorage.setItem("localThreePointG2", action.payload);
        },
        setIsLocalShortestG2: (state, action) => {
            state.isLocalShortestG2 = action.payload;
            localStorage.setItem("isLocalShortestG2", action.payload);
        },
        setLocalDunkPointG2: (state, action) => {
            state.localDunkPointG2 = action.payload;
            localStorage.setItem("localDunkPointG2", action.payload);
        },
        setLocalTwoPointG2: (state, action) => {
            state.localTwoPointG2 = action.payload;
            localStorage.setItem("localTwoPointG2", action.payload);
        },
        setIsLocalShortestG1: (state, action) => {
            state.isLocalShortestG1 = action.payload;
            localStorage.setItem("isLocalShortestG1", action.payload);
        },
        setLocalDunkPointG1: (state, action) => {
            state.localDunkPointG1 = action.payload;
            localStorage.setItem("localDunkPointG1", action.payload);
        },
        setLocalThreePointG1: (state, action) => {
            state.localThreePointG1 = action.payload;
            localStorage.setItem("localThreePointG1", action.payload);
        },
        setLocalTwoPointG1: (state, action) => {
            state.localTwoPointG1 = action.payload;
            localStorage.setItem("localTwoPointG1", action.payload);
        },
        setIsScore: (state, action) => {
            state.isScore = action.payload;
            localStorage.setItem("isScore", action.payload);
        },
        setIsLocalReconfig: (state, action) => {
            state.isLocalReconfig = action.payload;
            localStorage.setItem("isLocalReconfig", action.payload);
        },
        setLocalReconfigTime: (state, action) => {
            state.localReconfigTime = action.payload;
            localStorage.setItem("localReconfigTime", action.payload);
        },
        setLocalShotTime: (state, action) => {
            state.localShotTime = action.payload;
            localStorage.setItem("localShotTime", action.payload);
        },
        setLocalTotalTime: (state, action) => {
            state.localTotalTime = action.payload;
            localStorage.setItem("localTotalTime", action.payload);
        },
        setIsOnline: (state, action) => {
            state.isOnline = action.payload;
        },
        setIsOpenModalNewGame: (state, action) => {
            state.isOpenModalNewGame = action.payload;
        },
        setLocalGroup1Name: (state, action) => {
            state.localGroup1Name = action.payload;
            localStorage.setItem("localGroup1Name", action.payload);
        },
        setLocalGroup2Name: (state, action) => {
            state.localGroup2Name = action.payload;
            localStorage.setItem("localGroup2Name", action.payload);
        },
        setIsLocalGroup1Show: (state, action) => {
            state.isLocalGroup1Show = action.payload;
            localStorage.setItem("isLocalGroup1Show", action.payload);
        },
        setIsLocalGroup2Show: (state, action) => {
            state.isLocalGroup2Show = action.payload;
            localStorage.setItem("isLocalGroup2Show", action.payload);
        },
        setIsLocalStartingGroup: (state, action) => {
            if (action.payload === "g1") {
                state.isLocalGroup1Show = true;
                state.isLocalGroup2Show = false;
                localStorage.setItem("isLocalStartingGroup", "g1");
                localStorage.setItem("isLocalGroup1Show", "true");
                localStorage.setItem("isLocalGroup2Show", "false");
            }else if (action.payload === "g2") {
                state.isLocalGroup2Show = true;
                state.isLocalGroup1Show = false;
                localStorage.setItem("isLocalStartingGroup", "g2");
                localStorage.setItem("isLocalGroup1Show", "false");
                localStorage.setItem("isLocalGroup2Show", "true");
            }else {
                state.isLocalGroup1Show = false;
                state.isLocalGroup2Show = false;
                localStorage.setItem("isLocalStartingGroup", "");
                localStorage.setItem("isLocalGroup1Show", "false");
                localStorage.setItem("isLocalGroup2Show", "false");
            }
        }
    },
});

export const {
    setSessionId,
    setIsLocalStartingGroup,
    setLocalGroup1Name,
    setLocalGroup2Name,
    setIsLocalGroup1Show,
    setIsLocalGroup2Show,
    setIsLocalGamePause,
    setIsLocalGameStart,
    setDecreaseTimer,
    setLocalThreePointG2,
    setIsLocalShortestG2,
    setLocalDunkPointG2,
    setLocalTwoPointG2,
    setIsLocalShortestG1,
    setLocalDunkPointG1,
    setLocalThreePointG1,
    setLocalTwoPointG1,
    setIsScore,
    setIsLocalReconfig,
    setLocalReconfigTime,
    setIsOpenModalNewGame,
    setLocalShotTime,
    setLocalTotalTime,
    setIsOnline
} = robotSlice.actions;

export default robotSlice.reducer;
