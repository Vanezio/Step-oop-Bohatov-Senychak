
let containerBg
let blockModal
let body
let choseDoctor
let iconClose
    

function showModal () {
    containerBg = document.getElementById('dark-bg')
    containerBg.className += 'dark-bg'
    // 
    blockModal = document.createElement('div')
    body = document.querySelector('body')
    body.appendChild(blockModal)
    blockModal.className += 'block-modal'

    choseDoctor = document.createElement('div')
    choseDoctor.style.display = 'flex'
    choseDoctor.style.justifyContent = 'space-between'

    choseDoctorText = document.createElement('p')
    choseDoctorText.innerText += 'Doctors'
    choseDoctorText.style.paddingLeft = '10px'
    choseDoctor.appendChild(choseDoctorText)

    blockModal.appendChild(choseDoctor)
    iconClose = document.createElement('div')
    iconClose.style.paddingRight = '10px'
    choseDoctor.appendChild(iconClose)
    iconClose.innerText += 'x'

    choseDoctor.className += 'doctors'
    
    choseDoctorText.addEventListener('click', () => {
        showDoctors()
    })
   
    iconClose.addEventListener('click', () => {
        closeModal()
    })
}


function showDoctors () {
    let dropDoctorBlock = document.createElement('div')
    let dropList = document.createElement('ul')
    let dropItemCard = document.createElement('li')
    let dropItemDent = document.createElement('li')
    let dropItemTer = document.createElement('li')
    dropDoctorBlock.appendChild(dropList)
    dropList.appendChild(dropItemCard)
    dropList.appendChild(dropItemDent)
    dropList.appendChild(dropItemTer)
    
    dropItemCard.innerText += 'Cardiologist'
    dropItemDent.innerText += 'Dentist'
    dropItemTer.innerText += 'therapist'

    
    
    dropList.className += 'list'
    dropItemCard.className += 'list-item'
    dropItemDent.className += 'list-item'
    dropItemTer.className += 'list-item'
    
    blockModal.appendChild(dropDoctorBlock)
}

function closeModal() {
    body.removeChild(blockModal)
}


const btnCreate = document.getElementById('btn-create')
btnCreate.addEventListener('click', () => {
    showModal()
})



