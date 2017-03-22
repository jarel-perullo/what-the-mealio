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

	// Get elements
	// const preObject = document.getElementById('object');
	// const ulList = document.getElementById('list');

	// Create references
	const dbRef = firebase.database().ref();
	const foodRef = dbRef.child('food');
	// const dbRefObject = firebase.database().ref().child('object');
	// const dbRefList = dbRefObject.child('favorites');

	// Make a food
	var items = [];
	// items.push({
	// 	name: 'Salmon',
	// 	type: 'meal'
	// });
	// items.push({
	// 	name: 'Pasta Bolognese',
	// 	type: 'meal'
	// });
	// items.push({
	// 	name: 'Tacos',
	// 	type: 'meal'
	// });
	// items.push({
	// 	name: 'Chicken Stuff',
	// 	type: 'meal'
	// });
	// items.push({
	// 	name: 'Meatloaf',
	// 	type: 'meal'
	// });
	// items.push({
	// 	name: 'Hummus',
	// 	type: 'meal'
	// });
	// items.push({
	// 	name: 'Kale Soup',
	// 	type: 'meal'
	// });
	items.push({
		name: 'Pork Chops',
		type: 'meal'
	});
	items.push({
		name: 'Daiya Pizza',
		type: 'meal'
	});
	items.push({
		name: 'Chicken Nuggets',
		type: 'meal'
	});
	items.push({
		name: 'Taco Mac \'n Cheese',
		type: 'meal'
	});

	items.forEach((thing) => {
		console.log(JSON.stringify(thing));
		newRef = foodRef.push().set(thing);
	});


	// Sync object changes
	// dbRefObject.on('value', snap => {
	// 	preObject.innerText = JSON.stringify(snap.val(), null, 3);
	// });

	// Sync list changes
	// dbRefList.on('child_added', snap => {
	// 	const li = document.createElement('li');
	// 	li.innerText = snap.val();
	// 	li.id = snap.key;
	// 	ulList.appendChild(li);
	// });

	// dbRefList.on('child_changed', snap => {
	// 	const liChanged = document.getElementById(snap.key);
	// 	liChanged.innerText = snap.val();
	// });

	// dbRefList.on('child_removed', snap => {
	// 	const liToRemove = document.getElementById(snap.key);
	// 	liToRemove.remove();
	// });

}());