import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
    defaultRadius: 'md',
    colors:{
        'blue': ['#EDF2FF', '#DBE4FF', '#BAC8FF', '#91A7FF', '#748FFC', '#5C7CFA', '#4C6EF5', '#4263EB', '#3B5BDB', '#364FC7']
    },
    primaryColor: 'blue',

});

function App() {
    return (
        <MantineProvider theme={theme} >
            <Notifications position={"top-right"} ></Notifications>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider >
    );
}

export default App;
