import React, { Component } from 'react';
import Components from './component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
              <Components/>

          </div>
        </BrowserRouter>

    );
  }
}

export default App;
