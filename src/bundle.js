import Main from 'site/Main';

import React from 'react';
import ReactDOM from 'react-dom';

export let run = (node) => {
    ReactDOM.render(<Main />, node);
}
