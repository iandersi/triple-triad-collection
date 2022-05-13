import React, {useState} from 'react';
import './css/App.css';
import {Card} from "./models/Card";
import {CardsInHandList} from "./components/CardsInHandList";
import {useCardChange} from "./hooks/useCardChange";
import cardData from "./allCards.json";
import _ from "lodash";
import {useOwnedCards} from "./hooks/useOwnedCards";
import {Button} from "react-bootstrap";
import {GameBoardLayout} from "./components/GameBoardLayout";
import {OpponentCardsHandList} from "./components/OpponentCardsHandList";

type CardDeckContextType = {
    handleCardDelete: (id: string) => void,
    handleCardSelect: (id: string) => void,
    handleCardAdd: () => void,
    handleCardChange: (id: string, card: Card) => void,
    handleSelectedCardToPlay: (card: Card) => void,
    selectedCardToPlay: Card | undefined
}

export const CardDeckContext = React.createContext<CardDeckContextType>({} as CardDeckContextType);

const allCards = cardData.map(card => new Card(card.name, card.level, card.element, card.north, card.east, card.south, card.west, card.image));

const starterDeck = _.take(_.shuffle(allCards), 5);
const opponentDeck = _.take(_.shuffle(allCards), 5);
const getRandomCards = _.take(_.shuffle(allCards), 10);

const cardsOwned = [...starterDeck, ...getRandomCards].map(card => card.copyCard());
const opponentCardsOwned = [...opponentDeck].map(card => card.copyCard());


const gameBoardArray = [
    [, ,],
    [, ,],
    [, ,],
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

    console.log(selectedCardToPlay)

    const cardDeckContextValue: CardDeckContextType = {
        handleCardAdd,
        handleCardDelete: handleCardRemove,
        handleCardSelect,
        handleCardChange,
        handleSelectedCardToPlay,
        selectedCardToPlay
    }

    function handleCardRemove(id: string) {
        console.log(id);
        const newArray = cardHand.filter(card => card.id !== id);
        console.log(newArray);
        setCardHand(newArray);
    }

    function handleCardSelect(id: string) {
        console.log(id);
        setSelectedCardId(id);
    }

    function handleCardAdd() {
        const newCard = new Card("", 0, "", 0, 0, 0, 0, "");
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


    return (
        <CardDeckContext.Provider value={cardDeckContextValue}>

            <div className="all-content-container">

                <div>
                    <div>
                        <OpponentCardsHandList cardDeck={opponentHand}/>
                    </div>
                    <GameBoardLayout/>
                    <div>
                        <CardsInHandList cardDeck={cardHand}/>
                    </div>
                </div>

                <div className="card-management-bar">
                    <button onClick={() => open()}>Owned Cards</button>
                    <button>All Cards</button>
                </div>

            </div>

            {changeCardModal}
            {ownedCardModal}

        </CardDeckContext.Provider>
    );
}

export default App;
