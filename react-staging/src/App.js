import React, { Component } from 'react';
import Test from '@/pages/index.js';
import axios from 'axios';       
import { hot } from 'react-hot-loader';

class App extends Component {
  state = {}
  componentDidMount() {
    axios.get('/api/user').then((res) => {
      console.log(res);
    });
  }
  render() { 
    return ( 
      <>
        <Test />
      </>
     );
  }
}
 
export default hot(module)(App);