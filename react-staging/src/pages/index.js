import '@/style/login.less';
import React, { Component } from 'react';
import '@/style/login.less';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '点击',
    }
    this.handleBtn = this.handleBtn.bind(this);
  }
  handleBtn() {
    this.setState({ msg })
  }
  render() {
    return (
      <>
        <button onClick={this.handleBtn}>{this.state.msg}</button>
        <p>我是一个大傻瓜123</p>
      </>
    );
  }
}

export default Test;