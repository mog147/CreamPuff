let token = PropertiesService.getScriptProperties().getProperty("0YIzryFXCkwiEPvNZV5kqiliKX7xc5gYi9n3YBYD2DhRhBNH8v5JCOzdKT9znU15HgJntrhARUjbRyiG+mdD2dAQwfQILq2MKBbowek/yHG96mJKSUZuxYoygB1ycKqoJOc4tuqKWdXAjEgGkvlwLwdB04t89/1O/w1cDnyilFU=");

let url = 'https://api.line.me/v2/bot/message/reply';//応答メッセージ用のAPI URL


/*人工知能*/
let chatToken = PropertiesService.getScriptProperties().getProperty("fb7cd4cb1bba4f4d884a");
let chatURL = 'https://chatbot-api.userlocal.jp/api/chat';

/*テスト用スクリプト*/
function test(){
  let text = msgs('こんばんは');
  console.log(text);
}

function msgs(userMessage){
  /*メッセージ分岐*/
    
  //メッセージ作成
  if (userMessage.match(/こんにちは/ig)){　　　　　//「こんにちは」と言ったとき
    return 'へろー！';
  }else if (userMessage.match(/こんばんは/ig)){　　//「こんばんは」と言ったとき
    return userMessage + 'ンゴ！';
  }else{
    
    let res = UrlFetchApp.fetch(
    chatURL + '?key=' + encodeURIComponent(chatToken) + '&message=' + encodeURIComponent(userMessage)
    );
    return JSON.parse(res).result;
    
  }

}
