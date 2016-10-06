# 【Monaca】地図アプリを作ろう！
![画像001](/readme-img/001.png)
* Monacaデバッガー使用時(iPhone6s)の画面例です
* 実機ビルド時とは表示内容が異なる部分があります

## 概要
* [ニフティクラウドmobile backend](http://mb.cloud.nifty.com/)(通称mBaaS)の『位置情報検索』機能を利用して、「現在地情報（緯度経度）をクラウドに保存する・保存したデータを取得して地図に表示する」内容を実装したサンプルプロジェクトです
* 簡単な操作ですぐに [ニフティクラウドmobile backend](http://mb.cloud.nifty.com/)の機能を体験いただけます★☆

## ニフティクラウドmobile backendって何？？
スマートフォンアプリのバックエンド機能（プッシュ通知・データストア・会員管理・ファイルストア・SNS連携・位置情報検索・スクリプト）が**開発不要**、しかも基本**無料**(注1)で使えるクラウドサービス！

注1：詳しくは[こちら](http://mb.cloud.nifty.com/price.htm)をご覧ください

![画像002](/readme-img/002.png)

## 事前準備
* [ニフティクラウドmobile backend](http://mb.cloud.nifty.com/)のアカウントの取得（無料登録）
* Googleアカウント（gmailアカウント）の取得

## 動作環境
※下記内容で動作確認をしています

iOS
* Mac OS X 10.11.6(El Capitan)
* iPhone5 iOS 9.3.5
* iPhone6s iOS 10.0.1

Android
* Nexus 5X Androidバージョン 7.0

 * このサンプルアプリは、端末の位置情報を使用するため、実機の利用が必要です

## サンプルアプリ概要と使い方

![画像003](/readme-img/003.png)

* 端末の位置情報を許可すると、位置情報の取得が開始されます
 * 起動時、地図は現在地を中心として表示されます
* 取得した位置情報（現在地）は右上の「保存」をタップすることでmBaaSに保存できます
 * 位置情報にタイトル・コメントをつけて保存が可能です
* 保存した位置情報は地図上に赤いマーカーで表示されます
* また、「保存した場所をみる」ボタンをタップすると、既存お店情報と追加で保存した位置情報を地図に表示することができます
 * 全件検索・現在地から半径3km以内の円形検索・新宿駅と西新宿駅の間の矩形検索が可能です

![画像004](/readme-img/004.png)

* 事前にインポートしたお店の位置情報を右上のShopボタンをタップすることで地図に表示出来ます
* 表示したマーカーを消す場合は左上の画面クリアボタンをタップします


## サンプルアプリビルドまでの流れ

1. Monacaでプロジェクトインポートしてアプリを起動
1. mBaaSでアプリ作成とAPIキーの発行
1. mBaaSにお店データとアイコン画像をインポート
1. Google Cloud platform でプロジェクトの作成とAPIキーの発行、Google Maps JavaScript API の許可
1. mBaaSとGoogle Map 双方のAPIキーの設定とアプリケーションIDの設定
1. Monacaデバッガーでの動作確認

## 作業手順

### 1.Monacaでプロジェクトインポートしてアプリを起動

1. [Monaca](https://ja.monaca.io/)にログインします
1. 左上の「Import Project」をクリックします
1. 「プロジェクト名」を入力します　例）「MonacaMapApp」
1. 「インポート方法」の「URLを指定してインポート」をチェックし、下記リンクを右クリックでコピーし、貼り付けます
1. プロジェクト：__[MonacaMapApp](https://github.com/NIFTYCloud-mbaas/MonacaMapApp/archive/master.zip)__
1. 「インポート」をクリックするとインポートされたプロジェクトが作成されます

![画像005](/readme-img/005.png)

* 作成されたプロジェクトを「開く」をクリックして開きます
* プロジェクトが開き、プレビュー画面が表示されます
 * プレビュー画面あるいは[Monacaデバッガー](https://ja.monaca.io/debugger.html)で遊んでみましょう！

※ 動作確認は、プレビュー画面・Monacaデバッガーいずれも__iPhone6__以上の使用を推奨します

### 2. mBaaSでアプリ作成とAPIキーの発行

* ログイン後、下図のように「アプリの新規作成」画面が表示されるのでアプリを作成します

![画像007](/readme-img/007.png)

* アプリ作成されると下図のような画面になります
* この２種類のAPIキー（アプリケーションキーとクライアントキー）はMonacaで作成するアプリに[mBaaS](http://mb.cloud.nifty.com/)を紐付けるために使用します

![画像008](/readme-img/008.png)

### 3. [mBaaS](http://mb.cloud.nifty.com/)にお店データとアイコン画像をインポート
* プロジェクト：__[MonacaMapApp](https://github.com/NIFTYCloud-mbaas/MonacaMapApp/archive/master.zip)__ からダウンロードしたプロジェクトフォルダ内にある「setting」フォルダ内のデータをmBaaSにインポートします

![画像009](/readme-img/009.png)

* まず「Shop.json」をインポートして、mBaaSのデータストアにお店情報を保存します

![画像010](/readme-img/010.png)

※クラス名に「Shop」（"S"は大文字）を指定していない場合、アプリからデータを読み込めませんのでご注意ください！

* 下図のように５つのお店が登録されます

![画像011](/readme-img/011.png)

※ここで使用しているデータはデモのために作成した架空のもので、位置情報等も実在するお店とは関係ありませんので、ご了承ください。

* 次に「image」フォルダ内にあるアイコン画像をファイルストアにインポートします
 * まとめてアップロードすることが可能です

![画像012](/readme-img/012.png)

* 下図のように５つのお店のアイコンとmBaaSのアイコンが登録されます

![画像013](/readme-img/013.png)

### 4. [Google Cloud platform](https://console.cloud.google.com/)でプロジェクトの作成とAPIキーの発行、Google Maps JavaScript API の許可

*  [Google Cloud platform](https://console.cloud.google.com/)にログインします
* プロジェクトを作成します
 * プロジェクト名は任意で作成します　例）MapApp

![画像GCP001](/readme-img/GCP001.png)

* GoogleAPI呼び出し用のAPIキーを作成します

![画像GCP002](/readme-img/GCP002.png)
![画像GCP003](/readme-img/GCP003.png)
![画像GCP004](/readme-img/GCP004.png)

* Google Maps JavaScript APIを有効にします

![画像GCP005](/readme-img/GCP005.png)

### 5. mBaaSとGoogle Map 双方のAPIキーの設定とアプリケーションIDの設定
#### ● mBaaSのAPIキー
* Monacaにログインしてプロジェクトを開きます
* プロジェクトが開いたら、`js/app.js`を編集します
* 先程[mBaaS](http://mb.cloud.nifty.com/)のダッシュボード上で確認したAPIキーを貼り付けます

![画像014](/readme-img/014.png)

#### ● Google MapのAPIキー
* プロジェクトの、`index.html`を編集します
* [Google Cloud platform](https://console.cloud.google.com/)で発行したAPIキーを貼り付けます

![画像015](/readme-img/015.png)

#### ● アプリケーションID
* プロジェクトの、`js/app.js`を編集します
* アプリケーションIDはファイル管理の画面からURLを参照して貼り付けます。

  `https://console.mb.cloud.nifty.com/#/applications/アプリケーションID/file`

![画像016](/readme-img/016.png)

※アプリケーションIDとはコンソール画面のURLにあるランダムな文字列になります。アプリケーションキーとは異なりますので注意してください。<br>
※先ほど[インポート](https://github.com/oonoyosp/MonacaMapApp#3-mbaasにお店データとアイコン画像をインポート)したアイコン画像を地図上に表示するために利用します。

* それぞれ、<br>
【mBaaSのAPIキー】`YOUR_NCMB_APPLICATION_KEY`と`YOUR_NCMB_CLIENT_KEY`<br>
【Google MapのAPIキー】`YOUR_GOOGLE_MAPS_API_KEY`<br>
【アプリケーションID】`APPLICATION_ID`<br>
 の部分を書き換えます
 * このとき、ダブルクォーテーション（`"`）を消さないように注意してください！
* 書き換えが終わったら`index.html`と`app.js`を保存ボタンで保存します

### 6. Monacaデバッガーでの動作確認

* スマートフォン端末でMonacaデバッガーを立ち上げてログインします。
* 最初に設定した、アプリ名（例：MonacaMapApp）を選択してアプリを起動させてください。

* アプリが起動したら、アプリ位置情報を許可します
* 現在地の緯度経度と現在地を中心とした地図が表示されます

![画像017](/readme-img/017.png)

※実機ビルド時とは表示内容が異なる部分があります

* 左下の「保存」ボタンをタップすると位置情報の保存ができます
* タイトルとコメントを記入するアラートが表示されますので、入力し「OK」をタップします

![画像018](/readme-img/018.png)

* mBaaSに位置情報とタイトル・コメントが保存され、画面にマーカーが表示されます
* マーカーをタップするとタイトル・コメントが表示されます

-----

* 保存に成功したら、[mBaaS](http://mb.cloud.nifty.com/)のダッシュボードから保存先の「データストア」を確認してみましょう！
* 新しく「GeoPoint」クラスが作成され、その中にデータが保存されていることを確認できます
* 下の例は、タイトルに「和食」、コメントに「ワンコインで食べられる！」と入れた場合です

![画像019](/readme-img/019.png)

* 簡単に位置情報がクラウドに保存できました☆★
* 他、保存した情報は「全件」「円形」「矩形」ボタンで表示可能ですので操作してみてください！

## 解説
サンプルプロジェクトに実装済みの内容のご紹介

### mBaaSの初期設定
* SDKの詳しい導入方法は、mBaaS の[ドキュメント（クイックスタート）](http://mb.cloud.nifty.com/doc/current/introduction/quickstart_monaca.html)をご用意していますので、ご活用ください
* SDKの初期化は下記のコードで行っています

```javascript:app.js
// 【mBaaS：APIkey】
var APPLICATIONKEY = "YOUR_NCMB_APPLICATIONKEY";
var CLIENTKEY      = "YOUR_NCMB_CLIENTKEY";
```
※「`YOUR_NCMB_APPLICATIONKEY`」と「`YOUR_NCMB_CLIENTKEY`」は、mBaaSのダッシュボードで発行したAPIキーに置き換えます

### Google Map を表示するための初期設定

* SDKの詳しい導入方法は、[Google Maps API](https://developers.google.com/maps/)のウェブ向け（Google Maps JavaScript API）__[スタートガイド](https://developers.google.com/maps/documentation/javascript/tutorial)__（日本語）をご活用ください

* SDKの初期化は下記のコードで行っています

```html:index.html
<!-- Google Maps APIkeyの設定と初期化 -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=geometry" type="text/javascript"></script>
```

※「`YOUR_GOOGLE_MAPS_API_KEY`」は、Google Cloud Platformのダッシュボードで発行したAPIキーに置き換えます

### アプリケーションIDの初期設定

* ファイルストアの公開ファイルを読み込むためのアプリケーションIDの初期化は下記のコードで行っています

```javascript:app.js
// 【mBaaS：公開ファイル】
var APPLICATION_ID = "YOUR_NCMB_APPLICATION_ID";
```
※「`YOUR_NCMB_APPLICATION_ID`」は、mBaaSのファイルストアのURLにある文字列に置き換えます

`https://console.mb.cloud.nifty.com/#/applications/アプリケーションID/file`

### ロジックの紹介
* `index.html`でデザインを作成し、`js/app.js`にロジックを書いています
* mBaaSに位置情報を保存するコードと取得するコードについて抜粋して紹介します

#### 位置情報の保存・取得

* 位置情報の保存

```javascript
// 【mBaaS：データストア】位置情報保存
// 位置情報オブジェクト作成
var geolocation = new ncmb.GeoPoint(lat, lng);
// 保存先クラス
var GeoPoint = ncmb.DataStore("GeoPoint");
// クラスインスタンスを生成
var geoPoint = new GeoPoint();
// 値の設定
geoPoint.set("title", title);
geoPoint.set("comment", comment);
geoPoint.set("geolocation", geolocation);
// 保存
geoPoint.save()
    .then(function(){
        // 保存成功時の処理

    })
    .catch(function(error){
        // 保存失敗時の処理

    });
```

#### 位置情報取得

* 全件検索（検索条件なし）の場合

```javascript
// 【mBaaS:データストア】位置情報検索（GeoPointクラスの検索）
// 検索先クラスのインスタンスを生成
var GeoPointClass = ncmb.DataStore("GeoPoint");
// 検索
GeoPointClass.fetchAll()
    .then(function(locations) {
        // 検索に成功した場合の処理

    })
    .catch(function(error) {
        // 検索に失敗した場合の処理

    });
```

* 検索条件ありの場合
* それぞれ以下のように検索条件を追加しています

__＜円形検索＞__

```javascript
// 現在地から半径3km以内に該当する位置情報を検索
GeoPointClass.withinKilometers("geolocation", geoPoint, 3);

```

__＜矩形検索＞__

```javascript
// 新宿駅と西新宿駅の間
GeoPointClass.withinSquare("geolocation", geoPoint_nishi_shinjuku, geoPoint_shinjuku);
```

## 参考
* mBaaS(monaca)の[ドキュメント](http://mb.cloud.nifty.com/doc/current/#/Monaca)
* Google Maps JavaScript API の[ドキュメント](https://developers.google.com/maps/documentation/javascript/tutorial)
* 同じ内容の【iOS】版もご用意しています
 * [Objective-C]https://github.com/NIFTYCloud-mbaas/ObjcMapApp
 * [Swift]https://github.com/NIFTYCloud-mbaas/SwiftMapApp
