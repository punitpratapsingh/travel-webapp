import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; // importing from 'react-router'
import classnames from 'classnames';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import Calendar from 'react-calendar';
import Dialog from '../../components/Dialog';
import LoadingOverlay from '../../components/LoadingOverlay';
import LocationDropdown from '../../components/LocationDropdown';
import NumberSelector from '../../components/Number';
import { navigationIndexer, APPLICATION_ROUTES } from '../../constants';
import {
    switchNavigation,
    taggedToggle,
    fetchEntity,
    genericUpdateValue,
} from '../../redux/actions';
import LocationSelector from '../../components/LocationSelector';
import wheelchair from '../../assets/images/wheelChair.png';
import rightCaret from '../../assets/images/rightCaret.png'
import './index.scss';

class Search extends Component {

    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        // this.state = {
        //     activeTab: 1
        // };

        this.busListing = this.busListing.bind(this);
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Search Bus';
        triggerSwitchNavigation(navigationIndexer.search);
    }

    componentDidMount() {
        const { triggerSwitchNavigation, triggerFetchEntity, triggerGenericUpdateValue } = this.props;
        document.title = 'Search Bus';
        triggerSwitchNavigation(navigationIndexer.search);
        triggerFetchEntity(1, 30);
        triggerGenericUpdateValue({ property: 'activeTab', value: 1 });
    }

    /**
     * handle the redirection to the bus listing page
     * @event click
     */
    busListing(event) {
        const { props:{ search: { from, to, departDate, returnDate, defaultSeat, seatForDisabled, isRoundTrip } } } = this;
        event.preventDefault();
        if (!from || !to || !departDate || !defaultSeat) {
            toast.error('Please select source, destination city and number of seats');
        }
        const payload = {
            from: from.split('_')[2],
            to: to.split('_')[2],
            date: new Date(departDate).getTime(),
            // departDate,
            returnDate: new Date(returnDate).getTime(),
            defaultSeat,
            seatForDisabled,
            isRoundTrip,
        };
        console.log(btoa(JSON.stringify(payload)));
        const code = btoa(JSON.stringify(payload));
        const url =`/busListing?code=${code}`;

        browserHistory.push(url);


	}

    render() {
        const {
            fetching,
            search: {
                fromActive,
                toActive,
                departActive,
                returnActive,
                error,
                success,
                from,
                to,
                data,
                departDate,
                returnDate,
                defaultSeat,
                showDisabledConfirmation,
                showPricingConfirmation,
                seatForDisabled,
                activeTab
            },
            triggerNullifyError,
            triggerNullifySuccess,
            triggerTaggedToggle,
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

        return (
            <section>
                <LoadingOverlay show={fetching}/>
                <ToastContainer />
                <h1 className='page-header' style={{fontSize: '3vmax' }}>Search Bus</h1>
                <section className='container-fluid'>
                    <section className='row'>
                        <section className='col-md-3'></section>
                        <section className='col-md-6 col-xs-12'>
                            <span className='toggle-button-container'>
                                <button
                                    onClick={() => triggerGenericUpdateValue({ property: 'activeTab', value: 1 })}
                                    className={ activeTab === 1 ? 'toggle-button-search toggle-button-search-left active-toggle' : 'toggle-button-search toggle-button-search-left'}>
                                    One Way
                                </button>
                                <button
                                    onClick={() => triggerGenericUpdateValue({ property: 'activeTab', value: 2 })}
                                    className={activeTab === 2 ? 'toggle-button-search toggle-button-search-right active-toggle' : 'toggle-button-search toggle-button-search-right'}>
                                    Round Trip
                                </button>
                            </span>
                            <br/><br/>
                        </section>
                        <section className='col-md-3'></section>
                    </section>
                    <section className='row custom-row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-4 clickable-item' onClick={() => {
                            triggerTaggedToggle('fromActive');
                        }}>
                            From <span style={{ fontSize: '10px' }}>(click here)</span>
                        </section>
                        <section className='col-md-4 clickable-item' onClick={() => {
                            triggerTaggedToggle('toActive');
                        }}>
                            To <span style={{ fontSize: '10px' }}>(click here)</span>
                        </section>
                        <section className='col-md-2'></section>
                    </section>
                    <section className='row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-4 single-row'>
                            { data &&
                                LocationDropdown({
                                    display: fromActive ? 'block' : 'none',
                                    list: data,
                                    onSelect: (event) => {
                                        if (event.target.id) {
                                            triggerGenericUpdateValue({ property: 'from', value: event.target.id });
                                            triggerTaggedToggle('fromActive');
                                        }
                                    },
                                })
                            }
                            <LocationSelector majorCity={from && from.split('_')[0]} minorCity={from && from.split('_')[1]}/>
                        </section>
                        <section className='col-md-4 single-row'>
                            {
                                data &&
                                LocationDropdown({
                                    display: toActive ? 'block' : 'none',
                                    list: data,
                                    onSelect: (event) => {
                                        if (event.target.id) {
                                            triggerGenericUpdateValue({ property: 'to', value: event.target.id });
                                            triggerTaggedToggle('toActive');
                                        }
                                    },
                                })
                            }
                            <LocationSelector majorCity={to && to.split('_')[0]} minorCity={to && to.split('_')[1]} />
                        </section>
                        <section className='col-md-2'></section>
                    </section>
                    <section className='row custom-row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-4 clickable-item' onClick={() => {
                            triggerTaggedToggle('departActive');
                        }} >
                            Depart <FontAwesome name='calendar' />
                        </section>
                        <section className='col-md-4 clickable-item' onClick={() => {
                            triggerTaggedToggle('returnActive');
                        }}>
                            Return <FontAwesome name='calendar' />
                        </section>
                        <section className='col-md-2'></section>
                    </section>
                    <section className='row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-4 single-row'>
                            <section style={{ display: departActive ? 'block' : 'none' }}>
                                <Calendar
                                    value={departDate}
                                    minDate={new Date()}
                                    onChange={(date) => {
                                        triggerGenericUpdateValue({ property: 'departDate', value: date })
                                        triggerTaggedToggle('departActive');
                                    }}
                                />
                            </section>
                            <LocationSelector majorCity={moment(departDate).format('LLLL')} minorCity={moment(departDate).format('LLLL').split(',')[0]} />
                        </section>
                        <section className='col-md-4 single-row'>
                            <section style={{ display: returnActive ? 'block' : 'none' }}>
                                <Calendar
                                   show={false}
                                    value={returnDate}
                                    minDate={departDate}
                                    onChange={(date) => {
                                        triggerGenericUpdateValue({ property: 'returnDate', value: date })
                                        triggerTaggedToggle('returnActive');
                                    }}
                                />
                            </section>
                            <LocationSelector majorCity={returnDate ? moment(returnDate).format('LLLL') : ''} minorCity={ returnDate ? moment(returnDate).format('LLLL').split(',')[0] : 'Book round trip for great savings'}/>
                         </section>
                        <section className='col-md-2'></section>
                    </section>
                    <section className='row custom-row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-4 col-xs-6 single-row'>
                            <b>How many seats you want?</b>
                        </section>
                        <section className='col-md-4 col-xs-6 single-row'>
                            <NumberSelector
                                defaultValue={defaultSeat}
                                onIncrement={item => triggerGenericUpdateValue({ property: 'defaultSeat', value: defaultSeat + 1 })}
                                onDecrement={(item) => {
                                    if (defaultSeat - 1 > 0) {
                                        triggerGenericUpdateValue({ property: 'defaultSeat', value: defaultSeat - 1 })
                                    }
                                }}
                            />
                        </section>
                        <section className='col-md-2'></section>
                    </section>
                    <section className='row custom-row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-4 clickable-item' onClick={() => triggerTaggedToggle('showDisabledConfirmation')}>
                            <img src={wheelchair} height={20}/>&nbsp;<span style={{ color: '#d41625' }}>Special Needs</span><br/>
                            <span className='capped-text' style={{ display: seatForDisabled ? 'block': 'none' }}>1 of them have disability</span>
                        </section>
                        <section className='col-md-4'>
                            <br/>
                            <p className='pull-right'>
                                <img src={rightCaret} height={20}/>
                            </p>
                        </section>
                        <section className='col-md-2'></section>
                    </section>
                    <section className='row custom-row'>
                        <section className='col-md-2'></section>
                        <section className='col-md-8'>
                            <p className='text-center'>
                                <button className='app-btn' onClick={this.busListing}>
                                    Search Bus
                                </button>
                            </p>
                        </section>
                        <section className='col-md-2'></section>
                    </section>
                </section>
                <Dialog
                    show={showDisabledConfirmation}
                    title='Do you need a seat for a disabled traveler on this trip?'
                    onConfirm={() => {
                        // triggerTaggedToggle('seatForDisabled');
                        triggerGenericUpdateValue({ property: 'seatForDisabled', value: true });
                        triggerGenericUpdateValue({ property: 'showDisabledConfirmation', value: false });
                    }}
                    onReject={() => {
                        // triggerTaggedToggle('seatForDisabled');
                        triggerGenericUpdateValue({ property: 'seatForDisabled', value: false });
                        triggerGenericUpdateValue({ property: 'showDisabledConfirmation', value: false });
                    }}
                    showConfirm={true}
                    showReject={true}
                    />
                {/* <Dialog
                    show={showPricingConfirmation}
                    title='Fare of 8 seats will be charge for One diabled traveler.'
                    confirmText='Agree'
                    rejectText='Disagree'
                    onConfirm={() => {
                        triggerTaggedToggle('showPricingConfirmation');
                        triggerTaggedToggle('seatForDisabled');
                    }}
                    onReject={() => { triggerTaggedToggle('showPricingConfirmation'); }}
                    showConfirm={true}
                    showReject={true}
                    /> */}
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerTaggedToggle: tag => dispatch(taggedToggle({ tag })),
        triggerFetchEntity: (page = 1, limit = 30) => dispatch(fetchEntity({
            payload: {  },
            page,
            limit,
            endpoint: APPLICATION_ROUTES.STOPS,
        })),
        triggerGenericUpdateValue: ({ property, value }) => dispatch(genericUpdateValue({ property, value })),
    };
}
const mapStateToProps = state => {
    const { fetching, search } = state;
    return { fetching, search };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);