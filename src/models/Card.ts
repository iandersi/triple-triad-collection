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
        public image: string
    ) {
        this.id = uuidv4()
    }
}