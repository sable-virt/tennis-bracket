var type = $("#type");
var num = $("#num");
var game = $("#game");
var all = $("#all-game");

var games = null;
function generate() {
	$(".btn").hide();
	game.hide();
	all.hide();
	games = new GameTable(type.val(),num.val());
	var next = games.now();
	game.html(next);
	getAllGame();
	
	$(".btn").fadeIn();
	game.fadeIn();
	all.fadeIn();
	
	focusGame();
}
function focusGame() {
	all.children("li").removeClass("active");
	var i = games.index;
	all.children("li").eq(i).addClass("active");
	if (i === 0) {
		$(".prev").addClass("disabled");
	} else {
		$(".prev").removeClass("disabled");
	}
	if (i === games.gameCount-1) {
		$(".next").addClass("disabled");
	} else {
		$(".next").removeClass("disabled");
	}
}
function showNextGame() {
	if (games && games.hasNext()) {
		var next = games.next();
		game.html(next);
	} else {
		//alert(games.next());
	}
	focusGame();
}
function showPrevGame() {
	if (games && games.hasPrev()) {
		var prev = games.prev();
		game.html(prev);
	} else {
		//alert(games.prev());
	}
	focusGame();
}

function getAllGame() {
	if (games) {
		var allGames = games.getAllGames();
		var htm = "";
		for (var i = 0; i < allGames.length; i++) {
			htm += "<li>" + allGames[i] + "</li>";
		}
		all.html(htm);
	}
}

var numbers = [];
var lastnum = 0;
var rest = $("#rest");
function getNumber() {
	if(lastnum !== num.val()) {
		lastnum = num.val();
		numbers = [];
	}
	if (numbers.length === 0) {
		
		for (var i = 0; i < lastnum; i++) {
			numbers.push(i);
		}
		numbers = shuffleArray(numbers);
		rest.html("あと" + numbers.length + "人");
		alert("番号をランダムに振ります。\n準備ができたら再度順番を決めるを押してください");
		return;
	}
	alert("あなたは「" + (numbers.pop()+1) + "」番です");
	rest.html("あと" + numbers.length + "人");
	if (numbers.length === 0) {
		alert("最後まで番号を振り分けました");
		$("#rest").html("");
	}
}

function shuffleArray(arr) {
	var i = arr.length;
	while(i){
		var j = Math.floor(Math.random()*i);
		var t = arr[--i];
		arr[i] = arr[j];
		arr[j] = t;
	}
	return arr;
}

$(document).ready(function(){
	if(window.applicationCache){
		var cache = window.applicationCache;
		cache.addEventListener("updateready",function(){
			if(cache.status === 4){
				if(confirm('新しいバージョンが利用可能です')){
					cache.swapCache();
					location.reload();
				}
			}
		},false);
	}
});