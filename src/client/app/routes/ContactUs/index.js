/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import './index.scss';
import LoadingOverlay from '../../components/LoadingOverlay';

class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.user = undefined;

    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.contactUs);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Contact Us';
        triggerSwitchNavigation(navigationIndexer.contactUs);
    }

    componentWillMount() {
		if (window.localStorage.accessToken) {
            this.user = window.localStorage.accessToken;
        }
	}

    render() {
        const {
            fetching,
            contactus: {
                page,
                limit,
                length,
                data,
                error,
                success,
            },
            triggerCreateEntity,
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
            <LoadingOverlay show={fetching}/>
            <ToastContainer />
            <h1 className='page-header'>Contact Us</h1>
            <Row className="space">
                <Col sm="2">Name</Col>
                <Col sm="4">
                    { this.user ? <input
                        className='form-control'
                        type="text"
                        name="text"
                        placeholder="name"
                        id="exampleText"
                        disabled
                        value={localStorage.getItem('userName')}
                        ref={name => this.name = name} /> : 
                        <input
                        className='form-control'
                        type="text"
                        name="text"
                        placeholder="name"
                        id="exampleText"
                        ref={name => this.name = name} />}
                    
                </Col>
            </Row>

            <Row className="space">
                <Col sm="2">Email</Col>
                <Col sm="4">
                    {this.user ? 
                    <input
                    className='form-control'
                    type="text"
                    name="text"
                    value={localStorage.getItem('email')}
                    placeholder="Email"
                    disabled
                    id="exampleText"
                    ref={email => this.email = email} /> :
                    <input
                        className='form-control'
                        type="text"
                        name="text"
                        placeholder="Email"
                        id="exampleText"
                        ref={email => this.email = email} />}
                </Col>
            </Row>
            <Row className="space">
                <Col sm="2">Phone Number</Col>
                <Col sm="4">
                    <input
                        className='form-control'
                        type="text"
                        name="text"
                        placeholder="phone"
                        id="exampleText"
                        ref={phone => this.phone = phone} />
                </Col>
            </Row>
            <Row className="space">
                <Col sm="2">Comment and Question</Col>
                <Col sm="4">
                    <textarea
                        className='form-control'
                        type="textarea"
                        name="text"
                        placeholder="comment"
                        id="exampleText"
                        ref={comment => this.comment = comment} />
                </Col>
            </Row>
            <Row className="p">
                <Col >
                    <Button
                        className='btn btn-sm btn-success'
                        onClick={() => {
                            const payload = {
                                name: this.name.value,
                                email: this.email.value,
                                phoneNumber: this.phone.value,
                                description: this.comment.value,
                            };
                            triggerCreateEntity(page, limit, payload);
                        }}>
                        Save
                </Button>
                </Col>
            </Row>
        </section>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
        triggerCreateEntity: (page, limit, payload) => dispatch(genericCreateEntity({
            payload,
            page,
            customMessage: 'Your message was successfully submitted, someone will get back to you shortly.',
            limit,
            endpoint: APPLICATION_ROUTES.CONTACTUS,
        })),
        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, contactus } = state;
    return { fetching, contactus };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactUs);


