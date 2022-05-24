import React, {useContext, useState} from "react";
import {CardDeckContext} from "../App";
import {Card as CardModel} from "../models/Card"
import {Card} from "react-bootstrap";

type GameBoardLayoutProps = {
    cardsOnGameBoard: (CardModel | undefined)[][]
}

export function GameBoardLayout({cardsOnGameBoard}: GameBoardLayoutProps) {
    const {addCardToGameBoard, selectedCardToPlay} = useContext(CardDeckContext);
    let defaultImagePath: string = "images/back/TTTurquoiseBack.webp";

    function returnImagePath(row: number, position: number){
        if (cardsOnGameBoard[row][position]?.image) {
            return "images/blue/"+cardsOnGameBoard[row][position]?.image;
        } else {
            return defaultImagePath;
        }
    }

    console.log(cardsOnGameBoard);


    return (
        <>
            <div className="game-board-container">
                <div className="game-board-row">
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(0, 0)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(0, 0)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(0, 1)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(0, 1)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(0, 2)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(0, 2)}/>
                    </Card>
                </div>
                <div className="game-board-row">
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(1, 0)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(1, 0)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(1, 1)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(1, 1)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(1, 2)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(1, 2)}/>
                    </Card>
                </div>
                <div className="game-board-row">
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(2, 0)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(2, 0)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(2, 1)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(2, 1)}/>
                    </Card>
                    <Card className="game-board-slot-container" onClick={()=> addCardToGameBoard(2, 2)}>
                        <Card.Img className="game-board-slot" src={returnImagePath(2, 2)}/>
                    </Card>
                </div>
            </div>

            {/*<div className="game-board-container">*/}
            {/*    <div className="game-board-row">*/}
            {/*        <div className="game-board-slot" onClick={()=> addCardToGameBoard(0, 0)}></div>*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*    </div>*/}
            {/*    <div className="game-board-row">*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*    </div>*/}
            {/*    <div className="game-board-row">*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*        <div className="game-board-slot"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>

    );
}