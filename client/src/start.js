import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Reducer } from "./reducer";
import Welcome from "./welcome";
import App from "./app";
import { init } from "./socket";

let elem;

const store = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
