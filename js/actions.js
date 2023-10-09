let modalDisplay = "none"
function toggleModal() {
    if (modalDisplay == "none") {
        modal.style.display = "flex"
        modalDisplay = "flex"
    }else{
        modal.style.display = "none"
        modalDisplay = "none"
    }
}

// search form
let form = document.getElementById("search-form")
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    modal_body.innerHTML = "";
    searchCity(search.value)
    
})

// cut buton in modal
cutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleModal()
    setDatafunctionParam = undefined
    setDatafunctionParam2 = undefined
})

// cancel butron in modal
cancel.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleModal()
    setDatafunctionParam = undefined
    setDatafunctionParam2 = undefined
})

// select button in modal
select.addEventListener("click",(e)=>{
    e.preventDefault();
    if(setDatafunctionParam2==undefined){
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select your city.',
        })
    }
    else{
        setData(setDatafunctionParam,setDatafunctionParam2)
        setDatafunctionParam2 = undefined
        setDatafunctionParam = undefined
        toggleModal()
    }
})

// Effect while clicking cities in modal body
function SelectEffect(div){
    let elems = document.querySelectorAll("#modal_body div")
    elems.forEach((elem)=>{
        if (elem.classList.contains("modal-body-clicked")) {
            elem.classList.remove("modal-body-clicked")
        }
    })
    div.classList.add("modal-body-clicked")
}
