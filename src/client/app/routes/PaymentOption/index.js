/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { browserHistory } from 'react-router';
// import paypal from '../../assets/images/paypal.png';
import { toast, ToastContainer } from 'react-toastify';
import LoadingOverlay from '../../components/LoadingOverlay';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    genericHitEndpoint,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class PaymentOption extends Component {

    constructor(props) {
        super(props);
        const { search } = location;
        const params = new URLSearchParams(search);
        if (params.get('payload')) {
            this.decode = JSON.parse(atob(params.get('payload')));
        }

        console.log(this.decode);

    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Payment Option';
        triggerSwitchNavigation(navigationIndexer.paymentOption);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Payment Option';
        triggerSwitchNavigation(navigationIndexer.paymentOption);
    }

    /**
     * click handler
     * @param {*} e event object
     */
    handleSwitch(e) {
        e.preventDefault();
    }

    componentWillMount() {
        // this page is not available if accessToken is undefined
        if (!window.localStorage.accessToken) {
            window.location = '/search';
        }
    }

    render() {
        const {
            fetching,
            bookingPayments: {
                success,
                error,
            },
            triggerNullifyError,
            triggerNullifySuccess,
            triggerAddToWallet,
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
        return <section className='parent-container'>
            <LoadingOverlay show={fetching}/>
            <section className='container top-container'>
                <h3>Payment Option</h3>
            </section>
            <br/>
            <section className='container'>
                <section className='row'>
                    <section className='col-md-3'></section>
                    <section className='col-md-6 central-container2'>
                        <h2>How would you like to pay?</h2>
                        <span className='payment-option-text'>Choose Payment Option</span>
                        <section className='payment-option'>
                            <PayPalButton
                                amount={this.decode.amount}
                                onSuccess={(details, data) => {
                                    triggerAddToWallet(data.orderID);
                                }}
                                options={{
                                    clientId: 'AQl_iplSeGx_v3yTK1S0Jbi16N3VCmgtKosYqhd4HWA_dTyIU8FsLn99jJojKni0yUAwkRpzRJvJIoW2',
                                    currency: 'USD',
                                }}
                                />
                            {/* <img src={paypal} height={30} /> */}
                        </section>
                    </section>
                    <section className='col-md-3'></section>
                </section>
            </section>
            <br/>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerAddToWallet: orderId => dispatch(genericHitEndpoint({
            endpoint: APPLICATION_ROUTES.ADD_TO_WALLET,
            payload: { web: true, orderId },
            forwardDispatch: true,
            customDispatchers: [() => browserHistory.goBack()],
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, bookingPayments } = state;
    return { fetching, bookingPayments };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentOption);
