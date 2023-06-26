import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/icons-material/Menu";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {logOutTC} from "../../redux/reducers/auth-reducer";



export const Header = () => {
   const status = useAppSelector((state) => state.app.status);
   const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
   const dispatch = useAppDispatch();

   const logOut = () => {
      dispatch(logOutTC());
   }

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
            {isLoggedIn && <Button color="inherit" onClick={logOut}>
               Log out
            </Button>}
         </Toolbar>
         {status === 'loading' && <LinearProgress color="secondary"/>}
      </AppBar>
   );
};