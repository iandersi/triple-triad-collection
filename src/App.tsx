import React, {useEffect, useState} from 'react';
import './css/App.css';
import {Card} from "./models/Card";
import {CardsInHandList} from "./components/CardsInHandList";
import {useCardChange} from "./hooks/useCardChange";
import cardData from "./allCards.json";
import _ from "lodash";
import {useOwnedCards} from "./hooks/useOwnedCards";
import {GameBoardLayout} from "./components/GameBoardLayout";
import {OpponentCardsHandList} from "./components/OpponentCardsHandList";
import {useAllCards} from "./hooks/useAllCards";
import {PlayedCard} from "./models/PlayedCard";
import {Button, Modal, ModalBody, ModalFooter, ModalTitle} from "react-bootstrap";
import {render} from "react-dom";

type CardDeckContextType = {
    handleCardDelete: (id: string) => void,
    handleCardSelect: (id: string) => void,
    handleCardAdd: () => void,
    handleCardChange: (id: string, card: Card) => void,
    handleSelectedCardToPlay: (card: Card) => void,
    selectedCardToPlay: Card | undefined
}

export const CardDeckContext = React.createContext<CardDeckContextType>({} as CardDeckContextType);

const allCards = cardData.map(card => new Card(card.name, card.level, card.element, card.north, card.east, card.south, card.west, card.image, false));

const starterDeck = _.take(_.shuffle(allCards), 5);
const starterOpponentDeck = _.take(_.shuffle(allCards), 5).map(card => card.copyCard(true));
const getRandomCards = _.take(_.shuffle(allCards), 10);

const cardsOwned = [...starterDeck, ...getRandomCards].map(card => card.copyCard(false));

