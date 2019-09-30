import React, { Component } from "react";
import "./Button.css";

class Button extends Component {

  render() {
    return( 
      <div className={ `button ${ this.props.className }` } onClick={() => this.props.handleClick(this.props.children)}>
        {this.props.children}
      </div>
    )
  }
}

export default Button;
