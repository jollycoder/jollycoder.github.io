"use strict";

window.addEventListener('load', function () {
    new AnimateButtons({
        elems: [ document.querySelector('.button_inversion'), document.querySelector('.Header__navigationLink_action') ],
        clickScreenFillColor: 'rgba(22, 77, 139, .5)',  // цвет заливки экрана при клике по второй кнопке
        clickButtonFillColor: '#164d8b',                // цвет заливки первой кнопки при клике
        clickTextColor: 'white',                        // цвет текста первой кнопки при клике
        parts: 16,                                      // количество частей в анимации кнопок, чем больше — тем плавнее, но медленнее
        interval: 10                                    // задержка между частями анимации
    });

    animatePictures({
        parentClass: 'TopCars__item',
        tintClass: 'TopCarCard__tint-red',
        darkClass: 'TopCarCard__tint-dark',
        priceClass: 'TopCarCard__price',
        carClass: 'TopCarCard__car-type'
    })
});

function animatePictures(options) {
    var parentClass = document.getElementsByClassName(options.parentClass);
    var tintClass = document.getElementsByClassName(options.tintClass);
    var priceClass = document.getElementsByClassName(options.priceClass);
    var carClass = document.getElementsByClassName(options.carClass);
    var darkClass = document.getElementsByClassName(options.darkClass);
    var clickListeners = [];
    var timeout, timer;

    var cssRules = [{
        sheet: document.styleSheets[0],
        selector: '.' + options.tintClass,
        rules: 'transition: all .2s !important',
        index: 0
    },  {
        sheet: document.styleSheets[0],
        selector: '.' + options.parentClass + ':hover .TopCarCard__tint-red',
        rules: 'top: 0 !important;' +
               'width:' + parentClass[0].offsetWidth + 'px !important;' +
               'height:' + parentClass[0].offsetHeight + 'px !important;',
        index: 0
    }];

    function deletePointerEvents() {
        [tintClass, priceClass, carClass, darkClass].forEach(function (item) {
            for (var i = 0; i < parentClass.length; i++)  {
                item[i].style.pointerEvents = 'none'
            }
        })
    }

    function addCSSRule(sheet, selector, rules, index) {
        if ('insertRule' in sheet) {
            sheet.insertRule(selector + '{' + rules + '}', index);
        }
        else if ('addRule' in sheet) {
            sheet.addRule(selector, rules, index);
        }
    }

    function deleteCssRule(sheet, index) {
        if ('deleteRule' in sheet)  sheet.deleteRule(index);
        else if ('removeRule' in sheet)  sheet.removeRule(index)
    }

    function setCssRules(rules) {
        rules.forEach(function (item) {
            addCSSRule(item.sheet, item.selector, item.rules, item.index)
        })
    }

    function setTintPositions() {
        for (var i = 0; i < parentClass.length; i++)  {
            var s = tintClass[i].style;
            s.top = priceClass[i].offsetTop + 'px';
            s.width = priceClass[i].offsetWidth + 'px';
            s.height = priceClass[i].offsetHeight + 'px';
            s.opacity = 1;
        }
    }

    function setOnEvents ()  {
        for (var i = 0; i < parentClass.length; i++)  {
            parentClass[i].addEventListener('mouseover', onHover.bind(this));
            parentClass[i].addEventListener('mouseout', onHover.bind(this));
            parentClass[i].addEventListener('click', clickListeners[i] = onClick.bind(this));
        }
    }

    function onHover(event) {
        for (var i = 0; i < parentClass.length; i++)  {
            if (parentClass[i] === event.target)  break;
        }
        if (event.type == 'mouseout') {
            clearTimeout(timeout);
            clearInterval(timer);
            carClass[i].style.opacity = 0;
        }
        else  {
            timeout = setTimeout(function () {
                var counter = 0;
                timer = setInterval(function () {
                    carClass[i].style.opacity = (++counter)/10;
                    if (counter == 10) clearInterval(timer);
                }, 15)
            }, 100)
        }
    }

    function onClick() {

    }

    setTintPositions();
    deletePointerEvents();
    setCssRules(cssRules);
    setOnEvents();
}

