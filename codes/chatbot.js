const chatbot = document.getElementById("chatbot")
const chatElement = chatbot.querySelector("#cbotChat")
const header = chatbot.querySelector(".topo")
const gitHubPrefix = "https://github.com/NavesDev"
const input = chatbot.querySelector("#chatInput")

class userPreferences{
    canRedirect = true
    firstRedirect = true
    constructor(storageKey = "aiPreferences"){
        let storedPreferences = localStorage.getItem(storageKey)
        this.storageKey = storageKey
        if(storedPreferences){
            Object.assign(this,JSON.parse(storedPreferences))
        }
        
    }
    togglePreference(name){
        if(name in this && typeof this[name] === 'boolean'){
            this[name] = !this[name]
            this.saveData()
        }
    }
    saveData(){
        localStorage.setItem(this.storageKey,JSON.stringify(this))
    }
    
}

const aiPreferences = new userPreferences()
// class botTyping
function messageEmit(role,message,commands = [],retroative = false){
    if(role=="user"){
        const element = chatElement.querySelector(".userMessage.gtemplate")?.cloneNode(true)
        element.innerHTML = `<p>${message}</p>`
        element.classList.remove("gtemplate")
        chatElement.appendChild(element)
    } else if(role=="model"){
        const element = chatElement.querySelector(".botMessage.gtemplate")?.cloneNode(true)
        element.querySelector(".message").innerHTML = `<p>${message}</p>`
        element.classList.remove("gtemplate")
        const commandsElement = element.querySelector(".commands")
        for (const command of commands){
            console.log("comando: " + command)
            if(command=="contactMe"){
                const bt= element.querySelector(".contactMeB")
                bt.classList.remove("gtemplate")
                if(!retroative){

                }
            }else if(command.includes("/")){
                console.log("foi em")
                const [commandPrefix, commandSufix] = command.toLowerCase().split("/")
                let comEl;
                if(commandPrefix=="gotogit") {
                    comEl = commandsElement.querySelector(".githubB.gtemplate").cloneNode(true)
                    comEl.querySelector(".websiteName").innerText = commandSufix.toUpperCase()
                    comEl.href = `${gitHubPrefix}/${commandSufix}`
                    comEl.remove("gtemplate")
                    commandsElement.appendChild(comEl)
                }else if(commandPrefix=="access" && false){
                    comEl = commandsElement.querySelector(".accessB.gtemplate").cloneNode(true)
                    comEl.querySelector(".websiteName").innerText = commandSufix.toUpperCase()
                    comEl.href = "www.google.com"
                    comEl.remove("gtemplate")
                    commandsElement.appendChild(comEl)
                } else if(commandPrefix=="gotosec" && false){
                    comEl = commandsElement.querySelector(".goToSecM.gtemplate").cloneNode(true)
                    
                    if(aiPreferences.canRedirect){
                        
                    } else {
                        comEl.querySelector("h1").innerText = "Redirecionamento bloqueado"
                        comEl.querySelector("p").innerText = "Clique para ativar este recurso"
                    }
                    comEl.classList.remove("gtemplate")
                    commandsElement.appendChild(comEl)
                }
            }
        } 
        chatElement.appendChild(element)
    } else if(role=="server"){
        const element = chatElement.querySelector(".serverMessage.gtemplate")?.cloneNode(true)
        element.querySelector(".message").innerHTML = `<p>${message}</p>`
        element.classList.remove("gtemplate")
        chatElement.appendChild(element)
    }
}

//messageEmit("user","Olá meu amigo quem é você")
//messageEmit("model","Sou CamisAI meu amigo! Pode saber mais sobre mim acessando os projetos do NavesDEV!",["goToSec/SobreMim"])

const main = async()=>{
   let messages =  await fetch("https://navesdev-api.vercel.app/camisAI/history")
   if(messages.ok){
    messages = await messages.json()
    console.log(messages)
    messages = messages.history
    for(let msg of messages){
        messageEmit(msg.role,msg.message,msg.commands,true)
    } 
     chatElement.scrollTop = chatElement.scrollHeight;
    }else{
        const errorobj = chatElement.querySelector("#errorHistoryMessage.gtemplate")
        if(messages.status==429){
            errorobj.querySelector(".tooMany").classList.add("active")
        } else {
            errorobj.querySelector(".general").classList.add("active")
        }
        errorobj.classList.remove("gtemplate")
    }
    
} 

let inprocess = false
async function sendMessage(event){
    promptEl = input.querySelector("#userPrompt")
    if(!inprocess && promptEl.value.length>=1){
        inprocess = true
        mprompt = promptEl.value
        promptEl.disabled = true
        messageEmit("user",promptEl.value)
        promptEl.value = ""
        chatElement.scrollTop = chatElement.scrollHeight;
        let message =  await fetch("https://navesdev-api.vercel.app/camisAI/chat",{
            method:"POST",
             headers: {
        "Content-Type": "application/json"
        },
            body:JSON.stringify({"prompt":mprompt})
        })
        if(message.ok){
            message = await message.json()
            messageEmit(message.role,message.message,message.commands)
            chatElement.scrollTop = chatElement.scrollHeight;
        }
        chatElement.scrollTop = chatElement.scrollHeight; 
        promptEl.disabled = false
            inprocess = false
    }    
}
input.querySelector("#aiSendButton").addEventListener("click",sendMessage)
main()



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
header.addEventListener("click",()=>{
    chatbot.classList.toggle("cbotInative")
    firstclick = true
})

