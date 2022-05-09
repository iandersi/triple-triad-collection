import React from 'react';
import {Card} from "../models/Card";
import {Button, Dropdown, Modal} from "react-bootstrap";

export function useCardChange(selectedCard: Card | undefined, setSelectedCardId: (id: string | undefined)=>void, allCards: Card[]) {

    const handleClose = () => setSelectedCardId(undefined);

    const cardModal = <Modal show={!!selectedCard} onHide={handleClose}>
        <Modal.Header>{selectedCard?.name}</Modal.Header>
        <Modal.Body>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Choose Card
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {allCards.map(card => {return (<Dropdown.Item onClick={()=> console.log("click")}>{card.name}</Dropdown.Item>)})}
                </Dropdown.Menu>
            </Dropdown>
        </Modal.Body>
        <Modal.Footer>
            <Button>Save changes</Button>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>;

    return {changeCardModal: cardModal}
}