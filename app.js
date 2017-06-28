// replace this entire code block with the config found in the firebase dashboard
// for your created database
var config = {
    apiKey: "AIzaSyA10Shf7L_7Srv7GyNIY1gx4c7a3GoKKzI",
    authDomain: "final-project-project.firebaseapp.com",
    databaseURL: "https://final-project-project.firebaseio.com",
    projectId: "final-project-project",
    storageBucket: "final-project-project.appspot.com",
    messagingSenderId: "418635562552"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$(function() {
	$('#add-button').on('click',function(){
		var value =  $('#new-item').val();

		// grab a ref to the todo-items key in firebase
		var item = database.ref('/todo-items').push();
		item.set( { value: $('#new-item').val() } )
	})
	// grab a ref to the todo-items key and ..
	database.ref('/todo-items').on('value', function(snapshot) {
		var list = $('#list-items');
		list.empty();

		snapshot.forEach(function(listItem) {
			var item = listItem.val().value;
			 list.append('<li data-id="' + listItem.key +'">' + item + ' <a href="#" class="remove">Remove</a></li>');
		})
	})
	
	$('#list-items').on('click', 'li a', function() {
		var itemId = $(this).parent().data('id');
		database.ref("/todo-items/" + itemId).remove();
	})
})
