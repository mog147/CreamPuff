let token = PropertiesService.getScriptProperties().getProperty("LINE_MESSAGING_API");
let url = 'https://api.line.me/v2/bot/message/reply';//応答メッセージ用のAPI URL

/*wiki*/
let simple_wikipedia_api = 'http://wikipedia.simpleapi.net/api';

/*人工知能*/
let chatToken = PropertiesService.getScriptProperties().getProperty("CHAT_BOT_ACCESS_TOKEN");
let chatURL = 'https://chatbot-api.userlocal.jp/api/chat';

/*テスト用スクリプト*/
function test(){
  let text = msgs('昼ってなに？');
  console.log(text);
}

function msgs(userMessage){
  /*メッセージ分岐*/
    
  //メッセージ作成
  if (userMessage.match(/こんにちは/ig)){　　　　　//「こんにちは」と言ったとき
    return 'へろー！';
  }else if (userMessage.match(/こんばんは/ig)){　　//「こんばんは」と言ったとき
    return userMessage + 'ンゴ！';
  }else if (userMessage.match( '.*?' + 'ね')){　　//「〇〇ね」と言ったとき
    return 'ソダネ！';
  }else if (/って(なに|何)？?$/.test(userMessage)){//「〇〇ってなに(何)？」と言ったとき
    let msg =　'ごめんね、わからないや';   
    let reg = /(.*)って(なに|何)？?$/;
    let q = userMessage.match(reg)[1];
    let ans = getWikipediaUrlAndBody(q);
    if (ans !== null) {
      msg = [
        '説明するね！ ' + q + 'とは！'　+ '\n',
        ans.body.substr(0, 140) + '...',
        '続きは' + '\n',
        ans.url,
      ]
    }    
    
    let msgs = '';
    for(let i =0;i<msg.length;i++){
      msgs = msgs + '\n' + msg[i];   
    }

    return msgs;
       
  }else if(userMessage.match(/おみくじ/ig)) {
    
    //シート設定
    let pripriSheetId = '18NJaFC-R3WTyw31N7m8h1tYuSC8VZwpLBUYiR3rO594';
    let ss = SpreadsheetApp.openById(pripriSheetId);
    let sheet = ss.getSheets()[0]; 　　　　　//リスト
    let arr = sheet.getRange(1, 1, sheet.getLastRow());
    let randomNum = Math.round(Math.random()*sheet.getLastRow());//「ぷりぷり」と言ったときランダムで候補を選ぶ
    return arr.getValues()[randomNum][0];

  }else if(userMessage.match(/頭痛/ig)) {　　　　　　　　　　　　　　//「頭痛」と言ったとき

    let lists = getCurrent("Tokyo",false) //データ取得＿getCurrent("地域",true：メッセージ作成/false：シート追加)
    let dummy = addSheet(lists);      　　　//シートに追加
    let text = getCurrent("Tokyo",true) 
    return '登録OK！'+'\n\n'+text;

  }else if(userMessage.match(/リスト表示/ig)) {　　　　　　　　　　　//「リスト表示」と言ったとき
    
    let careSheetId ='18NJaFC-R3WTyw31N7m8h1tYuSC8VZwpLBUYiR3rO594';
    let careSs = SpreadsheetApp.openById(careSheetId);
    let careSheet = careSs.getSheets()[1];     
    return showList(careSheet);

  }else{
    
    let res = UrlFetchApp.fetch(
    chatURL + '?key=' + encodeURIComponent(chatToken) + '&message=' + encodeURIComponent(userMessage)
    );
    return JSON.parse(res).result;
    
  }

}

function getWikipediaUrlAndBody(q) {  
  /*wiki*/
  
  let url = simple_wikipedia_api + '?keyword=' + encodeURIComponent(q) + '&output=json';
  let res = JSON.parse(UrlFetchApp.fetch(url));
  
  if (res !== null) {
    
    return {
      'url': res[0].url, 'body': res[0].body
    };
    
  } else {
    
    return null;
    
  }
  
}