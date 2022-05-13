import React, {useContext} from 'react';
import {Card} from "../models/Card";
import CardLayout from "./CardLayout";
import {CardDeckContext} from "../App";


type CardListProps = {
    cardDeck: Card[],
    showButtons?: boolean, //Optional boolean
}
                                    //Default value = true, because boolean is optional
export function CardsInHandList({cardDeck, showButtons = true}: CardListProps){
    const {selectedCardToPlay} = useContext(CardDeckContext);

    return (
        <>
            <div className="card-hand">
                {cardDeck.map(card => {return (
                        <CardLayout key={card.id} card={card} showButtonsAndCardInfo={showButtons} highlight={card.id === selectedCardToPlay?.id}/>
                    )})}
            </div>
        </>
    )
}