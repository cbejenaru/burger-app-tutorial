import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <h2>$ {props.price.toFixed(2)}</h2>
    {controls.map(ctr => (
      <BuildControl
        key={ctr.label}
        label={ctr.label}
        addClicked={() => props.add(ctr.type)}
        removeClicked={() => props.remove(ctr.type)}
        disabled={props.disableInfo[ctr.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.order}>ORDER NOW</button>
  </div>
);

export default buildControls;
