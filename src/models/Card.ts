import { v4 as uuidv4 } from 'uuid';

export class Card {
    public id: string
    constructor(
        public name: string,
        public level: number,
        public element: string,
        public north: number,
        public east: number,
        public south: number,
        public west: number,
        public image: string,
        public opponent: boolean
    ) {
        this.id = uuidv4()
    }

    copyCard(opponent: boolean){
        return new Card(this.name, this.level, this.element, this.north, this.east, this.south, this.west, this.image, opponent)
    }

    cardImagePath(){
        if (this.opponent) {
            return "images/red/"+this.image;
        } else {
            return "images/blue/"+this.image;
        }
    }
}