var mealio = (function() {

	// Init vars
	var dbUser = null;
	var mealRefs = [];
	var mealplan = [];
	var config = {
		apiKey: "AIzaSyBxe4votlYFYRomf2y7MH7Uk3jzGD5sLtc",
		authDomain: "bw4d-1b480.firebaseapp.com",
		databaseURL: "https://bw4d-1b480.firebaseio.com",
		storageBucket: "bw4d-1b480.appspot.com",
		messagingSenderId: "477708780241"
	}

	// Cache DOM
	var $mealPlanTable = $('#mealplan-table');
	var $checkbox = $('input[type=checkbox]');
	var $box = $box = $('.box');
	var $mealDays = [];
	for (var i = 0; i < 7; i++) {
		$mealDays[i] = $('#meal-day-' + i);
	}

	// Bind Events
	$checkbox.click((event) => {
		var idx = event.target.value;
		var $mealEl = $mealDays[idx];
		if (event.target.checked) {
			$mealEl.removeClass('takeout');
			$mealEl.attr('onclick', 'mealio.rerollMeal(' + idx + ')');
			$mealEl.text(mealplan[idx].val().name);
		} else {
			$mealEl.addClass('takeout');
			$mealEl.attr('onclick', 'null');
			$mealEl.text('(takeout)');
		}
	});

	// *** User & Database Init Functions *** //
	function authUser(user) {
		var pathname = window.location.pathname;
		if (pathname == '/' || pathname == '/index.html') {
			window.location = '/main/mealplan.html';
		}
		var userRef = firebase.database().ref('users/' + user.uid);
		userRef.once('value', snap => {
			if(!snap.exists()) {
				fillDatabase(user, userRef);
			};
		});
	}

	function forceLogin() {
		var pathname = window.location.pathname;
		if (pathname != '/' && pathname != '/index.html') {
			window.location = '/';
		}
	}

	function logOut() {
		firebase.auth().signOut().then(function() {
			// Really nothing to do here
		}).catch(function(error) {
			console.log(error);
		});
	}

	function fillDatabase(user, userRef) {
		userRef.set({
			food: [ 
				{
					name: "Salmon",
					type: "meal"
				},
				{
					name: "Pasta Bolognese",
					type: "meal"
				},
				{
					name: "Tacos",
					type: "meal"
				},
				{
					name: "Chicken Stuff",
					type: "meal"
				},
				{
					name: "Meatloaf",
					type: "meal"
				},
				{
					name: "Hummus",
					type: "meal"
				},
				{
					name: "Kale Soup",
					type: "meal"
				},
				{
					name: "Pork Chops",
					type: "meal"
				},
				{
					name: "Daiya Pizza",
					type: "meal"
				},
				{
					name: "Chicken Nuggets",
					type: "meal"
				},
				{
					name: "Taco Mac 'n Cheese",
					type: "meal"
				}
			]
		});
		firebase.database().ref('/users').set(user.uid);
	}


	// *** Main App Functions *** //
	function cacheMeals(user) {
		var foodRef = firebase.database()
				.ref('users/' + user.uid + '/food')
				.orderByChild('name');
		foodRef.on("child_added", snap => {
			mealRefs.push(snap);
		});
	}
	
	function shuffleArray(array) {
		var tmpArray = array.slice();
		for (var i = tmpArray.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = tmpArray[i];
			tmpArray[i] = tmpArray[j];
			tmpArray[j] = temp;
		}
		return tmpArray;
	}

	function generateMealPlan() {
		var tmp = shuffleArray(mealRefs);
		if(!tmp || tmp.length < 7)
			return;
		$mealPlanTable.show();
		$checkbox.prop('checked', 'true')
		$box.removeClass('takeout');
		mealplan = [];
		for(var i=0; i<7; i++) {
			mealplan.push(tmp[i]);
			$mealDays[i].text(tmp[i].child('name').val());
		}
	}

	function rerollMeal(index) {
		var tmp = shuffleArray(mealRefs);
		var i = 0;
		for ( ; mealplan.includes(tmp[i]); i++);
		mealplan[index] = tmp[i];
		$mealDays[index].text(mealplan[index].child('name').val());
	}

	// Now actually initialize stuff
	// Init Firebase & Auth User
	firebase.initializeApp(config);
	firebase.auth().onAuthStateChanged(user => {
		// console.log(user);
		dbUser = user;
		if (dbUser) {
			authUser(dbUser);
			cacheMeals(dbUser);
		} else {
			forceLogin();
		}
	});
	
	return {
		// shuffleArray: theThing.shuffleArray,
		generateMealPlan: generateMealPlan,
		rerollMeal: rerollMeal,
		logOut: logOut
	};

})();