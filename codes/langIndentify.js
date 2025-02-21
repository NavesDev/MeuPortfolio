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
        window.location.href="/MeuPortifolio/pt-br"
    } else {
        window.location.href = "/MeuPortifolio/en-us"
    }
},1500)