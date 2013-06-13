console.log("begin of extension.");
var SecToWait = 1400;

var funArr = {
	"UI": firsttime_ui,
	"Paused": paused_camp,
	"OpenCamp": open_camp_edit_tab,
	"DupTw": duplicate_tweets,
	"Done": done_func
};

var port = chrome.runtime.connect({
	name: "fromCStoBG"
});
console.log("opened the connection");

port.onMessage.addListener(function(msg) {
	console.log(msg.funcName);
	console.log(msg.pack);
	funArr[msg.funcName](msg.funcName, msg.pack);
});

function send_message_to_BG(funcName, pack) {
	port.postMessage({
		funcName: funcName,
		pack: pack
	});
	console.log("sent");
}

function firsttime_ui(funcName, pack) {
	console.log(pack);
	var campaignArr = [];
	var allActiveCampaignsContent = $('tr[id^="campaign_row"] .action-container.pause:not(.selected)').closest('tr').find('.campaignTitle').contents(); // all camps names
	for (var i = 0; i < allActiveCampaignsContent.length; i++) {
		campaignArr.push({
			camp: allActiveCampaignsContent[i].textContent
		});
	}
	send_message_to_BG(funcName, campaignArr);
}

function paused_camp(funcName, pack) {

	for (campCount = 0; campCount < pack.length; campCount++) {
		$("a:contains(" + pack[campCount].camp + ")").closest('tr').find('.action-container.pause').click();
	}
	// $('tr[id^="campaign_row"] .action-container.pause:not(.selected)').click(); //paused all campaigns.. 
	send_message_to_BG(funcName, "Paused all camp");
}

function open_camp_edit_tab(funcName, pack) {
	var campHref = $("a:contains(" + pack + ")").closest('tr').find('.campaign-edit.action-tooltip').attr('href') // open campaign edit tab
	window.open(campHref);
	send_message_to_BG(funcName, "OpenTheCamp");
}

function duplicate_tweets(funcName, pack) {
	var tweetsContents = get_tweet_content();
	$('.item.selected').find('.checkbox').click(); //unchecked current tweets
	var tweetIndex = 0;

	create_Tweet(funcName, tweetIndex, tweetsContents);
}

function create_Tweet(funcName, tweetIndex, tweetsContents) {
	console.log("i:" + tweetIndex);

	if (tweetIndex < tweetsContents.length) {
		console.log("tweetCon:" + tweetsContents[tweetIndex].tweet)
		$('.newTweet').click()
		var TextArea = $("textarea")[tweetIndex];
		TextArea.value = edit_tweets_140c(tweetsContents[tweetIndex].tweet);
		$('input:radio[name="nullcast_flag"]').filter('[value="1"]').attr('checked', true); //check promote only
		$('.submit').removeAttr('disabled')[tweetIndex].click();

		setTimeout(function() {
			create_Tweet(funcName, tweetIndex + 1, tweetsContents)
		}, SecToWait);
	} else {
		$('#campaign_save').click();
		setTimeout(function() {
			send_message_to_BG(funcName, "Dup")
		}, SecToWait);
	}

}


function get_tweet_content() {
	var ContentArr = [];
	var TweetArr = $('.item.selected');
	console.log(TweetArr);
	for (Tweetcount = 0; Tweetcount < TweetArr.length; Tweetcount++) {
		ContentArr.push({
			tweet: TweetArr.find('.text.ltr')[Tweetcount].textContent
		});

	}
	return ContentArr;
}

function edit_tweets_140c(Tweet) {
	// console.log(Tweet.length);
	var editTweet;
	if (Tweet.length >= 140) {
		var indexHttp = Tweet.indexOf('http://')
		console.log(indexHttp);
		if (indexHttp != -1) {
			// console.log(Tweet.substring(0, indexHttp - 1));
			// console.log(Tweet.substring(indexHttp + 7, Tweet.length));
			editTweet = Tweet.substring(0, indexHttp - 1) + Tweet.substring(indexHttp + 7, Tweet.length);
			console.log(editTweet);
			console.log(editTweet.length);
		}
	} else {
		editTweet = Tweet
	}
	return editTweet;
}

function done_func(funcName, pack) {
	alert("Done function");
	send_message_to_BG(funcName, "Done");
}

// function pause_comp(millis) {
// 	var date = new Date();
// 	var curDate = null;

// 	do {
// 		curDate = new Date();
// 	}
// 	while (curDate - date < millis);
// }