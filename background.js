var portSC;
var portPop;
	
	
chrome.runtime.onConnect.addListener(function(port) {

	if (port.name=="fromCStoBG"){
		portSC= port;
	  portSC.onMessage.addListener(function(msg) {
      portPop.postMessage({what: msg.what});
	});
   }
  else if (port.name=="fromPOtoBG"){
  	portPop=port;
  	port.onMessage.addListener(function(msg) {
  	portSC.postMessage({what: msg.what});
     });
    }
});












