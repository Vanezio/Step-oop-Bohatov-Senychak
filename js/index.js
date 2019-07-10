
class Visit {
    constructor (type, date, name, goal, info){
        this._visitName = name
        this._visitDate = date
        this._visitType = type
        this._visitGoal = goal
        this._extraInfo = info
}
}

class Therapist extends  Visit{
    constructor(type, date, name, goal, info, age) {
        super(type, date, name, goal, info);
        this._visitAge = age;
    }
}

class Dentist extends  Visit{
    constructor(type, date, name, goal, info, lastDate) {
        super(type, date, name, goal, info);
        this._lastVisit = lastDate
    }
}

class Cardiologist extends  Visit{
    constructor(type, date, name, goal, info, age, pressure , mass, diseases) {
        super(type, date, name, goal, info);
        this._visitAge = age;
        this._commonPressure  = pressure ;
        this._bodyIndex = mass;
        this.heartDiseases = diseases;
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

    // add button create
    let btnCreateVisit = document.createElement('button')
    blockModal.appendChild(btnCreateVisit)
    btnCreateVisit.className += 'create-visit'
    btnCreateVisit.innerText += 'Create Visit'

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

        let inputWraper = document.createElement('div')
        blockModal.appendChild(inputWraper);

        let typeEl = document.createElement('input'),
            dateEl = document.createElement('input'),
            nameEl = document.createElement('input'),
            goalEl = document.createElement('input'),
            infoEl = document.createElement('input');

        inputWraper.appendChild(typeEl);
        inputWraper.appendChild(dateEl);
        inputWraper.appendChild(nameEl);
        inputWraper.appendChild(goalEl);
        inputWraper.appendChild(infoEl);

        let type = typeEl.innerText,
            date = dateEl.innerText,
            name = nameEl.innerText,
            goal = goalEl.innerText,
            info = infoEl.innerText;

        if(event.target === dropItemCard) {
            let ageEl = document.createElement('input'),
                pressureEl = document.createElement('input'),
                massEl = document.createElement('input'),
                diseasesEl = document.createElement('input');

            inputWraper.appendChild(ageEl);
            inputWraper.appendChild(pressureEl);
            inputWraper.appendChild(massEl);
            inputWraper.appendChild(diseasesEl);

            let age = ageEl.innerText,
                pressure = pressureEl.innerText,
                mass = massEl.innerText,
                diseases = diseasesEl.innerText;

            const visit = new Cardiologist(type, date, name, goal, info, age, pressure , mass, diseases);
            console.log(visit);
            visitsArr.push(visit);
            localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
        }else if(event.target === dropItemDent) {
            let lastDate = prompt('write here');
            const visit = new Dentist(type, date, name, goal, info, lastDate);
            console.log(visit);
            visitsArr.push(visit);
            localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
        }else if(event.target === dropItemTer) {
            let age = prompt('write here');
            const visit = new Therapist(type, date, name, goal, info, age);
            console.log(visit);
            visitsArr.push(visit);
            localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
        }
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

const btnCreate = document.getElementById('btn-create')
btnCreate.addEventListener('click', () => {
    showModal()
})
