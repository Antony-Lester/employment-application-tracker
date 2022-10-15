import getApplications from '../utils/get-applications.js'
import getInterviews from '../utils/get-interviews.js'
import getOffers from '../utils/get-offers.js'

export default () => {
    const applications = getApplications('count')
    const interviews = getInterviews('count')
    const offers = getOffers('count')
    return Promise.all([applications, interviews, offers])
    .then((summery) => {console.log(...summery)})
}
