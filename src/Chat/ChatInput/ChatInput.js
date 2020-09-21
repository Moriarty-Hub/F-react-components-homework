import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
    };
  }

  handleInputFieldChange = (event) => {
    this.setState({
      inputField: event.target.value,
    });
  };

  handleSend = () => {
    this.props.onSend(this.state.inputField);
    this.setState({
      inputField: '',
    });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" value={this.state.inputField} onChange={this.handleInputFieldChange} />
        <button type="button" onClick={this.handleSend}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
