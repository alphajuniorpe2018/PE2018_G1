$.ajaxSetup({
    async: false
});
var playerScoresJSON = $.getJSON('../JS/playerscores.json', function(playerScoresData){
}); // The file path needs to be ../JS because our gameserver uses the http request's pathname to find the file. If we use ./, the requested pathname would have ./ in it and the file wouldn't be found.
var leaderboardRanks = document.getElementsByClassName('leaderboardRank');
var playerScoresJSONObject = playerScoresJSON.responseJSON;
var playerScoresJSONObjectSortedByScore = playerScoresJSONObject;

function sortScoresJSON() {
    var swap;
    var temp;
    for (var i = playerScoresJSONObjectSortedByScore["scores"].length-1; i >= 0; i--) {
        for (var o = playerScoresJSONObjectSortedByScore["scores"].length-1; o > 0; o--) {
            if(playerScoresJSONObjectSortedByScore["scores"][o]["score"] < playerScoresJSONObjectSortedByScore["scores"][o-1]["score"]) {
                temp = playerScoresJSONObjectSortedByScore["scores"][o];
                playerScoresJSONObjectSortedByScore["scores"][o] = playerScoresJSONObjectSortedByScore["scores"][o-1];
                playerScoresJSONObjectSortedByScore["scores"][o-1] = temp;
            }
        }
    }
}

function updateLeaderboards() {
    for (var i = 0; i < leaderboardRanks.length; i++) {
        leaderboardRanks[i].innerHTML = playerScoresJSONObjectSortedByScore["scores"][i]["player"] + " - " + playerScoresJSONObjectSortedByScore["scores"][i]["score"] + " sec - " + playerScoresJSONObjectSortedByScore["scores"][i]["date"];
    }
}

function saveScores() {
    var today = new Date();
    var player1Name = document.getElementById("player1Name").value;
    var player2Name = document.getElementById("player2Name").value;
    var player1Score = player1FinishTime;
    var player2Score = player2FinishTime;
    var dd = today.getDate();
    if (dd<10) {
        dd = "0" + dd.toString();
    }
    else {
        dd = dd.toString();
    }
    var mm = today.getMonth()+1;
    if (mm<10) {
        mm = "0" + mm.toString();
    }
    else {
        mm = mm.toString();
    }
    var yyyy = today.getFullYear();
    yyyy = yyyy.toString();
    var player1Score = {"player": player1Name, "score": player1FinishTime, "date": dd + "/" + mm + "/" + yyyy.toString()};
    var player2Score = {"player": player2Name, "score": player2FinishTime, "date": dd + "/" + mm + "/" + yyyy.toString()};
    if (player1Score && player2Score && player1Name && player2Name) {
        playerScoresJSONObjectSortedByScore["scores"].push(player1Score, player2Score);
        sortScoresJSON();
        updateLeaderboards();
        console.log("Scores saved!");
        var playerScoresSavedString = JSON.stringify(playerScoresJSONObjectSortedByScore);
        $.ajax({
            url: '/JS/savescores.js',
            type: 'POST',
            contentType: 'application/json',
            data: playerScoresSavedString,
            dataType: 'json'
        });
        console.log("Scores sent to server");
    }
    else {
        console.log("Unable to save score");
    }
}

sortScoresJSON();
updateLeaderboards();