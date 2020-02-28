
console.log("Come to iaaa website!");

chrome.storage.sync.get(['username', 'password', "use_login"], function(items) {
    console.log(items["use_login"]);
    if(items["use_login"]=="Y"&&items["username"]!="N"&&items["username"]!=undefined){
        document.getElementById("user_name").value = items["username"];
        document.getElementById("password").value = items["password"];
        console.log(document.getElementById("appid").value);
        if(document.getElementById("appid").value!="zyfwkz"){
            console.log("A");
            location.href="javascript:oauthLogon(); void 0";
        }else{
            console.log("B");
            location.href="javascript:focusName(); void 0";
            location.href="javascript:sendSMSCode(); void 0";
        }
    }else if(items["use_login"]=="N"){
        console.log("Stop login");
    }
    else{
        console.log("use_login is not provided");
    }
});
