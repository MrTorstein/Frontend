/*
A simple Rock, paper, scissors game played in the browser console.
The player playes against the computer. and the winner is the best
after 5 rounds where someone has won. Thus ties are disregarded.
*/

/* Defines global variables. These are changed if easter egg is discovered */
let options = ["Rock", "Paper", "Scissors"];
let input_text = "Please input either rock, paper or scissors: "

function computerPlay(upgrade = false) { // Uses Math.random to determin computers play randomly
    let choosen_option = "undefined";
    if (upgrade) {
        options = ["Rock", "Paper", "Scissors", "Spock", "Lizard"];
        input_text = `${input_text.slice(0, -14)}, ${input_text.slice(-10, -3)}, lizard or spock ;) : `
        console.log("Oh, so you want to be funny? Then lets be funny!")
    }
    else {
        let option_index = Math.floor(Math.random() * options.length);
        choosen_option = options[option_index];
    }
    
    return choosen_option;
}

function playerPlay() { // Gathers player input with prompt() and handles user errors
    let user_input = false;
    
    while (user_input == false) {
        try {
            user_input = prompt(input_text).toLowerCase();
        }
        catch (TypeError) {
            console.log("If you want to exit, please input exit in input window.")
            input_text = input_text.slice(0, 20) + "exit, " + input_text.slice(20)
            user_input = false;
            
        }
        switch (user_input) {
            case "rock":
                user_input = "Rock";
                break;
            case "paper":
                user_input = "Paper";
                break;
            case "scissors":
                user_input = "Scissors";
                break;
            case "lizard":
                user_input = "Lizard";
                if (options.length == 3) {computerPlay(true);}
                break;
            case "spock":
                user_input = "Spock";
                if (options.length == 3) {computerPlay(true);}
                break;
            case "exit":
                break;
            case false:
                break;
            default:
                console.log("Invalid input! Please choose either Rock, paper or scissors");
                user_input = false;
        }
    }
    return user_input;
}

function playRound(player_selection, computer_selection) { // Given player and computer input, determines the winner of a round
    let computer_number;
    let player_number;
    
    switch (computer_selection.toLowerCase()) { // Turn computers input into number
        case "rock":
            computer_number = 0;
            break;
        case "paper":
            computer_number = 1;
            break;
        case "scissors":
            computer_number = 2;
            break;
        case "spock":
            computer_number = 3;
            break;
        case "lizard":
            computer_number = 4;
            break;
        default:
            console.log("Something is wrong!")
    }
    switch (player_selection.toLowerCase()) { // Turn players input into number
        case "rock":
            player_number = 0;
            break;
        case "paper":
            player_number = 1;
            break;
        case "scissors":
            player_number = 2;
            break;
        case "spock":
            player_number = 3;
            break;
        case "lizard":
            player_number = 4;
    }
    
    let player_win_text = `Congrats, you won! ${player_selection} beates ${computer_selection}.`;
    let player_lose_text = `Too bad, you lost! ${computer_selection} beates ${player_selection}.`;
    let player_tie_text = `Ohh, its a tie! ${computer_selection} is the same as ${player_selection}.`;
    
    /* Calculate winner aritmetically and return results */
    if (player_number + 4 == computer_number) {
        return [player_win_text, "player"];
    }
    else if (player_number - 4 == computer_number) {
        return [player_lose_text, "computer"];
    }
    else if (player_number + 3 == computer_number) {
        return [player_lose_text, "computer"];
    }
    else if (player_number - 3 == computer_number) {
        return [player_win_text, "player"];
    }
    else if (player_number + 2 == computer_number) {
        return [player_win_text, "player"];
    }
    else if (player_number - 2 == computer_number) {
        return [player_lose_text, "computer"];
    }
    else if (player_number + 1 == computer_number) {
        return [player_lose_text, "computer"];
    }
    else if (player_number - 1 == computer_number) {
        return [player_win_text, "player"];
    }
    else if (player_number == computer_number) {
        return [player_tie_text, "both"];
    }
    else if (player_selection.toLowerCase() == "exit") {
        return ["Exiting...", "both"];
    }
    else {
        return ["Something went wrong!", "both"];
    }
}

function game() { // Main function to run game and determine winner of game.
    let player_score = 0;
    let computer_score = 0;
    
    console.log(`The game has begun!\nChoose either Rock, Paper or Scissors in the input window.
The computer will choose an option and after 5 rounds, with a winner, the winner is the one with 
the most points.`);
    for (let i = 0; i < 5; i++) {
        let res_array = playRound(playerPlay(), computerPlay());
        let result_text = res_array[0];
        let winner = res_array[1];
        
        console.log(result_text);
        
        if (result_text == "Exiting...") {return 0;}
        
        switch (winner) {
            case "player":
                player_score += 1;
                break;
            case "computer":
                computer_score += 1;
                break;
            case "both":
                i--;
                break;
            default:
                console.log("Something went wrong!");
        }
    }
    
    if (player_score > computer_score) {
        console.log("You won! Your score is " + player_score + ". Computers score is " + computer_score);
    }
    else if (player_score < computer_score) {
        console.log("You lost! Your score is " + player_score + ". Computers score is " + computer_score);
    }
    else {
        console.log("Something went wrong =(!");
    }
}

game(); // Starts game if file is loaded