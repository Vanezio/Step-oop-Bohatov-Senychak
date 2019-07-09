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
        super();
        this._visitAge = age;

    }
}

class Dantist extends  Visit{
    constructor(type, date, name, goal, info, lastDate) {
        super();
        this._lastVisit = lastDate
    }
}

class Cardiologist extends  Visit{
    constructor(type, date, name, goal, info, age, pressure , mass, diseases) {
        super();
        this._visitAge = age;
        this._commonPressure  = pressure ;
        this._bodyIndex = mass;
        this.heartDiseases = diseases;
    }
}