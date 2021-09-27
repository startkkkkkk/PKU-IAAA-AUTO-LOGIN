document.getElementById('clickme_save').onclick=saveconfig;
document.getElementById('clickme_clear').onclick=clearlogin;
document.getElementById("cb").onclick=autoLoginToggleChange;

chrome.storage.sync.get(["use_login","username"], function(items) {
  if (items["username"]!="N"&&items["username"]!=undefined){
  document.getElementById("username").value=items["username"];
  document.getElementById("clickme_save").value="Update";
  }
  else{
    // No account data
    document.getElementById("clickme_clear").style.display = "none";
  }
  if (items["use_login"]=="Y") {
    document.getElementById("cb").checked=true;
  }
});

function saveconfig(){
  // Check browser support
  if (typeof(Storage) != "undefined") {

    var username=document.getElementById("username").value;
    var password=document.getElementById("passwd").value;

    if(username&&password){
      chrome.storage.sync.set({'username': username, 'password': password, "use_login": "Y"}, function() {
          console.log('Settings saved');
      });
      document.getElementById("result").innerHTML = "Successfully Saved";
    }else{
      document.getElementById("result").innerHTML = "Please input username and password";
    }

  }
  else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}


function clearlogin(){

  // Store
  chrome.storage.sync.set({'username': "N", 'password': "N", 'use_login': "N",}, function() {
      console.log('Settings saved: clear login');
  });
  location.reload()
}

function autoLoginToggleChange(){
  if (document.getElementById("cb").checked) {
        // Store
        chrome.storage.sync.set({'use_login': "Y",}, function() {
          console.log('Settings saved: start login');
      });
  }
  else {
        // Store
        chrome.storage.sync.set({'use_login': "N",}, function() {
          console.log('Settings saved: stop login');
      });

  }


}

