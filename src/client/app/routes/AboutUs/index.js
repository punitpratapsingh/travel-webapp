import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
import './index.scss';

class AboutUs extends Component {

    constructor() {
        super();
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Booking History';
        triggerSwitchNavigation(navigationIndexer.aboutUs);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Booking History';
        triggerSwitchNavigation(navigationIndexer.aboutUs);
    }

    render() {
        return (
            <section>
                <h1 className='page-header'>About Us</h1>
                <div>
                    <div>
                        C-Trans Lines by Cooley Transportation LLC is a new intercity bus line established, owned, and operated by Americans to give customers low-cost and safe ground transportation. C-Trans Lines contracts with small American bus companies to develop continuous growth in American transportation. C-Trans Lines is here to add to the American history.
   </div><br></br>
                </div>

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
)(AboutUs);