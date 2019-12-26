/**
 * @desc this is the admin component of the application.
 * @author gaurav sharma
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	userLogin,
	sendVerification,
	taggedToggle,
	genericUpdateValue,
	verifyEmail,
	nullifyError,
} from '../../redux/actions';
import { browserHistory } from 'react-router'; // importing from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import LoadingOverlay from '../../components/LoadingOverlay';
import Dialog from '../../components/Dialog';
import Logo from '../../assets/images/logo.png';
import './index.scss';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.realignContent = this.realignContent.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.responseHandler = this.responseHandler.bind(this);
		this.saveAccessToken = this.saveAccessToken.bind(this);
	}

	/**
	 * trigger this to realign the window content
	*/
	realignContent() {
		const bodyContainer = document.getElementById('content');
		// const bodyContainer = document.getElementsByTagName('body')[0];
		const loginContainer = document.getElementById('user-login');

		if (bodyContainer && loginContainer) {
			if (bodyContainer.clientWidth >= 720) {
				const loginMargin = (bodyContainer.clientHeight - loginContainer.clientHeight -100)/2;
				loginContainer.style.marginTop = `${loginMargin}px`;
			} else {
				loginContainer.style.marginTop='10px';
			}
		}
	}

	componentDidMount() {
		this.realignContent();
		window.onresize = this.realignContent;

		document.title = 'Admin';
	}
	componentDidUpdate() {
		document.title = 'Admin';

	   }

	onLogin(e) {
		e.preventDefault();
		const { triggerLoginUser, triggerSendVerification, triggerTaggedToggle} = this.props;
       triggerSendVerification(this.email.value);
		//  triggerLoginUser(this.email.value, JSON.parse(this.no.value));
		// triggerTaggedToggle();
	}
   
	/**
	 * handle the login payload response
	 */
	responseHandler() {
		const { login: { data: { code, message } } } = this.props;
		toast.dismiss();
		if (code === 100) {
			toast.success(message);
			alert('hello');
			// setup the admin access token and redirect to admin account
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('user', data.user.name);

			this.props.router.push('/account');
		} else {
			toast.error("Failed authentication.");
		}
	}

	componentWillMount() {
		if (localStorage.getItem('data')) {
			window.location = '/adminAccount';
		}
	}

	/**
	 * save the access token in the local storage. Pass this function in custom
	 * dispatchers to handle the saving of accessToken in local storage.
	 * @param {*} token the authentication token
	 */
	saveAccessToken(token, user) {
		window.localStorage.setItem('accessToken', token);
		window.localStorage.setItem('userName', user.name);
		window.localStorage.setItem('email', user.email);
		window.localStorage.setItem('credits', user.appCredits);
		window.localStorage.setItem('id', user._id);

		window.location = '/dashboard';
	}

	/**
	 * this is the handler to handle the closing dialogue event
	 */
	handleClose() {
		// handle the closing dialogue event
	}

	render() {
		const {
			fetching,
			login:{
				showDialog,
				error,
				success,
			},
			triggerTaggedToggle,
			triggerGenericUpdateValue,
			triggerVerifyEmail,
			triggerNullifyError,
			triggerNullifySuccess,
		} = this.props;

		if (error) {
            toast.dismiss();
            triggerNullifyError();
            toast.error(error);
        }
        if (success) {
            toast.dismiss();
            triggerNullifySuccess();
            toast.success(success);
        }
		return <section className='content' id='content'>
			<LoadingOverlay show={fetching}/>
			<ToastContainer />
			{/* <section className='transparent-overlay'></section> */} 
			{/* <br/><br/><br/> */}
			{/* <HeaderComponent/><br/> */}
			<section className='background'></section>
			<section className='overlay-container'></section>
			<section className='container-fluid'>
				<section className='row'>
					<section className='col-md-6'>
						<img src={Logo} className='img img-responsive' style={{ width: '100%' }}/>
					</section>
					<section className='col-md-6'>
						<section className='login-content-container'>
							<h2 className='heading-label'>Get moving with us</h2>
							<br/><br/>
							
							&nbsp;
							<input type='email' ref={email => this.email = email } className='email-field' placeholder='Add email here' />

							<br/><br/><br/><br/>
							<button
								className='default-btn highlighted-button'
								onClick={this.onLogin}>
									Login
							</button><br/><br/>
							<button
								className='default-btn guest-btn'
								onClick={() => browserHistory.push('/search')}>
									Continue as guest
							</button><br/><br/>
							<p style={{ color: '#fafafa' }}>Download the free C Trans mobile of app on<br/></p>
							<a href='https://apps.apple.com/in/app/c-trans-lines/id1488579219' target='_'><img src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg' width={200}/></a><br/>
							<a href='https://play.google.com/store/apps/details?id=com.cooleytransportation' target='_'><img src='https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg' width={200}/></a><br/>
							{/* <img src='https://i.ibb.co/CMKXHDd/Icons-App-Store-Google-play.png' width={200} /> */}
							{/* <button className='default-btn outline-button'>Continue without Login</button> */}
						</section>
					</section>
				</section>
			</section>
			<Dialog
				show={showDialog}
				title='Enter verification Token.'
				confirmText='Verify'
				rejectText='Cancel.'
				showConfirm={true}
				showReject={true}
				showButtons={true}
				onConfirm={() => {
					triggerVerifyEmail(this.email.value, Number(this.code.value), this.saveAccessToken);
				}}
				onReject={() => {
					triggerGenericUpdateValue({ property: 'showDialog', value: false });
					triggerTaggedToggle('sendVerification');
				}}
				>
				<input
					ref={code => this.code = code}
					className='input-code'
					placeholder='_ _ _ _'/>
				<br/><br/>
			</Dialog>
		</section>
	}
}

// handles the outgoing dispatches
const mapDispatchToProps = dispatch => {
	return {
		triggerSendVerification: ( email) => dispatch(sendVerification({
			email,
			customDispatchers: [() => dispatch(genericUpdateValue({ property: 'showDialog', value: true }))],
		})),
		triggerGenericUpdateValue: ({ property, value }) => dispatch(genericUpdateValue({ property, value })),
		/**
		 * trigger the callback to verify the user with the email and
		 * recieved token
		 */
		triggerVerifyEmail: (email, verificationCode, tokenPersistFunction) => dispatch(verifyEmail({
			email,
			verificationCode,
			tokenPersistFunction,
		})),
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
		triggerTaggedToggle: tag => dispatch(taggedToggle({ tag })),       
	};
}

// handles incoming state changes
const mapStateToProps = state => {
	const { fetching, login } = state;
	return { fetching, login };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
