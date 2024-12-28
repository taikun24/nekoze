function notifyPosture() {
    // 1. ブラウザ通知
    new Notification("猫背を検知しました！", {
            body: "肩を広げて、姿勢を正してください。",
            icon: "icon.png"
    });
    // 3. タブのタイトル変更
    let originalTitle = document.title;
    document.title = "⚠ 猫背を検知しました！";
    setTimeout(() => {
        document.title = originalTitle;
    }, 3000);

    // 4. スマホ振動
    if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500]);
    }
}
Notification.requestPermission().then((permission) => {
    // set the button to shown or hidden, depending on what the user answers
    if(permission != "granted"){
        alert('ボタンを押して通知を許可してください！')
    }
  });
function getPerm(){
    Notification.requestPermission();
}
window.addEventListener('beforeunload', function (event) {
  event.preventDefault() // (1)
  event.returnValue = '' // (2)
})