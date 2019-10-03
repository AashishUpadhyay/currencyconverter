import React from 'react';
import ReactDOM from 'react-dom';

import Conversion from '../containers/Conversion';

import store from '../stores/configureStore'
import { Provider } from 'react-redux';


class App extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}><Conversion /></Provider>,
            </div>
        )
    }
}

export default App;
