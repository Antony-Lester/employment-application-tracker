import inquirer from 'inquirer'
import emoji from 'node-emoji'
import {readFile} from 'node:fs/promises'

import summary from './controllers/summery.js'

const welcome =
`
                        👍 Welcome 👉`

export default () => {
    readFile('./data/user/user.json')
        .then((data) => {console.log('\x1b[32m', welcome,JSON.parse(data).user_name)})
        .then(() => {summary()})

}
/*
add application
add interview
add offers

progress report
*/
