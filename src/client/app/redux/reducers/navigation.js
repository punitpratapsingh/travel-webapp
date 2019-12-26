import { SWITCH_NAVIGATION } from '../actions/actionTypes';
import { APPLICATION_ROUTES } from '../../constants';


const defaultState = {
	active: 1,
	userDetails: {
		accessToken: undefined,
		credits: undefined,
		email: undefined,
		userName: undefined,
		id: undefined,
	},
};

export default (state = defaultState, { type, active, data }) => {
	switch (type) {
		case APPLICATION_ROUTES.USER_DETAILS:
			return Object.assign({}, state, { userDetails: data });
		case SWITCH_NAVIGATION:
			return Object.assign({}, state, { active });
		default: return state;
	}
};
