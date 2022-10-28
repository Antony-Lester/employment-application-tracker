import {readdir, readFile} from 'node:fs/promises'

export default (query) => {
    switch(query) {
        case 'count' :
            return readdir('./data/interviews')
                .then((files)=>{return files.length})
        case 'count-log' :
            return readdir('./data/interviews')
                .then((files)=>
                {let count = 0;
                    files.map((file)=>{
                        readFile('./data/interviews/' + file, 'UTF-8').then(
                            (fileContent)=>{const status = JSON.parse(fileContent).status;
                                if(status !== 'pending' || status !== 'declined'){count++}})})
                            ;return count})
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
        case 'all' :
            return readdir('./data/interviews')
                .then((files)=>{return files.filter((file)=>{readFile('./data/interviews/' + file, 'UTF-8').then((fileContent)=>{const status = JSON.parse(fileContent).status; if(status !== 'pending' || status !== 'declined'){return true}else{return false}})})})
                .then((files)=>{return files.map((file)=>{readFile('./data/interviews/' + file, 'UTF-8').then((data)=>{data =JSON.parse(data);
                    data.ID = data.job_id;
                    data.Date = data.date_of_interview;
                    data.Time = data.time_of_interview;
                    data.Type = data.method;
                    return data})})})
                .then((data) => {data == false ? console.log('                          😔  No interviews  😔') : console.table(data, ['ID', 'Date', 'Time', 'Type'])})

}}
