console.log("begin of extension.");


var funArr = {
	"UI": FirstUI,
	"Fun1": Fun1
};
console.log("in settime");
var port = chrome.runtime.connect({
	name: "fromCStoBG"
});
console.log("opened the connection");
port.onMessage.addListener(function(msg) {
	console.log(msg.what);
	var res = funArr[msg.what]();
	console.log(res);
	port.postMessage({
		what: res
	});
	console.log("sent")
});


function FirstUI() {
	var campaignArr = [];
	var allActiveCampaignsContent = $('tr[id^="campaign_row"] .action-container.pause:not(.selected)').closest('tr').find('.campaignTitle').contents();
	for (var i = 0; i < allActiveCampaignsContent.length; i++) {
		campaignArr.push({
			who: allActiveCampaignsContent[i].textContent
		});
	}

	return campaignArr;
	// return "Camp1";
}

function Fun1() {
	return "fun1";
}