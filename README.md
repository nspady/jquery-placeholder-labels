jquery-placeholder-labels
=========================

A jQuery plugin to mimic Chrome, Firefox and Safari's handeling of the placeholder for unsupported browsers. The plugin functions by adding a label element on top of the input element. This way the placeholder text remains visable until a character is entered.

Setup
-----
Required componenets for the plugin to function

### JS
Include after jQuery is loaded

	$( function() {
		$("input[placeholder], textarea[placeholder]").placeholder_labels();
	});
	
### Options

	$( function() {
		$("input[placeholder], textarea[placeholder]").placeholder_labels({
			blurColor  : '#aaa', //The color of the placeholder text when not in focus. Default: '#aaa'
			focusColor : '#bbb', //The color of the placeholder text when in focus. Default: '#bbb'
			labelClass : 'placeholder-lable' //Class added to the label which wraps the placeholder span
		});
	});

### Example label and text area
	<input type="text" name="name" placeholder="e.g. John Smith">

	<textarea name="comment" placeholder="Your comment goes here"></textarea>


Browser support
---------------
Tested successfully on:
IE 8+