function GetCoords() {
    this.getOffsetRect = function (elem) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) }
    };

    this.getEventCoordOnElem = function (event, elem) {
        return  {
            x: event.pageX - this.getOffsetRect(elem).left,
            y: event.pageY - this.getOffsetRect(elem).top
        }
    };

    this.getScrollHeight = function () {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        )
    }
}

function AnimateButtons(options) {
    GetCoords.call(this);

    var buttonsData = [{
        button: options.elems[0],
        eventsData: [{
            event: 'mouseover',
            buttonTextColor: '#eb4634',
            fillColor: 'white'
        },  {
            event: 'mouseout',
            buttonTextColor: 'white',
            fillColor: 'rgba(255, 255, 255, 0)'
        },  {
            event: 'click',
            buttonTextColor: options.clickTextColor,
            fillColor: options.clickButtonFillColor
        }]
    },  {
        button: options.elems[1],
        eventsData: [{
            event: 'mouseover',
            buttonTextColor: '#eb4634',
            fillColor: 'white'
        },  {
            event: 'mouseout',
            buttonTextColor: 'white',
            fillColor: 'rgba(235, 70, 52, .7)'
        },  {
            event: 'click',
            fillColor: 'rgba(235, 70, 52, .7)'
        }]
    }];

    var parts = options.parts;
    var interval = options.interval;
    var counter = parts;

    function initGradientArray(button) {
        for (var i = 0, arr = []; i < parts; i++)  {
            arr[i] = ( button ? 'rgba(235, 70, 52, .7)' : 'rgba(255, 255, 255, 0)' )
        }
        return arr
    }

    function createDivOverAll()  {
        var cover = document.createElement("DIV");
        var s = cover.style;
        s.position = 'absolute';
        s.left = s.top = 0;
        s.width = '100vw';
        s.height = this.getScrollHeight() + 'px';
        document.body.appendChild(cover);
        return cover
    }

    function onEvent(eventData, gradientColors, event) {
        var style = event.target.style;
        var e = event.type;
        var mouseover = e == 'mouseover';
        var fillColor = eventData.fillColor;
        var elem = event.target;
        var prevValue;

        if (e == 'click' && elem === buttonsData[1].button)  {
            style.color = 'white';
            style.height = style.lineHeight = '18px';
            style.padding = '9px 15px';
            style.border = '';
            style.background = fillColor;

            gradientColors = initGradientArray();
            fillColor = options.clickScreenFillColor;
            interval = 10;
            elem = createDivOverAll.call(this);
            style = elem.style
        }
        else style.color = eventData.buttonTextColor;

        var left = '50%', top = '50%';
        if (e == 'click')  {
            left = this.getEventCoordOnElem(event, elem).x + 'px';
            top = this.getEventCoordOnElem(event, elem).y + 'px';

            if (elem === buttonsData[0].button)  {
                style.cursor = 'default';
                buttonsData[0].eventsData.forEach(function (item) {
                    elem.removeEventListener(item.event, item.listener)
                })
            }
        }

        if (elem === buttonsData[1].button && mouseover)  {
            style.height = style.lineHeight = '16px';
            style.padding = '9px 14px';
            style.border = '1px solid #eb4634'
        }

        var timer = setInterval(function () {
            if ( mouseover ? counter > prevValue : counter < prevValue )  {
                clearInterval(timer);
                return
            }
            prevValue = ( counter += (mouseover ? -1 : 1) );

            var index = mouseover ? counter : counter - 1;
            gradientColors[index] = fillColor;
            style.background = 'radial-gradient(circle farthest-side at ' + left + ' ' + top + ',' + gradientColors.join(',') + ')';

            if (counter == (mouseover ? 0 : parts))  {
                if (elem === buttonsData[1].button && e == 'mouseout')  {
                    style.height = style.lineHeight = '18px';
                    style.padding = '9px 15px';
                    style.border = ''
                }
                style.background = fillColor;
                clearInterval(timer);
            }
        }, interval);
    }

    (function () {
        buttonsData.forEach((function (item, i) {
            item.gradientColors = initGradientArray(i);
            item.button.style.transitionProperty = 'color';
            item.button.style.transitionDuration = interval * parts + 'ms';

            item.eventsData.forEach((function (eventData) {
                item.button.addEventListener(eventData.event, eventData.listener = onEvent.bind(this, eventData, item.gradientColors))
            }).bind(this))
        }).bind(this))
    }).call(this);
}
