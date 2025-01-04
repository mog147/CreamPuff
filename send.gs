/*Webhook URLの接続確認が承認されない場合*/
//GASが正しくウェブアプリケーションとして公開されているか確認
//・次のユーザーとしてアプリケーションを実行：　自分
//・アプリケーションにアクセスできるユーザー：　全員（匿名ユーザーを含む）
function doPost(e) {
  /*実行部隊_LINE Messaging APIで応答bot*/
  
  // WebHookで受信した応答用Token
  let replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
  let userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  //////
  let text = msgs(userMessage);

  //////
  UrlFetchApp.fetch(url, {
    
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token,
    },
    
    'method': 'post',
    'payload': JSON.stringify({
      
      'replyToken': replyToken,
      
      'messages': [{
        'type': 'text',
        'text': text,
      }],
      
    }),
    
  });
  
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  
}

function postTest() {
  /*doPostテスト用*/

  let url = "https://script.google.com/macros/s/AKfycbxInA7bvxEr6gGSYQOo2zxQ1O2gYUerMIW4RBC8hvb9jG_cUl3IMPP9AqH47q0vFgH_jA/exec";//動作確認前にWebアプリケーションにアクセスできるユーザーを誰でもアクセスできるようにしておく
  
  let params = {
    method: "POST"
  }

  let fetch = UrlFetchApp.fetch(url, params);
  console.log(fetch.getContentText());

}

