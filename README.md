# color-transitions

Performs smooth color transitions on css properties. Colors are randomly generated.


## Demo

https://kirans08.github.io/color-transitions/

## Usages

* Load `dist/color-transition.js`
* Add `color-transition-target` class and desired properties (Mentioned below) to the target element
* Call `startColorTransition()`

## Available Properties

These should be given as HTML attributes to the element

### color-min
* Lower limit of RGB values used for transition
* Possible values - 0-256
* Default value - 16

### color-max
* Upper limit of RGB values used for transition
* Possible values - 0-256
* Default value - 96

### refresh-interval
* Time interval in which the color value is updated.
* Possible values - Time in ms
* Default value - 25

### target-property
* CSS color property to update
* Possible values - All css properties which access RGB values
* Default value - backgroundColor
