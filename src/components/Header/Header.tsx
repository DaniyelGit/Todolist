import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/icons-material/Menu";
import {useAppSelector} from "../../redux/store";



export const Header = () => {
   const status = useAppSelector((state) => state.app.status);

   return (
      <AppBar position="fixed">
         <Toolbar>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{mr: 2}}
            >
               <Menu/>
            </IconButton>
            <Typography variant="h6" component="a" sx={{flexGrow: 1, textTransform: "uppercase"}}>
               Logo
            </Typography>
            <Button color="inherit">Login</Button>
         </Toolbar>
         {status === 'loading' && <LinearProgress color="secondary"/>}
      </AppBar>
   );
};