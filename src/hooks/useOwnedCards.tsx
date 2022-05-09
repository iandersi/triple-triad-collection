import React from 'react';
import {Card} from "../models/Card";
import {Button, Dropdown, Modal} from "react-bootstrap";

export function useOwnedCards(selectedCardId: string | undefined, setSelectedCardId: (id: string | undefined)=>void, ownedCards: Card[]) {

    const handleClose = () => setSelectedCardId(undefined);

    const cardModal = <Modal show={!!selectedCardId} onHide={handleClose}>
        <Modal.Header>test</Modal.Header>
        <Modal.Body>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Choose Card
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {ownedCards.map(card => {return (<Dropdown.Item onClick={()=> console.log("click")}>{card.name}</Dropdown.Item>)})}
                </Dropdown.Menu>
            </Dropdown>
        </Modal.Body>
        <Modal.Footer>
            <Button>Save changes</Button>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>;

    return {ownedCardModal: cardModal}
}