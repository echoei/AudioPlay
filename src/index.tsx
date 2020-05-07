import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import Home from './page/Home/Home';
import './global/global.scss';

const sizeChange = function() {
    let domHtml = document.getElementsByTagName("html")[0];
    let clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
    console.log(clientWidth);
    domHtml.style.fontSize = Math.min(clientWidth, clientHeight)/25 + "px";
}
sizeChange();
window.addEventListener("resize", sizeChange);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Home/>
        </Provider>,
        document.getElementById("root")
    )
}

render();
