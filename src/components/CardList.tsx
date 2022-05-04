import React, {useContext} from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";
import {Button} from "react-bootstrap";
import {CardDeckContext} from "../App";

type CardListProps = {
    cardDeck: Card[]
}

export function CardList({cardDeck}: CardListProps){
    const {handleCardAdd} = useContext(CardDeckContext);
    return (
        <>
            <div className="card-deck-container">
                {cardDeck.map(card => {return (
                        <CardLayout key={card.id} {...card}/>
                    )})}
            </div>
            <div>
                <Button onClick={handleCardAdd}>Add Card</Button>
            </div>
        </>
    )
}