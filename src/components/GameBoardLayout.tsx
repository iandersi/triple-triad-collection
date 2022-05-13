import React, {useState} from "react";


export function GameBoardLayout() {
    return (
        <>
            <div/>
            <div className="game-board-container">
                <div className="game-board-row">
                    <div className="game-board-slot"></div>
                    <div className="game-board-slot"></div>
                    <div className="game-board-slot"></div>
                </div>
                <div className="game-board-row">
                    <div className="game-board-slot"></div>
                    <div className="game-board-slot"></div>
                    <div className="game-board-slot"></div>
                </div>
                <div className="game-board-row">
                    <div className="game-board-slot"></div>
                    <div className="game-board-slot"></div>
                    <div className="game-board-slot"></div>
                </div>

            </div>
            <div/>
        </>

    );
}