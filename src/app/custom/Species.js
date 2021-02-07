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

    async init(url, i){
        // var endPoint = this.maxSpecies();
        // for(var i = 1;i<=endPoint;i++){
            var api = url + i + '/';
            const response = await fetch(api);
            if(response.ok){
                const data = await response.json();
                const spec = new Species(await data.name, await data.classification);
                return spec;
            }
    }

    // async maxSpecies(){
    //     const endPointResponse = await fetch('https://swapi.booost.bg/api/species/');
    //     const endPoint = await endPointResponse;
    //     console.log(endPointResponse)
    //     return endPoint;
    // }
}