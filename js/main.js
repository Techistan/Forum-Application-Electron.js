var database = firebase.database();
var firstname;
var lastname;
var username;
var pass;
var enterpassword;
var repeatpassword;
var autogenerate;
var checkusernamepassword;
var usernamecheck;
var myVar = setInterval(usernames, 10000);
var passwordcheck;
var mode= localStorage.setItem("mode","default");
function swapStyleSheet(){
  mode = localStorage.getItem("mode");
	var pagestyle = document.getElementById('pagestyle');
	var lightSwitch = document.getElementById('toggle');
	if(mode == "dark"){
    pagestyle.setAttribute('href', 'css/style.css');
	    lightSwitch.src = "img/off.png";
	    lightSwitch.title = "Turn the lights on";
    localStorage.setItem("mode","default");
    document.getElementById('div2').style.visibility="visible";
	} else {
    pagestyle.setAttribute('href', 'css/dark.css');
	    lightSwitch.src = "img/on.png";
	    lightSwitch.title = "Turn the lights back off";
    localStorage.setItem("mode","dark");
    document.getElementById('div2').style.visibility="hidden";
	}
}
var advancemode= localStorage.setItem("advancemode","default");
function advance(){
  advancemode = localStorage.getItem("mode");
	var pagestyle = document.getElementById('pagestyle');
	var lightSwitch = document.getElementById('toggle2');
	if(advancemode == "advance"){
    pagestyle.setAttribute('href', 'css/style.css');
	    lightSwitch.src = "img/off.png";
	    lightSwitch.title = "Turn the lights on";
    localStorage.setItem("mode","default");
    document.getElementById('div1').style.visibility="visible";
	}
  else {
    pagestyle.setAttribute('href', 'css/advance.css');
	    lightSwitch.src = "img/on.png";
	    lightSwitch.title = "Turn the lights back off";
    localStorage.setItem("mode","advance");
    document.getElementById('div1').style.visibility="hidden";
	}
}
document.getElementById('username').addEventListener('keypress', function( event ) {
    if( event.keyCode > 0 ) {  // return ?
        document.title = "Forum Application || User - " + this.value;
    }
}, false);
function usernames()
{
  var suggestion = document.getElementById('suggestionusername');
  suggestion.style.display = 'inline-block';
  database.ref('user/').once('value').then(function(snapshot) {
    suggestion.innerHTML = "Already exist users in database";
    for (var i in snapshot.val()) {
      suggestion.innerHTML += "<div class='suggestion' id="+snapshot.val()[i].u+" onclick='sug(this.id)'><a>"+snapshot.val()[i].u+"</a></div>";
    }
});
suggestion.innerHTML = '';
}
function suggestionout()
{
  var suggestion = document.getElementById('suggestionusername');
  suggestion.style.display = 'none';
}
function newUser()
{
    firstname = document.getElementById('firstname').value;
    lastname = document.getElementById('lastname').value;
    enterpassword = document.getElementById('enterpassword').value;
    repeatpassword = document.getElementById('repeatpassword').value;
    autogenerate = document.getElementById('autogenerate');
    if(firstname=="" || lastname=="" || enterpassword=="" || repeatpassword=="")
    {
      autogenerate.value = "Please enter username or password";
    }
    else {
      if(enterpassword==repeatpassword)
      {
      autogenerate.value = String(firstname+lastname+Math.floor(Math.random()*1000,1));
      alert('Please note your username '+ autogenerate.value);
      post();
    }
    else {
      autogenerate.value = "Please enter correct password";
    }
    }
}
function post()
{
  database.ref('user/'+autogenerate.value).set({
    //provide id for each of the seperate user
      fn: firstname,
      ln: lastname,
      p : enterpassword,
      u : autogenerate.value
    });
    window.location="dashboard.html#"+autogenerate.value;
  }
function sug(Id)
{
  username =document.getElementById('username');
  username.value = Id;
  document.title = "Forum Application || User - " + Id;
  suggestionout();
}
function load()
{
  checkusernamepassword = document.getElementById('checkusernamepassword');
  username =document.getElementById('username').value;
  pass = document.getElementById('pass').value;
  database.ref('user/'+username).once('value').then(function(snapshot) {
  usernamecheck = snapshot.val().u;
  passwordcheck = snapshot.val().p;
  if (usernamecheck==username && passwordcheck==pass) {
  window.location="dashboard.html#"+username;
  }
  else {
    alert('please enter correct username or password');
  }
});
}
