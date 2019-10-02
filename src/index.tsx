import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
    compose (
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        // @ts-ignore
        reactReduxFirebase(fbConfig)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

