/**
 * action reducer for users listing admin page
 */
import { APPLICATION_ROUTES } from '../../constants';
import {
	ERROR,
	SUCCESS,

} from '../actions/actionTypes';

const defaultState = {
	data: undefined,
	page: 0,
	bookingId: undefined,
	transaction: undefined,
	limit: 30,
	length: 0,
	error: undefined,
	success: undefined,
};
/**
 * default state handler/reducer for entity
 */
export default (state = defaultState, {
	type,
	data = {},
	page = 1,
	limit = 10,
	error,
	success,
}) => {
	switch (type) {
		case APPLICATION_ROUTES.USER_DETAILS:
			return Object.assign({}, state, {
				data,
				page,
				limit,
				length: data.length,
			});
		case APPLICATION_ROUTES.BOOK_BUS:
			return Object.assign({}, state, {
				bookingId: data.bookingId,
			});
		case APPLICATION_ROUTES.TRANSACTION:
			return Object.assign({}, state, {
				transaction: data,
			});
		case ERROR:
			return Object.assign({}, state, { error });
		case SUCCESS:
			return Object.assign({}, state, { success });
		default:
			return state;
	}
};
