class Visit {
    constructor (date, name, goal, info){
        this._visitName = name
        this._visitDate = date
        this._visitGoal = goal
        this._extraInfo = info
    }
// creat visit card metod
    createVisitCard (visitObj) {
        let cardBlock = document.createElement('div')
        cardBlock.className = 'card-style'
        mainTable.appendChild(cardBlock)
// variables
        let visiterName,
            nameAndDeleteWrap,
            doctor,
            showMore,
            showMoreContent,
            deleteCard,
            additional
        //creat info in cards with correct doctors
        if(visitObj._visitType === 'Therapist'){
            additional = [`${'date: '}`+`${visitObj._visitDate}`, `${'problem: '}`+ `${visitObj._visitGoal}`, `${'age: '}`+ `${visitObj._visitAge}`, `${'comment: '}`+ `${visitObj._extraInfo}`]
        } else if(visitObj._visitType === 'Dentist'){
            additional = [`${'date: '}`+`${visitObj._visitDate}`, `${'problem: '}`+ `${visitObj._visitGoal}`, `${'last visit: '}`+`${visitObj._lastVisit}`, `${'comment: '}`+ `${visitObj._extraInfo}`]
        } else if(visitObj._visitType === 'Cardiologist'){
            additional = [`${'date: '}`+`${visitObj._visitDate}`, `${'problem: '}`+ `${visitObj._visitGoal}`, `${'age: '}`+ `${visitObj._visitAge}`, `${'pressure: '}`+ `${visitObj._commonPressure}`, `${'index: '}`+`${visitObj._bodyIndex}`, `${'diseases: '}`+`${visitObj._heartDiseases}`, `${'comment: '}`+ `${visitObj._extraInfo}`]
        }
        // block with name and close icon
        nameAndDeleteWrap = document.createElement('div')
        cardBlock.appendChild(nameAndDeleteWrap)
        nameAndDeleteWrap.className = 'top-wrapper'
        visiterName = document.createElement("h1")
        nameAndDeleteWrap.appendChild(visiterName)
        visiterName.innerText = visitObj._visitName
        // close icon
        deleteCard = document.createElement('div')
        nameAndDeleteWrap.appendChild(deleteCard)
        deleteCard.innerText = 'X'
        deleteCard.className = 'delete-card-btn'
        // close icon event
        deleteCard.addEventListener('click', () => {
            let cardsArr = document.querySelectorAll('.card-style')
            // loop for delete card and data from local storage
            cardsArr.forEach ((el, i) => {
                if(cardBlock === el){
                    cardBlock.remove()
                    visitsArr.splice(i, 1)
                    localStorage.clear()
                    localStorage.setItem('visitArr', JSON.stringify(visitsArr))
                    checkEmpty()
                }
            })
        })
        // create rest card with info
        doctor = document.createElement('h2')
        cardBlock.appendChild(doctor)
        doctor.innerText = visitObj._visitType
        showMore = document.createElement('p')
        cardBlock.appendChild(showMore)
        showMore.innerText = 'show more'
        showMore.className = 'show-more-btn'
        showMore.setAttribute('data-check', '1')
        //event show rest info about visiter
        showMore.addEventListener('click', () => {
            switch (showMore.dataset.check) {
                case '1' :
                    showMore.dataset.check = '2'
                    showMore.innerText = 'show less'
                    showMoreContent.style.display = 'block'
                    break
                case '2' :
                    showMore.dataset.check = '1'
                    showMore.innerText = 'show more'
                    showMoreContent.style.display = 'none'
                    break
            }
        })
        showMoreContent = document.createElement('div')
        cardBlock.appendChild(showMoreContent)
        showMoreContent.className = 'showMoreStyle'
        showMoreContent.style.display = 'none'
        //creat p element for every new el
        additional.forEach((elem)=>{
            let addText = document.createElement('p')
            showMoreContent.appendChild(addText)
            addText.classNamec = 'more-info-item'
            addText.innerText = elem
        })
        this.card = cardBlock
        this.show = showMore
        this.delete = deleteCard
        // call drag and drop and check function
        const drag = new Visit()
        drag.dragNDrop(this.card, this.show, this.delete)
        checkEmpty()
    }
// drag and drop metod
    dragNDrop (cardBlock, showMore, deleteCard) {
        let shiftY, shiftX

        let startY, startX

        let dragStatus = false

        function px(c){
            return c+'px'
        }
        // mousedown function
        cardBlock.addEventListener('mousedown', function some (event){
            if (event.target !== showMore && deleteCard) {
                dragStatus = true

                startY = cardBlock.style.top
                console.log(startY);
                startX = cardBlock.style.left
                console.log(startX);

                let rect = cardBlock.getBoundingClientRect()
                shiftY = event.clientY - rect.top
                shiftX = event.clientX - rect.left
                cardBlock.style.zIndex = '2'
                cardBlock.style.position = 'fixed'
                move(cardBlock, event.pageX - shiftX, event.pageY - shiftY)
            }
        })
        // mouseup function
        cardBlock.addEventListener('mouseup', function (event) {
            if(dragStatus === true) {
                if (event.target !== showMore && deleteCard) {
                    dragStatus = false

                    let rect = cardBlock.getBoundingClientRect()
                    shiftY = cardBlock.clientY - rect.top
                    shiftX = cardBlock.clientX - rect.left

                    cardBlock.style.zIndex = '1'

                    cardBlock.style.position = 'fixed'

                    let elUnderCursor

                    let checkW = mainTable.offsetWidth
                    let checkH = mainTable.offsetHeight
                    let checkL = cardBlock.style.left.replace('px','')
                    let checkT = cardBlock.style.top.replace('px','')

                    console.log('W' + checkW);
                    console.log("h"+checkH);
                    console.log("L"+checkL);
                    console.log("T"+checkT);

                    document.querySelectorAll('.card-style').forEach((elemelem) => {
                        elemelem.style.visibility = 'hidden'
                    })
                    if(checkW < checkL*2 && checkH < checkT*2){
                        elUnderCursor = document.elementFromPoint(event.pageX + event.offsetX, event.pageY + event.offsetY)
                    } else {
                        elUnderCursor = document.elementFromPoint(event.pageX - event.offsetX, event.pageY - event.offsetY)
                    }
                    console.log(elUnderCursor);
                    document.querySelectorAll('.card-style').forEach((elemelem) => {
                        elemelem.style.visibility = 'visible'
                    })

                    console.log(startY);
                    console.log(startX);
                    if(elUnderCursor !== mainTable){
                        cardBlock.style.top = startY
                        cardBlock.style.left = startX
                    } else {
                        move(cardBlock, cardBlock.pageX - shiftX, cardBlock.pageY - shiftY)
                    }
                }
            }
        })
        cardBlock.ondragstart = function(event) {
            event.preventDefault()
        };
        document.addEventListener('mousemove', function(event){
            if(dragStatus){
                if (event.target !== showMore && deleteCard) {
                    move(cardBlock, event.pageX - shiftX, event.pageY - shiftY)
                } else {
                    dragStatus = false
                }
            }
        })
        function move(el, x, y){
            el.style.top = px(y)
            el.style.left = px(x)
        }
    }
}
class Therapist extends  Visit {
    constructor( date, name, goal, info,age) {
        super(date, name, goal, info,)
        this._visitAge = age
        this._visitType = 'Therapist'
    }
}

