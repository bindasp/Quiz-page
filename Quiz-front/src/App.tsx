import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing";
import '@mantine/core/styles.css';
import {Button, Card, createTheme, MantineProvider} from "@mantine/core";
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
    defaultRadius: 'md',
    colors:{
        'blue': ['#EDF2FF', '#DBE4FF', '#BAC8FF', '#91A7FF', '#748FFC', '#5C7CFA', '#4C6EF5', '#4263EB', '#3B5BDB', '#364FC7'],
        'green': [
            "#eefcf2",
            "#dcf6e3",
            "#b3ecc3",
            "#89e3a0",
            "#66db82",
            "#50d670",
            "#45dF66",
            "#37bc55",
            "#2da64b",
            "#1d903d"
        ],
        'yellow': [
            "#fffee0",
            "#fffacb",
            "#fff599",
            "#feef63",
            "#feea36",
            "#fee719",
            "#fee601",
            "#e2cc00",
            "#c9b500",
            "#ad9c00"
        ],
        'red':[
            "#ffebeb",
            "#f9d2d2",
            "#f89f9f",
            "#f86a68",
            "#f9413b",
            "#f92b20",
            "#fa2113",
            "#df1708",
            "#c60f04",
            "#ad0000"
        ],
        'white': [
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
            "#DDD6D5",
        ],
        'emerald-green': [
            "#e6fdee",
            "#d7f5e1",
            "#b1e8c4",
            "#88daa3",
            "#66cf89",
            "#4fc877",
            "#42c46e",
            "#31ad5c",
            "#269a50",
            "#138542"
        ]
    },
    primaryColor: 'emerald-green',

    components: {
        Button: Button.extend({ defaultProps:{
             color: "emerald-green.7",
            variant:'outline'

            }}),
        Card: Card.extend({defaultProps:{
            bg:"emerald-green.7",
                style:{color:"black"}

            }})

    }

});

function App() {
    return (
        <MantineProvider defaultColorScheme={"dark"} theme={theme} >
            <Notifications position={"top-right"} ></Notifications>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider >
    );
}

export default App;
