import {createTheme} from "@mui/material";
import {amber, blue, indigo, red} from "@mui/material/colors";


export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: amber[700],
        },
    },
    components: {

        MuiCard: {
            variants: [
                {
                    props: { variant: 'card_cus1' },
                    style: {
                        fontSize: "20rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "10px",
                        padding: "0px",
                    }
                },
                {
                    props: { variant: 'card_group2' },
                    style: {
                        backgroundColor: indigo[700],
                        color: "#fff",
                        fontSize: "20rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }
                },
            ]
        },

        MuiButton:{
            styleOverrides: {
                root: {
                    color: "#fff",
                    textTransform: "none",
                }
            },
            variants: [
                {
                    props: { variant: 'cus_menu' },
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: amber[700],
                        color: "#fff",
                        borderRadius: 20,
                        padding: "20px 50px",
                    }
                },
                {
                    props: { variant: 'btn_score' },
                    style: {
                        backgroundColor: amber[700],
                        color: "#fff",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        padding: "80px",
                    }
                }
            ]
        },

        MuiPaper: {
                variants: [
                    {
                        props: { variant: 'cus_nav' },
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: 0,
                        }
                    },
                ]
        }
    }
});