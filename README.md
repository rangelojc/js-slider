# JS-Slider

Simple cross-browser slider component made in native Javascript.
Works in both mouse and touch inputs.

Demo: https://rangelojc.github.io/js-slider

# Download & Installation
Download `js-slider.js` and `js-slider.css` from `dist` and paste to your project.

Reference files from appropriate folders in your HTML

    <link rel="stylesheet" href="path/to/your/folder/js-slider.css">
    <script src="path/to/your/folder/js-slider.js"></script>

For import, download  `js-slider-module.js` from `dist` and paste to your project.

# Usage
Create a wrapper for the component and add id attribute

    <div class="slider" id="slider_parent"></div>

Instantiate `JS_Slider()` from the script (you may or may not assign this instance to a variable) with the relevant arguments

    var slider = new JS_Slider([id], [options])

Add custom events by assigning to supplied methods like so

    slider.onSuccess = myFunction;
    
Example:
    
    var slider = new JS_Slider("slider_parent", {
	    prompt:  "Slide to authenticate",
	    success:  "Authentication successful"
    });

    slider.onSuccess = () => console.log('Success!');

If using modules, import before using

    import JS_Slider from './path/to/your/folder/js-slider-modules.js'

# Arguments

 1. id - the id attribute of the wrapper, no need to include # selector.
 2. options - object containing label options

# Label Options
	prompt: "Slide now", //label when the slider is not yet complete
	
	success: "Slide OK", //label when the slider is already complete

# Methods

	reset() //resets the slider status back to default. DO NOT MODIFY
	
	onReset() //executes when the slider has been reset
	
	onSuccess() //executes when the slider has been completed
	
	onFail() //executes when the slider drag is finished/interrupted but not completed

# Properties

	progress: 0, //the current percentage the slider is in while being dragged
	
	successful: false, //the status whether the slider is complete or not
	
	progressThreshold: 70 //% when the slider will succeed when drag is finished/interrupted. 70 is default.
	
	labels: { //contains the labels used in the slider
       prompt: "Slide now", //before drag
       success: "Slide OK"  //after drag
    }

# CSS Classes

For applying your own styles:

`.js-slider-container  .js-slider` for the track

`.js-slider-container  .js-slider  .js-label` for the labels

`.js-slider-container  .js-slider  .js-label.prompt` for the prompt label

`.js-slider-container  .js-slider  .js-label.success` for the success label

`.js-slider-container  .js-slider  .js-bar` for the progress bar

`.js-slider-container  .js-slider  .js-handle` for the round handle

`.js-slider-container  .js-slider  .js-handle  .js-icon` for the icon

# Note

Loading the component will fail if `window.JS_Slider` does not contain a falsy value.
