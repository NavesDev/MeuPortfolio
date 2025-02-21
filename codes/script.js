var colorMode
const htmlE = document.documentElement
const emailLinks = {
    mobile : "mailto:davinaves.2006@gmail.com?subject=Quero saber mais dos seus serviços&body=Tenho interesse no seu perfil e gostaria de...",
    pc : "https://mail.google.com/mail/?view=cm&fs=1&to=davinaves.2006@gmail.com&su=Quero%20saber%20mais%20dos%20seus%20servi%C3%A7os&body=Tenho%20interesse%20no%20seu%20perfil%20e%20gostaria%20de..."
}
//theme code

function LightMode(){
    localStorage.setItem("ColorMode","light")
    htmlE.classList.add("lightMode")
    document.getElementById("themeDiv").style.marginLeft="-30px"
    document.getElementById("firstLogo").src = "../sources/lightLogo.png"
}

function goToObj(event){
    const target = event.target
    obj = document.getElementById(target.id+"sec")
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
        window.location.href = "/en-us" 
    } else if(langb.value=="pt" && !pageName.includes("pt-br")){
        localStorage.setItem("favLang","pt-br")
        window.location.href = "/pt-br" 
    }
}
document.getElementById("themeDiv").addEventListener("click",colorModeChange)

document.getElementById("lang-b").addEventListener("change",langChange)

window.addEventListener("resize",updateWindow)
//Go To
document.getElementById("contactB").addEventListener("click",goToObj)
document.getElementById("skillsB").addEventListener("click",goToObj)
document.getElementById("projB").addEventListener("click",goToObj)
document.getElementById("goToButton").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})