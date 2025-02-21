let favLang = localStorage.getItem("favLang")
const baseLang = "en-us"

if(!favLang){
    favLang =  navigator.language.toLowerCase;
    if(!favLang){
        favLang = baseLang
    }
}

setTimeout(()=>{
    if(favLang == "pt-br"){
        window.location.href="/pt-br"
    } else {
        window.location.href = "/en-us"
    }
},2000)