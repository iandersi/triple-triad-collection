import React, {useState} from 'react';
import './css/App.css';
import {Card} from "./models/Card";
import {CardList} from "./components/CardList";
import {useCardChange} from "./hooks/useCardChange";
import cardData from "./allCards.json";
import _ from "lodash";
import {useOwnedCards} from "./hooks/useOwnedCards";

type CardDeckContextType = {
    handleCardDelete: (id: string)=>void,
    handleCardSelect: (id: string)=>void,
    handleCardAdd: ()=> void,
    handleCardChange: (id: string, card: Card)=>void
}

export const CardDeckContext = React.createContext<CardDeckContextType>({} as CardDeckContextType);

const allCards = cardData.map(card => new Card(card.name, card.level, card.element, card.north, card.east, card.south, card.west, card.image));

const starterDeck = _.take(_.shuffle(allCards), 5);
const getRandomCards = _.take(_.shuffle(allCards), 3);

const cardsOwned = [...starterDeck, ...getRandomCards]

function App() {

    const [selectedCardId, setSelectedCardId] = useState<string>();
    const [cardHand, setCardHand] = useState(starterDeck);
    const [ownedCards, setOwnedCards] = useState(cardsOwned);
    const selectedCard = cardHand.find(card => card.id === selectedCardId);
    const {changeCardModal} = useCardChange(selectedCard, setSelectedCardId, allCards);
    const {ownedCardModal} = useOwnedCards(selectedCardId, setSelectedCardId, ownedCards);


    const cardDeckContextValue: CardDeckContextType = {
        handleCardAdd,
        handleCardDelete,
        handleCardSelect,
        handleCardChange
    }

    function handleCardDelete(id: string){
        console.log(id);
        const newArray = cardHand.filter(card => card.id !== id);
        console.log(newArray);
        setCardHand(newArray);
    }

    function handleCardSelect(id: string) {
        console.log(id);
        setSelectedCardId(id);
    }

    function handleCardAdd(){
        const newCard = new Card("", 0, "", 0, 0, 0, 0, "");
        setSelectedCardId(newCard.id);
        setCardHand([...cardHand, newCard]);
    }

    function handleCardChange(id: string, card: Card){
        const newCards = [...cardHand];
        const index = newCards.findIndex(card => card.id === id);
        newCards[index] = card;
        setCardHand(newCards);
    }



  return (
    <CardDeckContext.Provider value={cardDeckContextValue}>
        <div className="container-top">
            <p>nönönönö</p>
        </div>
        <div className="container-middle">
            <p>board</p>
        </div>
        <div className="container-bottom">
            <CardList cardDeck={cardHand}/>
            {changeCardModal}
            {ownedCardModal}
        </div>
    </CardDeckContext.Provider>
  );
}

export default App;
