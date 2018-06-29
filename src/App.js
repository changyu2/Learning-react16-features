import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

const BoundaryHOC = ProtectedComponent =>
  class Boundary extends Component {
    state = {
      hasError: false
    };
    componentDidCatch = () => {
      this.setState({
        hasError: true
      });
    };
    render() {
      const { hasError } = this.state;
      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  };

class ErrorMaker extends Component {
  state = {
    numbers: ["1", "2", "3", "4"]
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        numbers: undefined
      });
    }, 2000);
  };
  render() {
    const { numbers } = this.state;
    return numbers.map(number => ` ${number} `);
  }
}

const PErrorMaker = BoundaryHOC(ErrorMaker);

class Portals extends Component {
  render() {
    return createPortal(<Message />, document.getElementById("touchme"));
  }
}

const PPortals = BoundaryHOC(Portals);

const Message = () => "Just touched it!";

class ReturnTypes extends Component {
  render() {
    return "hello";
  }
}

const ErrorFallback = () => "Sorry something went wrong";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ReturnTypes />
        <PPortals />
        <PErrorMaker />
      </Fragment>
    );
  }
}

export default BoundaryHOC(App);
