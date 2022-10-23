import {readdir, readFile, writeFile} from 'node:fs/promises'
import inquirer from 'inquirer'

const jobSelected = () => {return true}
const typeSelected = () => {return true}
const methodSelected = () => {return true}
const timeSelected = () => {return true}
const dateSelected = () => {return true}

const questions = [
    {
      type: 'list',
      name: 'job_id',
      message: '📟 What Job is the Interview For?  ',
      choices: [],
      validate: jobSelected
    },
    {
      type: 'list',
      name: 'type',
      message: 'What Job is the Interview For?  ',
      choices: ['Agency', 'HR', 'Technical', 'Manager'],
      validate: typeSelected
    },
    {
      type: 'list',
      name: 'method',
      message: 'How is the Interview Held?  ',
      choices: ['In-person', 'Zoom', 'Telephone'],
      validate: methodSelected
    },
    {
      type: 'input',
      name: 'time_of_interviewd',
      message: 'What time is the Interview? 00:00 ',
      validate: timeSelected
    },
    {
      type: 'input',
      name: 'date_of_interview',
      message: 'What date is the Interview?  dd/mm/yy',
      validate: dateSelected
    },
    {
      type: 'input',
      name: 'location',
      message: 'Where is the Interview Located? ',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the Name of the Interviewer? ',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the Interviewers email? ',
    },
    {
      type: 'input',
      name: 'number',
      message: 'What is the Interviewers Phonenumber? ',
    },
    {
      type: 'input',
      name: 'link',
      message: 'Do you have a interview link? ',
    },
    {
      type: 'input',
      name: 'notes',
      message: 'Do you want to make any notes? ',
    },
];

let answers = {}

export default () => {
    readdir('./data/applications').then((files) => {files.forEach((file) => {
        readFile(`./data/applications/${file}`, { encoding: "UTF-8"}).then((data) => {questions[0].choices.push(`${file.slice(0,-5)} ${data.company_name} ${data.company_location} ${data.job_title} ${data.job_salary_min}-${data.job_salary_max}`)})
    })})
    .then(() => {
        return inquirer.prompt(questions)
            .then((result)=> {answers = result})
            .then(() => {answers.date_received = Date.now()})
            .then(() => {writeFile(`./data/interviews/${interviewId}`,JSON.stringify(answers, null, 2))})
    })
}
