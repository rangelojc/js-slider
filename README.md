# JS-Slider

Simple cross-browser slider component made in native javascript

# Download & Installation
Download source files from `dist/` and paste to your project.
Reference files from appropriate folders in your HTML

    <link rel="stylesheet" href="dist/js-slider.css">
    <script src="dist/js-slider.js"></script>

# Usage
Create a wrapper for the component

    <div class="slider" id="slider_parent"></div>

And instantiate `JS_Slider()` from the script

    new JS_Slider([id], [options])

# Arguments

 1. id - the id attribute of the wrapper
 2. options - object containing label options

# Options
	prompt: "Slide now", //label when the slider is not yet complete
	success: "Slide OK", //label when the slider is already complete

# Methods

	reset() //resets the slider status back to default. DO NOT MODIFY
	onReset() //executes when the slider has been reset
	onSuccess() //executes when the slider has been completed
	onFail() //executes when the slider has been dragged with but not completed

# Properties

	progress: 0, //the current percentage the slider is in while being dragged
	successful: false, //check the status of the component
	progressThreshold: 70 //% when the slider will succeed when drag is finished/interrupted
	labels: { //contains the labels used in the slider
       prompt: "Slide now", //before drag
       success: "Slide OK"  //after drag
    }
