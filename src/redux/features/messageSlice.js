import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",

    // initial data
    initialState: {
        message: {},
        isOpenTimer: false,
        score: localStorage.getItem("score") || "00",
        group1: localStorage.getItem("group1") || "",
        group2: localStorage.getItem("group2") || "",
        startingGroup: localStorage.getItem("startingGroup") || "",
        totalTime: localStorage.getItem("totalTime") || 0,
        shotTime: localStorage.getItem("shotTime") || 0,
        reConfig: localStorage.getItem("isReconfig") === "true" || false,
        reConfigTime: localStorage.getItem("reconfigTime") || 0,
        isShotTimeGroup1Show: localStorage.getItem("isShotTimeGroup1Show") === "true" || false,
        isShotTimeGroup2Show: localStorage.getItem("isShotTimeGroup2Show") === "true" || false,
        isGameStarted: false,
        twoPointG1: localStorage.getItem("twoPointG1") || 0,
        threePointG1: localStorage.getItem("threePointG1") || 0,
        dunkPointG1: localStorage.getItem("dunkPointG1") || 0,
        isShortestG1: localStorage.getItem("isShortestG1") === "true" || false,
        twoPointG2: localStorage.getItem("twoPointG2") || 0,
        threePointG2: localStorage.getItem("threePointG2") || 0,
        dunkPointG2: localStorage.getItem("dunkPointG2") || 0,
        isShortestG2: localStorage.getItem("isShortestG2") === "true" || false,
        isGamePause: localStorage.getItem("isGamePause") === "true" || false,
        pointG1: localStorage.getItem("pointG1") || 0,
        pointG2: localStorage.getItem("pointG2") || 0,
        isCelebration: false,
    },

    // function
    reducers: {
        setTotalTime: (state, action) => {
            state.totalTime = action.payload;
        },
        setShotTime: (state, action) => {
          state.shotTime = action.payload;
        },
        setIsCelebration: (state, action) => {
            state.isCelebration = action.payload;
        },
        setMessage: (state, action) => {
            const messages = Array.isArray(action.payload) ? action.payload : [action.payload];

            for (const msg of messages) {
                console.log("setMessage", msg);
                state.message = msg;

                const {key, value} = msg;

                if (key === "openTimer") {
                    state.isOpenTimer = value === "1";
                } else if (key === "score") {
                    state.score = String(Number(state.score) + Number(value));
                    localStorage.setItem("score", state.score);
                } else if (key === "group1") {
                    state.group1 = value;
                    localStorage.setItem("group1", value);
                } else if (key === "group2") {
                    state.group2 = value;
                    localStorage.setItem("group2", value);
                } else if (key === "startingGroup") {
                    if (value === "g1") {
                        state.isShotTimeGroup1Show = true;
                        state.isShotTimeGroup2Show = false;
                        localStorage.setItem("startingGroup", "g1");
                        localStorage.setItem("isShotTimeGroup1Show", "true");
                        localStorage.setItem("isShotTimeGroup2Show", "false");
                    } else if (value === "g2") {
                        state.isShotTimeGroup2Show = true;
                        state.isShotTimeGroup1Show = false;
                        localStorage.setItem("isShotTimeGroup1Show", "false");
                        localStorage.setItem("isShotTimeGroup2Show", "true");
                        localStorage.setItem("startingGroup", "g2");
                    }
                } else if (key === "totalTime") {
                    state.totalTime = value;
                    localStorage.setItem("totalTime", value);
                } else if (key === "shotTime") {
                    state.shotTime = Number(value);
                    localStorage.setItem("shotTime", value);
                } else if (key === "isReconfig") {
                    if (value === "1") {
                        state.reConfig = true;
                        localStorage.setItem("isReconfig", "true");
                    } else if (value === "0") {
                        state.reConfig = false;
                        localStorage.setItem("isReconfig", "false");
                    }
                } else if (key === "isGameStarted") {
                    state.isGameStarted = value === "1";
                }else if (key === "reconfigTime") {
                    state.reConfigTime = value;
                    localStorage.setItem("reconfigTime", value);
                }else if (key === "twoPointG1") {
                    if (value === "0") {
                        state.twoPointG1 = 0;
                    }
                    state.twoPointG1 = state.twoPointG1 + Number(value);
                    state.pointG1 = state.pointG1 + state.twoPointG1 * 2;
                    localStorage.setItem("pointG1", state.pointG1);
                    localStorage.setItem("twoPointG1", state.twoPointG1);
                }else if (key === "threePointG1") {
                    if (value === "0") {
                        state.threePointG1 = 0;
                    }
                    state.threePointG1 = state.threePointG1 + Number(value);
                    state.pointG1 = state.pointG1 + state.threePointG1 * 3;
                    localStorage.setItem("pointG1", state.pointG1);
                    localStorage.setItem("threePointG1", state.threePointG1);
                }else if (key === "dunkPointG1") {
                    if (value === "0") {
                        state.dunkPointG1 = 0;
                    }
                    state.dunkPointG1 = state.dunkPointG1 + Number(value);
                    state.pointG1 = state.pointG1 + state.dunkPointG1 * 7;
                    localStorage.setItem("pointG1", state.pointG1);
                    localStorage.setItem("dunkPointG1", state.dunkPointG1);
                }else if (key === "isShortestG1") {
                    state.isShortestG1 = value === "1";
                    localStorage.setItem("isShortestG1", value);
                }else if (key === "twoPointG2") {
                    if (value === "0") {
                        state.twoPointG2 = 0;
                    }
                    state.twoPointG2 = state.twoPointG2 + Number(value);
                    state.pointG2 = state.pointG2 + state.twoPointG2 * 2;
                    localStorage.setItem("pointG2", state.pointG2);
                    localStorage.setItem("twoPointG2", state.twoPointG2);
                }else if (key === "threePointG2") {
                    if (value === "0") {
                        state.threePointG2 = 0;
                    }
                    state.threePointG2 = state.threePointG2 + Number(value);
                    state.pointG2 = state.pointG2 + state.threePointG2 * 3;
                    localStorage.setItem("pointG2", state.pointG2);
                    localStorage.setItem("threePointG2", state.threePointG2);
                }else if (key === "dunkPointG2") {
                    if (value === "0") {
                        state.dunkPointG2 = 0;
                    }
                    state.dunkPointG2 = state.dunkPointG2 + Number(value);
                    state.pointG2 = state.pointG2 + state.dunkPointG2 * 7;
                    localStorage.setItem("pointG2", state.pointG2);
                    localStorage.setItem("dunkPointG2", state.dunkPointG2);
                }else if (key === "isShortestG2") {
                    state.isShortestG2 = value === "1";
                    localStorage.setItem("isShortestG2", value);
                }else if (key === "isGamePause") {
                    state.isGamePause = value === "1";
                    localStorage.setItem("isGamePause", value);
                }else if (key === "pointG1") {
                    state.pointG1 = Number(value);
                    localStorage.setItem("pointG1", state.pointG1);
                }else if (key === "pointG2") {
                    state.pointG2 = Number(value);
                    localStorage.setItem("pointG2", state.pointG2);
                }else if (key === "isCelebration") {
                    state.isCelebration = value === "1";
                }
            }
        },

    },
});

export const {setIsCelebration, setMessage, setShotTime, setTotalTime} = messageSlice.actions;

export default messageSlice.reducer;
