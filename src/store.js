import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk'; 
import {trademarkReducer} from '../src/Redux/trademarks/reducers'
import {filterReducer} from '../src/Redux/filters/reducers'
console.log(trademarkReducer)
const rootReducer = combineReducers({
    trademarks: trademarkReducer,
    filters: filterReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
