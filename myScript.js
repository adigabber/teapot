console.log("begin of extension.");


var funArr = {
	"UI": firsttime_ui,
	"Paused": Paused,
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
	var responseToBG= funArr[msg.funcName](msg.pack);
	console.log(responseToBG);
	port.postMessage({
		funcName: msg.funcName,
		pack: responseToBG
	});
	console.log("sent");
});


function firsttime_ui(pack) {
	console.log(pack);
	var campaignArr = [];
	var allActiveCampaignsContent = $('tr[id^="campaign_row"] .action-container.pause:not(.selected)').closest('tr').find('.campaignTitle').contents();
	for (var i = 0; i < allActiveCampaignsContent.length; i++) {
		campaignArr.push({
			camp: allActiveCampaignsContent[i].textContent
		});
	}
	return campaignArr;
}

function Paused(pack) {
	$('tr[id^="campaign_row"] .action-container.pause:not(.selected)').click();
	return "Paused all camp";
}

function open_camp_edit_tab(pack) {
	var campHref = $("a:contains(" + pack + ")").closest('tr').find('.campaign-edit.action-tooltip').attr('href')
	window.open(campHref);
	return "OpenTheCamp";
}

function duplicate_tweets(pack) {
	var tweetsContents = get_tweet_content();
	//$('.item.selected').find('.checkbox').click();
	for (i = 0; i < tweetsContents.length; i++) {
		$('.newTweet').click()
		var TextArea = $("textarea");
		TextArea[i].value = edit_tweets_140c(tweetsContents[i].tweet);
		$('input:radio[name="nullcast_flag"]').filter('[value="1"]').attr('checked', true);
		// $('.submit').click();
	}
	return "Dup"
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
	console.log(Tweet.length);
	var editTweet;
	if (Tweet.length >= 140) {
		var indexHttp = Tweet.indexOf('http://')
	console.log(indexHttp);
	if (indexHttp != -1) {
		console.log(Tweet.substring(0, indexHttp - 1));
		console.log(Tweet.substring(indexHttp + 7, Tweet.length));
		editTweet = Tweet.substring(0, indexHttp - 1) + Tweet.substring(indexHttp + 7, Tweet.length);
	}
} else {
	editTweet = Tweet
}
return editTweet;
}

function done_func(pack){ return "Done"}