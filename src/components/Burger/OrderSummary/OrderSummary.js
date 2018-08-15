import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
    // return this.props.show;
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      ingKey => {
        return (
          <li key={ingKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:
            {this.props.ingredients[ingKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total price: $ {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Success" clicked={this.props.continueClicked}>
          Continue
        </Button>
        <Button btnType="Danger" clicked={this.props.cancelClicked}>
          Cancel
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
