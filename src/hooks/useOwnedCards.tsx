import React, {useState} from 'react';
import {Card} from "../models/Card";
import {Button, Modal} from "react-bootstrap";
import {CardList} from "../components/CardList";
import _ from "lodash";

export function useOwnedCards(cards: Card[]) {

    const sortOwnedCards = _.sortBy(cards, ["level"])

    const [isShow, setIsShow] = useState(false);

    const open = () => setIsShow(true);
    const close = () => setIsShow(false);

    const cardModal =
        <Modal size="xl" show={isShow} onHide={close}>
            <Modal.Header>Your cards</Modal.Header>
            <Modal.Body>
                <CardList cardDeck={sortOwnedCards}/>
            </Modal.Body>
            <Modal.Footer>
                <Button>Save changes</Button>
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>;

    return {ownedCardModal: cardModal, open: open}
}