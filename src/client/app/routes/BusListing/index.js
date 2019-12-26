/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import moment from 'moment';
import LoadingOverlay from '../../components/LoadingOverlay';
import {
    switchNavigation,
    genericUpdateValue,
    fetchEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import fromTo from '../../assets/images/fromTo.png';
import circle from '../../assets/images/circle.png';
import mercidezIcon from '../../assets/images/ic_benzicon.png';
import './index.scss';

class BusListing extends Component {

    constructor(props) {
        super(props);
        this.bookingDetail = this.bookingDetail.bind(this);
        const { search } = location;
        const params = new URLSearchParams(search);
        if (params.get('code')) {
            this.decode = JSON.parse(atob(params.get('code')));
        }

        // console.log('fetching the code', this.decode);
        this.state = {
            activeTab: 1
        };
        this.decode.forwardDate = this.decode.date;
        this.decode.reverseDate = this.decode.returnDate;
        // console.log(this.decode.date);
        // console.log(new Date(this.decode.date).getDate());

        this.updateDate = this.updateDate.bind(this);
        // window.onresize = () => {
        //     console.log('reized');
        //     const dynamicContainer = document.getElementsByClassName('dynamicContainer')[0];
        //     const topNavigationContainer = document.getElementsByClassName('top-navigation')[0];

        //     const dynamicContainerWidth = dynamicContainer.clientWidth;
        //     const topNavigationContainerWidth = topNavigationContainer.clientWidth;

        //     console.log(dynamicContainerWidth, topNavigationContainerWidth);
        //     topNavigationContainer.style.marginLeft = `${(dynamicContainerWidth - topNavigationContainerWidth)/2}px`;
        //     console.log(`${(dynamicContainerWidth - topNavigationContainerWidth)/2}px`);
        // }
    }

    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchBus } = this.props;
        document.title = 'Bus Listing'
        triggerSwitchNavigation(navigationIndexer.busListing);
        //  triggerFetchBus({ decode: { to: this.params.to , from : this.params.from , date: this.params.date}});
        if (this.decode.isRoundTrip) {
            // fetch the returnRouteId and departRouteId
            // the departRouteId is calculated by the forward API whereas the
            // returnRouteId is calculated by the reverseId
            // for round trip the departRouteId and returnRouteId is calculated
            // for the simple APIs only the routeId is required to handle the booking
            // process.
        }
        triggerFetchBus(1, 30, this.decode);
        // triggerFetchBus();
    }
    componentDidUpdate() {
        document.title = 'Bus Listing';
    }

    componentDidMount() {
        document.title = 'Bus Listing';
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
        console.log(tab)
    }
    /**
     * navigate to the booking details page to show the booking details.
     * @param {*} url 
     */
    bookingDetail(url) {
        browserHistory.push(url);
    }

    /**
     * this will trigger the update date in the decode object as well as
     * triggers the API to update the entries as per the change in the date
     * of booking request. Also handle the updation of the active tab  in date
     * navigation
     * @param {*} date the date to update to
     * @param {Number} activateDay to active the day by putting the start class for the active day
     */
    updateDate(date, activatedDay) {
        const { props: { triggerFetchBus, triggerGenericUpdateValue, journey: { activeTab } } } = this;
        this.decode.selectedDay = new Date(date).getTime();

        if (activeTab === 1) {
            this.decode.forwardDate = this.decode.selectedDay;
            triggerFetchBus(1, 30, {
                to: this.decode.to,
                from: this.decode.from,
                date: this.decode.selectedDay,
            });
        } else if (activeTab === 2) {
            this.decode.reverseDate = this.decode.selectedDay;
            triggerFetchBus(1, 30, {
                to: this.decode.from,
                from: this.decode.to,
                date: this.decode.selectedDay,
            });
        }
        console.log(this.decode);
        triggerGenericUpdateValue('activatedDay', activatedDay);
    }

    render() {
        const {
            fetching,
            journey: {
                page,
                limit,
                length,
                data,
                error,
                success,
                activatedDay,
                activeTab,
            },
            triggerFetchBus,
            triggerNullifyError,
            triggerNullifySuccess,
            triggerGenericUpdateValue,
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
            <section className='container'>
                <section className='row'>
                    <section className='col-md-3 col-xs-1'></section>
                    <section className='col-md-6 col-xs-10'>
                        <h2 className='page-header'>Bus Listing</h2>
                        <span className='toggle-button-container-listing'>
                            <button
                                className={classnames({ active: activeTab === 1 })}
                                onClick={() => {
                                    // fetch the listing as well
                                    if (activeTab === 2) {
                                        // update the request properties
                                        triggerFetchBus(1, 30, {
                                            from: this.decode.from,
                                            to: this.decode.to,
                                            date: new Date().getTime(),
                                        });
                                    }
                                    triggerGenericUpdateValue('activeTab', 1)
                                }}
                                className={activeTab === 1 ? 'toggle-button-listing toggle-button-listing-left active-toggle' : 'toggle-button-listing toggle-button-listing-left'}>
                                Departure
                                </button>
                            <button
                                className={classnames({ active: activeTab === 2 })}
                                onClick={this.decode.isRoundTrip ? () => {
                                    // @TODO check if isRoundTrip
                                    // handle the checking whether the departRouteId has been set in
                                    // tranisentDepartRouteId
                                    if (this.decode.isRoundTrip) {
                                        if (!this.decode.transientDepartRouteId) {
                                            toast.error('Please select a depart route first.');
                                            return;
                                        }
                                        // handle the toggling and on selection only update the
                                        // transientRouturnRouteId
                                        //fetch the the return bus list if toggling from 1st to 2nd tab
                                        if (activeTab === 1) {
                                            triggerFetchBus(1, 30, {
                                                from: this.decode.to,
                                                to: this.decode.from,
                                                date: new Date(),
                                            });
                                        }
                                        triggerGenericUpdateValue('activeTab', 2);
                                    } else {
                                        toast.error('This is not a round trip');
                                    }
                                } : () => toast.dismiss() && toast.warn('This is not a round trip.')}
                                className={activeTab === 2 ? 'toggle-button-listing toggle-button-listing-right active-toggle' : 'toggle-button-listing toggle-button-listing-right'}>
                                Return
                                </button>
                        </span>
                    </section>
                    <section className='col-md-3 col-xs-1'>
                        <p className='text-center'><button className='app-btn btn-sm' onClick={() => window.location = '/search'}>Reset Data</button></p>
                    </section>
                </section>
            </section>

            <section className='container '>
                <section className='row'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='custom-table top-navigation'>
                            <tr>
                                <td className='start-column' style={{ background: 'silver' }}> <div className='vertical'>{moment().month(new Date(this.decode.date).getMonth()).format('MMM')}</div></td>
                                <td className='column' className={activatedDay === 0 ? 'start' : ''}>
                                    <span className='date' onClick={() => {
                                        // this.updateDate(new Date(`${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate()}`), 0)
                                        this.updateDate(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).valueOf(), 0);
                                    }}>
                                        {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).date()} {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).weekday(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).weekday()).format('ddd')}
                                    </span>
                                </td>
                                <td className='column' className={activatedDay === 1 ? 'start' : ''}>
                                    <span className='date' onClick={() => {
                                        // this.updateDate(new Date(`${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 1}`), 1)}
                                        this.updateDate(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(1, 'days').valueOf(), 1);
                                    }}>
                                        {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(1, 'days').date()} {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(1, 'days').weekday(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(1, 'days').weekday()).format('ddd')}
                                        {/* {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(1, 'days').date()} */}
                                        {/* {new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 1} */}
                                        {/* {moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(1, 'days').weekday(moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(1, 'days').weekday()).format('ddd')} */}
                                    </span>
                                </td>
                                <td className='column' className={activatedDay === 2 ? 'start' : ''}>
                                    <span className='date' onClick={() => {
                                        // this.updateDate(new Date(`${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 1}`), 1)}
                                        this.updateDate(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(2, 'days').valueOf(), 2);
                                    }}>
                                        {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(2, 'days').date()} {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(2, 'days').weekday(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(2, 'days').weekday()).format('ddd')}
                                        {/* {new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 2} {moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(2, 'days').weekday(moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(2, 'days').weekday()).format('ddd')} */}
                                    </span>
                                </td>
                                <td className='column' className={activatedDay === 3 ? 'start' : ''}>
                                    <span className='date' onClick={() => {
                                        // this.updateDate(new Date(`${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 1}`), 1)}
                                        this.updateDate(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(3, 'days').valueOf(), 3);
                                    }}>
                                        {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(3, 'days').date()} {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(3, 'days').weekday(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(3, 'days').weekday()).format('ddd')}
                                        {/* {new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 3} {moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(3, 'days').weekday(moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(3, 'days').weekday()).format('ddd')} */}
                                    </span>
                                </td>
                                <td className='column end-column' className={activatedDay === 4 ? 'start' : ''}>
                                    <span className='date' onClick={() => {
                                        // this.updateDate(new Date(`${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 1}`), 1)}
                                        this.updateDate(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(4, 'days').valueOf(), 4);
                                    }}>
                                        {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(4, 'days').date()} {moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(4, 'days').weekday(moment(activeTab === 2 ? this.decode.returnDate : this.decode.date).add(4, 'days').weekday()).format('ddd')}
                                        {/* {new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date).getDate() + 4} {moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(4, 'days').weekday(moment(new Date(activeTab === 2 ? this.decode.returnDate : this.decode.date)).add(4, 'days').weekday()).format('ddd')} */}
                                    </span>
                                </td>
                            </tr>
                        </section>
                    </section>
                    <section className='col-md-2'></section>
                </section>
                <br />
                <br/>
                <br/>
                <section>
                    {
                        data ?
                            data.map((bus, index) => {
                                return bus && bus && <p key={`${index + 1}`}>
                                    <section className='row booking-item' onClick={() => {
                                        /**
                                         * @todo check if isRoundTrip is enabled and avoid moving to next page intil both the
                                         * departRouteId and returnRouteId has been defined. 
                                         */
                                        if (this.decode.isRoundTrip) {
                                            // set the departRouteId as routeId 
                                            // this.decode.departRouteId = bus.routeId;
                                            if (activeTab === 1) {
                                                this.decode.transientDepartRouteId = bus.routeId;
                                                this.decode.forwardBookingData = bus;
                                                // fetch the another list of items in reverse order
                                                triggerFetchBus(1, 30, {
                                                    from: this.decode.to,
                                                    to: this.decode.from,
                                                    date: new Date().getTime(),
                                                });

                                                console.log(this.decode);

                                                // enable the routurn tab
                                                triggerGenericUpdateValue('activeTab', 2);
                                            } else if (activeTab === 2) {
                                                // set the transientReturnRouteId and then redirect to
                                                // the bookingDetails page from here
                                                this.decode.transientReturnRouteId = bus.routeId;
                                                this.decode.reverseBookingData = bus;
                                                // redirect to the booking details page from here
                                                const payload = btoa(JSON.stringify(this.decode));
                                                // console.log(payload);
                                                const forwardPayload = btoa(JSON.stringify(this.decode.forwardBookingData));
                                                const reversePayload = btoa(JSON.stringify(this.decode.reverseBookingData));

                                                if (this.decode.transientDepartRouteId && this.decode.transientReturnRouteId) {
                                                    const redirectURL = `/bookingDetail?fare=${bus.fare}&from=${bus.fromStopCity}&to=${bus.toStopCity}&departRouteId=${bus.fromStopId}&returnRouteId=${bus.toStopId}&fromTimeHour=${bus.fromStopArrivalTime.hour}&fromTimeMinute=${bus.fromStopArrivalTime.minute}&toTimeHour=${bus.toStopArrivalTime.hour}&toTimeMinute=${bus.toStopArrivalTime.minute}&routeId=${bus.routeId}&seats=${this.decode.defaultSeat}&special=${this.decode.seatForDisabled}&timeDifference=${bus.timeDifference}&departDate=${this.decode.selectedDay || this.decode.date}&isRoundTrip=${this.decode.isRoundTrip}&payload=${payload}&forwardPayload=${forwardPayload}&reversePayload=${reversePayload}`;
                                                    this.bookingDetail(redirectURL);
                                                } else {
                                                    toast.error('Missing source and destination selection for Round trip')
                                                }
                                            } else {
                                                toast.warn('Something wrong with the request. Try Reloading');
                                            }
                                        } else {
                                            this.decode.forwardBookingData = bus;
                                            const forwardPayload = btoa(JSON.stringify(this.decode.forwardBookingData));

                                            const payload = btoa(JSON.stringify(this.decode));
                                            const redirectURL = `/bookingDetail?fare=${bus.fare}&from=${bus.fromStopCity}&to=${bus.toStopCity}&departRouteId=${bus.fromStopId}&returnRouteId=${bus.toStopId}&fromTimeHour=${bus.fromStopArrivalTime.hour}&fromTimeMinute=${bus.fromStopArrivalTime.minute}&toTimeHour=${bus.toStopArrivalTime.hour}&toTimeMinute=${bus.toStopArrivalTime.minute}&routeId=${bus.routeId}&seats=${this.decode.defaultSeat}&special=${this.decode.seatForDisabled}&timeDifference=${bus.timeDifference}&departDate=${this.decode.selectedDay || this.decode.date}&isRoundTrip=${this.decode.isRoundTrip}&payload=${payload}&forwardPayload=${forwardPayload}`;
                                            // this.bookingDetail(`/bookingDetail?fare=${bus.fare}&from=${bus.fromStopCity}&to=${bus.toStopCity}&departRouteId=${bus.fromStopId}&returnRouteId=${bus.toStopId}&fromTimeHour=${bus.fromStopArrivalTime.hour}&fromTimeMinute=${bus.fromStopArrivalTime.minute}&toTimeHour=${bus.toStopArrivalTime.hour}&toTimeMinute=${bus.toStopArrivalTime.minute}&routeId=${bus.routeId}&seats=${this.decode.defaultSeat}&special=${this.decode.seatForDisabled}&timeDifference=${bus.timeDifference}&departDate=${this.decode.selectedDay || this.decode.date}&isRoundTrip=${this.decode.isRoundTrip}&payload=${payload}`)}
                                            this.bookingDetail(redirectURL)
                                        }
                                    }
                                    } >
                                        <section className='col-md-2 col-xs-hidden col-sm-hidden'></section>
                                        <section className='col-md-8 col-xs-12 col-sm-12 ind-booking'>
                                            <section className='container-fluid'>
                                                <section className='row bus-description'>
                                                    <section className='col-md-12'>
                                                        <img src={mercidezIcon} height={30} />
                                                        <section className='pull-right right-content'>
                                                            <p className='text-right price'>{bus.fare}$</p>
                                                            <p className='text-right seats'>Available Seats {bus.availableSeats}</p>
                                                        </section>
                                                        <br />
                                                        <span className='grayed-out-text'>{bus.vehicleName}</span>
                                                    </section>
                                                    {/* <section className='col-md-6 col-xs-6 col-sm-6'>
                                                    </section> */}
                                                </section>
                                                <section className='row'>
                                                    <section className='col-md-2 text-container'>
                                                        <p className='text-center location-text' style={{ left: 0 }}>
                                                            {bus.fromStopCity}<br />
                                                            <b className='time-display'>{bus.fromStopArrivalTime.hour}:{bus.fromStopArrivalTime.minute}</b>
                                                        </p>
                                                    </section>
                                                    <section className='col-md-8' style={{ padding: '10px' }}>
                                                        <img src={circle} width={'10px'} className='circle-dot-left' />
                                                        <img src={fromTo} width={'100%'} className='fromTo' />
                                                        <img src={circle} width={'10px'} className='circle-dot-right' />
                                                    </section>
                                                    <section className='col-md-2 text-container'>
                                                        <p className='text-center location-text' style={{ left: '0' }}>
                                                            {bus.toStopCity}<br />
                                                            <b className='time-display'>{bus.toStopArrivalTime.hour}:{bus.toStopArrivalTime.minute}</b>
                                                        </p>
                                                    </section>
                                                </section>
                                            </section>
                                        </section>
                                        <section className='col-md-2 col-sm-hidden col-xs-hidden'></section>
                                    </section>
                                </p>
                            }
                            ) :
                            <section>No data</section>
                    }
                </section>
            </section>

        </section>


    }
}

const mapDispatchToProps = dispatch => {
    return {

        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerTaggedToggle: tag => dispatch(taggedToggle({ tag })),

        triggerFetchBus: (page, limit, payload) => dispatch(fetchEntity(({
            payload,
            page,
            limit,
            endpoint: APPLICATION_ROUTES.JOURNEY_DETAILS,
        }))),
        triggerReverseFetch: (page, limit, payload) => dispatch(fetchEntity({
            payload,
            page,
            limit,
            endpoint: APPLICATION_ROUTES.JOURNEY_DETAILS,
        })),
        triggerGenericUpdateValue: (property, value) => dispatch(genericUpdateValue({
            property,
            value,
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, journey } = state;
    return { fetching, journey };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusListing);



