import React, {useContext} from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";
import {Button} from "react-bootstrap";
import {CardDeckContext} from "../App";
import { v4 as uuidv4 } from 'uuid';

type CardListProps = {
    cardDeck: Card[]
}

export function CardList({cardDeck}: CardListProps){
    const {handleCardSelect} = useContext(CardDeckContext);

    return (
        <>
            <div className="card-deck-container">
                {cardDeck.map(card => {return (
                        <CardLayout key={card.id} {...card}/>
                    )})}
            </div>
            <div className="add-card-buttons">
                <Button onClick={()=> handleCardSelect(uuidv4())}>Owned Cards</Button>
                <Button>All Cards</Button>
            </div>
        </>
    )
}