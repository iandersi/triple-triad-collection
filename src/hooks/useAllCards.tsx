import React, {useState} from 'react';
import {Card} from "../models/Card";
import {Button, Modal} from "react-bootstrap";
import {CardList} from "../components/CardList";
import _ from "lodash";

export function useAllCards(allCards: Card[]) {

    const sortAllCards = _.sortBy(allCards, ["level"])

    const [isShow, setIsShow] = useState(false);

    const openModal = () => setIsShow(true);
    const close = () => setIsShow(false);

    const cardModal =
        <Modal size="xl" show={isShow} onHide={close}>
            <Modal.Header>All cards</Modal.Header>
            <Modal.Body>
                <CardList cardDeck={sortAllCards}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>;

    return {allCardsModal: cardModal, openModal: openModal}
}