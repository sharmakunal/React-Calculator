import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      previousNumber: "",
      displayNumber:"0",
      currentNumber: "",
      operator: "",
      scientificMode: false,
      theme:"light"
    };
  }

  addToInput = val => {
    const inputValue = this.state.input + val;
    this.setState({ input: inputValue });
    this.setState({displayNumber: inputValue});
  };

  addZeroToInput = val => {
    // if this.state.input is not empty then add zero
    if (this.state.input !== "") {
      const inputValue = this.state.input + val;
      this.setState({ input: inputValue});
      this.setState({displayNumber: inputValue});
    }
  };

  clearInput = () => {
    this.setState({ input: "" });
    this.setState({ previousNumber: "" });
    this.setState({ displayNumber: "0" });
  };

  add = () => {
    if(this.state.previousNumber !== ""){
      this.evaluate();
    } else {
      this.setState({previousNumber: this.state.input});
    }
    this.setState({ input: "" });
    this.setState({ operator: "plus" });
  };

  subtract = () => {
    if(this.state.previousNumber !== ""){
      this.evaluate();
    } else {
      this.setState({previousNumber: this.state.input});
    }
    this.setState({ input: "" });
    this.setState({ operator: "subtract" });
  };
  
  multiply = () => {
    if(this.state.previousNumber !== ""){
      this.evaluate();
    } else {
      this.setState({previousNumber: this.state.input});
    }
    this.setState({ input: "" });
    this.setState({ operator: "multiply" });
  };

  divide = () => {
    if(this.state.previousNumber !== ""){
      this.evaluate();
    } else {
      this.setState({previousNumber: this.state.input});
    }
    this.setState({ input: "" });
    this.setState({ operator: "divide" });
  };

  /**
   * evaluate the values
   */
  evaluate = () => {
    this.state.currentNumber = this.state.input;
    if (this.state.operator === "plus") {
      const result = parseFloat(this.state.previousNumber) + parseFloat(this.state.currentNumber);
      this.setState({previousNumber:result});
      this.setState({displayNumber:result});
    } else if (this.state.operator === "subtract") {
      const result = parseFloat(this.state.previousNumber) - parseFloat(this.state.currentNumber);
      this.setState({previousNumber:result});
      this.setState({displayNumber:result});
    } else if (this.state.operator === "multiply") {
      const result = parseFloat(this.state.previousNumber) * parseFloat(this.state.currentNumber);
      this.setState({previousNumber:result});
      this.setState({displayNumber:result});
    } else if (this.state.operator === "divide") {
      const result = parseFloat(this.state.previousNumber) / parseFloat(this.state.currentNumber);
      this.setState({previousNumber:result});
      this.setState({displayNumber:result});
    }
  };

  /**
   * calculate the result of values
   */
  result = async () => {
    await this.evaluate();
    this.setState({previousNumber:""});
    this.setState({input:this.state.displayNumber});
  }

  /**
   * change mode of calculator
   */
  scientificMode = () =>{
    if(this.state.scientificMode){
      this.setState({scientificMode: false});
      alert("OFF");
    } else {
      this.setState({scientificMode: true});
      alert("ON");
    }
  }

  /**
   * calculate sqaure value of number
   */
  square = () => {
    if(this.state.scientificMode){
      if(this.state.displayNumber !== "0" && this.state.displayNumber !== "1"){
        const squareRoot = this.state.displayNumber * this.state.displayNumber;
        this.setState({displayNumber:squareRoot});
        this.setState({input:squareRoot});
      }
    }
  };

  /**
   * convert positve number to negative and vise-versa
   */
  sign = () => {
    if(this.state.scientificMode && this.state.displayNumber !== "0"){
      const number = parseFloat(this.state.displayNumber);
      const result = number * -1;
      this.setState({displayNumber:result});
      this.setState({input:result});
    }
  };

  /**
   * calculate sqaure root of the value
   */
  sqrt = () => {
    if(this.state.scientificMode && this.state.displayNumber !== "0" && this.state.displayNumber !== "1"){
      let number1, number2 = parseFloat(this.state.displayNumber) / 2;
      do {
        number1 = number2;
        number2 = (number1 + (parseFloat(this.state.displayNumber) / number1)) / 2;
      } while (number1 !== number2);
      this.setState({displayNumber:number1});
      this.setState({input:number1});
    }
}
  /**
   * change the theme
   */
  changeTheme = () => {
    if (this.state.theme === "light") {
        this.setState({theme:"dark"});
    } else {
        this.setState({theme:"light"});
    }
  }

  /**
   * render the calculator UI on browser
   */
  render() {
    return (
      <div className={this.state.theme === "light" ? 'App light-background' : 'App dark-background'}>
        <div className="calc-wrapper">
          <div className="row">
            <Button className={this.state.theme === "light" ? 'button-theme' : ''} handleClick={this.changeTheme}>Light Theme</Button>
            <Button className={this.state.theme === "dark" ? 'button-theme' : ''} handleClick={this.changeTheme}>Dark Theme</Button>
          </div>
          <div className="row">
            <Input className="input">{this.state.displayNumber}</Input>
          </div>
          <div className="row">
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.scientificMode}>Scientific</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>1</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>2</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>3</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.add}>+</Button>
          </div>
          <div className="row">
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.sign}>Sign</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>4</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>5</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>6</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.subtract}>-</Button>
          </div>
          <div className="row">
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.square}>Square</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>7</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>8</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addToInput}>9</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.multiply}>*</Button>
          </div>
          <div className="row">
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.sqrt}>Square Root</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.clearInput}>Clear</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.addZeroToInput}>0</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.result}>=</Button>
            <Button className={this.state.theme === "light" ? 'button-light' : 'button-dark'} handleClick={this.divide}>/</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;