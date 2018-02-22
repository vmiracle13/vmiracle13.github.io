import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';

ReactDOM.render(<App />, document.querySelector('.root'));

const isEmpty = (str) => {
    if (!str || str.replace(/\s/g,"") === "") {
        alert('The field is empty.');
        return true;
    }
};

export default isEmpty;