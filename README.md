# minesweeper-api

minesweeper-api is a service that let us create our minesweeper game. It provides the possibility to create, pause and resume games.

It's a REST API developed in node.js with typescript.
It works with a NoSQL Database (MongoDB) by using mongoose library. 


# To start the project
    - make sure you have mongoDB installed on your machine
    - npm install
    - set .env file (see section below)
    - npm run dev
    - the application will start running on http://localhost:[PORT]


# .env example
    - PORT=3000 => the port where our server will listen to requests

# Tests
As a testing library we use jest (https://jestjs.io/):

    - npm test

# Services
This project offers 5 public services (endpoints) to be consumed:

## POST - [serverUrl]/start-game
This endpoint creates a new game and return the whole configuration.
It will be saved on the database.

### Input:
    - body:
        - rows: {Number} The quantity of rows we want on the board,
        - columns: {Number} The quantity of columns we want on the board,
        - mines: {Number} The quantity of mines we want on the game,
        - player: {String} The player name to register the game,

    - body example:
        {
            "rows": 20,
            "columns": 20,
            "mines": 20,
            "player": "bauti garaventa"
        }

### Output:
    - successful:
        - { status: 200, {
                board: [], 
                mines: 20, 
                won: false, 
                lost: false, 
                player: "bauti garaventa"
            } } 
    - error: 
        - { status: 500, error }


## PUT - [serverUrl]/end-game/:id
This endpoint finishes a game by marking it as won or lost

### Input:
    - params:
        - id: {String} The game identifier
    - body:
        - board: {Object[][]} The game board,
        - won: {Boolean} True if game was won,
        - lost: {Boolean} True if game was lost,

    - body example:
        {
            "board": [[{"value": 0, "isQuestioned": false, "isFlagged": false, "isRevealed": false}, ...]],
            "won": true,
            "lost": false,
        }

### Output:
    - successful:
        - { status: 200 }
    - error:
        - { status: 500, error }

## PUT - [serverUrl]/pause-game/:id
This endpoint pauses a game by persisting its state.

### Input:
    - params:
        - id: {String} The game identifier
    - body:
        - board: {Object[][]} The game board,

    - body example:
        {
            "board": [[{"value": 0, "isQuestioned": false, "isFlagged": false, "isRevealed": false}, ...]],
        }

### Output:
    - successful:
        - { status: 200 }
    - error:
        - { status: 500, error }

## GET - [serverUrl]/resume-game/:id
This endpoint gets a game state that was paused before.

### Input:
    - params:
        - id: {String} The game identifier

### Output:
    - successful:
        - { status: 200, {
                "board": [[{"value": 0, "isQuestioned": false, "isFlagged": false, "isRevealed": false}, ...]],
                "won": true,
                "lost": false,
                "player": "bauti garaventa",
            } }
    - error:
        - { status: 500, error }

## GET - [serverUrl]/games/:player
This endpoint gets all paused games for a given user.

### Input:
    - params:
        - player: {String} The player name

### Output:
    - successful:
        - { status: 200, [{
                "board": [[{"value": 0, "isQuestioned": false, "isFlagged": false, "isRevealed": false}, ...]],
                "won": true,
                "lost": false,
                "player": "bauti garaventa",
            }, ...] }
    - error:
        - { status: 500, error }