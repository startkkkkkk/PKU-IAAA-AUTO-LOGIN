document.getElementById('clickme_save').onclick=saveconfig;
document.getElementById('clickme_clear').onclick=clearlogin;
document.getElementById('clickme_start').onclick=startlogin;
document.getElementById('clickme_stop').onclick=stoplogin;


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

function startlogin(){

  // Store
  chrome.storage.sync.set({'use_login': "Y",}, function() {
      console.log('Settings saved: start login');
  });
}

function stoplogin(){

  // Store
  chrome.storage.sync.set({'use_login': "N",}, function() {
      console.log('Settings saved: stop login');
  });
}

function clearlogin(){

  // Store
  chrome.storage.sync.set({'username': "N", 'password': "N", 'use_login': "N",}, function() {
      console.log('Settings saved: clear login');
  });
}