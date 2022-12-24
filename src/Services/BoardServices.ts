import { BoxModel } from "../Models/boxModel";

class BoardServices {
    boardStatus(boardState: BoxModel[]) {
        let xLocations = [];
        let oLocations = [];

        for (const box of boardState) {
            if (box.val === 'X') {
                xLocations.push(box.location)
            }
            if (box.val === 'O') {
                oLocations.push(box.location)
            }
        }

        // --- X wins ---

        if (xLocations.includes(1) && xLocations.includes(2) && xLocations.includes(3)) {
            return 'X';
        }
        if (xLocations.includes(4) && xLocations.includes(5) && xLocations.includes(6)) {
            return 'X';
        }
        if (xLocations.includes(7) && xLocations.includes(8) && xLocations.includes(9)) {
            return 'X';
        }
        if (xLocations.includes(1) && xLocations.includes(4) && xLocations.includes(7)) {
            return 'X';
        }
        if (xLocations.includes(2) && xLocations.includes(5) && xLocations.includes(8)) {
            return 'X';
        }
        if (xLocations.includes(3) && xLocations.includes(6) && xLocations.includes(9)) {
            return 'X';
        }
        if (xLocations.includes(1) && xLocations.includes(5) && xLocations.includes(9)) {
            return 'X';
        }
        if (xLocations.includes(3) && xLocations.includes(5) && xLocations.includes(7)) {
            return 'X';
        }
        // --- O wins ---

        if (oLocations.includes(1) && oLocations.includes(2) && oLocations.includes(3)) {
            return 'O';
        }
        if (oLocations.includes(4) && oLocations.includes(5) && oLocations.includes(6)) {
            return 'O';
        }
        if (oLocations.includes(7) && oLocations.includes(8) && oLocations.includes(9)) {
            return 'O';
        }
        if (oLocations.includes(1) && oLocations.includes(4) && oLocations.includes(7)) {
            return 'O';
        }
        if (oLocations.includes(2) && oLocations.includes(5) && oLocations.includes(8)) {
            return 'O';
        }
        if (oLocations.includes(3) && oLocations.includes(6) && oLocations.includes(9)) {
            return 'O';
        }
        if (oLocations.includes(1) && oLocations.includes(5) && oLocations.includes(9)) {
            return 'O';
        }
        if (oLocations.includes(3) && oLocations.includes(5) && oLocations.includes(7)) {
            return 'O';
        }

        // --- DROW ---

        if (xLocations.length + oLocations.length === 9) {
            return 'DROW';
        }
    }
}

const boardServices = new BoardServices();
export default boardServices;