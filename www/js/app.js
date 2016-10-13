// 【mBaaS：APIkey】
var APPLICATIONKEY = "YOUR_NCMB_APPLICATIONKEY";
var CLIENTKEY      = "YOUR_NCMB_CLIENTKEY";

// 【mBaaS：初期化】
var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);

// 【mBaaS：公開ファイル】
var APPLICATION_ID = "YOUR_NCMB_APPLICATION_ID";

// 地図
var map;
// ズーム
var ZOOM = 15;

// 位置情報
var lat;
var lng;

// マーカー
var markers = [];

// 起動時の処理
$(function() {
    // 画面サイズを取得して地図サイズを設定
    $("#map_canvas").height(window.parent.screen.height*0.5);
    // 現在地を取得して地図を表示
    showMap();
});

//----------------------------------mBaaSの処理------------------------------------
// 【mBaaS：データストア】位置情報保存
function saveLocation() {
    var title = prompt("タイトルを入力してください", "");
    var comment = prompt("コメントを入力してください", "");
    // 現在地取得確認
    if (lat == "" || lat == null || lng == "" || lng == null) {
        // 現在地取得失敗時
        console.log("現在地情報なし");
    } else {
        // 現在地取得成功時
        console.log("現在地情報あり[lat:" + lat + ", lng:" + lng + "]");
        // 入力アラート(タイトル)
        document.title;
        if (title == null) {
            // [キャンセル]ボタン(title)が押下された場合
            alert("キャンセル(title)が押されました");
            console.log("キャンセル(title)が押されました");
        } else {
            if (title == "") {
                // 入力値が空の場合
                title ="No title.";
            }
            // 入力アラート(コメント)
            document.comment;
            if (comment == null) {
                // [キャンセル]ボタン(comment)が押下された場合
                alert("キャンセル(comment)が押されました");
                console.log("キャンセル(comment)が押されました");
            } else {
                if (comment == "") {
                    // 入力値が空の場合
                    comment ="No comment.";
                }
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
                        alert("保存に成功しました");
                        console.log("保存に成功しました");
                    })
                    .catch(function(error){
                        // 保存失敗時の処理
                        alert("保存に失敗しました：" + error.message);
                        console.log("保存に検索に失敗しました：" + error.message);
                    });
            }
        }        
    }
}

// 【mBaaS：データストア】位置情報検索（Shopクラスの検索）
function showShop() {
    // 現在地取得確認
    if (lat == "" || lat == null || lng == "" || lng == null) {
        // 現在地取得失敗時
        console.log("現在地情報なし");
    } else {
        // 現在地取得成功時
        console.log("現在地情報あり[lat:" + lat + ", lng:" + lng + "]");
        // 検索クラスインスタンスを生成
        var ShopClass = ncmb.DataStore("Shop");
        // 全件検索
        ShopClass.fetchAll()
            .then(function(shops) {
                // 検索成功時の処理
                console.log("Shop検索に成功しました");
                for (var i = 0; i < shops.length; i++){
                    var shop = shops[i];
                    var shopLocation = shop.get("geolocation");
                    var shopLatLng = new google.maps.LatLng(shopLocation.latitude, shopLocation.longitude);
                    // 情報ウィンドウ
                    var detail = "";
                    var shopName = shop.get("shopName");
                    detail += "<h2>"+ shopName +"</h2>";
                    var category = shop.get("category");
                    detail += "<p>"+ category +"</p>";
                    // icon画像(公開ファイル)
                    var iconName = shop.get("image");
                    var icon = "https://mb.api.cloud.nifty.com/2013-09-01/applications/" + APPLICATION_ID + "/publicFiles/" + iconName;
                    markToMap(detail, shopLatLng, map, icon);
                }
            })
            .catch(function(error) {
                // 検索失敗時の処理
                alert("Shop検索に失敗しました：" + error.message);
                console.log("Shop検索に失敗しました：" + error.message);
            });
    }
}

