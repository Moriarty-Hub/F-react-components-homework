import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);
    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  addMessage = (message) => {
    const messages = this.state.messages.concat(message);
    setTimeout(() => {
      this.setState({
        messages,
      });
    }, 1);
  };

  addRobotReply = (message) => {
    const reply = answersData.find((answer) => answer.tags.includes(message));
    if (reply !== undefined) {
      this.addMessage(reply);
    }
  };

  addCustomerMessage = (text) => {
    const message = {
      role: ROLE.CUSTOMER,
      text,
    };
    this.addMessage(message);

    setTimeout(() => {
      this.addRobotReply(text);
    }, 500);
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onSend={this.addCustomerMessage} />
      </main>
    );
  }
}

export default Chat;
