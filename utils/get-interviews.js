import {readdir} from 'node:fs/promises'

export default (query) => {
    switch(query) {
        case 'count' :
            return readdir('./data/interviews')
                .then((files)=>{return files.length})
        case 'count-log' :
            return readdir('./data/interviews')
                .then((files)=>{return files.length})
                .then((count)=>{
                    if(count > 30){return `\x1b[32m Interviews ${count} 🤯 `}
                    else if(count > 27){return `\x1b[32m Interviews ${count} 🚀 `}
                    else if(count > 24){return `\x1b[32m Interviews ${count} 🥇 `}
                    else if(count > 21){return `\x1b[32m Interviews ${count} 😍 `}
                    else if(count > 18){return `\x1b[32m Interviews ${count} 😎 `}
                    else if(count > 15){return `\x1b[32m Interviews ${count} 😻 `}
                    else if(count > 12){return `\x1b[32m Interviews ${count} 😏 `}
                    else if(count > 9){return `\x1b[33m Interviews ${count} 🙂 `}
                    else if(count > 6){return `\x1b[33m Interviews ${count} 👌 `}
                    else if(count > 3){return `\x1b[33m Interviews ${count} 🤞 `}
                    else{return `\x1b[31m Interviews ${count} 🙏 `}})

        default:
    }
}
