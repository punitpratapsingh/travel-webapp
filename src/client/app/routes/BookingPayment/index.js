/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import FontAwesome from 'react-fontawesome';
import LoadingOverlay from '../../components/LoadingOverlay';
import Bus from '../../assets/images/bus.png';
import Seats from '../../assets/images/seats.png';
import wheelChair from '../../assets/images/wheelChair.png';


import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericHitEndpoint,
    fetchEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class BookingPayment extends Component {

    constructor(props) {
        super(props);
        const { search } = location;
        const params = new URLSearchParams(search);
        if (params.get('code')) {
            this.decode = JSON.parse(atob(params.get('code')));
            this.decode.special = typeof(this.decode.special) == 'string' ? this.decode.special === 'true' ? true : false : this.decode.special;
            this.decode.isRoundTrip = typeof(this.decode.isRoundTrip) == 'string' ? this.decode.isRoundTrip === 'true' ? true : false : this.decode.isRoundTrip;
            // this.decode.isRoundTrip = this.decode.isRoundTrip == 'true' ? true : false;
        }

        console.log(this.decode);

        this.handleTransaction = this.handleTransaction.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.handleTransactionFinal = this.handleTransactionFinal.bind(this);
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Booking Payment';
        triggerSwitchNavigation(navigationIndexer.bookingPayment);
    }

    componentDidMount() {
        const { triggerSwitchNavigation, triggerFetchDetails } = this.props;
        document.title = 'Booking Payment';
        triggerSwitchNavigation(navigationIndexer.bookingPayment);
        triggerFetchDetails();
    }
    /**
     * the function to handle the react redirection to the the paymentOption page
     * with the payload containing the amount add to wallet.
     * @param {Number} amount 
     */
    paymentOption(amount) {
        const payload = btoa(JSON.stringify({ amount }));
        console.log(payload);
        const url = `/paymentOption?payload=${payload}`;
        browserHistory.push(url);
    }

    componentWillMount() {
        // this page is not available if accessToken is undefined
        if (!window.localStorage.accessToken) {
            window.location = '/search';
        }
    }

    /**
     * a simple callback function to handle the booking transaction
     * via the wallet balance. The Service will fetch the bookingId
     * from the state and will handle the booking process. Will show
     * the error if the bookingId is missing just in case.
     */
    handleTransaction() {
        const {
            props: {
                bookingPayments: {
                    bookingId,
                },
                triggerTransaction,
                triggerBookBus,
            },
        } = this;
        if (!bookingId) {
            // show error and return
            return;
        }
        // handle the payment process
        if (this.decode.isRoundTrip) {
            // handle the second booking
            // prepare the payload for the booking
            console.log(this.decode.seats);
            const payload = {
                from: this.decode.reversePayloadParsed.fromStopId,
                to: this.decode.reversePayloadParsed.toStopId,
                date: Number(this.decode.reverseDate),
                specialNeedSeat: this.decode.special,
                seats: Number(this.decode.seats),
                routeRef: this.decode.reversePayloadParsed.routeId,
                isTwoWay: this.decode.isRoundTrip,
                returnOf: bookingId,
            };
            triggerBookBus(payload, this.handleTransactionFinal);
        }
    }
    /**
     * handle the final transaction for return ticket booking
     */
    handleTransactionFinal () {
        const {
            props: {
                bookingPayments: {
                    bookingId,
                },
                triggerTransaction,
            },
        } = this;
        if (!bookingId) {
            // show error and return
            console.log('Booking id is missing.');
            return;
        }
        let payload;
        // handle the payment process
        if (this.decode.isRoundTrip) {
            // handle the separate payload
            payload = {
                bookingId,
                web: true,
                payViaCredits: true,
            };
        } else {
            payload = {
                bookingId,
                web: true,
                payViaCredits: true,
            };
        }
        triggerTransaction(payload, this.onBookingSuccess);
    }

    /**
     * handle this on the booking success when the payment and booking
     * confirmation is ompleted.
     */
    onBookingSuccess() {
        const { bookingPayments: { data: appCredits } } = this.props;
        const finalCredits = Number(appCredits.appCredits) - this.chargedCost;
        /**
         * update the amount paid with the wallet balance
         */
        localStorage.credits = finalCredits;
        toast.success('Your booking is done.');
        setTimeout(() => {
            browserHistory.push('/search');
        }, 2000);
    }

    /**
     * click handler to update user
     * @param {*} e event object
     */
    render() {
        const {
            fetching,
            bookingPayments: {
                page,
                limit,
                length,
                data: {
                    appCredits = 0,
                } = {},
                error,
                success,
            },
            triggerGenericCreateEntity,
            triggerNullifyError,
            triggerNullifySuccess,
            triggerBookBus,
        } = this.props;

        const walletBalance = Number(appCredits);
        // update the local storage wallet balance
        if (walletBalance) {
            localStorage.credits = walletBalance;
        }
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
        return <section >
            <LoadingOverlay show={fetching}/>
            <ToastContainer />
            <h2 className='page-header'>Complete Payment</h2>
            <section className='container header'>
                <section className='row'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-4 text-center'>{this.decode.from}</section>
                                <section className='col-md-4 text-center'><img src={Bus} width={50} /></section>
                                <section className='col-md-4 text-center'>{this.decode.to}</section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2'>
                        <p className='text-center'><button className='app-btn btn-sm' onClick={() => window.location = '/search'}>Reset Data</button></p>
                    </section>
                </section>
                <section className='row'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8 text-center'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-4'></section>
                                <section className='col-md-4 text-center'><p className='depart'>Depart {moment(new Date(Number(this.decode.departDate))).format('DD, MMM')}</p></section>
                                <section className='col-md-4'></section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2'></section>
                </section>
            </section>

            <section className='container parent-container'>
            <section>
                <section className='row '>
                    <section className='col-md-3'></section>
                    <section className='col-md-6 child-container'>
                        <img src={Seats} width={30} height={30} />&nbsp; Seats {this.decode.seats} { this.decode.special ? '+ 1': '' }
                        <br /><br /><br />
                        <img src={wheelChair} width={20} />&nbsp; Special needs<br />
                        <span className='disabled-text'> {this.decode.special ? 1 : 0 } disabled person</span><br />
                        <span className='disabled-text disabled-pricing'> {this.decode.special ? 1 : 0 } x 8 seats x {this.decode.priceDetails.ticketPrice}</span>
                        <span className='disabled-text disabled-pricing disabled-total-price pull-right'>${this.decode.priceDetails.disabledTicketPrice || 0}</span>
                        <hr /><br />
                        <span className=''> Departure Booking</span><br />
                        <span className='disabled-text disabled-pricing'> {this.decode.seats} {this.decode.special ? ' + 1' : '' } seats x ${this.decode.fare} + ${this.decode.priceDetails.serviceCharges} service charges</span>
                        <span className='disabled-text disabled-pricing disabled-total-price pull-right'>${this.decode.priceDetails.totalCost}</span>
                        <hr /><br />
                        <span className='disabled-text'>Total Fare</span>
                        <span className='disabled-text disabled-pricing disabled-total-price pull-right'>${this.decode.priceDetails.totalCost}</span>
                        <hr /><br />
                        <p className='text-center'>
                            <button className='app-btn'
                                // onClick={() => this.paymentOption()}
                                onClick={
                                    walletBalance < this.decode.priceDetails.totalCost ? () => {
                                        this.chargedCost = this.decode.priceDetails.totalCost;
                                        // handle the payment by adding amount and 
                                        // hence sending the amount
                                        this.paymentOption((this.decode.priceDetails.totalCost - walletBalance).toFixed(2));
                                    } : () => {
                                        this.chargedCost = this.decode.priceDetails.totalCost;
                                        // directly book the bus by wallet.
                                        const payload = {
                                            from: this.decode.forwardPayloadParsed.fromStopId,
                                            to: this.decode.forwardPayloadParsed.toStopId,
                                            date: Number(this.decode.forwardDate),
                                            specialNeedSeat: this.decode.special,
                                            seats: Number(this.decode.seats),
                                            routeRef: this.decode.forwardPayloadParsed.routeId,
                                            isTwoWay: this.decode.isRoundTrip,
                                        }
                                        if (this.decode.isRoundTrip) {
                                            // alert('handling for round trip');
                                            triggerBookBus(payload, this.handleTransaction);
                                        } else {
                                            // alert('Not a round trip');
                                            triggerBookBus(payload, this.handleTransactionFinal);
                                        }
                                    }
                                }>
                                {walletBalance < this.decode.priceDetails.totalCost ? `Add ${Number(this.decode.priceDetails.totalCost - walletBalance).toFixed(2)} to wallet and Pay` : `Pay Now With Wallet Balance ($${walletBalance} Balance)` }
                            </button>
                        </p>
                    </section>
                    <section className='col-md-3'></section>
                </section>
              </section>
                <br /><br />
            </section>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerBookBus: (payload, transactionHandler) => dispatch(genericHitEndpoint({
            endpoint: APPLICATION_ROUTES.BOOK_BUS,
            payload,
            forwardDispatch: true,
            customDispatchers: [transactionHandler]
        })),
        triggerTransaction: (payload, postTransactionHandler) => dispatch(genericHitEndpoint({
            endpoint: APPLICATION_ROUTES.TRANSACTION,
            payload,
            forwardDispatch: true,
            customDispatchers: [postTransactionHandler],
        })),
        triggerFetchDetails: () => dispatch(fetchEntity({ endpoint: APPLICATION_ROUTES.USER_DETAILS })),
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
)(BookingPayment);



