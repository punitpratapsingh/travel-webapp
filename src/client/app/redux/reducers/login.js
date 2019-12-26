/**
 * action reducer for users listing admin page
 */
import { APPLICATION_ROUTES } from '../../constants';
import {
	ERROR,
	SUCCESS,
	TRANSIENT_TOGGLE,
	STATE_PROPERTY,
} from '../actions/actionTypes';

const defaultState = {
	code: undefined,
	confirm: false,
	reject: false,
	response: undefined,
	error: undefined,
	success: undefined,
	message: undefined,
	data: [],
	showDialog: false,
};
/**
 * default state handler/reducer for entity
 */
export default (
	state = defaultState,
	{
		type,
		data,
		code,
		message,
		error,
		response,
		success,
		property,
		value,
		tag,
	},
) => {
	switch (type) {
		case TRANSIENT_TOGGLE:
			if (tag === 'showDialog') {
				console.log(state.showDialog);
				alert(state.showDialog);
				return Object.assign({}, state, { showDialog: !state.showDialog });
			}
			return state;
		case APPLICATION_ROUTES.USER_VERIFY:
			return Object.assign({}, state, {
				data,
				code,
				message,
			});
		case APPLICATION_ROUTES.USER_SENDVERIFICATION:
			return Object.assign({}, state, {
				showDialog: true,
				data,
				code,
				response,
				message,
				// confirm,
				// reject,
			});
		case ERROR:
			return Object.assign({}, state, { error });
		case SUCCESS:
			return Object.assign({}, state, { success });
		case STATE_PROPERTY:
			const propertyObject = {};
			propertyObject[property] = value;
			return Object.assign({}, state, propertyObject);
		default:
			return state;
	}
};
