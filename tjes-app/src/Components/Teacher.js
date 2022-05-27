import {Link} from "react-router-dom";
import React from "react";
import StudentObj from "./StudentObj.js";
import { useState } from "react";
import db from '../database';
import {useEffect} from "react";
import {collection, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
//import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import StudentList from './StudentList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { deepPurple } from '@mui/material/colors';
import { common } from "@material-ui/core/colors";
import HomeIcon from '@mui/icons-material/Home';
import CalendarComp from "./CalendarComp.js";
//import Title from './Title';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const mdTheme = createTheme({
    palette: {
      primary: {
        main: deepPurple[500],
      },
    },
  });

function Teacher(){

    const [students, setStudents] = useState([])


    useEffect (() => {
      const students = []
      getDocs(collection(db, "Students"))
      .then((allResponses) => {
        allResponses.forEach((student) => students.push({id: student.id, ...student.data() }))
        students.sort((a, b) => (a.LastName > b.LastName) ? 1 : -1)
        setStudents(students)
      })
    }, [db])
/*
    // upvote feature
    const updateGrade = (studentID, gradeChange) => {
        updateDoc(doc(db, "Students", studentID, gradeChange), {
            Grade: gradeChange  
        })
        .then((docRef) => {
        console.log("Updated Grade: ", gradeChange)
        // update the state variable
        const updatedStudents = [...students]
        updatedStudents.forEach((student) =>  {
            //console.log(entry.id)
            if (student.id === studentID) {
                student.Grade = gradeChange
            }
        })
        setStudents(updatedStudents)
        })
        .catch((e) => console.error(e))
    } 
*/

    return(
      
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute">
              <Toolbar>
                <IconButton color="inherit" href="/" size="small">
                    <><HomeIcon />Home</>
                </IconButton>  
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  
                >
                <h3>
                  Teacher Dashboard
                </h3>
                </Typography> 
                             
              </Toolbar>
            </AppBar>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Student */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Students </Typography>
      <Table size="small">
      
        <TableHead>
          <TableRow>
            <TableCell>First</TableCell>
            <Divider />
            <TableCell>Last</TableCell>
            <Divider />
            <TableCell>Class</TableCell>
            <Divider />
            <TableCell>Current Grade</TableCell>
            <Divider />
            <TableCell align="right">Change Grade</TableCell>
          </TableRow>
        </TableHead>
      
        <TableBody sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {students.map((row) => (
            <StudentObj key={row.id} id={row.id} studentFirst={row.FirstName} studentLast={row.LastName} studentClass={row.Class} gradeLetter={row.Grade} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
                    </Paper>
                  </Grid>
                  {/* Grade Average */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 140,
                      }}
                    >
                          <React.Fragment>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom> Class Average </Typography>
                            <Typography component="p" variant="h4">
                                A-
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                as of 26 May, 2022
                            </Typography>
                            </React.Fragment>
                    </Paper>
                    
                    <br></br>
                    {/* Calendar */}
                    <CalendarComp />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
        /*
        <nav>
            <Link to='/'>Home</Link>
            {
                // List grades of each student
                // can edit each student's grades - 
                // can map the students out too
          
            <div className="App">
                <h1>Teacher Dashboard</h1>
                <h3>Students:</h3>
                {students.map((Students) => <StudentObj key={Students.id} id={Students.id} studentFirst={Students.FirstName} studentLast={Students.LastName} gradeLetter={Students.GradeLevel} upvote={upvote}/>)}
            </div>
            
            
            } 
        </nav>
        */
        
    );
}export default Teacher;