function requestJson(path) {
  /*OpenWeatherMapのAPIから情報取得*/
  
  let url = "http://api.openweathermap.org/data/2.5/" + path + "&lang=ja&APPID=" + apiKey;
  
  if (IS_CELSIUS) {
    url += "&units=metric";
  }
  
  let response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
  return JSON.parse(response.getContentText());
  
}

let IS_CELSIUS = true; 
function getCurrent(query,flg) {
  /*メッセージを成形*/
  
  let m  = Moment.moment(new Date());
  let d = m.format('YYYY/MM/DD HH:mm').toString();
  
  let json = requestJson("weather?q=" + query);//関数呼び出し
  
  if (json.cod == "200") {
    
    let weather = json.weather[0];
    let text;
    
    if(flg){
      /*項目ありver*/
      
      text = d + "\n"
      +json.name + " の現在の天気"+ "\n" + weather.description + "\n"
      + "気温 " + json.main.temp + "°" + (IS_CELSIUS ? "C" : "F") + "\n"
      + "気圧 " + json.main.pressure + "hPa" + "\n"
      + "湿度 " + json.main.humidity + "%" + "\n";
      
      return text;
      console.log(text);  
      
    }else{      
      
      /*項目なしver*/
      text = d + "\n"      
      + json.name + ", " + json.sys.country + " の現在の天気"+ ": " + weather.description + "\n"
      + json.main.temp + "°" + (IS_CELSIUS ? "C" : "F") + "\n"　　　　//気温
      + json.main.pressure + "hPa" + "\n"　　　　　　　　　　　　　　　　//気圧
      + json.main.humidity + "%" + "\n"　　　　　　　　　　　　　　　　　//湿度
      + json.main.temp_min + "°" + (IS_CELSIUS ? "C" : "F") + "\n"　//最低気温
      + json.main.temp_max + "°" + (IS_CELSIUS ? "C" : "F") + "\n"　//最高気温
      + json.wind.speed + (IS_CELSIUS ? "meter" : "sec") + "\n"　　　//風速
      + json.clouds.all + "%" + "\n"　　　　　　　　　　　　　　　　　　　//雲の割合
      + "-" + "\n"　　　　　　　　　　　　　　　　//気圧
      + "http://openweathermap.org/img/w/" + weather.icon + ".png";
    }
    return text;
    console.log(text);   
    
  }else{
    
    return json.message;
    
  }
  
}