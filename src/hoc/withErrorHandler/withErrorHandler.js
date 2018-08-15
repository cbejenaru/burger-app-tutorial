import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(null, error => {
        this.setState({ error: error });
      });
    }

    clickedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} backdropClicked={this.clickedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
