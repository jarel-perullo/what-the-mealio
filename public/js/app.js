var mealio = (function() {

	// Init vars
	mealplan = [];

	// Cache DOM
	var $checkbox = $('input[type=checkbox');;
	var $mealPlanTable = $('#mealplan-table');;
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
			$mealEl.attr('onclick', 'rerollMeal(' + idx + ')');
			$mealEl.text(mealplan[idx]);
		} else {
			$mealEl.addClass('takeout');
			$mealEl.attr('onclick', 'null');
			$mealEl.text('(takeout)');
		}
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
		// console.log($mealPlanTable);
		var tmp = shuffleArray(firebaseHelper.meals);
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
		var tmp = shuffleArray(firebaseHelper.meals);
		var i = 0;
		for ( ; mealplan.includes(tmp[i]); i++);
		mealplan[index] = tmp[i];
		$mealDays[index].text(mealplan[index].child('name').val());
	}

	return {
		generateMealPlan: generateMealPlan,
		rerollMeal: rerollMeal
	}
})();