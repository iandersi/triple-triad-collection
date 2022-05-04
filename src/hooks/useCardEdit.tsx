import React, {useContext, useState} from 'react';
import {CardDeckContext} from "../App";
import {Card} from "../models/Card";
import {Button, Modal} from "react-bootstrap";

export function useCardEdit(selectedCard: Card | undefined, setSelectedCardId: (id: string | undefined)=>void) {
    const {handleCardChange, handleCardSelect} = useContext(CardDeckContext);

    const handleClose = () => setSelectedCardId(undefined);

    const cardModal = <Modal show={!!selectedCard} onHide={handleClose}>
        <Modal.Header>{selectedCard?.name}</Modal.Header>
        <Modal.Body>
            <p>Card</p>
        </Modal.Body>
        <Modal.Footer>
            <Button>Save changes</Button>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>;

    return {cardModal}
}