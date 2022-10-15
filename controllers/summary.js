import getApplications from '../utils/get-applications.js'
import getInterviews from '../utils/get-interviews.js'
import getOffers from '../utils/get-offers.js'

export default () => {
    const applications = getApplications('count-log')
    const interviews = getInterviews('count-log')
    const offers = getOffers('count-log')
    return Promise.all([applications, interviews, offers])
    .then((summary) => {console.log(...summary)})
}
