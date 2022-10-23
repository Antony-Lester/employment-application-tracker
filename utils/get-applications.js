import {readdir, readFile} from 'node:fs/promises'

export default (query) => {
    switch(query) {
        case 'count' :
            return readdir('./data/applications')
                .then((files)=>{return files.length})
        case 'count-log' :
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
        case 'all' :
            return readdir('./data/applications')
                .then((files)=>{ return Promise.all(files.map((file)=>{return readFile('./data/applications/' + file, 'UTF-8').then((data)=>{
                    data = JSON.parse(data)
                    data.Name = data.company_name
                    data.Location = data.company_location
                    data.Title = data.job_title
                    data.Type = data.job_type
                    data['PayStated'] = `${data.job_salary_min/1000}k-${data.job_salary_max/1000}k`
                    data['PayActual'] = `${data.adjusted_salary_min/1000}k-${data.adjusted_salary_max/1000}k`
                    data['PayPerHour'] = `${data.adjusted_salary_per_hour_min}ph-${data.adjusted_salary_per_hour_max}ph`
                    return data
                })}))})
                .then((data)=>{console.table(data,['Name','Location','Title','Type','PayStated','PayActual','PayPerHour'])})

    }
}