class Dentist extends  Visit {
    constructor(date, name, goal, info, lastDate) {
        super(date, name, goal, info,);
        this._lastVisit = lastDate
        this._visitType = 'Dentist'
    }
}

class Cardiologist extends  Visit {
    constructor(date, name, goal, info, age, pressure , mass, diseases) {
        super(date, name, goal, info,);
        this._visitAge = age
        this._commonPressure  = pressure
        this._bodyIndex = mass
        this._heartDiseases = diseases
        this._visitType = 'Cardiologist'
    }
}
// global var
let containerBg
let blockModal
let body
let choseDoctor
let iconClose
let mainTable = document.querySelector('#main')
// get z-index for main
mainTable.zIndex = '1'
// the red text 'no items...'
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
    choseDoctorText.innerText += 'Choice doctors'
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
        choseDoctor.className = 'doctors-none'
    })
    // events to close modal
    iconClose.addEventListener('click', () => {
        closeModal()
    })
}
// creat obj for call metods
const visit = new Visit ()
// empty aray
let visitsArr=[];
const localCheck = () => {
    if(localStorage.getItem('visitArr'))  {
        visitsArr = JSON.parse(localStorage.getItem('visitArr'))
        visitsArr.forEach((elem)=>{
            visit.createVisitCard(elem)
        })
    }
}
const checkEmpty = () => {
    if(document.querySelector('.card-style')){
        alertEmpty.style.display = 'none'
    } else {
        alertEmpty.style.display = 'block'
    }
}
localCheck()
checkEmpty()
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
// event for list doctors
    dropList.addEventListener('click', (event) => {
        // add button create
        let btnCreate = document.createElement('input')
        btnCreate.setAttribute('type', 'submit')
        btnCreate.className += 'create-visit'
        btnCreate.innerText += 'Create Visit'
// create form
        let inputWraper = document.createElement('form')
        blockModal.appendChild(inputWraper)
        inputWraper.className = 'input-wrap'
        let typeEl = document.createElement('h1'),
            dateEl = document.createElement('input'),
            nameEl = document.createElement('input'),
            goalEl = document.createElement('input');
        infoEl = document.createElement('text-area');
        infoEl = document.createElement('textarea');
        inputWraper.appendChild(typeEl)
        inputWraper.appendChild(dateEl)
        inputWraper.appendChild(nameEl)
        inputWraper.appendChild(goalEl)
        dateEl.setAttribute('placeholder', 'Date of visit is ...')
        nameEl.setAttribute('placeholder', 'Visiter"s name')
        goalEl.setAttribute('placeholder', 'My problem is ...')
        infoEl.setAttribute('placeholder', 'additional info')
// check who is checed
        if(event.target === dropItemCard) {
            typeEl.innerText = "Cardiologist"
            let ageEl = document.createElement('input'),
                pressureEl = document.createElement('input'),
                massEl = document.createElement('input'),
                diseasesEl = document.createElement('input')
            inputWraper.appendChild(ageEl)
            inputWraper.appendChild(pressureEl)
            inputWraper.appendChild(massEl)
            inputWraper.appendChild(diseasesEl)
            ageEl.setAttribute('placeholder', 'My age is ...')
            pressureEl.setAttribute('placeholder', 'My common pressure is ...')
            massEl.setAttribute('placeholder', 'My mass index is ...')
            diseasesEl.setAttribute('placeholder', 'Do you have heart diseases?')
            inputWraper.addEventListener('submit', (event) => {
                const visit = new Cardiologist(dateEl.value, nameEl.value, goalEl.value, infoEl.value, ageEl.value, pressureEl.value , massEl.value, diseasesEl.value);
                console.log(visit);
                visitsArr.push(visit);
                localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
                createVisitCard(visit)
                closeModal()
                event.preventDefault()
            })
        } else if(event.target === dropItemDent) {
            typeEl.innerText = "Dentist"
            let lDateEl = document.createElement('input')
            inputWraper.appendChild(lDateEl)
            lDateEl.setAttribute('placeholder', 'My last visit was ...')
            inputWraper.addEventListener('submit', (event) => {
                const visit = new Dentist(dateEl.value, nameEl.value, goalEl.value, infoEl.value, lDateEl.value);
                console.log(visit);
                visitsArr.push(visit);
                localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
                createVisitCard(visit)
                closeModal()
                event.preventDefault()
            })
        } else if(event.target === dropItemTer) {
            typeEl.innerText = "Therapist"
            let ageEl = document.createElement('input')
            inputWraper.appendChild(ageEl)
            ageEl.setAttribute('placeholder', 'My age is ...')
            inputWraper.addEventListener('submit', (event) => {
                const visit = new Therapist(dateEl.value, nameEl.value, goalEl.value, infoEl.value, ageEl.value);
                console.log(visit);
                visitsArr.push(visit);
                localStorage.setItem("visitArr" , JSON.stringify(visitsArr))
                createVisitCard(visit)
                closeModal()
                event.preventDefault()
            })
        }
        inputWraper.appendChild(infoEl)
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