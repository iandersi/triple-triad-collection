import React, {useContext} from "react";
import {Card} from "react-bootstrap";
import {Card as CardModel} from "../models/Card"
import {CardDeckContext} from "../App";

type CardLayoutProps = {
    card: CardModel,
    showButtonsAndCardInfo: boolean, //Mandatory boolean
    highlight?: boolean,
    opponentCard?: boolean,
    isCardPlayable?: boolean
}

export default function CardLayout({card, showButtonsAndCardInfo, highlight, opponentCard, isCardPlayable}: CardLayoutProps) {
    const {handleCardDelete, handleCardSelect, handleSelectedCardToPlay} = useContext(CardDeckContext);
    let cardImagePath;
    let booleanClassName: string;

    if (!opponentCard) {
        cardImagePath = "images/blue/"+card.image;
    } else {
        cardImagePath = "images/red/"+card.image;
    }

    function handleOnClick(){
        if (!opponentCard && isCardPlayable) {
            handleSelectedCardToPlay(card);
        } else {
            return;
        }
    }

    if (highlight) {
        booleanClassName = "highlight";
    } else {
        booleanClassName = "";
    }

    return (
        <>
            <Card onClick={()=> handleOnClick()} className={booleanClassName}>
                <Card.Img variant="top" src={cardImagePath}/>
                <Card.Body>
                    <div className="title-and-edit-delete-button-container">
                        <Card.Title>{card.name}</Card.Title>
                        {showButtonsAndCardInfo &&
                            <div className="edit-delete-button-container">
                            <button className="change" onClick={()=> handleCardSelect(card.id)}>Change</button>
                            <button className="danger" onClick={() => handleCardDelete(card.id)}>Remove</button>
                        </div>
                        }
                    </div>
                    {showButtonsAndCardInfo &&
                        <div>
                            <Card.Text>Rank: {card.north}{card.west}{card.east}{card.south}</Card.Text>
                            <Card.Text>Element: {card.element}</Card.Text>
                            <Card.Text>Level: {card.level}</Card.Text>
                        </div>
                    }
                </Card.Body>
            </Card>
        </>
    )
}