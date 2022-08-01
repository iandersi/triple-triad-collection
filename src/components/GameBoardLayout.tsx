import React from "react";
import {Card} from "react-bootstrap";
import {PlayedCard} from "../models/PlayedCard";
import {indexOf} from "lodash";

type GameBoardLayoutProps = {
    playerTurn: (row:number, slot: number) => void,
    gameboard: PlayedCard[]
}

export function GameBoardLayout({playerTurn, gameboard}: GameBoardLayoutProps) {
    // const {addCardToGameBoard} = useContext(CardDeckContext);
    let defaultImagePath: string = "images/back/TTTurquoiseBack.webp";

    function returnImagePath(row: number, slot: number){

        const gameboardSlot = gameboard.find(gameboardSlot => gameboardSlot.slot === slot && gameboardSlot.row === row);

        if (gameboardSlot) {
            return gameboardSlot.card.cardImagePath();
        } else {
            return defaultImagePath;
        }
    }

    return (
        <>
            <div className="game-board-container">
                <div className="game-board-row">
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(0, 0)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(0, 0)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(0, 1)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(0, 1)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(0, 2)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(0, 2)}/>
                    </Card>
                </div>
                <div className="game-board-row">
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(1, 0)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(1, 0)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(1, 1)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(1, 1)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(1, 2)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(1,2)}/>
                    </Card>
                </div>
                <div className="game-board-row">
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(2, 0)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(2,0)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(2, 1)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(2,1)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> playerTurn(2, 2)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(2, 2)}/>
                    </Card>
                </div>
            </div>
        </>

    );
}