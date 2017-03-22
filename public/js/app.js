var meals = [];
var mealplan = [];

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

	var foodRef = firebase.database().ref().child('food');

	foodRef.on("child_added", snap => {
		var name = snap.child('name').val();
		// console.log(name);
		meals.push(name);
	});
}());

$('input[type=checkbox]').click((event) => {
	var idx = event.target.value;
	var mealId = '#meal-day-' + idx;
	if (event.target.checked) {
		$(mealId).removeClass('takeout');
		$(mealId).attr('onclick', 'rerollMeal(' + idx + ')');
		$(mealId).text(mealplan[idx]);
	} else {
		$(mealId).addClass('takeout');
		$(mealId).attr('onclick', 'null');
		$(mealId).text('(takeout)');
	}
	// console.log(event);
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function generateMealPlan() {
	$('#mealplan-table').show();
	var tmp = shuffleArray(meals);
	$('input[type=checkbox]').prop('checked', 'true')
	$('.box').removeClass('takeout');
	mealplan = [];
	for(var i=0; i<7; i++) {
		mealplan.push(tmp[i]);
		// console.log(tmp[i]);
		$("#meal-day-" + i ).text(tmp[i]);
	}
}

function rerollMeal(index) {
	var tmp = shuffleArray(meals);

	var i = 0;
	for ( ; mealplan.includes(tmp[i]); i++){}

	mealplan[index] = tmp[i];
	$("#meal-day-" + index).text(mealplan[index]);
}