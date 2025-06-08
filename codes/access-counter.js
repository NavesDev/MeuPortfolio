const apiURL = "https://navesdev-api.vercel.app"
const defHeader = {
    method:"GET",
}

export async function getWebsiteInfo(name){
    const oldWebsiteInfo = JSON.parse(localStorage.getItem(`AC-${name}Infos`))
    if(!inCooldown(name)){
        let req = await fetch(`${apiURL}/websites/${name}`,defHeader);
        if(!req.ok){
            if(req.status==429){
                const errorM = response.json();
                addCooldown(name,errorM.retryAfter)
            } else {
                addCooldown(name)
            }
            return oldWebsiteInfo
        }
        req = await req.json();
        addCooldown(name);
        if(req.response){
            return req.response;
        } else {
            return oldWebsiteInfo;
        }
    } else{
        return oldWebsiteInfo;
    }    
    
}

export async function getWebsitesInfo(){
    const oldWebsitesInfos = JSON.parse(localStorage.getItem("AC-WebsitesInfos"))
    if(!inCooldown("1all1")){
        let req = await fetch(`${apiURL}/websites`,defHeader); 
        if(!req.ok){
            if(req.status==429){
                const errorM = response.json();
                addCooldown("1all1",errorM.retryAfter)
            } else {
                addCooldown("1all1")
            }
            return oldWebsitesInfos;
        }
        req = await req.json();
        addCooldown("1all1");
        if(req.response){
            localStorage.setItem("AC-WebsitesInfos",JSON.stringify(req.response))
            return req.response;
        } else {
            return oldWebsitesInfos;
        }
    } else{
        return oldWebsitesInfos;
    }    
}

export async function newAccess(name){
    if(!inCooldown(`${name}-access`)){
        let req = await fetch(`${apiURL}/websites/${name}/newaccess`,defHeader);
        if(!req.ok){
            if(req.status==429){
                const errorM = response.json();
                addCooldown(`${name}-access`,errorM.retryAfter ?? 60*2)
            } else {
                addCooldown(`${name}-access`,60*2)
            }
            return false
        }
        req = await req.json();
        console.log(req)
        addCooldown(`${name}-access`,(req.nextAccess/1000) ?? 60*2);
        return true;
    } else{
        return false;
    }    
}

function addCooldown(cdkey,time=60){
    document.cookie = `cd-${cdkey}-web=on; max-age=${time}; path=/`
}

function inCooldown(cdkey){
    if(getCookie(`cd-${cdkey}-web`)){
        return true;
    } else {
        return false;
    }
}

function getCookie(name){
    const cookies = document.cookie.split(";");
    let finded = null;
    for(let i of cookies){
        const [key,value] = i.trim().split("=");
        if(key===name){
            finded=value;
        }
    }
    return finded;
}
