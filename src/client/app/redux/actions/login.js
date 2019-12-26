import axios from 'axios';
import {
	USER_VERIFY,
	ERROR,
} from './actionTypes';
import { fetchAction, error } from '.';
import { APPLICATION_ROUTES } from '../../constants';
/** 
 * trigger admin login
 * @param {String} email
 * @param {String} verificationCode
*/
export const userLogin = ({ email, verificationCode }) => (dispatch) => {
	const body = { email, verificationCode };
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.USER_VERIFY, body)
		.then((response) => {
			// handle the server success response
			const { data: { code, message, data } } = response;
			dispatch({
				type: USER_VERIFY,
				response,
				code,
				message,
				data,
			});
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle no connection to the server
			dispatch(fetchAction({ fetching: false }));
		});
};

export const sendVerification = ({
	email,
	customDispatchers = [() => {}],
}) => (dispatch) => {
	const body = { email };
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.USER_SENDVERIFICATION, body)
		.then((response) => {
			// handle the server success response
			const { data: { code, message } } = response;
			if (code === 100) {
				console.log('showing verification dialog now');
				customDispatchers.map(dispatchFunction => dispatch(dispatchFunction()));
			} else {
				dispatch({ type: ERROR, error: message });
			}
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle no connection to the server
			dispatch(fetchAction({ fetching: false }));
		});
};

/**
 * handle the verification process
 * @param {String} email that received the verification code
 * @param {Number} verificationCode the code sent to the email
 */
export const verifyEmail = ({
	email,
	verificationCode,
	tokenPersistFunction,
}) => (dispatch) => {
	const body = { email, verificationCode };
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.USER_VERIFY, body)
		.then((response) => {
			const { data: { code, message, data } } = response;
			if (code !== 100) {
				dispatch(error({ error: message }));
			} else if (code === 100) {
				tokenPersistFunction(data.accessToken, data.user);
			}
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			console.log(err);
			return dispatch(error({ error: err.message }));
			// console.log(err);
		});
};
