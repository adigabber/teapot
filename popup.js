var firsttime_ui = "UI"

var port = chrome.runtime.connect({
	name: "fromPOtoBG"
});

port.postMessage({
	funcName: firsttime_ui,
	pack: "AllCamp"
});

port.onMessage.addListener(function(msg) {

	if (msg.funcName == firsttime_ui) {
		var body = document.getElementsByTagName('body')[0];
		var tbl = document.createElement('table');
		tbl.style.width = '100';
		tbl.setAttribute('border', '1');
		var tbdy = document.createElement('tbody');
		for (campCounter = 0; campCounter < msg.pack.length; campCounter++) {
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(msg.pack[campCounter].camp));
			tr.appendChild(td)
			tbdy.appendChild(tr);
		}
		tbl.appendChild(tbdy);
		body.appendChild(tbl);

		var buttonPaused = document.createElement('input');
		buttonPaused.setAttribute('type', 'button');
		buttonPaused.setAttribute('name', 'Paused');
		buttonPaused.setAttribute('value', 'Paused All Campaigns');
		buttonPaused.onclick = function() {
			port.postMessage({
				funcName: "Paused",
				pack: "allcamp"
			});
		};
		body.appendChild(buttonPaused);

		var buttonDupTw = document.createElement('input');
		buttonDupTw.setAttribute('type', 'button');
		buttonDupTw.setAttribute('name', 'DupTw');
		buttonDupTw.setAttribute('value', 'Duplicate All Campaigns tweets');
		buttonDupTw.onclick = function() {
			port.postMessage({
				funcName: "DupTw",
				pack: msg.pack

			});
		};
		body.appendChild(buttonDupTw);
	} else {
		document.write(msg.pack);
	}
});


