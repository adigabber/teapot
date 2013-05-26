console.log("begin of extension.");
 


setTimeout(function(){
	var funArr = {"UI": FirstUI,"Fun1": Fun1};
	console.log("in settime");
	var port = chrome.runtime.connect({name: "fromCStoBG"});
	console.log("opened the connection");
	port.onMessage.addListener(function(msg) {
         console.log(msg.what);
         var res = funArr[msg.what]();
         console.log(res);
         port.postMessage({what: res});
         console.log ("sent")
         });



function FirstUI(){
	var campaignArr = [];
	var allActiveCampaignsContent = $('tr[id^="campaign_row"] .action-container.pause:not(.selected)').closest('tr').find('.campaignTitle').contents();
	for (var i=0;i<allActiveCampaignsContent.length;i++){
    campaignArr.push({who: allActiveCampaignsContent[i].textContent});
	}

	return campaignArr;
// return "Camp1";
}

 function Fun1(){
	return "fun1";
 }

},8000)

// console.log("begin of extension.");
// setTimeout(
//   function() 
//   {
//   var port = chrome.runtime.connect({name: "knockknock"});
//  console.log("start to pass the contents.");row"] .action-container.pause:not(.selected)').closest('tr').find('.campaignTitle').contents()//[0].textContent

// var messageArr = [];
// var allActiveCampaignsContent = $('tr[id^="campaign_

// for (var i=0;i<allActiveCampaignsContent.length;i++)
// { 
// 		messageArr.push({who: allActiveCampaignsContent[i].textContent});
// }
// // if (i==(allActiveCampaignsContent.length-1))
// // {
// // port.postMessage({what: "contents",isLast: "1", who: allActiveCampaignsContent[i].textContent});
// // }
// // else {
// // port.postMessage({what: "contents",isLast: "0", who: allActiveCampaignsContent[i].textContent});
// // }

// port.postMessage({what: messageArr});

// port.onMessage.addListener(function(msg) {
//   console.log(msg.question);
// });
// }
// },8000)


