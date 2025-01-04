let sheetId ='18NJaFC-R3WTyw31N7m8h1tYuSC8VZwpLBUYiR3rO594';
function addSheet(lists) {
  /*天気をスプレットシートに記録*/
  
  //シート設定
  let ss = SpreadsheetApp.openById(sheetId);
  let sheet = ss.getSheets()[1];

  let arr = lists.split(/\n/); //splitで文字列を区切って配列変数に格納
  sheet.appendRow(arr);//レコード追加
  return arr
   
}

function showList(sheet){
  /*リスト表示*/

  let lastRow = sheet.getLastRow();  
  if(lastRow == 0){
    return 'listに何もないよ';  
  }
  
  let arr = sheet.getRange(1, 1, lastRow,9).getValues();
  arr.shift();
  let cnt = 0;
  
  let msgs = '';//返信メッセージ初期値
  let items = ['日付','位置','気温','気圧','湿度','最高気温','最低気温','風速','雲の割合']

  for(let i=0;i<arr.length;i++){
    
    for(let ii=0;ii<arr[0].length;ii++){
      msgs = msgs + items[ii] +'：'+ arr[i][ii] + '\n';
       
    }
    
    cnt = ++ cnt; 
    msgs = msgs +'\n';
  }

  return cnt + '件 list表示ok\n\n' + msgs;  
  
}

function delSheet(){
  /*一定の行に達したらスプレットシートクリーニング*/
  
  //シート設定
  let ss = SpreadsheetApp.openById(sheetId);
  let sheet = ss.getSheets()[1];
  let arr = sheet.getDataRange().getValues(); 

  if(arr.length >= 7){
    
    sheet.deleteRows(2);
    //0for(let i =arr.length -2; i >= 1; i--){
      //sheet.deleteRows(i + 1);
    //}
    
  }
  
}