import React from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";



type CardListProps = {
    cardDeck: Card[]
}

export function OpponentCardsHandList({cardDeck}: CardListProps){

    return (
        <>
            <div className="card-hand">
                {cardDeck.map(card => {return (
                    <CardLayout key={card.id} card={card} showButtonsAndCardInfo={false} opponentCards={true}/>
                )})}
            </div>
        </>
    )
}