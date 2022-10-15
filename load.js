import {existsSync} from 'node:fs'
import setup from './setup-user.js'
import controller from './controller.js'
if (existsSync('./data')&&existsSync('./data/user/user.json')) controller()
else setup()
