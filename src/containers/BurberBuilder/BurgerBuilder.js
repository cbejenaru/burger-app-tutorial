import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
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

  checkPurchasableStatus = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => sum + el);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    axios
      .post('/orders.json', {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice
      })
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false, error: true });
      });
  };

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] === 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        cancelClicked={this.purchaseCancelHandler}
        continueClicked={this.purchaseContinueHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          loading={this.state.loading}
          backdropClicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disableInfo={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          order={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
