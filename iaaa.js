
// console.log("Come to iaaa website!");


// var actualCode = `// Code here.
// // If you want to use a variable, use $ and curly braces.
// // For example, to use a fixed random number:
// focusName();
// // var evt = document.createEvent('Event');
// // evt.initEvent('myCustomEvent', true, false);

// // // fire the event
// // document.dispatchEvent(evt);
// // NOTE: Do not insert unsafe variables in this way, see below
// // at "Dynamic values in the injected code"
// `;

// var script = document.createElement('script');
// script.textContent = actualCode;
// (document.head||document.documentElement).appendChild(script);
// script.remove();


// document.addEventListener('myCustomEvent', function() {
//     // do whatever is necessary
//     alert("111");
//   });

chrome.storage.sync.get(['username', 'password', "use_login"], function(items) {
    if(items["use_login"]=="Y"&&items["username"]!="N"&&items["username"]!=undefined){
        document.getElementById("user_name").value = items["username"];
        document.getElementById("password").value = items["password"];
        // console.log(document.getElementById("appid").value);


        $.getJSON('/iaaa/isMobileAuthen.do',
        //{userName: name,_rand:Math.random()},
        {userName: items["username"],appId: document.getElementById("appid").value ,_rand:Math.random()},
        function(data) {
            var json = data;           		
            $("#msg").text("");
            if(true===json.success){
                /*if(true == json.isMobileAuthen){//OLD!
                    $("#sms_area").show();
                }*/
                //add 201705
                var isMobileAuthen = json.isMobileAuthen;//modi 201705 String 
                var modeAuthen = json.authenMode;//modi 201705 String 
                var isBind = json.isBind;//绑定状态 boolean
                if(true==isMobileAuthen){
                    // alert("AAA");
                    if("OTP"===modeAuthen){
                        $("#sms_area").hide();
                        $("#otp_area").show();
                        if(false===isBind){
                            $("#msg").text("请先绑定手机App");
                            $("#otp_button").show();
                            $("#logon_button").hide();
                        }
                        else{
                            $("#otp_button").hide();
                            $("#logon_button").show();
                        }
                    }
                    else if("SMS"===modeAuthen){
                        $("#sms_area").show();
                        $("#otp_area").hide();
                        $("#otp_button").hide();
                        $("#logon_button").show();
                        location.href="javascript:sendSMSCode(); void 0";
                        $("#sms_code").focus();
                    }
               }
                else{
                    $("#sms_area").hide();
                    $("#otp_area").hide();
                    $("#otp_button").hide();
                    $("#logon_button").show();
                    location.href="javascript:oauthLogon(); void 0";
                }
            }
        })

        // location.href="javascript:showOrHideSmsCode(); void 0";
        // location.href="javascript:focusName(); void 0";

        // setTimeout(() => { console.log($("#sms_area").is(":hidden")); }, 2000);

        // console.log($("#sms_area:visible"));
        // console.log("DDDDD");
        // // console.log($("#sms_area:display"))
        // // $("#sms_code").focus();;
        console.log($("#sms_area:visible"));
        console.log($("#sms_area").is(":hidden"));

        // showOrHideSmsCode();

        // console.log($("#sms_area:visible"));

        // if($("#sms_area:visible").length>0){
        //     console.log("SMS Login");
        //     // location.href="javascript:focusName(); void 0";
        //     // location.href="javascript:sendSMSCode(); void 0";
        //     $("#sms_code").focus();
        // }else if($("#otp_area:visible").length>0){
        //     console.log("OTP Login");
        //     $("#otp_code").focus();
        // }else if($("#code_area:visible").length>0){
        //     console.log("Code Login");
        //     $("#valid_code").focus();
        // }else{
        //     console.log("Pure Login");
        //     location.href="javascript:oauthLogon(); void 0";
        // }
    }else if(items["use_login"]=="N"){
        console.log("Stop login");
    }
    else{
        console.log("use_login is not provided");
    }
    console.log($("#sms_area:visible"));

});
