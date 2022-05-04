import React, {useContext} from "react";
import {Button, Card} from "react-bootstrap";
import {Card as ModelCard} from "../models/Card";
import {CardDeckContext} from "../App";

export default function CardLayout(card: ModelCard) {
    const {handleCardDelete, handleCardSelect} = useContext(CardDeckContext);
    const cardImagePath = "images/"+card.image;

    return (
        <>
            <Card>
                <Card.Img variant="top" src={cardImagePath}/>
                <Card.Body>
                    <div className="title-and-edit-delete-button-container">
                        <Card.Title>{card.name}</Card.Title>
                        <div className="edit-delete-button-container">
                            <button className="edit" onClick={()=> handleCardSelect(card.id)}>Edit</button>
                            <button className="danger" onClick={() => handleCardDelete(card.id)}>Delete</button>
                        </div>
                    </div>
                    <Card.Text>Rank: {card.ranks}</Card.Text>
                    <Card.Text>Element: {card.element}</Card.Text>
                    <Card.Text>Level: {card.level}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}