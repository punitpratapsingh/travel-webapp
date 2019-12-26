import {
	TRANSIENT_TOGGLE,
	STATE_PROPERTY,
} from '../actions/actionTypes';
import { APPLICATION_ROUTES } from '../../constants';

const defaultState = {
	fromActive: false,
	toActive: false,
	error: undefined,
	success: undefined,
	from: undefined,
	to: undefined,
	activeTab: 1,
	departActive: false,
	returnActive: null,
	departDate: new Date(),
	returnDate: undefined,
	defaultSeat: 1,
	isRoundTrip: false,
	showDisabledConfirmation: false,
	showPricingConfirmation: false,
	seatForDisabled: false,
};

export default (
	state = defaultState,
	{
		type,
		tag,
		data,
		property,
		value,
	},
) => {
	switch (type) {
		case TRANSIENT_TOGGLE:
			if (tag === 'fromActive') {
				return Object.assign({}, state, { fromActive: !state.fromActive });
			}
			if (tag === 'toActive') {
				return Object.assign({}, state, { toActive: !state.toActive });
			}
			if (tag === 'departActive') {
				return Object.assign({}, state, { departActive: !state.departActive });
			}
			if (tag === 'returnActive') {
				return Object.assign({}, state, { returnActive: !state.returnActive });
			}
			if (tag === 'showDisabledConfirmation') {
				return Object.assign({}, state, { showDisabledConfirmation: !state.showDisabledConfirmation });
			}
			if (tag === 'showPricingConfirmation') {
				return Object.assign({}, state, { showPricingConfirmation: !state.showPricingConfirmation });
			}
			if (tag === 'seatForDisabled') {
				return Object.assign({}, state, { seatForDisabled: !state.seatForDisabled });
			}
			return state;
		case APPLICATION_ROUTES.STOPS:
			return Object.assign({}, state, { data });
		case STATE_PROPERTY:
			const propertyObject = {};
			propertyObject[property] = value;
			if (property === 'returnDate') {
				// activate return tab
				propertyObject.isRoundTrip = true;
				propertyObject.activeTab = 2;
			}
			return Object.assign({}, state, propertyObject);
		default:
			return state;
	}
};
