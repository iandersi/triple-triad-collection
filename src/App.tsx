import React, {useState} from 'react';
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

type CardDeckContextType = {
    handleCardDelete: (id: string) => void,
    handleCardSelect: (id: string) => void,
    handleCardAdd: () => void,
    handleCardChange: (id: string, card: Card) => void,
    handleSelectedCardToPlay: (card: Card) => void,
    selectedCardToPlay: Card | undefined,
    addCardToGameBoard: (row: number, position: number) => void
}

export const CardDeckContext = React.createContext<CardDeckContextType>({} as CardDeckContextType);

const allCards = cardData.map(card => new Card(card.name, card.level, card.element, card.north, card.east, card.south, card.west, card.image, false));

const starterDeck = _.take(_.shuffle(allCards), 5);
const opponentDeck = _.take(_.shuffle(allCards), 5);
const getRandomCards = _.take(_.shuffle(allCards), 10);

const cardsOwned = [...starterDeck, ...getRandomCards].map(card => card.copyCard(false));
const opponentCardsOwned = opponentDeck.map(card => card.copyCard(true));


const gameBoardArray: (Card | undefined)[][] = [
    [, , ,],
    [, , ,],
    [, , ,],
];

function App() {

    const [selectedCardId, setSelectedCardId] = useState<string>();
    const [cardHand, setCardHand] = useState(starterDeck);
    const [opponentHand, setOpponentHand] = useState(opponentCardsOwned);
    const [ownedCards, setOwnedCards] = useState(cardsOwned);
    const [selectedCardToPlay, setSelectedCardToPlay] = useState<Card>();
    const [cardsOnGameBoard, setCardsOnGameBoard] = useState<(Card | undefined)[][]>(gameBoardArray);

    const selectedCard = cardHand.find(card => card.id === selectedCardId);

    const {changeCardModal} = useCardChange(selectedCard, setSelectedCardId, ownedCards);
    const {ownedCardModal, open} = useOwnedCards(ownedCards);
    const {allCardsModal, openModal} = useAllCards(allCards);

    // console.log(selectedCardToPlay)

    const cardDeckContextValue: CardDeckContextType = {
        handleCardAdd,
        handleCardDelete: handlePlayerCardRemove,
        handleCardSelect,
        handleCardChange,
        handleSelectedCardToPlay,
        selectedCardToPlay,
        addCardToGameBoard: playerPlayCardTurn
    }

    function handlePlayerCardRemove(id: string) {
        console.log(id);
        const newArray = cardHand.filter(card => card.id !== id);
        console.log(newArray);
        setCardHand(newArray);
    }

    function handleOpponentCardRemove(id: string) {
        console.log(id);
        const newArray = opponentHand.filter(card => card.id !== id);
        console.log(newArray);
        setOpponentHand(newArray);
    }

    function handleCardSelect(id: string) {
        console.log(id);
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

    function playerPlayCardTurn(row: number, position: number) {
        if (!selectedCardToPlay) {
            return
        }
        convertCardsOnGameBoard(row, position, selectedCardToPlay);
        const newGameBoard = [...cardsOnGameBoard];
        newGameBoard[row][position] = selectedCardToPlay;
        setCardsOnGameBoard(newGameBoard);
        handlePlayerCardRemove(selectedCardToPlay.id);
        setSelectedCardToPlay(undefined);
        setTimeout(() => {
            opponentPlayCardTurn()
        }, 1000);

    }

    function opponentPlayCardTurn() {
        let gameBoardCoordinates = getNextOpponentMove();
        if (gameBoardCoordinates === null) {
            console.log('No available slots!');
            return;
        }

        let row = gameBoardCoordinates[0];
        let slot = gameBoardCoordinates[1];

        console.log(gameBoardCoordinates);
        let cardToPlay = getRandomOpponentCard();
        convertCardsOnGameBoard(row, slot, cardToPlay);
        const newGameBoard = [...cardsOnGameBoard];
        newGameBoard[row][slot] = cardToPlay;
        setCardsOnGameBoard(newGameBoard);
        handleOpponentCardRemove(cardToPlay.id);

    }

    function getRandomOpponentCard() {
        return opponentHand[Math.floor(Math.random() * opponentHand.length)];
    }

    function convertCardsOnGameBoard(row: number, slot: number, playedCard: Card) {

        let northSlotIndex = row - 1;
        let westSlotIndex = slot - 1;
        let southSlotIndex = row + 1;
        let eastSlotIndex = slot + 1;

        if (isValidGameBoardIndex(northSlotIndex)) {
            let northCard = gameBoardArray[northSlotIndex][slot];
            if (northCard) {
                if (playedCard.north > northCard.south) {
                    northCard.opponent = playedCard.opponent;
                }
            }
        }

        if (isValidGameBoardIndex(westSlotIndex)) {
            let westCard = gameBoardArray[row][westSlotIndex];
            if (westCard) {
                if (playedCard.west > westCard.east) {
                    westCard.opponent = playedCard.opponent;
                }
            }
        }

        if (isValidGameBoardIndex(southSlotIndex)) {
            let southCard = gameBoardArray[southSlotIndex][slot];
            if (southCard) {
                if (playedCard.south > southCard.north) {
                    southCard.opponent = playedCard.opponent;
                }
            }
        }

        if (isValidGameBoardIndex(eastSlotIndex)) {
            let eastCard = gameBoardArray[row][eastSlotIndex];
            if (eastCard) {
                if (playedCard.east > eastCard.west) {
                    eastCard.opponent = playedCard.opponent;
                }
            }
        }

    }

    function getNextOpponentMove() {
        for (let row = 0; row < gameBoardArray.length; row++) {
            for (let slot = 0; slot < gameBoardArray[row].length; slot++) {
                let cardOnBoard = gameBoardArray[row][slot];
                if (!cardOnBoard) {
                    continue;
                }
                if (cardOnBoard.opponent) {
                    continue;
                }

                let northSlotIndex = row - 1;
                let westSlotIndex = slot - 1;
                let southSlotIndex = row + 1;
                let eastSlotIndex = slot + 1;

                if (isValidGameBoardIndex(northSlotIndex) && gameBoardArray[northSlotIndex][slot] === undefined) {
                    return [northSlotIndex, slot];
                } else if (isValidGameBoardIndex(westSlotIndex) && gameBoardArray[row][westSlotIndex] === undefined) {
                    return [row, westSlotIndex];
                } else if (isValidGameBoardIndex(southSlotIndex) && gameBoardArray[southSlotIndex][slot] === undefined) {
                    return [southSlotIndex, slot];
                } else if (isValidGameBoardIndex(eastSlotIndex) && gameBoardArray[row][eastSlotIndex] === undefined) {
                    return [row, eastSlotIndex];
                }

            }
        }
        return null;
    }

    function isValidGameBoardIndex(index: number) {
        return index >= 0 && index <= 2;
    }


    // console.log(cardsOnGameBoard);

    return (
        <CardDeckContext.Provider value={cardDeckContextValue}>

            <div className="all-content-container">

                {/*<button onClick={() => opponentPlayCardTurn()}>Test</button>*/}

                <div>
                    <div>
                        <OpponentCardsHandList cardDeck={opponentHand}/>
                    </div>
                    <GameBoardLayout cardsOnGameBoard={cardsOnGameBoard}/>
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

        </CardDeckContext.Provider>
    );
}

export default App;