// 【mBaaS:データストア】位置情報検索（GeoPointクラスの検索）
function showLocation(button) {
    var type_id = button.id;
    var type;
    // 位置情報取得確認
    if (lat == "" || lng == "") {
        // 位置情報取得失敗時
        console.log("位置情報なし");
    } else {
        // 位置情報取得成功時
        console.log("位置情報あり[lat:" + lat + ", lng:" + lng + "]");
        // 検索先クラスのインスタンスを生成
        var GeoPointClass = ncmb.DataStore("GeoPoint");
        // 現在地
        var geoPoint = new ncmb.GeoPoint(lat, lng);
        // 新宿駅
        var geoPoint_shinjuku = new ncmb.GeoPoint("35.690553", "139.699579");
        // 西新宿駅
        var geoPoint_nishi_shinjuku = new ncmb.GeoPoint("35.694514", "139.692633");
        // 検索条件
        switch (type_id){
            case "all":
                alert("全件検索");
                type = "全件";
                break;
            case "circle":
                alert("円形検索(現在地から半径3km)");
                type = "円形";
                GeoPointClass.withinKilometers("geolocation", geoPoint, 3);
                break;
            case "square":
                alert("矩形検索(新宿駅と西新宿駅の間)");
                type = "矩形";
                GeoPointClass.withinSquare("geolocation", geoPoint_nishi_shinjuku, geoPoint_shinjuku);
                break;
        }
        // 検索
        GeoPointClass.fetchAll()
            .then(function(locations) {
                // 検索に成功した場合の処理
                alert(type + "検索に成功しました");
                console.log(type + "検索に成功しました");
                for (var i = 0; i < locations.length; i++){
                    var location = locations[i];
                    var geolocation = location.get("geolocation");
                    var locationLatLng = new google.maps.LatLng(geolocation.latitude, geolocation.longitude);
                    // 情報ウィンドウ
                    var detail = "";
                    var title = location.get("title");
                    detail += "<h2>"+ title +"</h2>";
                    var comment = location.get("comment");
                    detail += "<p>"+ comment +"</p>";
                    markToMap(detail, locationLatLng, map, null);
                }
            })
            .catch(function(error) {
                // 検索に失敗した場合の処理
                alert(type + "検索に失敗しました：" + error.message);
                console.log(type + "検索に失敗しました：" + error.message);
            });
    }
}

//----------------------------------地図の表示-------------------------------------

// 現在地を取得する
function showMap(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
};

// 現在地取得成功時のコールバック
var onSuccess = function(position){
    // 現在地情報を取得
    lat = position.coords.latitude; // 緯度
    lng = position.coords.longitude; // 経度
    alert("現在位置の取得に成功しました");
    console.log("現在位置の取得に成功しました");
    // 緯度経度を画面に表示
    document.gps.lat.value=lat;
    document.gps.lng.value=lng;
    // 地図を作成
    var location = {"lat": lat, "lng": lng};
    var mapOptions = {center: location, zoom: ZOOM};
    map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    // マーカーを表示
    var marker = "images/man.png";
    markToMap(null, location, map, marker);
};

// 現在地取得失敗時のコールバック
var onError = function(error){
    alert("現在位置の取得に失敗しました");
    console.log("現在位置の取得に失敗しました");
};

// 現在地取得時に設定するオプション
var option = {
    // 取得する間隔を１秒に設定
    frequency: 1000,
    // 6秒以内に取得できない場合はonGeoErrorコールバックに渡すよう設定
    timeout: 6000
};


// マーカー追加
function markToMap(info, position, map, icon){
    var marker = new google.maps.Marker({
        position: position,
        title: info,
        icon: icon
    });
    markers.push(marker);
    marker.setMap(map);
    // 情報ウィンドウ
    if (info == "" || info == null) {
        console.log("情報ウィンドウなし");
    } else {
        console.log("情報ウィンドウあり");
        google.maps.event.addListener(marker, 'click', function() {
            var infowindow = new google.maps.InfoWindow({
                content:marker.title
            });
            infowindow.open(map,marker);
        });
    }
}

// マーカー消去
function clearMarker() {
    for (var i = 1; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    // // 現在地のみ再表示する
    // showMap();
}
