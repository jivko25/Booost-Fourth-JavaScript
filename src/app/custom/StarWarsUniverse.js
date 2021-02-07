import EventEmitter from 'eventemitter3';
import Species from './Species';


const EVENTS = {
    MAX_SPECIES_REACHED : 'max_species_reached', 
    SPECIES_CREATED: 'species_created',
  };

export default class StarWarsUniverse extends EventEmitter{
    constructor(){
        super();

        this.species = [];
        this._maxSpecies = 10;
    }

    static get events(){
        return EVENTS;
    }

    get speciesCount(){
        var arr = this.species;
        return arr.length;
    }

    async createSpecies(){
        const spec = new Species();
        // var i = 1;
        var arr = [];
        this.on(StarWarsUniverse.events.MAX_SPECIES_REACHED, function(){
            console.log('max species reached');
        });
        this.on(StarWarsUniverse.events.SPECIES_CREATED, async function(){
                arr = this.species;
                var url = 'https://swapi.booost.bg/api/species/';
                // console.log(await spec.init(url, i));
                const res = await spec.init(url, i);
                arr.push(res);
                this.species = arr;
        });
        for(var i = 1;i<=this._maxSpecies;i++){
        this.emit(StarWarsUniverse.events.SPECIES_CREATED)
        }
        this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED)
        // }
        // this.emit(StarWarsUniverse.events.SPECIES_CREATED)
        // i++;
        // this.emit(StarWarsUniverse.events.SPECIES_CREATED)
        // this.species = arr;
        // this.speciesCount;
        // console.log(this.species)
    }
}