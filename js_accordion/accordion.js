import $ from 'jquery';

const $group = $('[data-js-group]');
const $button = $('[data-js-accordion="button"]');
const $items  = $('[data-js-accordion="item"]');
const $close  = $('[data-js-accordion="close"]');

$button.on('click', init);
$close.on('click', close);

// EVENT HANDLER
function init(e) { 
    // get current target
    let currentId = $(e.currentTarget).attr('data-id');
    let $currentTarget = $("#" + currentId);
    // get current group
    let group = $currentTarget.closest($group);
    // if it's open then close otherwise close the open and open the current
    $currentTarget.hasClass('open') ? closeTarget($currentTarget) : openTarget($currentTarget, group);
}

function close(e) {
    let currentId = $(e.currentTarget).attr('data-id');
    let $currentTarget = $("#" + currentId);

    closeTarget($currentTarget);
}


// OPEN AND CLOSE FUNCTIONS
function closeTarget(target) {
    //apply height to item so that it can be animated when closing
    let targetHeight = $(target).prop('scrollHeight');
    $(target).css('height',targetHeight)
    $(target).removeClass('open');
    $(target).css('height','0');
}

function openTarget(target, group) {
    // apply height to target so it will animate
    let targetHeight = target.prop('scrollHeight');
    target.css('height',targetHeight);
    // loop through all items and close the open ones
    let groupItems = group.find($items);

    // set logic for understanding if we need to scroll to target
    let order;
    let openOrder;
    let openItem;

    groupItems.each(function(i,e) {
        let height = e.scrollHeight;
        // update counters
        if (e === target[0]) {
            order = i;
        };
        // check if current item in loop is open
        if ($(e).hasClass('open')) {
            // update counters
            openOrder = i;
            openItem = e;
            // initiate closing
            $(e).css('height',height); //this way we can animate the closure
            closeTarget(e)
        };
    });

    // if the target is beneath the currently open accordion, scroll to it 
    if (order > openOrder) {
        getFocus(openItem);
    }

    // add class open to target and at Transition End remove inline styles
    target.one('transitionend webkitTransitionEnd oTransitionEnd', () => {
        target.css('height','');
    });
    
    target.addClass('open');
}

// get target button in order to scroll to it
function getFocus(openItem) {
    $button.one('click', scrollToContent(event, $(openItem)));
}

// scroll to target
function scrollToContent(e, openItem) {
    let scrollTarget = $('#' + e.currentTarget.getAttribute('data-id'));

    $('html, body').animate({
        scrollTop: (scrollTarget.parent().offset().top - openItem.prop('scrollHeight'))
    }, 500);
}