var colorMode
const htmlE = document.documentElement

//theme code

function LightMode(){
    localStorage.setItem("ColorMode","light")
    htmlE.classList.add("lightMode")
    document.getElementById("themeDiv").style.marginLeft="-30px"
    document.getElementById("firstLogo").src = "sources/lightLogo.png"
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
document.getElementById("contactB").addEventListener("click",goToObj)
document.getElementById("skillsB").addEventListener("click",goToObj)
document.getElementById("projB").addEventListener("click",goToObj)
document.getElementById("goToButton").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})