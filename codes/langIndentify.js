let favLang = localStorage.getItem("favLang")
const baseLang = "en-us"
const supportedLangs = ['pt-br','en-us']
const baseUrl = "/MeuPortifolio/"


if(!favLang){
    favLang =  navigator.language.toLowerCase();
    if(!favLang){
        favLang = baseLang
    }
}

setTimeout(()=>{
    if(supportedLangs.includes(favLang)){
        window.location.href=`${baseUrl}${favLang}`
    } else {
        window.location.href = `${baseUrl}${baseLang}`
        localStorage.setItem("favLang",baseLang)
    }
},1500)