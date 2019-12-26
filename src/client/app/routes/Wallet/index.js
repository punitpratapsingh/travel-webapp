/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import FontAwesome from 'react-fontawesome';
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

class Wallet extends Component {

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
    }



    componentWillMount() {
        const { triggerSwitchNavigation, triggerFetchTicket } = this.props;
        document.title = 'Wallet';
        triggerSwitchNavigation(navigationIndexer.busListing);
        triggerFetchTicket();

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
            <section className='container header'>
                <h1 className='page-header'>My Wallet</h1>
            </section>
            <section>
                <section className='container parent-container'>
                    <section className='col-md-3'></section>
                    <section className='col-md-6'>

                    </section>
                    <section className='col-md-3'></section>
                </section>
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
        triggerFetchTicketCancel: (payload) => dispatch(fetchEntity({
            payload,
            endpoint: APPLICATION_ROUTES.TICKET_CANCEL,
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
)(Wallet);



