import React from 'react';
import AppBar from 'material-ui/AppBar';

const NavBar = () => (
  <AppBar
    style={{backgroundColor:'#3587A2'}}
    title={<img style={{height: '100%', paddingTop: '.3em'}} src={require('../assets/noteworthylogo.png')}></img>}
  />
);

export default NavBar;
