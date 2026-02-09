
# Tic-Tac-Toe
The below problems are to allow us a glimpse into your problem solving ability, style and current skill set. Vibe coding is allowed but we are looking for good taste, brevity and clarity in your code. 

## Problems
### Problem 1
We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it! 
- Please implement a complete basic game of Tic-Tac-Toe
- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling 
- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
- Once a game is completed, I should be able to start another game 

### Problem 2
We are bored with the basic game now, can you make it so the board can be scaled to any size? 
- Add some kind of input which allows me to change the board size
- The board size should be a number between 3 and 15 

### Problem 3
We want to store game results in a database.
- Create a simple backend server
- Use any SQL database to store the results, please structure it in a relational manner and in a way for it to be expanded for future use cases 
- Display simple stats back to the user including number of win and losses for each player

## Getting started

You need **Node.js** and **Docker** (for the database). Make sure ports 3000, 3001, and 5433 are free.

### 1. Clone and start the database

```bash
git clone https://github.com/sarahnaunton/tic-tac-toe.git
cd tic-tac-toe/server
docker compose up -d
```

This starts PostgreSQL (port 5433) and Adminer (http://localhost:8080) if you want to inspect the DB.

### 2. Backend

From the project root (tic-tac-toe), run the following. If you're still in the server directory from step 1, run `cd ..` first.

Create a `.env` file from the example (required for the server):

```bash
cd server
cp .env.example .env
```

The default `.env` values match the Docker setup, so you don’t need to edit anything. Then:

```bash
npm i
npx sequelize-cli db:migrate
npm run dev
```

The API runs at http://localhost:3000.

### 3. Frontend

In a new terminal, go to the project root (tic-tac-toe), then run:

Create a `.env` file from the example (optional; the app defaults to http://localhost:3000 for the API):

```bash
cd client
cp .env.example .env
npm i
npm start
```

The app runs at http://localhost:3001. Open that URL, add two players, choose a board size, and play.

## Submission
Once you are done please submit the public repo to your recruiter or invite nick@spruce.eco to your private repo and let your recruiter know. 
