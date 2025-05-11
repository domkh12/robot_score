import {
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    ButtonGroup,
    Button,
    Card,
    Stack
} from "@mui/material";
import useWebsocketServer from "../../hook/useWebsocketServer.jsx";

function ManageTimer() {
    const {sendMessage} = useWebsocketServer("/app/chat/score");
    return (
        <Card>
            <Stack spacing={2}>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                >
                    <Button onClick={() => sendMessage({key: "openTimer", value: "1"})}>On</Button>
                    <Button onClick={() => sendMessage({key: "openTimer", value: "0"})}>Off</Button>
                </ButtonGroup>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Time</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="second"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="hour" control={<Radio/>} label="Hour"/>
                        <FormControlLabel value="minute" control={<Radio/>} label="Minute"/>
                        <FormControlLabel value="second" control={<Radio/>} label="Second"/>
                    </RadioGroup>
                </FormControl>
            </Stack>
        </Card>
    )
}

export default ManageTimer;