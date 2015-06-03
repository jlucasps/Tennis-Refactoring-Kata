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
    if (isDraw(this.player1Score, this.player2Score)) {
        score = getScoreForDraw(this.player1Score);
    } else if (this.player1Score >= 4 || this.player2Score >= 4) {
        
        var scoreDifference = this.player1Score - this.player2Score;

        if (scoreDifference === 1) score = "Advantage player1";
        else if (scoreDifference === -1) score = "Advantage player2";
        else if (scoreDifference >= 2) score = "Win for player1";
        else score = "Win for player2";

    } else {
        for (var i = 1; i < 3; i++) {
            if (i === 1) tempScore = this.player1Score;
            else {
                score += "-";
                tempScore = this.player2Score;
            }
            switch (tempScore) {
                case 0:
                    score += "Love";
                    break;
                case 1:
                    score += "Fifteen";
                    break;
                case 2:
                    score += "Thirty";
                    break;
                case 3:
                    score += "Forty";
                    break;
            }
        }
    }
    return score;
};

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}