import React from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";


type CardListProps = {
    cardDeck: Card[]
}

export function CardList({cardDeck}: CardListProps){
    return (
        <>
            <div className="card-deck-container">
                {cardDeck.map(card => {return (<CardLayout card={card} showButtonsAndCardInfo={false} isCardPlayable={false}/>
                )})}
            </div>
        </>
    )
}