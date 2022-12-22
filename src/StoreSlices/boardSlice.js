import { createSlice, current } from "@reduxjs/toolkit";

const emptyInitialState = { // eslint-disable-line no-unused-vars
    players: [],
    activePlayer: null,
    boards: []
}

const testInitialState = { // eslint-disable-line no-unused-vars
    players: ['Rexy', 'Berion'],
    activePlayer: 'Rexy',
    boards: [
        {
            "player": "Rexy",
            commanders: [
                {
                    "id": "1f391555-4697-4492-9854-32393f473104",
                    "name": "Bombard",
                    "faces": [
                        {
                            "name": "Bombard",
                            "manaCost": "{2}{R}",
                            "artwork": {
                                "small": "https://cards.scryfall.io/small/front/1/f/1f391555-4697-4492-9854-32393f473104.jpg?1592765034",
                                "large": "https://cards.scryfall.io/large/front/1/f/1f391555-4697-4492-9854-32393f473104.jpg?1592765034"
                            }
                        }
                    ],
                    activeFace: 0
                },
            ],
            "cards": [
                {
                    "id": "daa9b08b-c56f-480e-874e-069e72d979c8",
                    "name": "Hazardous Conditions",
                    "faces": [
                        {
                            "name": "Hazardous Conditions",
                            "manaCost": "{2}{B}{G}",
                            "artwork": {
                                "small": "https://cards.scryfall.io/small/front/d/a/daa9b08b-c56f-480e-874e-069e72d979c8.jpg?1576382835",
                                "large": "https://cards.scryfall.io/large/front/d/a/daa9b08b-c56f-480e-874e-069e72d979c8.jpg?1576382835"
                            }
                        }
                    ],
                    activeFace: 0
                },
                {
                    "id": "49341a2f-18c8-4f89-a83f-9676cdaed886",
                    "name": "A-Split the Spoils",
                    "faces": [
                        {
                            "name": "A-Split the Spoils",
                            "manaCost": "{1}{G}",
                            "artwork": {
                                "small": "https://cards.scryfall.io/small/front/4/9/49341a2f-18c8-4f89-a83f-9676cdaed886.jpg?1660688369",
                                "large": "https://cards.scryfall.io/large/front/4/9/49341a2f-18c8-4f89-a83f-9676cdaed886.jpg?1660688369"
                            }
                        }
                    ],
                    activeFace: 0
                },
                {
                    "id": "df901fdc-8672-44f5-ade5-7c4e0b5c5d81",
                    "name": "Bond of Flourishing",
                    "faces": [
                        {
                            "name": "Bond of Flourishing",
                            "manaCost": "{1}{G}",
                            "artwork": {
                                "small": "https://cards.scryfall.io/small/front/d/f/df901fdc-8672-44f5-ade5-7c4e0b5c5d81.jpg?1557576876",
                                "large": "https://cards.scryfall.io/large/front/d/f/df901fdc-8672-44f5-ade5-7c4e0b5c5d81.jpg?1557576876"
                            }
                        }
                    ],
                    activeFace: 0
                },
                {
                    "id": "f851d74e-90ad-417f-8372-8437d2d68b0d",
                    "name": "Smelt-Ward Minotaur",
                    "faces": [
                        {
                            "name": "Smelt-Ward Minotaur",
                            "manaCost": "{2}{R}",
                            "artwork": {
                                "small": "https://cards.scryfall.io/small/front/f/8/f851d74e-90ad-417f-8372-8437d2d68b0d.jpg?1572893261",
                                "large": "https://cards.scryfall.io/large/front/f/8/f851d74e-90ad-417f-8372-8437d2d68b0d.jpg?1572893261"
                            }
                        }
                    ],
                    activeFace: 0
                }
            ]
        },
        {
            player: 'Berion',
            commanders: [],
            cards: []
        }
    ]
}

function createNewBoard(player) {
    return {
        player: player,
        commanders: [],
        cards: []
    }
}

function persist(state) {
    localStorage.setItem('state', JSON.stringify(state));
}

function load() {
    var state = localStorage.getItem('state');
    
    if (state === null) return emptyInitialState;

    try {
        return JSON.parse(state);
    } catch (e) {
        return emptyInitialState;
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState: load(),
    reducers: {
        addPlayer: (state, action) => {
            var player = action.payload;
            state.players.push(player);
            state.boards.push(createNewBoard(player));
            state.activePlayer = player;
            persist(current(state));
            return state;
        },
        removePlayer: (state, action) => {
            var player = action.payload;
            state.players = state.players.filter(p => p !== player);
            state.boards = state.boards.filter(board => board.player !== player);

            // If the active player is removed, let someone else become the active player
            if (state.activePlayer === player && state.players.length > 0) {
                state.activePlayer = state.players[0];
            }

            // If there are no more players left, remove active player
            if (state.players.length === 0) {
                state.activePlayer = null;
            }

            persist(current(state));

            return state;
        },
        setActivePlayer: (state, action) => {
            var player = action.payload;
            state.activePlayer = player;
            persist(current(state));
            return state;
        },
        addCard: (state, action) => {
            var { player, card } = action.payload;
            // TODO: What if board is null
            var targetBoard = state.boards.filter(board => board.player === player)[0];
            targetBoard.cards.push(card);
            persist(current(state));
            return state;
        },
        removeCard: (state, action) => {
            var { player, card } = action.payload;
            // TODO: What if board is null
            var targetBoard = state.boards.filter(board => board.player === player)[0];
            targetBoard.cards = targetBoard.cards.filter(c => c.id !== card.id);
            persist(current(state));
            return state;
        },
        addCommander: (state, action) => {
            var { player, card } = action.payload;
            // TODO: What if board is null
            var targetBoard = state.boards.filter(board => board.player === player)[0];
            targetBoard.commanders.push(card);
            persist(current(state));
            return state;
        },
        removeCommander: (state, action) => {
            var { player, card } = action.payload;
            // TODO: What if board is null
            var targetBoard = state.boards.filter(board => board.player === player)[0];
            targetBoard.commanders = targetBoard.commanders.filter(c => c.id !== card.id);
            persist(current(state));
            return state;
        },
        switchFace: (state, action) => {
            var { player, card, faceIndex } = action.payload;
            // TODO: Assert targetBoard not null
            // TODO: Assert targetCard not null
            var targetBoard = state.boards.filter(board => board.player === player)[0];
            var targetCard = targetBoard.cards.filter(c => c.id === card.id)[0];
            targetCard.activeFace = faceIndex;
            persist(current(state));
            return state;
        }
    }
});

export const { 
    addPlayer, 
    removePlayer, 
    setActivePlayer, 
    addCard,
    removeCard,
    addCommander,
    removeCommander,
    switchFace
} = boardSlice.actions;
export default boardSlice.reducer;