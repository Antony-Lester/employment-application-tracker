import {readdir} from 'node:fs/promises'

export default (query) => {
    switch(query) {
        case 'count' :
            return readdir('./data/offers')
                .then((files)=>{return files.length})
                .then((count)=>{
                    if(count > 8){return `\x1b[32m Offers ${count} 🤯 `}
                    else if(count > 7){return `\x1b[32m Offers ${count} 🚀 \x1b[0m`}
                    else if(count > 6){return `\x1b[32m Offers ${count} 🥇 \x1b[0m`}
                    else if(count > 5){return `\x1b[32m Offers ${count} 😍 \x1b[0m`}
                    else if(count > 4){return `\x1b[32m Offers ${count} 😎 \x1b[0m`}
                    else if(count > 3){return `\x1b[32m Offers ${count} ⏰ \x1b[0m`}
                    else if(count > 2){return `\x1b[33m Offers ${count} ⌚ \x1b[0m`}
                    else if(count > 1){return `\x1b[33m Offers ${count} ⏳ \x1b[0m`}
                    else{return `\x1b[31m Offers ${count} 🙏 `}})

        default:
    }
}
