import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
import './index.scss';

class TermsAndConditions extends Component {

    constructor() {
        super();
    }

    componentDidUpdate() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Terms And Conditions';
        triggerSwitchNavigation(navigationIndexer.termsAndConditions);
    }

    componentDidMount() {
        const { triggerSwitchNavigation } = this.props;
        document.title = 'Terms And Conditions';
        triggerSwitchNavigation(navigationIndexer.termsAndConditions);
    }

    render() {
        return (
            <section>
                <h1 className='page-header'>Terms And Conditions</h1>
                <p>

                    1. By using this app you agree to the following terms and conditions. If the ticket is unused and/or if you miss your trip, no refund or compensation will be provided. The cancellation request must be made at least 3 hours before the scheduled departure of the service (conditions may apply).
                     If prices increase or decrease after the purchase, we will not charge or refund the difference in price.
 
                </p>
                <p>
                    2. Seating is first come, first serve.

                </p>
                <p>
                    3. Applicable discounts become invalid once the ticket is purchased.
 
                </p>
                <p>
                    4. Purchased tickets cannot be transferred to another person.
                </p>
                <p>
                    5. Anyone under the age of 18 is considered a minor. Children ages 16 and under are not allowed on board without an adult (18+).
                </p>

                <p>6. Although Ctrans will make an effort to provide internet from the beginning until the end of your trip, please keep in mind that you might experience poor or no connection at all in some areas. The service is provided by a third party and thus there will be no compensations or refunds for internet connectivity issues.</p>

                <p>7. If the service is delayed for external factors (traffic, weather and/or accidents) refunds will not be provided.</p>

                <p>8. Ctrans is not responsible for any extra charge caused to the passengers if they miss any other transportation service due to a bus service delay. It is exclusively the passenger’s responsibility to arrange the bus trip according to the other connecting transportation departure time, taking into account that there could be some kind of inconvenient, delay, traffic or accident that may delay their arrival.</p>

                <p>9. Dogs and other animals are not permitted on any Ctrans service, with the exception of service animals, that must meet the definition and requirements set by the ADA.</p>

                <p>10. A refund and/or compensation will not be provided for a delay of less than an hour.
</p>

                <p>11. If we have reason to suspect fraudulent use of booking references, a ticket transfer to another person, or other abuse, we reserve the right to refuse travel. No refund will be given in relation to fraudulent use of booking references.
</p>

                <p>12. Passengers traveling with Ctrans are advised that reference/ticket numbers should be presented to the bus driver, when requested, in either a printed format, or displayed on a mobile phone or tablet when requested. This measure will allow us to check your reference quickly and efficiently. Also, a Photo ID must be presented to board the bus. If the ID is not shown when requested by the driver, the company reserves the right to refuse boarding.
</p>

                <p>13. If a bus has been cancelled due to operational issues, or the schedule has changed for some reason, an email notification will be sent to passengers, to the address provided at the moment of the purchase.
</p>

                <p>14. Ctrans will not return to a previous location to pick up passengers.
</p>

                <p>15. If a passenger requests a change for a lower price ticket, time or class, Ctrans will not reimburse the price difference.
</p>

                <p>16. In case that an incident/issue occurs during a trip, the passenger has until 5 business days after the trip to file a complaint. After that period, no claim will be filed for the case.
</p>


                <p>17.The buses only stop to pick up/drop off passengers in the different locations. It is not allowed to get out of the unit, with the only exception that the bus driver indicates it. If you leave without authorization we are not responsible for missing the bus.</p>

                <p>18. Passenger must get on board at pick up location described on purchased ticket. No passenger will be allowed on board if departure location on ticket does not match actual pick up location of the passenger.
</p>
                <p>19. Ctrans reserves the right to admission. The driver is allowed to remove a passenger from the vehicle if the passenger presents a threat to other passengers or Ctrans’ personnel.
</p>

                <p>20. No smoking allowed on board; it’s the law.
</p>

                <p>21. Absolutely no alcohol, drugs, or weapons anywhere on the bus. Passengers who violate this will be removed from the coach and will be subject to a fine</p>

                <p>22. If Ctrans has a reason to suspect of a fraudulent ticket, we reserve the right to refuse boarding the vehicle.
</p>

                <p>23. No refund nor credit will be provided for a ticket refused due to fraud.</p>
                <p className='page-header'>Thanks</p>
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
)(TermsAndConditions);