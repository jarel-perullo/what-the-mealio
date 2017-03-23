(function() {

	// Initialize Firebase
	const config = {
		apiKey: "AIzaSyBxe4votlYFYRomf2y7MH7Uk3jzGD5sLtc",
		authDomain: "bw4d-1b480.firebaseapp.com",
		databaseURL: "https://bw4d-1b480.firebaseio.com",
		storageBucket: "bw4d-1b480.appspot.com",
		messagingSenderId: "477708780241"
	};
	firebase.initializeApp(config);

	firebase.auth().onAuthStateChanged(user => {
		var pathname = window.location.pathname;
		console.log(pathname);
		console.log(user);

		if (user) {
			activeUser = user;
			if (pathname == '/' || pathname == '/index.html') {
				window.location = '/main/mealplan.html';
			}
			var userRef = firebase.database().ref('users/' + user.uid);
			userRef.once('value', snap => {
				if(!snap.exists()) {
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
					// firebase.database().ref('/users').set(user.uid);
				}
			});

			console.log(user.uid);
			var foodRef = firebase.database().ref('users/' + user.uid + '/food');
			foodRef.on("child_added", snap => {
				var name = snap.child('name').val();
				meals.push(name);
			});

		} else {
			if (pathname != '/' && pathname != '/index.html') {
				window.location = '/';
			}
		}
	});
	
	
}());