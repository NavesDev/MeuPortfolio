var colorMode
const htmlE = document.documentElement

//theme code

function LightMode(){
    localStorage.setItem("ColorMode","light")
    htmlE.classList.add("lightMode")
    document.getElementById("themeDiv").style.marginLeft="-30px"
    document.getElementById("firstLogo").src = "sources/lightLogo.png"
}

function DarkMode(){
    localStorage.setItem("ColorMode","dark")
    htmlE.classList.remove("lightMode")
    document.getElementById("themeDiv").style.marginLeft="0px"
    document.getElementById("firstLogo").src = "sources/darkLogo.png"
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

document.getElementById("themeDiv").addEventListener("click",colorModeChange)

//Go To

document.getElementById("goToButton").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})