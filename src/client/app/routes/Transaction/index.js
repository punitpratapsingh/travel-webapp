/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Container, Row } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import wallet from '../../assets/images/wallet.png';
import { toast, ToastContainer } from 'react-toastify';
import LoadingOverlay from '../../components/LoadingOverlay';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';

class Transaction extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Transaction';
        triggerSwitchNavigation(navigationIndexer.transaction);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Transaction';
        triggerSwitchNavigation(navigationIndexer.transaction);
    }

    /**
     * click handler
     * @param {*} e event object
     */
    handleSwitch(e) {
        e.preventDefault();

    }

    render() {
        const {
            fetching,
            dashboard: {
                success,
                error,
            },
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
        return <section className='parent-container'>
           
            <section className='container'>
                <section className='row'>
                    <section className='col-md-3'></section>
                    <section className='col-md-6 central-container2'>
             
                        <section className='payment-option'>
                            <img src={wallet} height={60} />
                        </section>
                        <section>Wallet balance</section>
                        <section>$20</section>
                    </section>
                    <section className='col-md-3'></section>
                </section>
            </section>
            <section className='container'>
                <section className='row'>
                    <section className='col-md-3'></section>
                    <section className='col-md-6 central-container2'>
             
                        <section className='payment'>
                            <input placeholder='$20.00' />
                        </section>
                        <section><button className='btn-danger button'>Pay Now</button></section>
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
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, dashboard } = state;
    return { fetching, dashboard };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transaction);



