# Harper Banner

Aren't there enough scrolling and fading banners available. Well, yes of course. Thing is, after trying out a few I found some were rather clunky or just a bit over done. Was kinda looking for something insanely simple where I could use a CSS background image instead of your standard HTML image as well as add customizable text containers per slide. I couldn't find what I was looking for so I decided to try and build my own and it is turning out to be a rather fun project.

## Features / Abilities

1. Super small and customizable
2. Current background image transition is only a fade effect.
3. Background images are resizable based on browser size.
4. Ability to set duration timer based on object setting or data attribute.
5. Clickable controls to select specific slide (still in development)

## To Do's

1. Finish up controls to select specific slide.
2. Ability to toggle slide controls.
3. Add next and previous slide controls.
4. Ability to toggle next and previous controls.
7. Define additional transition effects.

## Requirements

Well, jQuery of course. That should be about it, really.

## Installation

#### Un-Minified

```html
<link type="text/css" href="dist/harper-banner.css" rel="stylesheet" />
<script type="text/javascript" src="dist/harper-banner.js"></script>
```

Or of course...

#### Minified

```html
<link type="text/css" href="dist/harper-banner.min.css" rel="stylesheet" />
<script type="text/javascript" src="dist/harper-banner.min.js"></script>
```

## Defaults / Options

```javascript
$(function () {
    $('.banner').harper({
        controls: true,   // {boolean} true | false
        debug: false,     // {boolean} true | false
        duration: 10000,  // {int}
        next: true,       // {boolean} true | false
        previous: true,   // {boolean} true | false
        effect: 'fade'    // {string} fade | more to come
    });
});
```

## A Few Examples

Below are a few examples of how to use the Harper Banner plugin from default, plain jane to full featured.

#### Default Implementation

```javascript
$(function () {
    $('.banner').harper();
});
```

#### Duration

```javascript
$(function () {
    $('.banner').harper({
        duration: 8000 //default is 10000
    });
});
```
