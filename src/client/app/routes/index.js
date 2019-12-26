import React from 'react';
import {
	Router,
	Route,
	// hashHistory,
	browserHistory,
} from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import InitStore from '../redux/store';

import LandingPage from './LandingPage';
import AdminAccountPage from './Account';
import SearchPage from './Search';
import BookingHistory from './BookingHistory';
import EditProfile from './EditProfile';
import AboutUs from './AboutUs';
import TermsAndConditions from './TermsAndConditions';
import ContactUsPage from './ContactUs';
import PaymentOption from './PaymentOption';
import Booking from './Booking';
import BookingPayment from './BookingPayment';
import BookingDetail from './BookingDetail';
import BusListing from './BusListing';
import Transaction from './Transaction';
import Ticket from './Ticket';
import PrivacyPolicy from './PrivacyPolicy';

// const history = syncHistoryWithStore(hashHistory, InitStore());
export default () => {
	return <Provider store={InitStore()}>
		<Router history={browserHistory}>
			<Route path="/" component={LandingPage} />

			<Route path="/adminAccount" strict={true} component={AdminAccountPage}>
				<Route path='/account' component={SearchPage} />
				<Route path='/dashboard' component={SearchPage} />
				<Route path='/search' component={SearchPage} />
				<Route path='/history' component={BookingHistory} />
				<Route path='/editProfile' component={EditProfile} />
				<Route path='/booking' component={Booking} />
				<Route path='/bookingPayment' component={BookingPayment} />
				<Route path='/bookingDetail' component={BookingDetail} />
				<Route path='/busListing' component={BusListing} />
				<Route path='/transaction' component={Transaction} />
				<Route path='/ticket' component={Ticket} />
				<Route path='/paymentOption' component={PaymentOption} />
				<Route path='/aboutUs' component={AboutUs} />
				<Route path='/termsAndConditions' component={TermsAndConditions} />
				<Route path='/contactUs' component={ContactUsPage} />
				<Route path='/privacyPolicy' component={PrivacyPolicy} />
			</Route>
		</Router>
	</Provider>;
}
