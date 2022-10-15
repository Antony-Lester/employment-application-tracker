import {readdir} from 'node:fs/promises'

export default (query) => {
    switch(query) {
        case 'count' :
            return readdir('./data/applications')
                .then((files)=>{return files.length})
                .then((count)=>{
                    if(count > 324){return `\x1b[32m         Applications ${count} 🤯 `}
                    else if(count > 162){return `\x1b[32m          Applications ${count} 🚀 `}
                    else if(count > 162){return `\x1b[32m          Applications ${count} 🥇 `}
                    else if(count > 135){return `\x1b[32m          Applications ${count} 🥈 `}
                    else if(count > 108){return `\x1b[32m          Applications ${count} 🥉 `}
                    else if(count > 81){return `\x1b[32m           Applications ${count} 👔 `}
                    else if(count > 27){return `\x1b[33m           Applications ${count} 👌 `}
                    else if(count > 20){return `\x1b[31m           Applications ${count} 🤞 `}
                    else if(count > 13){return `\x1b[31m           Applications ${count} 🙏 `}
                    else if(count > 6){return `\x1b[31m             Applications ${count} 🤔 `}
                    else{return `\x1b[31m          Applications ${count} 🚩 `}})
        default:
    }
}
