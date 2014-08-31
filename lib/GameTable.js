var GameTable = function(type,num) {
	this.index = 0;
	this.type = "double";
	this.n = 4;
	this.gameCount = 0;
	this.table = [];
	
	if (type) {
		this.type = type;
	}
	if (num && !isNaN(num)) {
		this.n = num;
	}
	
	this.init();
}
GameTable.prototype = {
	init: function() {
		this.table = this.createGameTable();
		if (this.type==="single") {
			this.gameCount = this.table.length;
		} else {
			this.gameCount = this.table.length / 2;
		}
	},
	hasPrev: function() {
		if (this.index <= 0) {
			return false;
		}
		return true;
	},
	hasNext: function() {
		if (this.index >= this.gameCount-1) {
			return false;
		}
		return true;
	},
	now: function() {
		var nowGame = this.getGameByIndex(this.index);
		return nowGame;
	},
	prev: function() {
		if (!this.hasPrev()) {
			return "前の試合はありません";
		}
		var nextGame = this.getGameByIndex(this.index-1);
		this.index--;
		return nextGame;
	},
	next: function() {
		if (!this.hasNext()) {
			return "全試合が終了しました";
		}
		var nextGame = this.getGameByIndex(this.index+1);
		this.index++;
		return nextGame;
	},
	getAllGames: function() {
		var games = [];
		for (var i = 0; i < this.gameCount; i++) {
			var game = this.getGameByIndex(i);
			games.push(game);
		}
		return games;
	},
	getGameByIndex: function(i) {
		var a = null;
		var b = null;
		var nextGame = "";
		if (this.type==="single") {
			a = this.table[i];
			nextGame = a[0]+" vs "+a[1];
		} else {
			a = this.table[i*2];
			b = this.table[i*2+1];
			nextGame = a[0]+"-"+a[1] + " vs " + b[0] + "-" + b[1];
		}
		return nextGame;
	},
	createGameTable: function() {
		var isOdd = true;
		var odd = [];
		var even = [];
		var n = this.n;
		var length = n;
		if (n%2===0) {
			isOdd = false;
			length -=1;
		}
		
		for (var i = 1; i <= n; i++) {
			if (i%2===0) {
				even.push(i);
			} else {
				odd.push(i);
			}
		}
		even = even.reverse();
		var list = odd.concat(even);
		var table = [];

		for (var i = 0; i < length;i++) {
			var pairCount = Math.floor(n / 2);
			for (var j = 0; j < pairCount; j++) {
				var pair = [list[j],list[list.length-(j+1)]];
				table.push(pair);
			}
			
			if (isOdd) {
				var a = list.pop();
				list.unshift(a);
			} else {
				var a = list.pop();
				var f = list.shift();
				list.unshift(a);
				list.unshift(f);
			}
		}
		
		if (this.type!=="single") {
			var count = (n-1)*(n/2);
			if (count%2 !== 0) {
				var copy = table.slice();
				table = table.concat(copy);
			}
		}
		return table;
	}
};