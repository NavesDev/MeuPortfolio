const projectList = document.querySelectorAll(".projPopup")
const GitApiURL =  `https://api.github.com/repos/NavesDev/` //${repo}/commits
const today = new Date()

function Percentage(listOfValues){
    let newList = []
    let sum = 0
    for (const i in listOfValues){
        sum += listOfValues[i].value
    }
    for(const i in listOfValues){
        newList.push(autoTable(listOfValues[i].value,listOfValues[i].title || false,Number(listOfValues[i].value)/sum))
       
    }
    
    return newList
}

function autoTable(value,title=false,percentage=false){
    const table = {}
    if(title){
        table["title"] = title
    }
    if(percentage){
        table["percentage"] = percentage
    }
    table['value']=value
    return table
}
export async function linkCache(element) {
   
        const repName = element.id
        const cache = await getCache(repName)
        console.log(cache)
        if(cache.commits){
            const stats=commitToStats(cache.commits)
            for (let i in stats){
                if(i.includes("Text")){
                    let text=element.querySelector(`.${i}`)
                    if(text){
                        text.classList.remove('notLoaded')
                        text.innerText = stats[i]
                    }
                   
                }
            }
        }
       
}

export class eCache{
    constructor(cache){
        for(let key in cache){
            this[key] = cache[key] 
        }
    }
    linkLangs(repName,parent,imgTemplate){
        const langs = this.langs 
        const langImgs = {
            "HTML":"../sources/linguagens/html.png",
            "CSS":"../sources/linguagens/css.png",
            "JavaScript":"../sources/linguagens/javascript.png",
            "Python":"../sources/linguagens/python.png",
            "Lua":"../sources/linguagens/lua.png",
            "MySQL":"../sources/linguagens/mysql.png",
            "C#":"../sources/linguagens/cSharp.png"
        }   
        if(langs && langs[repName]){
            for(let key in langImgs){
                if(langs[repName][key]){
                    const newImg = imgTemplate.cloneNode(true)
                    newImg.src = langImgs[key]
                    newImg.classList.remove("template")
                    parent.appendChild(newImg)
                }
            }
        }
        
        
    }
}

export async function essentialCaches(reps) {
    const jsoncache = localStorage.getItem("essentialCaches") 
    var cache
    if(jsoncache){
        cache = JSON.parse(jsoncache)
        if(today.getTime()-cache.time>3600000){
            const oldCache = cache
            cache = {
                langs : {},
                time : today.getTime()
            }
            for(const element of reps){
                const llist = await getLangList(element)
                if(llist.type=="data"){
                    cache.langs[element] = llist.data
                } else{
                    try{
                        cache.langs[element] = oldCache.langs[element]
                    } catch(error){
                        cache.langs[element] = undefined
                    }
                }
            }
            localStorage.setItem("essentialCaches",JSON.stringify(cache))
            console.log("Cache old")
        }
        
    }else{
        cache = {
            langs : {},
            time : today.getTime()
        }
        for(const element of reps){
            const llist = await getLangList(element)
            if(llist.type=="data"){
                cache.langs[element] = llist.data
            } else{
                cache.langs[element] = undefined
            }
        }

        localStorage.setItem("essentialCaches",JSON.stringify(cache))
        console.log("Nenhum cache encontrado")
    }
    return cache
}




function commitToStats(commitList){
    let stats = {}
    
    let myCommitCount = 0
    let othersCommitCount = 0
    commitList.forEach(element =>{
        try{
            if(element.commit.author.name=="NavesDev"){
                myCommitCount+=1
            } else{
                othersCommitCount+=1
            }
        } catch (error){
            console.error("Error finding name")
        }
    })
    
    
    stats['cGraf1'] = Percentage([autoTable(myCommitCount,"MyCommitCount"),autoTable(othersCommitCount,"othersCommitCount")])
    stats['cText1'] = `${Number(stats['cGraf1'][0].percentage)*100}%`
    stats['cText2'] = myCommitCount
    stats['cText3'] = othersCommitCount
    stats['cText4'] = commitList.length
    
    return stats
}

async function getCache(repName){

    if(localStorage.getItem(`Cache-${repName}`)){
        const cache = JSON.parse(localStorage.getItem(`Cache-${repName}`))
        
        if (today.getTime()-cache.date<3600000){
            console.log("Cache found")
            //console.log(cache)
            return cache
        }else{
            const newCache = await setCache(repName,cache)
            //console.log("Cache overdate")
            return newCache
        }
    } else {
        const newCache = await setCache(repName)
        return newCache
    }
}

async function setCache(repName,oldCache = false){
    let trys=2
    let commitList = await getCommitList(repName)
    while(trys>0 && commitList.type=='error'){
        trys-=1
        commitList = await getCommitList(repName)
    }
    if(commitList.type=="data"){
        let cache = {
            name:repName,
            commits:commitList.data,
            date:today.getTime()
        }
        localStorage.setItem(`Cache-${repName}`,JSON.stringify(cache))
        return cache
    } else {
        let cache 
        if(oldCache){
        cache = {
            name:repName,
            commits:false,
            date:(today.getTime()-1800000)
        }
        }else{
            cache = {
                name:repName,
                commits:oldCache.commits,
                date:(today.getTime()-1800000)
            }
        }
        localStorage.setItem(`Cache-${repName}`,JSON.stringify(cache))
        return cache
    }
}

async function getCommitList(repName) {
    try{
        let response = await fetch(`${GitApiURL}${repName}/commits`)
        response = await response.json()
        return {type :"data",data:response}
    }catch(error){
        return {type : 'error', error :'Erro ao buscar informações no GitHub'}
    }
}

async function getLangList(repName){
    try{
        let response = await fetch(`${GitApiURL}${repName}/languages`)
        response = await response.json()
        return {type :"data",data:response}
    }catch(error){
        return {type : 'error', error :'Erro ao buscar informações no GitHub'}
    }
}