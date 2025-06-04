const apiURL = "https://navesdev-api.vercel.app"

export async function getWebsiteInfo(name){
    if(!inCooldown(name)){
        let req = await fetch(`${apiURL}/websites/${name}`);
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
        let req = await fetch(`${apiURL}/websites`);
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
        let req = await fetch(`${apiURL}/websites/${name}/newaccess`);
        req = await req.json();
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
