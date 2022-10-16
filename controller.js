import inquirer from 'inquirer'
import emoji from 'node-emoji'
import {readFile} from 'node:fs/promises'

import summary from './controllers/summary.js'
import options from './controllers/options.js'

const welcome =
`
                        👍 Welcome 👉`

export default () => {
    readFile('./data/user/user.json').then((data) => {return console.log('\x1b[32m', welcome,JSON.parse(data).user_name)})
    summary().then(() => {options().then(() => {return})})
}
