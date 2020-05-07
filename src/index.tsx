import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import Home from './page/Home/Home';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Home/>
        </Provider>,
        document.getElementById("root")
    )
}

render();
