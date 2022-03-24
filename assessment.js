'use strict';//厳格モード
const userNameInput     = document.getElementById('user-name');　　　 //入力エリア
const assessmentButton = document.getElementById('assessment');　　 //診断ボタン
const resultDivided     = document.getElementById('result-area');　 //結果表示エリア
const tweetDivided      = document.getElementById('tweet-area');　　//ツイートボタンエリア

assessmentButton.onclick = () => 　　　　　　//アロー関数で簡潔に
{　　　　  
  const userName = userNameInput.value;　  //ユーザー入力を取得
  if (userName.length === 0) 
  {
    //↑　名前が空の時は処理を終了するコード　↓
   return;
  }
  //▼診断結果表示エリアの子要素がある限りループする▼→子要素の削除に失敗すると無限ループになってしまう
  removeAllChildren(resultDivided);     //　※下記参照。  結果表示エリアの子要素を全て削除

  const result = assessment(userName);  //結果を素早く出すために、下記にあったresult変数を上に持ってきた

  //診断結果表示エリアの作成
  const header            = document.createElement('h3'); //h3タグを作る
  header.innerText        = '診断結果';　//h3タグにテキストを設定
  resultDivided.appendChild(header);　//h3タグを診断結果表示エリアに追加

  const p               = document.createElement('p');　　//pタグを作る
  //const result        = assessment(userName);　　　　　　//assessment関数を実行して、pタグに診断結果を設定する
  p.innerText           = result;
  resultDivided.appendChild(p);　　　　　　　　　　//pタグを追加する

  //ツイートボタンを設置する　　 
  removeAllChildren(tweetDivided);  // ツイート表示エリアの子要素を全て削除
  const anchor           = document.createElement('a');　//aタグをJSで作る
  const hrefValue        = 'https://twitter.com/intent/tweet?button_hashtag=' 
    　+ encodeURIComponent('あなたのいいところ')　+　'&ref_src = twsrc%5Etfw';
  anchor.setAttribute('href',hrefValue);　　//リンク先を設定　
  anchor.className = 'twitter-hashtag-button';　　//widgets.jsがツイートボタンに変換するためのマーカー
  anchor.setAttribute('data-text',result);　　//ツイート本文。第二引数をresultに置き換え
  anchor.innerText = 'Tweet #あなたのいいところ';　　//ボタンの表示内容
  tweetDivided.appendChild(anchor);　　//aタグをツイートエリアに表示

  //widgets.jsの設定
  const script = document.createElement('script');　　//scriptタグをJSで作る
  script.setAttribute('src','https://platform.twitter.com/widgets.js');　　//読み込むjsファイル（Twitter提供のwidgets.js）
  tweetDivided.appendChild(script);//scriptタグをHTMLに設置
};

//※の指示内容　↓
function removeAllChildren(element) 
{
  while (element.firstChild) 
  {　　//子要素がある限りループする
    element.removeChild(element.firstChild);
  }
}

const answers = 
[　//const=定数（上書きが出来なくなるので変数制限の時はまずconst.）変更が必要な変数の時にletを使う
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName 　ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) 
{
  //全文字のコード番号を取得して、それを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++)
  {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  //文字コード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result  = answers[index];

  result      = result.replaceAll('{userName}',userName); //{userName}をユーザーの名前に置き換える
  //↑({このパラメーターは置き換えたい文字つまりuserName},このパラメーターは入力された名前つまり引数のuserName);
  return result;
}
