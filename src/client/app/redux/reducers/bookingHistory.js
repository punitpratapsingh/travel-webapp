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
	activeTab: 1,
	limit: 30,
	length: 0,
	error: undefined,
	success: undefined,
	updatedCredits: localStorage.getItem('credits') || 0,
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
	property,
	value,
	error,
	success,
}) => {
	switch (type) {
		case APPLICATION_ROUTES.BOOKING_HISTORY:
			return Object.assign({}, state, {
				data,
				page,
				limit,
				length: data.length,
			});
		case APPLICATION_ROUTES.TICKET_CANCEL:
			console.log(data);
			return Object.assign({}, state, {
				updatedCredits: data.credits || localStorage.getItem('credits'),
				success: 'Booking has been cancelled. Amount will be credited to your wallet.',
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
