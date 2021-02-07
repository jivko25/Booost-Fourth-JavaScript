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


    _onSpeciesCreated(species) {
        this.species.push(species);
    
        const count = {
          speciesCount: this.species.length,
        };
    
        this.emit(StarWarsUniverse.events.SPECIES_CREATED, count);
    
        if (count.speciesCount >= this._maxSpecies) {
          this.emit(StarWarsUniverse.events.MAX_SPECIES_REACHED);
        } else {
          this.createSpecies();
        }
      }

      
  createSpecies() {
    const species = new Species();

    species.on(StarWarsUniverse.events.SPECIES_CREATED, () => {
      this._onSpeciesCreated(species);
    });

    var url = `https://swapi.dev/api/species/${this.species.length + 1}/`;

    species.init(url);
  }
}