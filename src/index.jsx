import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';


// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class horrorTimeApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="flex" >
          <MainView className="justify-content-md-center align-content-center" />
        </Container>
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(horrorTimeApp), container);