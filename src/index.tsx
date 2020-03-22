import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './page/Home/Home';

const render = () => {
    ReactDOM.render(
        <Home/>,
        document.getElementById("root")
    )
}

render();