import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/icons-material/Menu";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {RequestStatusType} from "../Todolist/app-reducer";

export const Header = () => {
   const status = useSelector<AppRootStateType, RequestStatusType>((state: AppRootStateType) => state.app.status);


   return (
      <AppBar position="static">
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
         {/*{status === 'loading' && <LinearProgress />}*/}
      </AppBar>
   );
};