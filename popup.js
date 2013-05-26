

var port = chrome.runtime.connect({name: "fromPOtoBG"});
  
	port.postMessage({what: "UI"});

	port.onMessage.addListener(function(msg) {
         document.write(msg.what[0].who);
         });

