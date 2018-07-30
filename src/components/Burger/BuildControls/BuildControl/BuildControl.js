import React from 'react';
import classes from './BuildControl.css';

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button onClick={props.removeClicked} className={classes.Less} disabled={props.disabled}>Less</button>
      <button onClick={props.addClicked} className={classes.More}>More</button>
    </div>
  )
}

export default BuildControl
