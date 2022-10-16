import inquirer from 'inquirer'
import {writeFile, unlink} from 'node:fs/promises'
import emoji from 'node-emoji'
import controller from './controller.js'
const questions = [
  {
    type: 'input',
    name: 'user_name',
    message: 'What is your name?',
  },
  {
    type: 'list',
    name: 'user_location',
    message: 'Do you live in the United Kingdom?',
    choices: ['Yes', 'No'],
  },
  {
    type: 'list',
    name: 'user_relocate',
    message: 'Do you plan to Relocate within the United Kingdom?',
    choices: ['Yes', 'No'],
  },
];
const disclaimer =
`                           🤔 Warning 🤔

Actual Earnings Stated are based on United Kingdom 🇬🇧 PAYE Taxation.

                           🤔 Warning 🤔`
const fatal =
`                           ⛔ Error ⛔

We can only cover the United Kingdom 🇬🇧 at the present time.

                           ⛔ Error ⛔`

export default () => {
    inquirer.prompt(questions)
        .then((answers) => { writeFile('./data/user/user.json',JSON.stringify(answers, null, 2)).resolve(); return answers})
        .then((answers) => {
            if (answers.user_location === 'No') {console.log('\x1b[33m%s\x1b[0m',disclaimer)}
            if (answers.user_location === 'No'&& answers.user_relocate === 'No')
                {unlink('./data/user/user.json');console.log('\x1b[31m',fatal)}
            else {controller()}})
}
