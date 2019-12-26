/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import Dialog from '../../components/Dialog';
import details from '../../assets/images/details.png';
import bus from '../../assets/images/bus.png';
import fromTo from '../../assets/images/fromTo.png';
import wheelchair from '../../assets/images/wheelChair.png';
import LoadingOverlay from '../../components/LoadingOverlay';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    fetchEntity,
    genericUpdateValue,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class BookingDetail extends Component {

    constructor(props) {
        super(props);
        const params = location.search.substring(1, location.search.length).split('&');
        // receive data from param
        this.params = {};
        params.map(param => {
            const split = param.split('=');
            const key = split[0];
            const value = split[1];
            this.params[key] = value;
        });

        this.user = undefined;

        this.params.isRoundTrip = this.params.isRoundTrip && this.params.isRoundTrip === 'true' ? true : false;
        this.params.specialNeedSeat = this.params.special && this.params.special === 'true' ? true : false;

        this.params.forwardPayloadParsed = JSON.parse(atob(this.params.forwardPayload));
        // console.log(this.params.forwardPayloadParsed);
        this.params.reversePayloadParsed = this.params.reversePayload && JSON.parse(atob(this.params.reversePayload));
        this.params.payloadParsed = this.params.payload && JSON.parse(atob(this.params.payload));
        console.log(this.params.payloadParsed);

        // console.log(this.params.forwardPayloadParsed);
        // console.log(this.params.reversePayloadParsed);

        if (this.params.isRoundTrip) {
            this.params.departRouteId = this.params.forwardPayloadParsed._id;
            this.params.returnRouteId = this.params.reversePayloadParsed._id;
        }

        this.bookingPayment = this.bookingPayment.bind(this);

    }
    componentWillMount() {
        if (window.localStorage.accessToken) {
            this.user = window.localStorage.accessToken;
        }
        const { triggerSwitchNavigation, triigerFetchPrice } = this.props;
        document.title = 'Booking Detail'
        triggerSwitchNavigation(navigationIndexer.bookingDetail);
        const requestParams = Object.assign({}, this.params);
        if (requestParams.isRoundTrip) {

        }
        triigerFetchPrice(this.params);
    }
    componentDidUpdate() {
        document.title = 'Booking Detail';
    }

    componentDidMount() {
        document.title = 'Booking Detail';
    }
    bookingPayment(url) {
        browserHistory.push(url);
    }


    render() {
        const {
            fetching,
            price: {
                page,
                limit,
                length,
                data,
                error,
                success,
                showPolicy,
            },
            triggerGenericUpdateValue,
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
        return <section>
            <LoadingOverlay show={fetching} />
            <ToastContainer />
            <h2 className='page-header'>Booking Details</h2>
            <section className='container'>
                <section className='row'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-4'>
                                    <p className='text-center loc-text'>
                                        {this.params.from}
                                    </p>
                                </section>
                                <section className='col-md-4 text-center'>
                                    <img src={bus} height={20} />
                                </section>
                                <section className='col-md-4'>
                                    <p className='text-center loc-text'>
                                        {this.params.to}
                                    </p>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2 text-center'>
                        <button className='app-btn btn-sm' onClick={() => window.location = '/search'}>Reset Data</button><br/>
                        <button className='btn btn-default'
                            onClick={() => {
                                triggerGenericUpdateValue({ property: 'showPolicy', value: true });
                            }}>
                            <img src={details} width={30} />
                        </button>
                    </section>
                </section>
                <section className='row'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-4'></section>
                                <section className='col-md-4'>
                                    <p className='depart'>Depart {moment(Number(this.params.departDate)).format('DD, MMM')}</p>
                                </section>
                                <section className='col-md-4'></section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2'>
                    </section>
                </section>
                <section className='row central-container'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-3'>
                                </section>
                                <section className='col-md-6 text-center'>
                                    <p className='journey-time'>{this.params.timeDifference}</p>
                                </section>
                                <section className='col-md-3'>
                                </section>
                            </section>
                            <section className='row'>
                                <section className='col-md-3'>
                                    <p className='text-center loc-text'>
                                        {this.params.from}<br />
                                        {this.params.fromTimeHour}:{this.params.fromTimeMinute}
                                    </p>
                                </section>
                                <section className='col-md-6 text-center'>
                                    <img src={fromTo} width={'100%'} /><br /><br />
                                    <p className='text-center price'>
                                        ${this.params.fare}
                                    </p>
                                </section>
                                <section className='col-md-3'>
                                    <p className='text-center loc-text'>
                                        {this.params.to}<br />
                                        {this.params.toTimeHour}:{this.params.toTimeMinute}
                                    </p>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2'></section>
                </section>
                {/* // return */}
                {/* <section className='row central-container'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-3'>
                                </section>
                                <section className='col-md-6 text-center'>
                                    <p className='journey-time'>{this.params.timeDifference}</p>
                                </section>
                                <section className='col-md-3'>
                                </section>
                            </section>
                            <section className='row'>
                                <section className='col-md-3'>
                                    <p className='text-right loc-text'>
                                        {this.params.to}<br />
                                        {this.params.fromTimeHour}:{this.params.fromTimeMinute}
                                    </p>
                                </section>
                                <section className='col-md-6 text-center'>
                                    <img src={fromTo} width={'100%'} /><br /><br />
                                    <p className='text-center price'>
                                        ${this.params.fare}
                                    </p>
                                </section>
                                <section className='col-md-3'>
                                    <p className='text-left loc-text'>
                                        {this.params.from}<br />
                                        {this.params.fromTimeHour}:{this.params.fromTimeMinute}
                                    </p>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2'></section>
                </section> */}
                {/* return */}
                <br /><br />
                <section>
                    {data &&
                        <section className='row'>
                            <section className='col-md-3'></section>
                            <section className='col-md-6'>
                                <img src={wheelchair} height={20} />&nbsp;Special Needs<br />
                                1 disabled passenger
                            <p className='breakdown breakdown1'>
                                    8 seats x {this.params.special && this.params.special === 'false' ? 0 : 1} x ${data.priceDetails.ticketPrice}
                                    <span className='pull-right'>${this.params.special && this.params.special === 'false' ? 0 : data.priceDetails.disabledTicketPrice}</span>
                                </p>
                                <p className='breakdown breakdown2'>
                                    {this.params.seats || '-'} {this.params.special && this.params.special === 'false' ? '' : ' + 1'} passengers x ${data.priceDetails.ticketPrice} + ${data.priceDetails.serviceCharges} charge
                                <span className='pull-right'>${data.priceDetails.totalCost}</span>
                                </p>
                                <br /><br /><br /><br /><br /><br /><br /><br />
                            </section>
                            <section className='col-md-3'></section>
                        </section>
                    }
                </section>
            </section>
            <section>
                {
                    data &&
                    <section className='container bottom-fixed'>
                        <section className='row'>
                            <section className='col-md-4 col-xs-12 text-center'>
                                <p className='section'>
                                    Selected Seat<br />
                                    {this.params.seats || '-'}
                                </p>
                            </section>
                            <section className='col-md-4 col-xs-12 text-center'>
                                <p className='section'>
                                    Booking For<br />
                                    ${data.priceDetails.totalCost}
                                </p>
                            </section>
                            <section className='col-md-4 col-xs-12 text-center'>
                                <p className='section'>
                                    {this.user ? <button className='app-btn' onClick={() => {
                                        // console.log(this.params);
                                        this.params.priceDetails = data.priceDetails;
                                        this.params.forwardDate = this.params.payloadParsed.forwardDate;
                                        this.params.reverseDate = this.params.payloadParsed.returnDate;
                                        this.params.payloadParsed = undefined;
                                        this.params.forwardPayload = undefined;
                                        // this.params.reversePayloadParsed = undefined;
                                        this.params.payload = undefined;
                                        const code = btoa(JSON.stringify(this.params));
                                        // console.log(this.params.forwardDate);
                                        // console.log(this.params.reverseDate);
                                        this.bookingPayment(`/bookingPayment?code=${code}`);
                                    }}>PROCEED</button> : <button onClick={() => browserHistory.push('/')} className='btn btn-success'>Login to book</button>}
                                </p>
                            </section>
                        </section>
                    </section>
                }
            </section>
            <Dialog
                show={showPolicy}
                title='Cancellation Policy'
                confirmText='Close'
                showConfirm={true}
                showReject={false}
                onConfirm={() => {
                    // close the open dialog
                    triggerGenericUpdateValue({ property: 'showPolicy', value: false });
                }}
                onReject={() => { triggerTaggedToggle('sendVerification'); }}>
                Once completed, Ctrans reservations cannot be canceled or refunded, but they can be traded in for another journey up
                to 3 hours before your original scheduled departure. Ctrans is not responsible for delays or cancellations caused by traffic,
                road conditions, weather or other causes over which it has no control. Alternatively where Ctrans fails to provide on time-reliable
                service for reasons wholly within our control refunds, or alternative travel arrangements, may be offered.
                    <br />
            </Dialog>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triigerFetchPrice: (payload) => dispatch(fetchEntity(({
            payload,
            page: 1,
            limit: 30,
            endpoint: APPLICATION_ROUTES.TICKET_PRICE,
        }))),
        triggerGenericUpdateValue: ({ property, value }) => dispatch(genericUpdateValue({ property, value })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, price } = state;
    return { fetching, price };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingDetail);



