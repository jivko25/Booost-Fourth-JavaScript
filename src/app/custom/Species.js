import EventEmitter from 'eventemitter3';

const EVENTS = {
    SPECIES_CREATED: 'species_created'
}

export default class Species extends EventEmitter{
    constructor(name, classification){
        super();

        this.name = name;
        this.classification = classification;
    }

    static get events(){
        return EVENTS;
    }


    async init(url) {
        const response = await fetch(url);
        if(response.ok){
        const data = await response.json();
    
        this.name = data.name;
        this.classification = data.classification;
    
        this.emit(Species.events.SPECIES_CREATED);
        }
      }
}