import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import { browserHistory } from 'react-router'; // importing from 'react-router'
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import LoadingOverlay from '../../components/LoadingOverlay';
import Dialog from '../../components/Dialog';
import { toast, ToastContainer } from 'react-toastify';
import fromTo from '../../assets/images/fromTo.png';
import circle from '../../assets/images/circle.png';
import calender from '../../assets/images/calender.png';
import seats from '../../assets/images/seats.png';
import clock from '../../assets/images/clock.png';
import details from '../../assets/images/details.png';

import {
    switchNavigation,
    fetchEntity,
    genericUpdateValue,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class BookingHistory extends Component {


    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = ' history';
        triggerSwitchNavigation(navigationIndexer.history);
    }

    componentDidMount() {
        const { triggerSwitchNavigation, triggerFetchBookingHistory, booking: { activeTab } } = this.props;
        document.title = 'History';
        triggerSwitchNavigation(navigationIndexer.history);
        triggerFetchBookingHistory(activeTab);
    }

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 1
        };
        this.ticket = this.ticket.bind(this);
    }

    componentWillMount() {
         // this page is not available if accessToken is undefined
         if (!window.localStorage.accessToken) {
            window.location = '/search';
        }
        const { triggerSwitchNavigation, triggerFetchBookingHistory } = this.props;
        document.title = 'Booking History'
        triggerSwitchNavigation(navigationIndexer.history);
        triggerFetchBookingHistory(this.state.activeTab);

    }
    /**
     * toggle the navigation tab
     */
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    ticket(url) {
        browserHistory.push(url);
    }

    render() {
        const {
            fetching,
            booking: {
                page,
                limit,
                length,
                activeTab,
                data,
                error,
                success,
                showPolicy,
            },
            triggerGenericUpdateValue,
            triggerNullifyError,
            triggerNullifySuccess,
            triggerFetchBookingHistory,
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
        return (
            <section>
                <LoadingOverlay show={fetching}/>
                <ToastContainer />
                <h4 className='page-header'>Booking History</h4>
                <section className='container'>
                    <section className='row'>
                        <section className='col-md-2 col-xs-1'></section>
                        <section className='col-md-8 col-xs-10'>
                            <span className='toggle-button-container-history'>
                                <button
                                    className={classnames({ active: this.state.activeTab === 1 })}
                                    onClick={() => {
                                        triggerGenericUpdateValue({ property: 'activeTab', value: 1 });
                                        triggerFetchBookingHistory(1);
                                    }}
                                    className={activeTab === 1 ? 'toggle-button-history toggle-button-history-left active-toggle active-left' : 'toggle-button-history toggle-button-history-left'}>
                                    Past Trips
                                </button>
                                <button
                                    className={classnames({ active: this.state.activeTab === 2 })}
                                    onClick={() => {
                                        triggerGenericUpdateValue({ property: 'activeTab', value: 2 });
                                        triggerFetchBookingHistory(2);
                                    }}
                                    className={activeTab === 2 ? 'toggle-button-history toggle-button-history-center active-toggle' : 'toggle-button-history toggle-button-history-center'}>
                                    Upcoming Trips
                                </button>
                                <button
                                    className={classnames({ active: this.state.activeTab === 3 })}
                                    onClick={() => {
                                        triggerGenericUpdateValue({ property: 'activeTab', value: 3 });
                                        triggerFetchBookingHistory(3);
                                    }}
                                    className={activeTab === 3 ? 'toggle-button-history toggle-button-history-right active-toggle active-right' : 'toggle-button-history toggle-button-history-right'}>
                                    Cancelled Trips
                                </button>
                            </span>
                            <br /><br />
                        </section>
                        <section className='col-md-2 col-xs-12 col-sm-12'>
                            <p className='text-center'>
                                <button className='btn btn-default'
                                    onClick={() => {
                                        triggerGenericUpdateValue({ property: 'showPolicy', value: true });
                                    }}>
                                    <img src={details} width={30}/>
                                </button>
                            </p>
                        </section>
                    </section>
                </section>

                <section>
                    {
                        data ?
                            data.map((booking, index) => {
                                return booking && booking && <p key={`${index + 1}`}>
                                    <section className='container-fluid bgo'>
                                        <section className='row' onClick={activeTab === 2 ? () => {
                                                const payload = btoa(JSON.stringify(booking));
                                                this.ticket(`/ticket?payload=${payload}`)
                                            } : () => {}}>
                                            <section className='col-md-2'></section>
                                            <section className='col-md-8 ind-booking'>
                                                <section className='container-fluid'>
                                                    <section className='row'>
                                                        <section className='col-md-2 col-xs-4 col-sm-4 text-container'>
                                                            <p className='text-center location-text' style={{ left: 0 }}>
                                                                {booking.fromStopDetails && booking.fromStopDetails.city}
                                                                {booking.isTwoWay && booking.departBooking.fromStopDetails.city}
                                                            </p>
                                                        </section>
                                                        <section className='col-md-8 col-xs-4 col-sm-4' style={{ padding: '10px' }}>
                                                            <img src={circle} width={'10px'} className='circle-dot-left' />
                                                            <img src={fromTo} width={'100%'} className='fromTo' />
                                                            <img src={circle} width={'10px'} className='circle-dot-right' />
                                                        </section>
                                                        <section className='col-md-2 col-xs-4 col-sm-4 text-container'>
                                                            <p className='text-center location-text' style={{ left: '0' }}>
                                                                {booking.toStopDetails && booking.toStopDetails.city}
                                                                {booking.isTwoWay && booking.returnBooking.fromStopDetails.city}
                                                            </p>
                                                        </section>
                                                    </section>
                                                    <hr />
                                                    <section className='row ticket-details'>
                                                        <section className='col-md-6'>
                                                            {
                                                                booking.isTwoWay ?
                                                                    <span>
                                                                        <img src={calender} height={20} /> <b>Depart</b>&nbsp;<span className='time-display'>{moment(booking.departBooking.date).format('LL')}</span><br /><br/>
                                                                        <img src={calender} height={20} /> <b>Return</b>&nbsp;<span className='time-display'>{moment(booking.returnBooking.date).format('LL')}</span><br />
                                                                    </span>:
                                                                    <span>
                                                                        <img src={calender} height={20} /> <b>Depart</b>&nbsp;<span className='time-display'>{moment(booking.date).format('LL')}</span><br />            
                                                                    </span>
                                                            }
                                                            <p className='ticket-number'>Ticket Number: {booking.ticketNumber}</p>
                                                        </section>
                                                        <section className='col-md-6 text-right'>
                                                            {
                                                                booking.isTwoWay ?
                                                                    <span>
                                                                        <img src={clock} height={20} />&nbsp;&nbsp;
                                                                        <span className='time-display'>
                                                                            {booking.departBooking && booking.departBooking.toStopDetails.departureTime.hour}:{booking.departBooking && booking.departBooking.toStopDetails.departureTime.minute}
                                                                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <img src={seats} height={20} />&nbsp;&nbsp;
                                                                        <span className='time-display'>{booking.specialNeedSeat ? `${booking.seats} + 1` : booking.seats}</span><br /><br />
                                                                        <img src={clock} height={20} />&nbsp;&nbsp;
                                                                        <span className='time-display'>
                                                                            {booking.returnBooking && booking.returnBooking.toStopDetails.departureTime.hour}:{booking.returnBooking && booking.returnBooking.toStopDetails.departureTime.minute}
                                                                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <img src={seats} height={20} />&nbsp;&nbsp;
                                                                        <span className='time-display'>{booking.specialNeedSeat ? `${booking.seats} + 1` : booking.seats}</span><br />
                                                                    </span> :
                                                                    <span>
                                                                        <img src={clock} height={20} />&nbsp;&nbsp;
                                                                        <span className='time-display'>
                                                                            {booking.toStopDetails && booking.toStopDetails.departureTime.hour}:{booking.toStopDetails && booking.toStopDetails.departureTime.minute}
                                                                            {booking.isTwoWay && booking.returnBooking && booking.returnBooking.toStopDetails.departureTime.hour}:{booking.returnBooking && booking.returnBooking.toStopDetails.departureTime.minute}
                                                                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <img src={seats} height={20} />&nbsp;&nbsp;
                                                                        <span className='time-display'>{booking.specialNeedSeat ? `${booking.seats} + 1` : booking.seats}</span><br />
                                                                    </span>
                                                            }
                                                            <br/>
                                                            <span className='price'>{booking.price.priceDetails.totalCost}$</span>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                            <section className='col-md-2'></section>
                                        </section>
                                    </section>
                                </p>
                            }
                            ) :
                            <section>No data</section>
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
                        triggerGenericUpdateValue({ property: 'showPolicy', value: false});
                    }}
                    onReject={() => { triggerTaggedToggle('sendVerification'); }}>
                    Once completed, Ctrans reservations cannot be canceled or refunded, but they can be traded in for another journey up
                    to 3 hours before your original scheduled departure. Ctrans is not responsible for delays or cancellations caused by traffic,
                    road conditions, weather or other causes over which it has no control. Alternatively where Ctrans fails to provide on time-reliable
                    service for reasons wholly within our control refunds, or alternative travel arrangements, may be offered.
                    <br/>
                </Dialog>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerFetchBookingHistory: (activeTab) => dispatch(fetchEntity({
            payload: { listType: activeTab },
            endpoint: APPLICATION_ROUTES.BOOKING_HISTORY,
        })),
        triggerGenericUpdateValue: ({ property, value }) => dispatch(genericUpdateValue({ property, value })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}
const mapStateToProps = state => {
    const { fetching, booking } = state;
    return { fetching, booking };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingHistory);
