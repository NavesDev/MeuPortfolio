const chatbot = document.getElementById("chatbot")
const header = chatbot.querySelector(".topo")

header.addEventListener("click",()=>{
    chatbot.classList.toggle("cbotInative")
})