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
			if (pathname == '/' || pathname == '/index.html') {
				window.location = '/main/mealplan.html';
			}
		} else {
			if (pathname != '/' && pathname != '/index.html') {
				window.location = '/';
			}
		}
	});
	
	var foodRef = firebase.database().ref().child('food');

	foodRef.on("child_added", snap => {
		var name = snap.child('name').val();
		// console.log(name);
		meals.push(name);
	});
}());