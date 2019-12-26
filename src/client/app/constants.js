/**
 * This file defines application level constants
 */
import { SERVER } from './statics';

export const SERVER_BASE_URL = SERVER;
export const APPLICATION_ROUTES = {
	// admin URLS
	USER_SENDVERIFICATION: `${SERVER_BASE_URL}users/sendVerification`,
	USER_VERIFY: `${SERVER_BASE_URL}users/verify`,
	USER_DETAILS: `${SERVER_BASE_URL}users/details`,
	BULK_UPLOAD: `${SERVER_BASE_URL}event/bulkUpload`,
	STOPS: `${SERVER_BASE_URL}stopName/list`,
	CITY_LIST: `${SERVER_BASE_URL}stopName/list`,
	JOURNEY_DETAILS: `${SERVER_BASE_URL}users/journeyDetails`,
	BOOKING_HISTORY: `${SERVER_BASE_URL}users/viewBookings`,
	TICKET: `${SERVER_BASE_URL}users/transaction`,
	TICKET_CANCEL: `${SERVER_BASE_URL}users/cancelBooking`,
	USER_UPDATE: `${SERVER_BASE_URL}users/update`,
	TICKET_PRICE: `${SERVER_BASE_URL}users/bookingPrice`,
	VERIFY_PAYMENT: `${SERVER_BASE_URL}users/verifyPayment`,
	ADD_TO_WALLET: `${SERVER_BASE_URL}users/addToWallet`,
	BOOK_BUS: `${SERVER_BASE_URL}users/book`,
	TRANSACTION: `${SERVER_BASE_URL}users/transaction`,
	CONTACTUS: `${SERVER_BASE_URL}users/contactUs`,
};

export const navigationIndexer = {
	dashboard: 1,
	search: 2,
	history: 3,
	aboutUs: 4,
	termsAndConditions: 5,
	contactUs: 6,
	editProfile: 7,
	paymentOption: 8,
	booking: 9,
	bookingPayment: 10,
	bookingDetail: 11,
	busListing: 12,
	ticket: 13,
	transaction: 14,
	privacyPolicy: 15,
};
