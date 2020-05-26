import React, { Component } from 'react';
import Test from '@/pages/index.js';
import axios from 'axios';       
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import './App.css';

class App extends Component {
  state = {}
  componentDidMount() {
    // axios.get('/api/user').then((res) => {
    //   console.log(res);
    // });
  }
  render() { 
    return ( 
      <div>
        <Test />
        <Button>确定</Button>
      </div>
     );
  }
}
 
export default hot(module)(App);