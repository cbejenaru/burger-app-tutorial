import React from 'react';

import classes from './Logo.css';

import logo from '../../assets/img/burger-logo.png';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
