import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
import './index.scss';

class PrivacyPolicy extends Component {

    constructor() {
        super();
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Privacy Policy';
        triggerSwitchNavigation(navigationIndexer.privacyPolicy);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Privacy Policy';
        triggerSwitchNavigation(navigationIndexer.privacyPolicy);
    }

    render() {
        return (
            <section>
                <section style={{ marginLeft: '40px'}}>
                <h4><b>Privacy Notice</b></h4>
                <p>
                This privacy notice discloses the privacy practices for C Trans LInes. This privacy notice <br />
                applies solely to information collected by this app/website. It will notify you of the following:
                <section style={{ marginLeft: '40px' }}>
                <ol className='' >
						<li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
						<li>What choices are available to you regarding the use of your data.</li>
						<li>The security procedures in place to protect the misuse of your information.</li>
						<li>How you can correct any inaccuracies in the information.</li>
					</ol>

                </section>
                </p>
   
                <h4><b>Information Collection, Use, and Sharing </b></h4>
                <p>
                We are the sole owners of the information collected on this site. We only have access 
                to/collect information that you voluntarily give us via email, your profile, or other direct 
                contact from you. We will not sell or rent this information to anyone. We do not store
                 your credit card information. <br /><br />
                 We will use your information to respond to you regarding the reason you contacted us. We 
                 will not share your information with any third party outside of our organization, other than as 
                 necessary to fulfill your request.<br /><br />
                 Unless you ask us not to, we may contact you via email in the future to tell you about 
                 specials, new products or services, or changes to this privacy policy.
                </p>
                <h4><b>Your Access to and Control Over Information </b></h4>
                <p>
                You may opt out of any future contacts from us at any
                time. You can do the following at any time by contacting us via the email address or phone number given on our website:
                <section style={{ marginLeft: '40px' }}>
                     <ul>
                         <li>See what data we have about you, if any.</li>
                         <li>Change/correct any data we have about you.</li>
                         <li>Have us delete any data we have about you.</li>
                         <li>Express any concern you have about our use of your data.</li>
                     </ul>

                </section>
                </p>
           
                <h4><b>Security</b></h4>
                <p>
                We take precautions to protect your information. When you submit sensitive information via 
                the website, your information is protected both online and offline. <br />
                Wherever we collect sensitive information (such as credit card data), that information is 
                encrypted and transmitted to us in a secure way via ssl certificate. You can verify this by 
                looking for a lock icon in the address bar and looking for "https" at the 
                beginning of the address of the Web page.<br />
                While we use encryption to protect sensitive information transmitted online, we also protect 
                your information offline. Only employees who need the information to perform a specific job 
                (for example, billing or customer service) are granted access to personally identifiable 
                information. The computers/servers in which we store personally identifiable information are 
                kept in a secure environment.<br /><br />
                <b>If you feel that we are not abiding by this privacy policy, you should contact us
                immediately via via email at info@ctranslines.com.</b>
                </p>
                </section>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
    };
}
const mapStateToProps = state => {
    const { fetching, dashboard } = state;
    return { fetching, dashboard };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyPolicy);