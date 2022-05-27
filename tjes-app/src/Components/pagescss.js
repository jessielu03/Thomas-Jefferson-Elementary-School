import { common } from '@mui/material/colors';

// function pagescss(){
    const headerStyle = {
        backgroundColor:"#673AB7",
        color: common.white,
        alignItems:"center",
        justifyContent:'center',
      }

    const container ={
        display:"flex",
        flexGrow:'1',
        flexDirection: 'column',
        textAlign: 'center'
    }
    const tabStyle = {
        color: common.white,
        textDecoration: 'none'
    }
    const purpleFont = {
        color: "#673AB7",
        fontSize: '40px'
    }
    const purpleFont2 = {
        color: "#673AB7",
        fontSize: '30px'
    }
export{headerStyle, container, tabStyle, purpleFont, purpleFont2};