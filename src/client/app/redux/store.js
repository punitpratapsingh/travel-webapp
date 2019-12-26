/**
 * The application store
 * @author gaurav sharma
 * @since 9th January 2019
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

// enhances combines all the middlewares.
const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, createLogger());

export default (initialState = {}) => createStore(combineReducers({
	fetching: reducers.fetchReducer,
	login: reducers.loginReducer,
	dashboard: reducers.journeyReducer,
	journey: reducers.journeyReducer,
	booking: reducers.bookingHistoryReducer,
	bookingData: reducers.bookingDataReducer,
	ticket: reducers.transactionReducer,
	search: reducers.searchReducer,
	userUpdate: reducers.userUpdateReducer,
	bookingPayments: reducers.bookingPayments,
	price: reducers.priceReducer,
	contactus: reducers.contactusReducer,
	navigation: reducers.navigationReducer,
	error: reducers.errorReducer,
	bookingDetails: reducers.bookingDetailsReducer,
	routing: routerReducer,
}), initialState, enhancer);
