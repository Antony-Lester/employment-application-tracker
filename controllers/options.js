import inquirer from 'inquirer'

import getApplications from '../utils/get-applications.js'
import getInterviews from '../utils/get-interviews.js'
import getOffers from '../utils/get-offers.js'
import getStatistics from '../utils/get-statistics.js'

import addApplication from '../utils/post-application.js'
import addInterview from '../utils/post-interview.js'
import addOffer from '../utils/post-offer.js'

const options = {
  type: 'list',
  name: 'run',
  message: 'What would you like to do?',
  choices: [],
}
export default () => {
    return getOffers('count')
        .then((count) => {if (count > 0){options.choices.push('add a Application', 'add a Interview', 'add an Employment Offer', 'view Applications', 'view Interviews', 'view Employment Offers', 'view Statistics'); Promise.resolve()}; return})
        .then(() => {return getInterviews('count').then((count) => {if (count > 0){options.choices.push('add a Application', 'add a Interview', 'add an Employment Offer', 'view Applications', 'view Interviews', 'view Statistics'); Promise.resolve()}; return})})
        .then(() => {return getApplications('count').then((count) => {if (count > 0){options.choices.push('add a Application', 'add a Interview', 'view Applications', 'view Statistics'); return}else{options.choices.push('add a Application'); return}})})
        .then(() => {return inquirer.prompt(options).then((selected)=>{return {run: selected}})})
        .then((selected) => {
            if (selected === 'add a Application') {return addApplication()}
            else if (selected === 'add a Interview') {return addInterview()}
            else if (selected === 'add an Employment Offer') {return addOffer()}
            else if (selected === 'view Applications') {return getApplications()}
            else if (selected === 'view Interviews') {return getInterviews()}
            else if (selected === 'view Employment Offers'){return getOffers()}
            else {return getStatistics()}
        })
    }
