var mealio = (function() {

	// Init vars
	var dbUser = null;
	var userRef = null;
	var foodRef = null;
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
	var $mealsList = $('#meals-list');
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
		userRef = firebase.database().ref('users/' + user.uid);
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
		foodRef = firebase.database()
				.ref('users/' + user.uid + '/food');
		var tmpRef = foodRef.orderByChild('name');
		tmpRef.on("child_added", snap => {
			mealRefs.push(snap);
			if ($mealsList) {
				var key = snap.getKey();
				var mealName = snap.val().name;
				console.log(key);
				var html = 
					'<div class="row"><div class="col-xs-8 highlightable"> \
					<input type="text" class="meal-edit" \
					onchange="mealio.editMeal(\'' + key + '\', this.value)" \
					value="' + mealName + '"> \
					<button type="button" class="btn btn-danger small-btn" \
					onclick="mealio.deleteMeal(\'' + key + '\', \'' + mealName + '\')">X \
					</button></div></div>';
				$mealsList.append(html);
			}
		});
	}

	function addMeal() {
		var $newMeal = $('#new-meal').val();
		if ($newMeal) {
			var theMeal = {
				name: $newMeal,
				type: 'meal'
			}
			foodRef.push().set(theMeal);
			location.reload();
		} else {
			alert('New meal can\'t be blank, yo.');
		}
	}
	
	function editMeal(snapId, newVal) {
		console.log(snapId + ' :: ' + newVal);
		var mealRef = userRef.child('food/' + snapId);
		var tmp = {
			name: newVal,
			type: 'meal'
		}
		mealRef.set(tmp);
		location.reload();
	}

	function deleteMeal(snapId, mealName) {
		if (confirm('Are you sure you want to delete ' + mealName + '?')) {
			var tmpRef = foodRef.child(snapId);
			tmpRef.remove();
			location.reload();
		}
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
		generateMealPlan: generateMealPlan,
		rerollMeal: rerollMeal,
		addMeal: addMeal,
		editMeal: editMeal,
		deleteMeal: deleteMeal,
		logOut: logOut
	};

})();