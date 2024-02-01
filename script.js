const btn_show = document.querySelector("#show_modal")

let modal = null

const select_focussable = "a, input"

let elements_focussable = []


const show_modal = (e)=>{
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href"))
    elements_focussable = [...modal.querySelectorAll(select_focussable)]
    elements_focussable[0].focus()
    modal.classList.remove("hidden")
    modal.setAttribute("aria-modal", "true")
    modal.removeAttribute("aria-hidden")
    modal.addEventListener("click", close_modal)
    modal.querySelector(".close_modal").addEventListener("click", close_modal)
    modal.querySelector(".modal_form").addEventListener("click", stop_propagation)
}


const close_modal = (e)=>{
    e.preventDefault()
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", close_modal)
    modal.querySelector(".close_modal").removeEventListener("click", close_modal)
    modal.querySelector(".modal_form").removeEventListener("click", stop_propagation)
    let modal_hidden = ()=>{
        modal.classList.add("hidden")
        modal.removeEventListener('animationend',modal_hidden)
        modal = null
    }
    modal.addEventListener('animationend',modal_hidden)
}

const stop_propagation = (e)=>{
    e.stopPropagation()
}


const modal_focus = (e)=>{
    e.preventDefault()
    let index = elements_focussable.findIndex(element=>element == modal.querySelector(":focus"))
    if(e.shiftKey){
        index--
    }else{
        index++
    }
    if(index >=elements_focussable.length){
        index = 0
    }
    if(index<0){
        index = elements_focussable.length -1
    }
    elements_focussable[index].focus()
}






btn_show.addEventListener("click", show_modal)

window.addEventListener("keydown", e=>{
    if(e.key =="Escape"){
        close_modal(e)
    }
    if(e.key =="Tab"){
        modal_focus(e)
    }
})