$.ajaxSetup({
    async: false
});
var playerScoresJSON = $.getJSON('../JS/playerscores.json', function(playerScoresData){
    $.each(playerScoresData, function(scoreSetIndex, scoreSet){
        console.log(scoreSet); // Our JSON has an "extra layer" in case we decide to expand the scoreboard to show players' times AND players' victories.
        $.each(scoreSet, function(playerScoreSetIndex, playerScoreSet){
            console.log(playerScoreSet); // This will access a player's match, which is composed of his name, his time and the date at which it occurred.
            $.each(playerScoreSet, function(playerScoreSetItemIndex, playerScoreSetItem) {
                console.log(playerScoreSetItem); // This will access the mentioned items: player name, time and match date.
            });
        });
    });
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
sortScoresJSON();
for (var i = 0; i < leaderboardRanks.length; i++) {
    leaderboardRanks[i].innerHTML = playerScoresJSONObjectSortedByScore["scores"][i]["player"] + " - " + playerScoresJSONObjectSortedByScore["scores"][i]["score"] + " sec - " + playerScoresJSONObjectSortedByScore["scores"][i]["date"];
}