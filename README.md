# JS-Slider

Simple cross-browser slider component made in native javascript

Demo: https://rangelojc.github.io/js-slider

# Download & Installation
Download source files from `dist/` and paste to your project.

Reference files from appropriate folders in your HTML

    <link rel="stylesheet" href="path/to/your/folder/js-slider.css">
    <script src="path/to/your/folder/js-slider.js"></script>

# Usage
Create a wrapper for the component

    <div class="slider" id="slider_parent"></div>

Instantiate `JS_Slider()` from the script

    new JS_Slider([id], [options])
    
Example:
    
    var slider = new JS_Slider("slider_parent", {
	    prompt:  "Slide to authenticate",
	    success:  "Authentication successful"
    });

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
	
	successful: false, //check the status of the component
	
	progressThreshold: 70 //% when the slider will succeed when drag is finished/interrupted
	
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

Loading the component will fail if `window.JS_Slider()` does not contain a falsy value.
