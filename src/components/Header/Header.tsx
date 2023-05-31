import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Menu from "@mui/icons-material/Menu";

export const Header = () => {
   return (
      <Box sx={{flexGrow: 1}}>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
               >
                  <Menu />
               </IconButton>
               <Typography variant="h6" component="a" sx={{ flexGrow: 1, textTransform: "uppercase" }}>
                  Logo
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
      </Box>
   );
};