var firebaseHelper = (function() {

	var theThing = {
		meals: [],
		config: {
				apiKey: "AIzaSyBxe4votlYFYRomf2y7MH7Uk3jzGD5sLtc",
				authDomain: "bw4d-1b480.firebaseapp.com",
				databaseURL: "https://bw4d-1b480.firebaseio.com",
				storageBucket: "bw4d-1b480.appspot.com",
				messagingSenderId: "477708780241"
		},
		init: function() {
			this.initApp();
			this.initUser();
		},
		initApp: function() {
			firebase.initializeApp(this.config);
		},
		initUser: function() {
			firebase.auth().onAuthStateChanged(user => {
				// console.log(user);
				if (user) {
					this.authUser(user);
				} else {
					this.forceLogin();
				}
			});
		},
		authUser: function(user) {
			var pathname = window.location.pathname;
			if (pathname == '/' || pathname == '/index.html') {
				window.location = '/main/mealplan.html';
			}
			var userRef = firebase.database().ref('users/' + user.uid);
			userRef.once('value', snap => {
				if(!snap.exists()) {
					this.fillDatabase(user, userRef);
				};
			});
			this.cacheMeals(user);
		},
		cacheMeals: function(user) {
			var foodRef = firebase.database().ref('users/' + user.uid + '/food');
				foodRef.on("child_added", snap => {
					console.log();
					this.meals.push(snap);
				});
		},
		fillDatabase: function(user, userRef) {
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
		},
		forceLogin: function() {
			var pathname = window.location.pathname;
			if (pathname != '/' && pathname != '/index.html') {
				window.location = '/';
			}
		},
		logOut: function() {
			firebase.auth().signOut().then(function() {
				// Really nothing to do here
			}).catch(function(error) {
				console.log(error);
			});
		}

	};

	theThing.init();
	
	return {
		meals: theThing.meals,
		logOut: theThing.logOut
	};

})();