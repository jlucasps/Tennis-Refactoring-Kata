var TennisGame1 = function(player1Name, player2Name) {
    this.player1Score = 0;
    this.player2Score = 0;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
};

TennisGame1.prototype.wonPoint = function(playerName) {
    if (playerName === "player1")
        this.player1Score += 1;
    else
        this.player2Score += 1;
};

TennisGame1.prototype.getScore = function() {
    var score = "";
    var tempScore = 0;

    var getScoreForDraw = function(playersScore) {
        var scores = ["Love-All", "Fifteen-All", "Thirty-All"];
        return scores[playersScore] || "Deuce";
    };
    
    var isDraw = function(player1Score, player2Score){
        return player1Score == player2Score;
    };

    var isAdvantageOrWonGame = function(player1Score, player2Score) {
        var REQUIRED_POINTS_FOR_ADVANTAGE_OR_VICTORY = 3
        return player1Score > REQUIRED_POINTS_FOR_ADVANTAGE_OR_VICTORY 
               || player2Score > REQUIRED_POINTS_FOR_ADVANTAGE_OR_VICTORY;
    }

    var getScoreForAdvantageOrWon = function(player1Score, player2Score){
        var score;
        var scoreDifference = player1Score - player2Score;
        if (scoreDifference === 1) score = "Advantage player1";
        else if (scoreDifference === -1) score = "Advantage player2";
        else if (scoreDifference >= 2) score = "Win for player1";
        else score = "Win for player2";
        return score;
    };

    var getScore = function(tempScore) {
        var scores = ["Love", "Fifteen", "Thirty", "Forty"];

        return scores[tempScore];
    };

    var getScoreForAdvantage = function(player1Score, player2Score){
        for (var i = 1; i < 3; i++) {
            if (i === 1) tempScore = player1Score;
            else {
                score += "-";
                tempScore = player2Score;
            }

            score += getScore(tempScore);
        }
        return score;
    }

    if (isDraw(this.player1Score, this.player2Score)) {
        score = getScoreForDraw(this.player1Score);
    } else if (isAdvantageOrWonGame(this.player1Score, this.player2Score)) {
        score = getScoreForAdvantageOrWon(this.player1Score, this.player2Score);
    } else {
        score = getScoreForAdvantage(this.player1Score, this.player2Score);
    }
    return score;
};

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}