import React from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";


type CardListProps = {
    cardDeck: Card[],
    showButtons?: boolean //Optional boolean
}
                                    //Default value = true, because boolean is optional
export function CardList({cardDeck, showButtons = true}: CardListProps){
    return (
        <>
            <div className="card-deck-container">
                {cardDeck.map(card => {return (
                        <CardLayout key={card.id} card={card} showButtonsAndCardInfo={showButtons}/>
                    )})}
            </div>
        </>
    )
}