function App() {

    const [selectedCardId, setSelectedCardId] = useState<string>();
    const [cardHand, setCardHand] = useState(starterDeck);
    const [opponentHand, setOpponentHand] = useState(starterOpponentDeck);
    const [ownedCards, setOwnedCards] = useState(cardsOwned);
    const [selectedCardToPlay, setSelectedCardToPlay] = useState<Card>();
    const [gameboard, setGameboard] = useState<PlayedCard[]>([]);
    const selectedCard = cardHand.find(card => card.id === selectedCardId);

    const {changeCardModal} = useCardChange(selectedCard, setSelectedCardId, ownedCards);
    const {ownedCardModal, open} = useOwnedCards(ownedCards);
    const {allCardsModal, openModal} = useAllCards(allCards);

    //Match results
    const [show, setShow]=useState(false);
    const [outcomeMessage, setOutcomeMessage] = useState("");

    function handleCloseAndReset(){
        setShow(false);
    }


    useEffect(()=>{
        setTimeout(() => {
            opponentTurn();
        }, 1000);
    }, [cardHand]);


    const cardDeckContextValue: CardDeckContextType = {
        handleCardAdd,
        handleCardDelete: handlePlayerCardRemove,
        handleCardSelect,
        handleCardChange,
        handleSelectedCardToPlay,
        selectedCardToPlay
    }

    function handlePlayerCardRemove(id: string) {
        // console.log(id);
        const newArray = cardHand.filter(card => card.id !== id);
        // console.log(newArray);
        setCardHand(newArray);
    }

    function handleOpponentCardRemove(id: string) {
        // console.log(id);
        const newArray = opponentHand.filter(card => card.id !== id);
        // console.log(newArray);
        setOpponentHand(newArray);
    }

    function handleCardSelect(id: string) {
        // console.log(id);
        setSelectedCardId(id);
    }

    function handleCardAdd() {
        const newCard = new Card("", 0, "", 0, 0, 0, 0, "", false);
        setSelectedCardId(newCard.id);
        setCardHand([...cardHand, newCard]);
    }

    function handleCardChange(id: string, card: Card) {
        const newCards = [...cardHand];
        const index = newCards.findIndex(card => card.id === id);
        newCards[index] = card;
        setCardHand(newCards);
    }

    function handleSelectedCardToPlay(card: Card) {
        if (card === selectedCardToPlay) {
            setSelectedCardToPlay(undefined);
        } else {
            setSelectedCardToPlay(card);
        }
    }

    function playerTurn(row: number, slot: number)  {
        if (!selectedCardToPlay){
            return;
        }
        let playedCard = new PlayedCard(selectedCardToPlay, slot, row);
        convertCardsOnGameBoard(playedCard);
        const newGameboard = [...gameboard, playedCard];
        setGameboard(newGameboard);
        handlePlayerCardRemove(selectedCardToPlay.id);
        setSelectedCardToPlay(undefined);
        console.log(gameboard);

        if (cardHand.length === 1) {
            checkWinner();
        }
    }

    function opponentTurn(){
        let gameBoardCoordinates = getNextOpponentMove();
        if (gameBoardCoordinates === undefined) {
            console.log('No available slots!');
            return;
        }

        let row = gameBoardCoordinates[0];
        let slot = gameBoardCoordinates[1];

        let cardToPlay = getRandomOpponentCard();
        let playedCard = new PlayedCard(cardToPlay, slot, row);
        convertCardsOnGameBoard(playedCard);
        const newGameBoard = [...gameboard, playedCard];
        setGameboard(newGameBoard);
        handleOpponentCardRemove(playedCard.card.id);
    }


    function getRandomOpponentCard() {
        return opponentHand[Math.floor(Math.random() * opponentHand.length)];
    }

    function convertCardsOnGameBoard(playedSlot: PlayedCard) {
        let north = playedSlot.row - 1;
        let west = playedSlot.slot - 1;
        let south = playedSlot.row + 1;
        let east = playedSlot.slot + 1;

        let northSlot = gameboard.find(gameboardSlot => gameboardSlot.slot === playedSlot.slot && gameboardSlot.row === north);
        if (northSlot) {
            if (playedSlot.card.north > northSlot.card.south) {
                northSlot.card.opponent = playedSlot.card.opponent;
            }
        }

        let westSlot = gameboard.find(gameboardSlot => gameboardSlot.slot === west && gameboardSlot.row === playedSlot.row);
        if (westSlot) {
            if (playedSlot.card.west > westSlot.card.east) {
                westSlot.card.opponent = playedSlot.card.opponent;
            }
        }

        let southSlot = gameboard.find(gameboardSlot => gameboardSlot.slot === playedSlot.slot && gameboardSlot.row === south);
        if (southSlot) {
            if (playedSlot.card.south > southSlot.card.north) {
                southSlot.card.opponent = playedSlot.card.opponent;
            }
        }

        let eastSlot = gameboard.find(gameboardSlot => gameboardSlot.slot === east && gameboardSlot.row === playedSlot.row);
        if (eastSlot) {
            if (playedSlot.card.east > eastSlot.card.west) {
                eastSlot.card.opponent = playedSlot.card.opponent;
            }
        }

    }

    function getNextOpponentMove(){
        for (const playedCard of gameboard) {
            console.log(playedCard)

            if (playedCard.card.opponent) {
                continue;
            }

            let north = playedCard.row - 1;
            let west = playedCard.slot - 1;
            let south = playedCard.row + 1;
            let east = playedCard.slot + 1;

            if (isCoordinateValid(north) && !gameboard.find(value => value.row === north && value.slot === playedCard.slot)){
                return [north, playedCard.slot]
            } else if (isCoordinateValid(west) && !gameboard.find(value => value.slot === west && value.row === playedCard.row)){
                return [playedCard.row, west]
            }else if (isCoordinateValid(south) && !gameboard.find(value => value.row === south && value.slot === playedCard.slot)){
                return [south, playedCard.slot]
            }else if (isCoordinateValid(east) && !gameboard.find(value => value.slot === east && value.row === playedCard.row)){
                return [playedCard.row, east]
            }
        }
    }

    function isCoordinateValid(number: number) {
        return !(number < 0 || number > 2);
    }

    function checkWinner(){
        let opponentCards: number = 0;
        let playerCards: number = 0;

        for (const card of gameboard) {

            if (card.card.opponent){
                opponentCards++;
            } else if (!card.card.opponent) {
                playerCards++;
            }

            console.log(opponentCards);
            console.log(playerCards);
        }

        if (opponentCards > playerCards) {
            setOutcomeMessage("You lose!");
            setShow(true);
        } else if (playerCards > opponentCards) {
            setOutcomeMessage("You win!");
            setShow(true);
        } else if (opponentCards === playerCards) {
            setOutcomeMessage("Draw.");
            setShow(true);
        }

    }

    function tradeRule(){

    }

    return (
        <CardDeckContext.Provider value={cardDeckContextValue}>

            <div className="all-content-container">

                {/*<button onClick={()=> checkWinner()}>Test</button>*/}

                <div>
                    <div>
                        <OpponentCardsHandList cardDeck={opponentHand}/>
                    </div>
                    <GameBoardLayout playerTurn={playerTurn} gameboard={gameboard}/>
                    <div>
                        <CardsInHandList cardDeck={cardHand}/>
                    </div>
                </div>

                <div className="card-management-bar">
                    <button onClick={() => open()}>Owned Cards</button>
                    <button onClick={() => openModal()}>All Cards</button>
                </div>

            </div>

            {changeCardModal}
            {ownedCardModal}
            {allCardsModal}

            <Modal show={show} onHide={handleCloseAndReset}>
                <ModalBody>
                    <div>{outcomeMessage}</div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleCloseAndReset}>Close</Button>
                </ModalFooter>
            </Modal>

        </CardDeckContext.Provider>
    );
}

export default App;
