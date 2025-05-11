import {Gauge, gaugeClasses} from "@mui/x-charts";
import {Typography} from "@mui/material";

function GaugeCustom({title, value, valueMax}){
    return(
        <div className="flex justify-center items-center flex-col">
            <Gauge
                width={120}
                height={120}
                value={value}
                valueMax={valueMax}
                valueMin={0}
                cornerRadius="50%"
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#52b202',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                    },
                })}
            />

            <Typography variant="h5">{title || "N/A"}</Typography>
        </div>
    )
}

export default GaugeCustom;