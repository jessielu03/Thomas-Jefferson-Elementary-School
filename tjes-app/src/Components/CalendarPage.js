import React from "react";
import {Link} from "react-router-dom";
import {headerStyle, container, tabStyle, purpleFont, purpleFont2} from './pagescss.js';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CalendarComp from "./CalendarComp.js";
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SpeedIcon from '@mui/icons-material/Speed';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CalendarPage() {
    return (
        <div style ={container}>
          <div style={headerStyle}>
            <br></br>
            <br></br>
            <h1>CALENDAR</h1>
            <br></br>
            <Tabs centered>
                <Tab style={tabStyle} label={<><HomeIcon />Home</>} href="/" />
                <Tab style={tabStyle} label={<><SpeedIcon />Admin Dashboard</>} href="/administrator" />
            </Tabs>
            <br></br>
          </div>
          <br></br>
          <div style={container}>
            <CalendarComp />
          </div>
    
        </div>
      );
}
export default CalendarPage;