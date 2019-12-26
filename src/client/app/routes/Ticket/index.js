/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import LoadingOverlay from '../../components/LoadingOverlay';
import moment from 'moment';
import ticket from '../../assets/images/ticket.png';
import fromTo from '../../assets/images/fromTo.png';
import circle from '../../assets/images/circle.png';
import calender from '../../assets/images/calender.png';
import seats from '../../assets/images/seats.png';
import details from '../../assets/images/details.png';
import mercedes from '../../assets/images/mercedes.png';
import cross from '../../assets/images/cross.png';

import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    fetchEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Ticket extends Component {

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
        //decode the this.params.payload;
        this.decode = JSON.parse(atob(this.params.payload));
        console.log(this.decode);
    }



    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchTicket } = this.props;
        document.title = 'Bus Listing'
        triggerSwitchNavigation(navigationIndexer.busListing);
        // triggerFetchTicket();
    }

    componentDidUpdate () {
        const { props: { booking: { updatedCredits } } } = this;
        localStorage.credits = Number(updatedCredits).toFixed(2);
    }

    render() {
        const {
            fetching,
            booking: {
                page,
                limit,
                length,
                data,
                error,
                success,
            },
            triggerFetchTicketCancel,
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
        return <section >
            <LoadingOverlay show={fetching} />
            <ToastContainer />
            <section className='container header'>
                <h1 className='page-header'>Your Ticket</h1>
            </section>
            <section>{
                <section className='container parent-container'>
                    <section className='row '>
                        <section className='col-md-3 col-xs-hidden'></section>
                        <section className='col-md-6 col-xs-12 child-container-ticket ticket-container'>
                            <section className='row ticket-header'>
                                <section className='col'><img src={ticket} height={100} /></section>
                                <section className='col'>
                                    <section className='row'>Ticket Number</section>
                                    <section className='row'>{this.decode.ticketNumber}</section>
                                </section>
                            </section>
                            <section className='ticket-details-content'>
                                <span className='holder-name'>{this.decode.name}</span><br />
                                <span className='holder-email'>{this.decode.email}</span><br /><br />
                                <section className='row'>
                                    <p className='depart-layer'>
                                        Depart&nbsp;&nbsp;&nbsp;<img src={calender} height={20} />&nbsp;&nbsp;
                                        {
                                            this.decode.isTwoWay ?
                                                moment(this.decode.departBooking.date).format('DD MMMM YYYY, dddd') :
                                                moment(this.decode.date).format('DD MMMM YYY, dddd')
                                        }
                                    </p>
                                </section>
                                <br/>
                                <section className='row journey-details'>
                                    <section className='col-md-2 col-sm-2'>
                                        <p className='text-center location-text' style={{ left: 0 }}>
                                            {
                                                this.decode.isTwoWay ?
                                                    <span>
                                                        {this.decode.departBooking.fromStopDetails.city}<br/>
                                                        <b className='time-display'>{this.decode.departBooking.fromStopDetails.departureTime.hour}:{this.decode.departBooking.fromStopDetails.departureTime.minute}</b>
                                                    </span> :
                                                    <span>
                                                        {this.decode.fromStopDetails.city}<br />
                                                        <b className='time-display'>{this.decode.fromStopDetails.departureTime.hour}:{this.decode.fromStopDetails.departureTime.minute}</b>
                                                    </span>
                                            }
                                        </p>
                                    </section>
                                    <section className='col-md-8 col-sm-8' style={{ padding: '10px' }}>
                                        <img src={circle} width={'10px'} className='circle-dot-left' />
                                        <img src={fromTo} width={'100%'} className='fromTo' />
                                        <img src={circle} width={'10px'} className='circle-dot-right' />
                                    </section>
                                    <section className='col-md-2 col-sm-2 text-container'>
                                        <p className='text-center location-text' style={{ left: '0' }}>
                                            {
                                                this.decode.isTwoWay ?
                                                    <span>
                                                        {this.decode.departBooking.toStopDetails.city}<br/>
                                                        <b className='time-display'>{this.decode.departBooking.toStopDetails.departureTime.hour}:{this.decode.departBooking.toStopDetails.departureTime.minute}</b>
                                                    </span> :
                                                    <span>
                                                        {this.decode.toStopDetails.city}<br />
                                                        <b className='time-display'>{this.decode.toStopDetails.arrivalTime.hour}:{this.decode.toStopDetails.arrivalTime.minute}</b>
                                                    </span>
                                            }
                                        </p>
                                    </section>
                                </section>
                                <section className='row'>
                                    <section className='col-md-2 text-container'>
                                        <p className='small-text text-center'>
                                            Departure
                                    </p>
                                    </section>
                                    <section className='col-md-8' style={{ padding: '10px' }}>
                                        <span className='text-center journey-timing'>{this.params.diffrence}</span>
                                    </section>
                                    <section className='col-md-2 text-container'>
                                        <p className='small-text text-center'>
                                            Arrival
                                    </p>
                                    </section>
                                </section>
                                {
                                    this.decode.isTwoWay &&
                                        <section>
                                            {/* ---- */}
                                            <section className='row'>
                                                <p className='depart-layer'>
                                                    Return&nbsp;&nbsp;&nbsp;<img src={calender} height={20} />&nbsp;&nbsp;
                                                    {moment(this.decode.returnBooking.date).format('DD MMMM YYYY, dddd')}
                                                </p>
                                            </section>
                                            <section className='row journey-details'>
                                                <section className='col-md-2 '>
                                                    <p className='text-center location-text' style={{ left: 0 }}>
                                                        <span>
                                                            {this.decode.returnBooking.fromStopDetails.city}<br/>
                                                            <b className='time-display'>{this.decode.returnBooking.fromStopDetails.departureTime.hour}:{this.decode.returnBooking.fromStopDetails.departureTime.minute}</b>
                                                        </span>
                                                    </p>
                                                </section>
                                                <section className='col-md-8' style={{ padding: '10px' }}>
                                                    <img src={circle} width={'10px'} className='circle-dot-left' />
                                                    <img src={fromTo} width={'100%'} className='fromTo' />
                                                    <img src={circle} width={'10px'} className='circle-dot-right' />
                                                </section>
                                                <section className='col-md-2 text-container'>
                                                    <p className='text-center location-text' style={{ left: '0' }}>
                                                        {
                                                             this.decode.returnBooking.toStopDetails.city
                                                        }
                                                        <br/>
                                                        <b className='time-display'>{this.decode.returnBooking.toStopDetails.departureTime.hour}:{this.decode.returnBooking.toStopDetails.departureTime.minute}</b>
                                                    </p>
                                                </section>
                                            </section>
                                            <br/><br/>
                                            <section className='row'>
                                                <section className='col-md-2 text-container'>
                                                    <p className='small-text text-center'>
                                                        Departure
                                                </p>
                                                </section>
                                                <section className='col-md-8' style={{ padding: '10px' }}>
                                                    <span className='text-center journey-timing'>{this.params.diffrence}</span>
                                                </section>
                                                <section className='col-md-2 text-container'>
                                                    <p className='small-text text-center'>
                                                        Arrival
                                                </p>
                                                </section>
                                            </section>
                                            {/* ---- */}
                                        </section>
                                }
                                <hr />
                                <section className='row'>
                                    <section className='col-md-6 left-container text-center'>
                                        <img src={seats} height={20} />&nbsp;&nbsp;&nbsp;&nbsp;<b>Seats</b>&nbsp;&nbsp;&nbsp;&nbsp;{this.decode.specialNeedSeat ? `${this.decode.seats} + 1` : this.decode.seats}
                                    </section>
                                    <section className='col-md-6 right-container text-center'>
                                        <b>Fare</b>&nbsp;&nbsp;${this.decode.price.priceDetails.totalCost}&nbsp;&nbsp;&nbsp;<img src={details} height={20} />
                                    </section>
                                </section>
                                <hr />
                                <section className='row'>
                                    <section className='col-md-2'></section>
                                    <section className='col-md-8 text-center' style={{ paddingBottom: '20px' }}>
                                        <img src={mercedes} height={50} />
                                    </section>
                                    <section className='col-md-2'></section>
                                </section>
                            </section>
                        </section>
                        <section className='col-md-3'></section>
                    </section>
                    <br />
                    <br />
                    <section className='row'
                        onClick={() => {
                            const payload = {
                                ticketNumber: this.decode._id || this.decode.ticketNumber,
                            };
                            triggerFetchTicketCancel(payload);
                        }}>
                        <section className='col-md-4'></section>
                        <section className='col-md-4 text-center cancel-booking'>
                            <img src={cross} height={15} />&nbsp;&nbsp;<b >Cancel Booking</b>
                        </section>
                        <section className='col-md-4'></section>
                    </section>
                </section>
            }
            </section>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerFetchTicket: (page, limit, payload) => dispatch(fetchEntity({
            payload: {},
            page,
            limit,
            endpoint: APPLICATION_ROUTES.TICKET,
        })),

        triggerFetchTicketCancel: payload => dispatch(fetchEntity({
            payload,
            endpoint: APPLICATION_ROUTES.TICKET_CANCEL,
            customDispatchers: [() => browserHistory.push('/search')]
        })),
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
)(Ticket);



