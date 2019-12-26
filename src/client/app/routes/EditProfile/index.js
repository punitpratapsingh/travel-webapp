/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import FontAwesome from 'react-fontawesome';
import LoadingOverlay from '../../components/LoadingOverlay';
import profile from '../../assets/images/profile.png';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
    switchNavigation,
    genericCreateEntity,
    nullifyError,
    nullifySuccess,
} from '../../redux/actions';
import addImage from '../../assets/images/addimage.png';
import './index.scss';

class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Edit Profile'
        triggerSwitchNavigation(navigationIndexer.editProfile);
    }
    componentDidUpdate() {
        document.title = 'Edit Profile';
    }

    componentDidMount() {
        document.title = 'Edit Profile';
    }

    

    render() {
        const {
            fetching,
            userUpdate: {
                data,
                success,
                error,
            },
            triggerUpdateEntity,
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

        if (data) {
            localStorage.setItem('userName', data.name);
            localStorage.setItem('credits', Number(data.appCredits));
            localStorage.setItem('email', data.email);
        }
        return <section >
            <section className='container header'>
                <h1 className='page-header'>Edit Profile</h1>
            </section>

            <section className='container bgo'>
                <section className='row'>
                    <section className='col-md-3'></section>
                    <section className='col-md-6 bg-profile text-center'>
                        {/* <section className='edit-image-container'>
                        <input type="file"  accept="image/*"ref={file => this.file = file} />
                            <img className='editable-image' src={profile} width={200} length={200} /><br/>
                            <span className='edit-icon'><img src={addImage} height={20} /></span>
                        </section><br/><br/> */}

                        <span className='title'>Name</span><br/>
                        <input type='text' placeholder={localStorage.userName} className='custom-form-input' ref={name => this.name = name}/><br/><br/>
                        <span className='title'>Email</span><br/>
                        <input type='email' className='custom-form-input' disabled={'disabled'} value={localStorage.email} ref={email => this.email = email}/><br/><br/>

                        <button className='app-btn'
                        onClick={() => {
                            const payload = {
                                email: this.email.value,
                                name: this.name.value,
                            };
                            // const picture = this.file.files[0];
                            triggerUpdateEntity({ payload });
                        }}
                        >Save</button>
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
        triggerUpdateEntity: ({ page = 1, limit = 30, payload, picture }) => dispatch(genericCreateEntity({
            page,
            limit,
            payload,
            multipart: false,
            endpoint: APPLICATION_ROUTES.USER_UPDATE,
            // picture,
        })),

        triggerNullifyError: () => dispatch(nullifyError()),
        triggerNullifySuccess: () => dispatch(nullifySuccess()),
    };
}

const mapStateToProps = state => {
    const { fetching, userUpdate } = state;
    return { fetching, userUpdate };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);



