/**
 * action reducer for users listing admin page
 */
import { APPLICATION_ROUTES } from '../../constants';
import {
	ERROR,
	SUCCESS,
	STATE_PROPERTY,

} from '../actions/actionTypes';

const defaultState = {
	data: undefined,
	page: 0,
	limit: 30,
	length: 0,
	error: undefined,
	success: undefined,
	showPolicy: false,
};
/**
 * default state handler/reducer for entity
 */
export default (state = defaultState, {
	type,
	data = [],
	page = 1,
	limit = 10,
	length = 0,
	property,
	value,
	error,
	success,
}) => {
	switch (type) {
		case APPLICATION_ROUTES.TICKET_PRICE:
			return Object.assign({}, state, {
				data,
				page,
				limit,
				length: data.length,
			});
		case STATE_PROPERTY:
			const propertyObject = {};
			propertyObject[property] = value;
			return Object.assign({}, state, propertyObject);
		case ERROR:
			return Object.assign({}, state, { error });
		case SUCCESS:
			return Object.assign({}, state, { success });
		default:
			return state;
	}
};
