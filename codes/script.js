import { linkCache,essentialCaches,eCache } from "./commitsInfo.js"

var colorMode
const htmlE = document.documentElement
const emailLinks = {
    mobile : "mailto:davinaves.2006@gmail.com?subject=Quero saber mais dos seus serviços&body=Tenho interesse no seu perfil e gostaria de...",
    pc : "https://mail.google.com/mail/?view=cm&fs=1&to=davinaves.2006@gmail.com&su=Quero%20saber%20mais%20dos%20seus%20servi%C3%A7os&body=Tenho%20interesse%20no%20seu%20perfil%20e%20gostaria%20de..."
}

const gLinks = {
    portifolio: 'https://navesdev.github.io/MeuPortifolio',
    portGit: 'https://github.com/NavesDev/MeuPortifolio'
}
//theme code

class Popup{
    constructor(popup){
        this.base = popup.parentElement
        this.popup = popup
        this.repName = popup.id
        this.linkButtons()

    }

    hide(){
        this.popup.classList.remove('inScreen')
    }

    show(){
        this.popup.classList.add('inScreen')
        let mode ='me'

        let atualChoose = {
            selector:this.popup.querySelector("#me"),
            content:this.popup.querySelector(".meContent")
        }

        const mefunc = (ev)=>{
            if(mode!="me"){
                mode='me'

                atualChoose.selector.classList.remove('selected')
                atualChoose.content.classList.remove('selected')

                atualChoose.content = this.popup.querySelector('.meContent')
                atualChoose.content.classList.add('selected')

                atualChoose.selector = ev.target
                atualChoose.selector.classList.add('selected')
                
            }
        }
        const otfunc = (ev)=>{
            if(mode!="others"){
                mode='others'
    
                atualChoose.selector.classList.remove('selected')
                atualChoose.content.classList.remove('selected')

                atualChoose.content = this.popup.querySelector('.othersContent')
                atualChoose.content.classList.add('selected')
    
                atualChoose.selector = ev.target
                atualChoose.selector.classList.add('selected')
                
            }
        }

        this.popup.querySelector('#others').addEventListener('click',otfunc)
        this.popup.querySelector('#me').addEventListener('click',mefunc)
        const hidefunc = this.hide.bind(this)
        this.popup.querySelector('.backButton').addEventListener("click",hidefunc)
        
    }

    linkButtons(){
        const button =this.base.querySelector("#seeMoreButton")
        
        button.addEventListener('click',()=>{
            this.show()
            
            linkCache(this.popup)

        })
        
    }
}


document.addEventListener('DOMContentLoaded',()=>{

function LightMode(){
    localStorage.setItem("ColorMode","light")
    htmlE.classList.add("lightMode")
    document.getElementById("themeDiv").style.marginLeft="-30px"
    document.getElementById("firstLogo").src = "../sources/lightLogo.png"
}

function linkWith(url){
    return ()=>{
        if(typeof(url)=='string'){
            location.href=url
        }
    }
    
}



document.querySelectorAll("#repButton").forEach( (element)=>{
    element.addEventListener('click',linkWith(gLinks.portGit))
})
function goToObj(event){
    const target = event.target
    const obj = document.getElementById(target.id+"sec")
    obj.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })
}
function DarkMode(){
    localStorage.setItem("ColorMode","dark")
    htmlE.classList.remove("lightMode")
    document.getElementById("themeDiv").style.marginLeft="0px"
    document.getElementById("firstLogo").src = "../sources/darkLogo.png"
}

if(localStorage.getItem("ColorMode")){
    colorMode= localStorage.getItem("ColorMode")
    if(colorMode!="light" && colorMode!="dark"){
        colorMode = "dark"
        localStorage.setItem("ColorMode",colorMode)
    } else if(colorMode=="light") {
        LightMode()
    }
} else {
    colorMode = "dark"
    localStorage.setItem("ColorMode",colorMode)
}

function colorModeChange(){
    if(htmlE.classList.contains("lightMode")){
        DarkMode()
    } else {
        LightMode()
    }
}

function updateWindow(){
    if(window.innerWidth<1000){
        document.getElementById("talkToMe").href=emailLinks.mobile
    } else{
        document.getElementById("talkToMe").href=emailLinks.pc
    }
}

updateWindow()

function langChange(ev){
    const langb=ev.target
    let path = window.location.pathname;
    let pageName = path.split("/").pop();
    if(langb.value=="en" && !pageName.includes("en-us")){
        localStorage.setItem("favLang","en-us")
        window.location.href = "/MeuPortifolio/en-us"
    } else if(langb.value=="pt" && !pageName.includes("pt-br")){
        localStorage.setItem("favLang","pt-br")
        window.location.href = "/MeuPortifolio/pt-br" 
    }
}

let all = []
const popups = []
document.querySelectorAll('.projPopup').forEach(element => {
    const popup = new Popup(element)
    popups.push(popup)
    all.push(element.id)
});

async function basics(){
    const mecache=new eCache(await essentialCaches(all))
    for(const obj of popups){
        let langHolder = obj.popup.querySelector('.langs')
        mecache.linkLangs(obj.repName,langHolder,langHolder.querySelector(".template"))
        langHolder = obj.base.querySelector(".projLangs")
        mecache.linkLangs(obj.repName,langHolder,langHolder.querySelector(".template"))
    }
   
} 
basics()

document.getElementById("themeDiv").addEventListener("click",colorModeChange)

document.getElementById("lang-b").addEventListener("change",langChange)

window.addEventListener("resize",updateWindow)
//Go To
document.getElementById("contactB").addEventListener("click",goToObj)
document.getElementById("skillsB").addEventListener("click",goToObj)
document.getElementById("projB").addEventListener("click",goToObj)
document.getElementById("goToButton").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})
})