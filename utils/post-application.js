import {readdir, writeFile} from 'node:fs/promises'
import inquirer from 'inquirer'

import adjustedSalary from '../utils/adjusted-salary.js'
import adjustedSalaryPerHour from '../utils/adjusted-salary-per-hour.js'

const stringValidate = (input) => {return input.length > 5}
const jobTypeValidate = (input) => {return input === 'Office' || input === 'Hybrid' || input === 'Remote'}
const jobRelocateValidate = (input) => {return input === 'Yes' || input === 'No'}

const questions = [
  {
    type: 'input',
    name: 'company_name',
    message: '🏛️ What is the Company called? *',
    validate: stringValidate
  },
  {
    type: 'input',
    name: 'company_location',
    message: '🌏 Where is the Company located? *',
    validate: stringValidate
  },
  {
    type: 'input',
    name: 'company_url',
    message: '🌐 What is the Companys Website?  ',
  },
  {
    type: 'input',
    name: 'job_title',
    message: '👔 What is the Job Title? *',
    validate: stringValidate
  },
  {
    type: 'number',
    name: 'job_salary_min',
    message: '💣 Do they state a Minimum Salary?  ',
  },
  {
    type: 'number',
    name: 'job_salary_max',
    message: '💥 Do they state a Maximum Salary?  ',
  },
  {
    type: 'list',
    name: 'job_type',
    message: '📟 What Job Type is it?  ',
    choices: ['Office', 'Hybrid', 'Remote'],
    validate: jobTypeValidate
  },
  {
    type: 'text',
    name: 'job_advert_url',
    message: '🔍 Save the Advert URL?  ',
  },
  {
    type: 'text',
    name: 'job_advert_description',
    message: '🔎 Save the Job Description?  ',
    validate: stringValidate
  },
  {
    type: 'text',
    name: 'job_contact_name',
    message: '👨 Save a Contact Name?  ',
  },
  {
    type: 'text',
    name: 'job_contact_email',
    message: '📧 Save a Contact Email?  ',
  },
  {
    type: 'text',
    name: 'job_contact_number',
    message: '📞 Save a Contact Number?  ',
  },
  {
    type: 'text',
    name: 'job_contact_linkedin',
    message: '📘 Save a Contact Linkedin?  ',
  },
  {
    type: 'checkbox',
    name: 'job_relocate',
    message: '🚗 Do you need to Relocate for this Job? *',
    choices: ['Yes', 'No'],
  },
  {
    type: 'number',
    name: 'job_relocate_cost',
    message: '💸 How much would Relocating for this job change you living cost per month? -/+ *',
  },
  {
    type: 'number',
    name: 'job_time',
    message: '⏳ How many Hours will you work a week including Travel time? *',
  },
];

let id = 0
let application = { job_relocate_cost: 0 }
let interview = {status: 'pending',}
export default () => {
    readdir('./data/applications')
        .then((files) => {id = files.length + '.json'})
    return inquirer.prompt(questions)
        .then((result)=> {application = result})
        .then(() => {application.adjusted_salary_min = adjustedSalary(application.job_salary_min, application.job_relocate_cost)})
        .then(() => {application.adjusted_salary_max = adjustedSalary(application.job_salary_max,  application.job_relocate_cost)})
        .then(() => {application.adjusted_salary_per_hour_min = adjustedSalaryPerHour(application.adjusted_salary_min, application.job_time)})
        .then(() => {application.adjusted_salary_per_hour_max = adjustedSalaryPerHour(application.adjusted_salary_max, application.job_time)})
        .then(() => {application.date = Date.now()})
        .then(() => {writeFile(`./data/applications/${id}`,JSON.stringify(application, null, 2))})
        .then(() => {writeFile(`./data/interviews/${id}`,JSON.stringify(interview, null, 2))})
}
