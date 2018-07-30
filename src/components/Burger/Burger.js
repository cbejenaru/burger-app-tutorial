import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients).map((ingKey) => {
    return [...Array(props.ingredients[ingKey])].map((el, index) => {
      return (<BurgerIngredient key={ingKey+index} type={ingKey}/>)
    })
  })
  .reduce((arr, el) => [...arr, ...el], []);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
      <h2>$ {props.price.toFixed(2)}</h2>
    </div> 
  );
};

export default burger;
