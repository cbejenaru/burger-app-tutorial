import React, { Component } from 'react';

import classes from './Layout.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  triggerSideDrawer = () => {
    this.setState(prev => ({
      showSideDrawer: !prev.showSideDrawer
    }));
  };

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerToggle={this.triggerSideDrawer} />
        <SideDrawer
          click={this.triggerSideDrawer}
          show={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
