import React, {useState} from 'react';
import './css/App.css';
import {Card} from "./models/Card";
import {CardList} from "./components/CardList";
import {useCardEdit} from "./hooks/useCardEdit";

type CardDeckContextType = {
    handleCardDelete: (id: string)=>void,
    handleCardSelect: (id: string)=>void,
    handleCardAdd: ()=> void,
    handleCardChange: (id: string, card: Card)=>void
}

export const CardDeckContext = React.createContext<CardDeckContextType>({} as CardDeckContextType);

const starterDeck = [
    new Card("Blobra", 1, "None", "2, 5, 3, 1", "blobra.png"),
    new Card("Grat", 2, "None", "7, 1, 1, 3", "grat.png"),
    new Card("Creeps", 2, "Lightning", "5, 2, 2, 5", "creeps.png"),
    new Card("T-Rexaur", 4, "None", "4, 7, 6, 2", "trexaur.png"),
    new Card("Ruby Dragon", 5, "Fire", "7, 4, 2, 7", "rubydragon.png")
];

function App() {

    const [selectedCardId, setSelectedCardId] = useState<string>();
    const [cardHand, setCardHand] = useState(starterDeck);
    const selectedCard = cardHand.find(card => card.id === selectedCardId);
    const {cardModal} = useCardEdit(selectedCard, setSelectedCardId);

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
        const newCard = new Card("", 0, "", "", "");
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
            {cardModal}
        </div>
    </CardDeckContext.Provider>
  );
}

export default App;
