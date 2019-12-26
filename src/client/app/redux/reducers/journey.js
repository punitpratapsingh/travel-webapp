/**
 * action reducer for users listing admin page
 */
import {
	APPLICATION_ROUTES, TRANSIENT_TOGGLE,
} from '../../constants';
import {
	ERROR,
	SUCCESS,
	STATE_PROPERTY,

} from '../actions/actionTypes';

const defaultState = {
	data: undefined,
	activeTab: 1,
	activatedDay: 0,
	selectedDay: new Date().getTime(),
	page: 0,
	limit: 30,
	length: 0,
	activeTab: 1,
	error: undefined,
	success: undefined,
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
	tag,
}) => {
	switch (type) {
		case TRANSIENT_TOGGLE:
			if (tag === 'activeTab') {
				return Object.assign({}, state, { activeTab: !state.activeTab });
			}
			return state;

		case APPLICATION_ROUTES.JOURNEY_DETAILS:
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
