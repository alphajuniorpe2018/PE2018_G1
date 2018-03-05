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

