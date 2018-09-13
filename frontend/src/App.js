import React, { Component } from 'react';
import Header from './Header'
import MainPage from './MainPage'
import Footer from './Footer'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainPage />
        <Footer />
      </div>
    );
  }
}

export default App;
