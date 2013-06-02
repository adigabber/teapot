var portSC;
var portPop;
var portCampTab;
var inProcess = false;
var BGfunArr = {
  "UI": UI,
  "Paused": Paused,
  "DupTw": open_camp_tabs
};

//  vars for fun that need new win
var currCamp = -1;
var ArrCamp = [];
var funcForTabs = ""


chrome.runtime.onConnect.addListener(function(port) {

  if (port.name == "fromCStoBG") {
    if (!inProcess) {
      portSC = port;
      portSC.onMessage.addListener(function(msg) {
        //not to send it to popup without checking
        portPop.postMessage({
          funcName: msg.funcName,
          pack: msg.pack
        });
      });
    } else {
      portCampTab = port;
      portCampTab.postMessage({
        funcName: funcForTabs,
        pack: "AllTw"
      });
      portCampTab.onMessage.addListener(function(msg) {
        //close_wi func
        var sendToSC1 = open_camp_tabs(funcForTabs, ArrCamp);
        portSC.postMessage({
          funcName: sendToSC1[0],
          pack: sendToSC1[1]
        });
      });
    }
  } else if (port.name == "fromPOtoBG") {
    portPop = port;
    portPop.onMessage.addListener(function(msg) {
      var sendToSC = BGfunArr[msg.funcName](msg.funcName, msg.pack);
      portSC.postMessage({
        funcName: sendToSC[0],
        pack: sendToSC[1]
      });
    });
  }
});



function open_camp_tabs(funcName, pack) {
  ArrCamp = pack;
  if (currCamp < ArrCamp.length) {
    inProcess = true;
    currCamp++;
    funcForTabs = funcName;
    return ["OpenCamp", pack[currCamp].camp]
  } else {
    inProcess = false;
    currCamp = -1;
    funcForTabs = "";
    return ["Done", pack]
  }

}

function UI(funcName, pack) {
  return [funcName, pack];
}

function Paused(funcName, pack) {
  return [funcName, pack];
}