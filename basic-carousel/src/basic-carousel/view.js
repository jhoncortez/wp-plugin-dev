/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from jonny-basic-carousel block)' );
/* eslint-enable no-console */

document.addEventListener( 'DOMContentLoaded', function () {
    const carouselElements = document.querySelectorAll( '.swiper' );

    if ( ! carouselElements.length ) {
        return;
    }

    carouselElements.forEach( function ( element ) {
        new Swiper( element, {
            loop: true,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        } );

        // Log the swiper instance to the console for debugging
        // console.log( 'Swiper initialized:', swiper );
        
    })
} );