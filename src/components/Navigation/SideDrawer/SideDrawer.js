import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
  const assignedClasses = [classes.SideDrawer];

  assignedClasses.push(props.show ? classes.Open : classes.Close);

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.click} />
      <div className={assignedClasses.join(' ')}>
        <div className={classes.CloseButton} onClick={props.click}>X</div>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
