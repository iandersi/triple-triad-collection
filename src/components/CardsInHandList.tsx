import React, {useContext} from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";
import {CardDeckContext} from "../App";


type CardListProps = {
    cardDeck: Card[]
}

export function CardsInHandList({cardDeck}: CardListProps){
    const {selectedCardToPlay} = useContext(CardDeckContext);

    return (
        <>
            <div className="card-hand">
                {cardDeck.map(card => {return (
                        <CardLayout key={card.id} card={card} showButtonsAndCardInfo={true} highlight={card.id === selectedCardToPlay?.id} isCardPlayable={true}/>
                    )})}
            </div>
        </>
    )
}