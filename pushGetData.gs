function getMessageText(e){
  /*メッセージを成型*/
  
  const newLine = "\n";    // 改行コード
  let response = "";       // 戻り値

  if (e.cod == "200"){
    
    let d = new Date();
    let tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    let formatTomorrow = Utilities.formatDate(tomorrow, "JST", "yyyy-MM-dd 00:00:00");

    response = "【" + formatTomorrow.slice(0, 10) + " の気圧情報】" + newLine;

    let currentPressure = 0.00; // 今回気圧
    let lastPressure = 0.00;    // 前回気圧
    let pressureDiff = 0.00;    // 気圧差

    // 気圧情報から警告をセットする
    e.list.forEach(function (item) {
      
      currentPressure = item.main.pressure;// 今回気圧をセット

      // 次の日のデータの場合のみ計算
      if(item.dt_txt.slice(0, 10) == formatTomorrow.slice(0, 10)){
        
        // 天気の絵文字をセット
        let iconcode = item.weather[0].icon;             // OpenWeatherMapのアイコンコード
        let emoji = getLINEemoji(iconcode.slice(0, 2));  // LINEの絵文字コード

        // 今回気圧－前回気圧の気圧差を加算
        pressureDiff += currentPressure - lastPressure;

        // 気温を小数点1位に丸める
        let temp = parseFloat(item.main.temp).toFixed(1);

        // 返信メッセージの作成
        response += "■" + item.dt_txt.slice(11, 16) + newLine
          + "　天気：" + emoji + "　気温：" + temp + newLine
          + "　気圧：" + item.main.pressure + newLine;

        // 気圧差が-3以下となった際は追加で警告メッセージをセット
        if(pressureDiff <= -3){
          response += "　※気圧低下に注意！\uDBC0\uDC9B" + newLine;
        }
        
      }
      
      lastPressure = currentPressure;// 前回気圧をセット
      
    });
    
  }else{  
    
    response = "データ取得時にエラーが発生しました。" + newLine + e.cod + ":" + e.message;
    
  }

  return response;
  
}

function getLINEemoji(iconCode){
  /*OpenWeatherMapのアイコンコードをもとに、LINE絵文字をセットする*/
  
  // LINE絵文字一覧：https://developers.line.biz/media/messaging-api/emoji-list.pdf
  // OpenWeatherMapアイコン一覧：https://openweathermap.org/weather-conditions
  let response = "";

  if(iconCode == "01" || iconCode == "02"){
    response = "\uDBC0\uDCA9"; // 晴れ
  }
  else if(iconCode == "03" || iconCode == "04"){
    response = "\uDBC0\uDCAC"; // 曇り
  }
  else if(iconCode == "09" || iconCode == "10"){
    response = "\uDBC0\uDCAA"; // 雨
  }
  else if(iconCode == "11"){
    response = "\uDBC0\uDC3A"; // 雷
  }
  else if(iconCode == "13"){
    response = "\uDBC0\uDCAB"; // 雪
  }
  else if(iconCode == "50"){
    response = "\uDBC0\uDCA0"; // 霧
  }
  else{
    response = "不明"
  }

  return response;
}