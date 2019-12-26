import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
import LoadingOverlay from '../../components/LoadingOverlay';
import { navigationIndexer, APPLICATION_ROUTES } from '../../constants';
import {
	switchNavigation,
	fetchAction,
	fetchEntity
} from '../../redux/actions';
// loading assets
import Dashboard from '../Search';
import Image from '../../components/Image';
import logo from '../../assets/images/logo.png';
import BusIcon from '../../assets/images/busicon.png';
import './index.scss';
import { toast } from 'react-toastify';

class Account extends Component {
	constructor(props) {
		super(props);

		this.handleSwitch = this.handleSwitch.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.user = undefined;
	}

	handleSwitch(e) {
		const { triggerSwitchNavigation } = this.props;
		e.preventDefault();
		const name = e.target.name || e.target.id;
		browserHistory.push(`/${name}`);
		triggerSwitchNavigation(navigationIndexer[name]);
	}

	componentWillMount() {
		/**
		 * check if logged in user
		 */
		const { props: { triggerFetchEntity } } = this;
		if (!window.localStorage.accessToken) {
			// window.location = '/';
			console.log('guest logged in');
		} else {
			this.user = window.localStorage.accessToken;
			triggerFetchEntity();
		}
	}

	componentDidMount() {
		document.title = 'Admin Account';
	}

	bookingDetail() {
		const url = `/editProfile`;
		browserHistory.push(url);
	}

	/**
	 * this function will handle the logout functionality
	 */
	handleLogout(e) {
		e.preventDefault();
		const { type } = this.props;
		localStorage.clear();
		window.location = '/';

	}

	render() {
		const { props: { fetching, navigation: { active, userDetails } } } = this;
		return <section>
			<LoadingOverlay show={fetching} />
			<section className='leftNavigationContainer'>
				&nbsp;<button
					className='navigation-button'
					onClick={() => {
						const navigatorWidth = document.getElementsByClassName('leftNavigation')[0].offsetWidth;
						if (navigatorWidth === 0) {
							// toggle opening
							document.getElementsByClassName('leftNavigation')[0].style.display = 'block';
							// document.getElementsByClassName('leftNavigation')[0].style.padding = '10px';
						} else {
							// toggle closing the navigation
							document.getElementsByClassName('leftNavigation')[0].style.display = 'none';
							// document.getElementsByClassName('leftNavigation')[0].style.padding = '0px';
						}
					}}>
					<FontAwesome name='bars' />
				</button>
				<section className='leftNavigation'>
					<section className="navigationMenu">
						{this.user ? <section>
							<Image height={100} />
							<section className='user-description'>
								<span>{userDetails && userDetails.name}</span><br />
								<span>{userDetails && userDetails.email}</span><br />
								<span>Credit: ${userDetails && Number(userDetails.appCredits).toPrecision(4)}</span><br />
								<span onClick={() => this.redirect} ><a className='action-link' href='editProfile'>View and Edit</a></span>
							</section>
							<br /><br /><br />
							<p className='text-left' style={{ marginLeft: '30px' }}><img src={BusIcon} height={30} /></p>
						</section> : <button onClick={() => browserHistory.push('/')} className='btn btn-success'>Login to see details</button>}
						<span className='footnote'>You need to login to get access to available credits, booking history and booking payments.</span>
						<hr />
					</section>
					<section className="navigationMenu">
						<p className="navigationHeader">Menu</p>
						<button name='search' className={`navigationItem ${active === navigationIndexer.dashboard ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
							<FontAwesome id='search' name="search" onClick={this.handleSwitch} />&nbsp; Search
					</button>
						{this.user && <button name='history' className={`navigationItem ${active === navigationIndexer.history ? 'activeItem' : ''}`} onClick={this.user ? this.handleSwitch : () => toast.warn('Login to watch booking History.')}>
							<FontAwesome id='calendar' name="history" onClick={this.user ? this.handleSwitch : () => toast.warn('Login to watch booking History.')} />&nbsp; Booking History
					</button>}
						<button name='aboutUs' className={`navigationItem ${active === navigationIndexer.aboutUs ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
							<FontAwesome id='aboutUs' name="info" onClick={this.handleSwitch} />&nbsp; About Us
					</button>
						<button name='termsAndConditions' className={`navigationItem ${active === navigationIndexer.termsAndConditions ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
							<FontAwesome id='termsAndConditions' name="copy" onClick={this.handleSwitch} />&nbsp; Terms &amp; Conditions
					</button>

					<button name='privacyPolicy' className={`navigationItem ${active === navigationIndexer.privacyPolicy ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
							<FontAwesome id='privacyPolicy' name="user-secret" onClick={this.handleSwitch} />&nbsp; Privacy &amp; Policy
					</button>
					
						<button name='contactUs' className={`navigationItem ${active === navigationIndexer.contactUs ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
							<FontAwesome id='contactUs' name="phone" onClick={this.handleSwitch} />&nbsp;Contact Us
					</button>
					{this.user && <button name='logout' className={`navigationItem ${active === navigationIndexer.dashboard ? 'activeItem' : ''}`} onClick={this.handleLogout}>
							<FontAwesome id='logout' name="sign-out" onClick={this.handleLogout} />&nbsp; Logout
					</button>}
					</section>
				</section>
			</section>
			<section className='dynamicContainer'>
				{this.props.children || <Dashboard />}
			</section>
		</section>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerFetchEntity: () => dispatch(fetchEntity({ endpoint: APPLICATION_ROUTES.USER_DETAILS })),
		triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
	}
}

const mapStateToProps = state => {
	const { fetching, navigation } = state;
	return { fetching, navigation };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
// export default AdminIndex;
