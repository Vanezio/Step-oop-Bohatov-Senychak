class Visit {
    constructor (date, name, goal, info){
        this._visitName = name
        this._visitDate = date
        this._visitGoal = goal
        this._extraInfo = info
 }
 }

class Therapist extends  Visit{
    constructor( date, name, goal, info, age) {
        super(date, name, goal, info);
        this._visitAge = age;
        this._visitType = 'Therapist'
    }
 }
 

class Dentist extends  Visit{
    constructor(date, name, goal, info, lastDate) {
        super(date, name, goal, info);
        this._lastVisit = lastDate
        this._visitType = 'Dentist'
    }
 }
 

class Cardiologist extends  Visit{
    constructor(date, name, goal, info, age, pressure , mass, diseases) {
        super(date, name, goal, info);
        this._visitAge = age;
        this._commonPressure  = pressure ;
        this._bodyIndex = mass;
        this._heartDiseases = diseases;
        this._visitType = 'Cardiologist'
    }
 }

//
//
//
//
//
//
//

let containerBg
let blockModal
let body
let choseDoctor
let iconClose

let alertEmpty = document.querySelector('.message-add');

function showModal () {
    containerBg = document.getElementById('dark-bg')
    containerBg.className += 'dark-bg'
    // create block modal
    blockModal = document.createElement('div')
    body = document.querySelector('body')
    body.appendChild(blockModal)
    blockModal.className += 'block-modal'
    // create drop menu 
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

    // event  click show drop width doctors
    choseDoctorText.addEventListener('click', () => {
        showDoctors()  
        choseDoctorText.style.visibility = 'hidden'
    })
    // event to close modal
    iconClose.addEventListener('click', () => {
        closeModal()
    })
}


let visitsArr=[];

const localCheck = () => {
    if(localStorage.getItem('visitArr'))  {
        visitsArr = JSON.parse(localStorage.getItem('visitArr'));
        alertEmpty.style.display = 'none'
    }
};

localCheck();

//
//
// function show doctors
function showDoctors () {
    // create block width doctors
    let dropDoctorBlock = document.createElement('div')
    let dropList = document.createElement('ul')
    let dropItemCard = document.createElement('li')
    let dropItemDent = document.createElement('li')
    let dropItemTer = document.createElement('li')
    dropDoctorBlock.appendChild(dropList)
    dropDoctorBlock.setAttribute('id', 'drop-block')

    dropList.appendChild(dropItemCard)
    dropList.appendChild(dropItemDent)
    dropList.appendChild(dropItemTer)
    // add text
    dropItemCard.innerText += 'Cardiologist'
    dropItemDent.innerText += 'Dentist'
    dropItemTer.innerText += 'therapist'


    dropList.addEventListener('click', (event) => {

        // add button create
        let btnCreate = document.createElement('input')
        btnCreate.setAttribute('type', 'submit')

        btnCreate.className += 'create-visit'
        btnCreate.innerText += 'Create Visit'
<<<<<<< HEAD

=======
      
>>>>>>> 00c4523ec2de2050a6a45bbc15b29ff49cff8b60
        let inputWraper = document.createElement('form');
        blockModal.appendChild(inputWraper);
        inputWraper.className = 'input-wrap';


        let typeEl = document.createElement('h1'),
            dateEl = document.createElement('input'),
            nameEl = document.createElement('input'),
            goalEl = document.createElement('input'),

            infoEl = document.createElement('text-area');
            infoEl = document.createElement('textarea');


        inputWraper.appendChild(typeEl);
        inputWraper.appendChild(dateEl);
        inputWraper.appendChild(nameEl);
        inputWraper.appendChild(goalEl);

        dateEl.setAttribute('placeholder', 'Date of visit')
        nameEl.setAttribute('placeholder', 'Visiter"s name')
        goalEl.setAttribute('placeholder', 'your problem is')
        infoEl.setAttribute('placeholder', 'additional info')

        if(event.target === dropItemCard) {
            typeEl.innerText = "Cardiologist"

            let ageEl = document.createElement('input'),
                pressureEl = document.createElement('input'),
                massEl = document.createElement('input'),
                diseasesEl = document.createElement('input');

            inputWraper.appendChild(ageEl);
            inputWraper.appendChild(pressureEl);
            inputWraper.appendChild(massEl);
            inputWraper.appendChild(diseasesEl);

            ageEl.setAttribute('placeholder', 'Visiter"s age')
            pressureEl.setAttribute('placeholder', 'Visiter"s common pressure')
            massEl.setAttribute('placeholder', 'Visiter"s mass index')
            diseasesEl.setAttribute('placeholder', 'do you have heart diseases?')

<<<<<<< HEAD
            inputWraper.addEventListener('submit', (event) => {
=======

            btnCreate.addEventListener('click', () => {
>>>>>>> 00c4523ec2de2050a6a45bbc15b29ff49cff8b60
                const visit = new Cardiologist(dateEl.value, nameEl.value, goalEl.value, infoEl.value, ageEl.value, pressureEl.value , massEl.value, diseasesEl.value);
                console.log(visit);
                visitsArr.push(visit);
                localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
                closeModal()
                event.preventDefault()
            })
        }else if(event.target === dropItemDent) {
            typeEl.innerText = "Dentist"

            let lDateEl = document.createElement('input')

            inputWraper.appendChild(lDateEl)

            lDateEl.setAttribute('placeholder', 'Lat visit date')

            btnCreate.addEventListener('click', (event) => {
                const visit = new Dentist(dateEl.value, nameEl.value, goalEl.value, infoEl.value, lDateEl.value);
                console.log(visit);
                visitsArr.push(visit);
                localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
                closeModal()
                event.preventDefault()
            })
        }else if(event.target === dropItemTer) {
            typeEl.innerText = "Therapist"

            let ageEl = document.createElement('input')

            inputWraper.appendChild(ageEl)

            ageEl.setAttribute('placeholder', 'Visiter"s age')

            btnCreate.addEventListener('click', (event) => {
                const visit = new Therapist(dateEl.value, nameEl.value, goalEl.value, infoEl.value, ageEl.value);
                console.log(visit);
                visitsArr.push(visit);
                localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
                closeModal()
                event.preventDefault()
            })
        }

        inputWraper.appendChild(infoEl);

        infoEl.setAttribute('maxlength', '400')


        let allInputs = document.querySelectorAll('input')

        allInputs.forEach((e) => {
            e.required = true
        })

        inputWraper.appendChild(btnCreate)

        dropList.remove()
    })
    
    // add class
    dropList.className += 'list'
    dropItemCard.className += 'list-item'
    dropItemDent.className += 'list-item'
    dropItemTer.className += 'list-item'
    // add all drop block inside blockmodal
    blockModal.appendChild(dropDoctorBlock)
}


// function to close modal 
function closeModal() {
    body.removeChild(blockModal)
    containerBg.classList.remove('dark-bg')
}

// btn create Visit

const btnCreateForm = document.getElementById('btn-create')
btnCreateForm.addEventListener('click', () => {
    showModal()
})
