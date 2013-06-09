var firsttime_ui = "UI"
var headsOfColumnsInTable = ["#", "Campaign name"];
var columnFunc = {
	"#": row_num,
	"Campaign name": camp_name
}


var port = chrome.runtime.connect({
	name: "fromPOtoBG"
});



port.postMessage({
	funcName: firsttime_ui,
	pack: "AllCamp"
});

port.onMessage.addListener(function(msg) {

	if (msg.funcName == firsttime_ui) {

		var body = $('.span10')[0];
		var tbl = document.createElement('table');
		$(tbl).addClass("table table-striped");
		
		var thead = document.createElement('thead');
        var trhead =document.createElement('tr');
        for (headCount = 0; headCount < headsOfColumnsInTable.length; headCount++) {
        var th = document.createElement('th');
        var headText = document.createTextNode(headsOfColumnsInTable[headCount]);
        th.appendChild(headText);
        trhead.appendChild(th);
        }
        thead.appendChild(trhead);
        tbl.appendChild(thead);


		var tbdy = document.createElement('tbody');
		for (campCounter = 0; campCounter < msg.pack.length; campCounter++) {
			var tr = document.createElement('tr');
			for (colCount = 0; colCount < headsOfColumnsInTable.length; colCount++) {
				var td = document.createElement('td');
				var rowData = columnFunc[headsOfColumnsInTable[colCount]](campCounter, msg.pack);
				td.appendChild(rowData);
				tr.appendChild(td)
			}
			tbdy.appendChild(tr);
		}
		tbl.appendChild(tbdy);
		body.appendChild(tbl);



		$('.btn').click(function() {
			// alert(this.name);
				port.postMessage({
					funcName: this.name,
					pack: msg.pack //TODO:  I will create the checkbooks I will take only the campaigns who clicked..
			});
		});
	} else {
		var body = $('.span10')[0];
		respondeFromFunc = document.createTextNode(msg.pack);
		body.appendChild(respondeFromFunc);
	}
});

function camp_name(counter, msgPack) {
	return document.createTextNode(msgPack[counter].camp);
}


function row_num(counter, msgPack) {
	return document.createTextNode(counter + 1);
}