import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./root-reducer";
import {logger} from "redux-logger/src";


const middleWares = [logger]
const enchancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, enchancers)