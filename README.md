# Portable slider

<p>Responsible slider</p>
<b>PC version</b>

![alt text](https://github.com/Feshior-WEB/PortableSlider/blob/main/github_images/pc-screenshot.PNG?raw=true?raw=true)

<b>Mobile version</b>

|                                                         1                                                         |                                                         2                                                         |                                                         3                                                         |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| ![alt text](https://github.com/Feshior-WEB/PortableSlider/blob/main/github_images/phone1-screenshot.PNG?raw=true) | ![alt text](https://github.com/Feshior-WEB/PortableSlider/blob/main/github_images/phone2-screenshot.PNG?raw=true) | ![alt text](https://github.com/Feshior-WEB/PortableSlider/blob/main/github_images/phone3-screenshot.PNG?raw=true) |

<h1>Developing proccess:</h1>
<h3>Task descripion:</h3>
<p>Create a responsible slider using native js. 
    <li>Slider must work only on mobile devices, pc version must be static.</li>
    <li>Slider must contain progressbar.</li>
    <li>Slider must contain 2 elements on mobile screen</li>
</p>
<h3>My approaching the task:</h3>
<li><b>Design:</b> I began by focusing on mobile slider. I created a responsive design using CSS media queries.</li>
<li><b>Slider Initialization:</b> I created `initializeSlider` function that checks the window widht and if it's less than 600px enables slider functionality. For large screens slider will remain static.<br>
  - In the `initializeSlider` function, I attached handlers using mouse and touch events `(mousedown, mouseup, mouseleave, mousemove, touchstart, touchend, touchmove)`.</i>
</li>

<li><b>Drag and Touch Handlers:</b>I implemented the touch and drag event handlers: `touchStart`, `touchEnd`, and `touchMove`. These handlers track the user's touch or mouse movement and update the current position of the slider accordingly.</li>
<li><b> Navigation:</b> To enable slide navigation, I implemented the logic in the touchEnd() function. When the user releases the slide after dragging, this logic determines the direction and distance of the slide movement. Each item contains unique id, so we can determine at which slider user clicked and adjust the current and previous indexes accordingly. It also prevents the slider from moving out of the defined range.
<li><b>Slider Positioning and Progress Bar:</b> I implemented functions to set the slider's position `setSliderPosition` and update the progress bar width `setProgressbarByIndex` based on the current slide index.</li>
<li><b>Responsive Behavior:</b> To ensure the slider adapts to changes in window size, I added an event listener for the resize event. When the window is resized, the `recalculateSizes` function recalculates the card width adding/removing event listeners.</li>

<h1>Usage:</h1>
<li>You can add as many items as needed, the slider will work correctly. However, please note that the slider is disabled on the PC version, because of that it's not recommended to add more than 6 items.</li>
<li>It's possible to make the slider smaller or bigger. To do this, use a div that overlaps the slider.</li>
<li>On mobile devices, the slider is limited to 2 items on the screen.</li>
