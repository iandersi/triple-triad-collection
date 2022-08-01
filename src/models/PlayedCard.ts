import {Card} from "./Card";

export class PlayedCard {
    constructor(
        public card: Card,
        public slot: number,
        public row: number
    ) {}
}