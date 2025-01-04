let userId = PropertiesService.getScriptProperties().getProperty("LINE_USER_ID");
let apiKey = PropertiesService.getScriptProperties().getProperty("OPENWEATHERMAP_API_KEY");

function pushMessage() {
  /*トリガー用実行部隊_気圧の変化をお知らせ投稿*/
  /*停止中*/
  
  let forecast = getForecastInfo();             // 気象情報を取得
  let replyMessage = getMessageText(forecast);console.log(replyMessage);  // メッセージをセット
  
  let pushUrl = "https://api.line.me/v2/bot/message/push";
  let postData = {
    "to": userId,
    "messages": [{
      "type": "text",
      "text": replyMessage,
    }]
  };
  
  let headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + token,
  };
  
  let options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  
  let response = UrlFetchApp.fetch(pushUrl, options);
    
}

let CITY_ID = "1850147";       // 都市IDの指定
function getForecastInfo(){
  /*OpenWeatherMapのAPIから情報取得*/
    
  let url = "http://api.openweathermap.org/data/2.5/forecast?id=" + CITY_ID + "&APPID=" + apiKey + "&units=metric";// APIのURL（5日/ 3時間毎の予測データ）
  let response = UrlFetchApp.fetch(url);// データ取得

  return JSON.parse(response);
  
}
