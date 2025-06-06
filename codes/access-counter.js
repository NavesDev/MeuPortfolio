const apiURL = "https://navesdev-api.vercel.app"
const defHeader = {
    method:"GET",
    credentials:"include"
}

export async function getWebsiteInfo(name){
    if(!inCooldown(name)){
        let req = await fetch(`${apiURL}/websites/${name}`,defHeader);
        req = await req.json();
        addCooldown(name);
        if(req.response){
            return req.response;
        } else {
            return null;
        }
    } else{
        return null;
    }    
    
}

export async function getWebsitesInfo(){
    if(!inCooldown("1all1")){
        let req = await fetch(`${apiURL}/websites`,defHeader);
        req = await req.json();
        addCooldown("1all1");
        if(req.response){
            return req.response;
        } else {
            return null;
        }
    } else{
        return null;
    }    
}

export async function newAccess(name){
    if(!inCooldown(`${name}-access`)){
        let req = await fetch(`${apiURL}/websites/${name}/newaccess`,defHeader);
        req = await req.json();
        console.log(req)
        addCooldown(`${name}-access`,60*3);
        if(req.status){
            return true;
        } else {
            return false;
        }
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
    for(let i in cookies){
        const [key,value] = i.trim().split("=");
        if(key===name){
            finded=value;
        }
    }
    return finded;
}
