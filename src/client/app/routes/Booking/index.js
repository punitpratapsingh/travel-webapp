/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Container, Row, Col, Card, Input, Img } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import FontAwesome from 'react-fontawesome';
import LoadingOverlay from '../../components/LoadingOverlay';
import fromTo from '../../assets/images/fromTo.png';
import bus from '../../assets/images/bus.png';
import seats from '../../assets/images/seats.png';

import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Booking extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Booking';
        triggerSwitchNavigation(navigationIndexer.booking);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Booking';
        triggerSwitchNavigation(navigationIndexer.booking);
    }

    /**
     * click handler to update user
     * @param {*} e event object
     */
    updateProfile(e) {
        const { triggerGenericCreateEntity } = this.props;
        e.preventDefault();
        /**
         * @todo handle the type/value checking
         * of the required fields
         */
        const {
            name,
            email,
        } = this;
        if (!(name.value)) {
            toast.error('name');
        } else {
            triggerGenericCreateEntity({
                email: email.value,
                name: name.value,
                page: 1,
                limit: 30,
            });
        }
    }

    render() {
        const {
            fetching,
            bookingData: {
                success,
                error,
            },
            triggerGenericCreateEntity,
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
            <section className='container '>
                <section className='row'>
                    <section className='col-md-2'></section>
                    <section className='col-md-8'>
                        <section className='container'>
                            <section className='row'>
                                <section className='col-md-4'>
                                    <p className='text-right loc-text'>
                                        Atlanta
                                    </p>    
                                </section>
                                <section className='col-md-4 text-center'>
                                    <img src={bus} height={20} />
                                </section>
                                <section className='col-md-4'>
                                    <p className='text-left loc-text'>
                                        Athens
                                    </p>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className='col-md-2'></section>
                </section>
            </section>
            <section className='container parent-container'>
                <section className=''>
                    <section className='row'>
                        <section className='col-md-3'></section>
                        <section className='col-md-6 child-container text-center'>
                            <span><img src={seats} width={30} />&nbsp;&nbsp;Selected Seat</span>&nbsp;&nbsp;4
                            <br/><br /><br/>
                            {/* Name<br/> */}
                            <input
                                className='input'
                                type="text"
                                name="text"
                                ref={name => this.name = name}
                                placeholder='Name'
                                id="name" /><br/><br/>
                            {/* Email<br/> */}
                            <input
                                className='input'
                                type="text"
                                name="text"
                                placeholder='Email'
                                ref={email => this.email = email}
                                id="email" />
                            <br/>
                            <br/>
                            <section>
                                <span className='large-text'>Ticket Confirmation</span><br/>
                                <span className='small-text'>Ticket will be send to your email ID.</span>
                            </section>
                            <br/><br/>
                            <button className='app-btn'>Save Now</button>
                        </section>
                        <section className='col-md-3'></section>
                    </section>
                </section>
            </section>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerGenericCreateEntity: ({
            name,
            email,
            page,
            limit }) => dispatch(genericCreateEntity({
                payload: {
                    name,
                    email,
                },
                page,
                limit,
                //endpoint: ,
            })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, bookingData } = state;
    return { fetching, bookingData };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Booking);



