import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  addIngredientHandler = type => {
    const ingredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1
    };
    this.setState({
      ingredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    });
    this.checkPurchasableStatus(ingredients);
  };

  removeIngredientHandler = type => {
    const ingredients = {
      ...this.state.ingredients,
      [type]:
        this.state.ingredients[type] > 0
          ? this.state.ingredients[type] - 1
          : this.state.ingredients[type]
    };
    this.setState({
      ingredients,
      totalPrice:
        this.state.ingredients[type] > 0
          ? this.state.totalPrice - INGREDIENT_PRICES[type]
          : this.state.totalPrice
    });
    this.checkPurchasableStatus(ingredients);
  };

  checkPurchasableStatus(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => sum + el);
    this.setState({purchasable: sum > 0});
  }

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] === 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disableInfo={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
