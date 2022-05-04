import { v4 as uuidv4 } from 'uuid';

export class Card {
    public id: string
    constructor(
        public name: string,
        public level: number,
        public element: string,
        public ranks: string,
        public image: string
    ) {
        this.id = uuidv4()
    }
}