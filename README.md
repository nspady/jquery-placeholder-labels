jquery-placeholder-labels
=========================

A jQuery plugin to mimic Chrome and Safari's handeling of the placeholder for unsupported browsers. The plugin functions by adding a label element on top of the input element. This way the placeholder text remains visable untill a character is entered.

Setup
-----
Required componenets for the plugin to function

### CSS
`/* Class added to placeholder text on focus */
.input-selected {
	color: #aaa !important;
	}

/* Styling of the placeholder */
.placeholder span {
  position: absolute;
  padding: 5px; /* Set to match your input styling */
  color: #999; /* Color of the placeholder text */
  }`

### JS
Include after jQuery is loaded
`$( function() {
    add_placeholders();
	});
`

### Example label and text area
`<input type="text" name="name" placeholder="e.g. John Smith"></label>`

`<textarea name="comment" placeholder="Your comment goes here"></textarea>`


Browser support
---------------
Tested successfully on:
IE 7, 8, and 9


