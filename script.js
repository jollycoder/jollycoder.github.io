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

    new AnimatePictures({
        parentClass: 'TopCars__item',
        tintClass: 'TopCarCard__tint-red',
        darkClass: 'TopCarCard__tint-dark',
        priceClass: 'TopCarCard__price',
        carClass: 'TopCarCard__car-type',
        fillColor: 'rgba(0, 0, 0, 0)',                  // цвет заливки картинки при клике
        parts: 20,                                      // количество частей в анимации картинок, чем больше — тем плавнее, но медленнее
        interval: 10                                    // задержка между частями анимации
    })
});

function IsMobileDevice() {
    this.isMobile = (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))return true
    })(navigator.userAgent || navigator.vendor || window.opera);
}

function GetCoords() {
    this.getEventCoordOnElem = function (event) {
        var box;
        return  {
            x: event.offsetX || event.changedTouches[0].clientX - (box = event.target.getBoundingClientRect()).left,
            y: event.offsetY || event.changedTouches[0].clientY - (box || event.target.getBoundingClientRect()).top
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

    var mainColor = '#eb4634';
    var transColor = 'rgba(0, 0, 0, 0)';
    var transRed = 'rgba(235, 70, 52, .7)';

    var buttonsData = [{
        button: options.elems[0],
        eventsData: [{
            event: 'mouseover',
            buttonTextColor: mainColor,
            fillColor: 'white',
            handler: onHover
        },  {
            event: 'mouseout',
            buttonTextColor: 'white',
            fillColor: transColor,
            handler: onHover
        },  {
            event: 'click',
            buttonTextColor: options.clickTextColor,
            fillColor: options.clickButtonFillColor,
            handler: onClickOrTouch1
        },  {
            event: 'touchend',
            buttonTextColor: options.clickTextColor,
            fillColor: options.clickButtonFillColor,
            handler: onClickOrTouch1
        }]
    },  {
        button: options.elems[1],

        paddingTop: getComputedStyle(options.elems[1]).paddingTop,
        paddingRight: getComputedStyle(options.elems[1]).paddingRight,

        eventsData: [{
            event: 'mouseover',
            buttonTextColor: mainColor,
            fillColor: 'white',
            handler: onHover
        },  {
            event: 'mouseout',
            buttonTextColor: 'white',
            fillColor: transRed,
            handler: onHover
        },  {
            event: 'click',
            fillColor: options.clickScreenFillColor,
            handler: onClickOrTouch2
        },  {
            event: 'touchend',
            fillColor: options.clickScreenFillColor,
            handler: onClickOrTouch2
        }]
    }];

    var parts = options.parts;
    var interval = options.interval;
    var counter = parts;
    var timer;

    function addToLeadNumber(value, add)  {  // addToLeadNumber('16px', -2) => '14px'
        return value.replace(/\d+/, function (found) {
            return +found + add
        })
    }

    function initGradientArray(color) {
        for (var i = 0, arr = []; i < parts; i++)  {
            arr[i] = color
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

    function getEventData(eventData, event) {
        return  {
            style: event.target.style,
            event: event.type,
            mouseover: event.type == 'mouseover',
            fillColor: eventData.fillColor,
            elem: event.target,
            paddingTop: buttonsData[1].paddingTop,
            paddingRight: buttonsData[1].paddingRight,
            targetButton1: event.target === buttonsData[1].button,
            button1Click: (event.type == 'click' || event.type == 'touchend') && event.target === buttonsData[1].button
        }
    }

    function makeFill(i, left, top, gradientColors) {
        if ( i.mouseover ? counter > i.prevValue : counter < i.prevValue )  {
            clearInterval(i.timer);
            return
        }
        i.prevValue = ( counter += (i.mouseover ? -1 : 1) );

        var index = i.mouseover ? counter : counter - 1;
        gradientColors[index] = i.fillColor;
        i.style.background = 'radial-gradient(circle farthest-side at ' + left + ' ' + top + ',' + gradientColors.join(',') + ')';

        if (counter == (i.mouseover ? 0 : parts))  {
            if (i.targetButton1 && i.event == 'mouseout')  {
                i.style.padding = i.paddingTop + ' ' + i.paddingRight;
                i.style.border = '';
            }
            i.style.background = i.fillColor;
            clearInterval(i.timer);
            i.button1Click && (document.location.href = i.elem.href)
        }
    }

    function onHover(eventData, gradientColors, event) {
        var i = getEventData(eventData, event);
        i.style.color = eventData.buttonTextColor;

        if (i.targetButton1 && i.mouseover)  {
            i.style.padding = addToLeadNumber(i.paddingTop, -1) + ' ' + addToLeadNumber(i.paddingRight, -1);
            i.style.border = '1px solid ' + mainColor
        }
        i.timer = setInterval(makeFill.bind(this, i, '50%', '50%', gradientColors), interval)
    }

    function onClickOrTouch1(eventData, gradientColors, event) {
        var i = getEventData(eventData, event);
        i.style.color = eventData.buttonTextColor;
        i.style.cursor = 'default';

        buttonsData[0].eventsData.forEach(function (item) {
            i.elem.removeEventListener(item.event, item.listener)
        });
        i.event == 'touchend' && (counter = 0);
        var coords = this.getEventCoordOnElem(event);
        i.timer = setInterval(makeFill.bind(this, i, coords.x + 'px', coords.y + 'px', gradientColors), interval)
    }

    function onClickOrTouch2(eventData, gradientColors, event) {
        event.preventDefault();

        var i = getEventData(eventData, event);
        i.style.color = 'white';
        i.style.padding = i.paddingTop + ' ' + i.paddingRight;
        i.style.border = '';
        i.style.background = transRed;

        gradientColors = initGradientArray(transColor);
        interval = 10;
        i.style = createDivOverAll.call(this).style;

        buttonsData[1].eventsData.forEach(function (item) {
            event.target.removeEventListener(item.event, item.listener)
        });

        i.event == 'touchend' && (counter = 0);
        var coords = this.getEventCoordOnElem(event);
        var box = event.target.getBoundingClientRect();
        i.timer = setInterval(makeFill.bind(this, i, (coords.x + box.left) + 'px', (coords.y + box.top) + 'px', gradientColors), interval)
    }

    function setButtonsData() {
        buttonsData.forEach((function (item, i) {
            if (item.button == null)
                return;
            item.gradientColors = initGradientArray(i ? transRed : transColor);
            item.button.style.transitionProperty = 'color';
            item.button.style.transitionDuration = interval * parts + 'ms';

            item.eventsData.forEach((function (eventData) {
                item.button.addEventListener(eventData.event, eventData.listener = eventData.handler.bind(this, eventData, item.gradientColors))
            }).bind(this))
        }).bind(this))
    }

    setButtonsData.call(this);
}

function AnimatePictures(options) {
    GetCoords.call(this);
    IsMobileDevice.call(this);

    var parentClass = document.getElementsByClassName(options.parentClass);
    var tintClass = document.getElementsByClassName(options.tintClass);
    var priceClass = document.getElementsByClassName(options.priceClass);
    var carClass = document.getElementsByClassName(options.carClass);
    var darkClass = document.getElementsByClassName(options.darkClass);
    var clickListeners = [];
    var fillColor = options.fillColor;
    var tintColor = 'rgba(235, 70, 52, .5)';
    var parts = options.parts;
    var interval = options.interval;
    var timeout, timer;

    function setInitStyles() {
        for (var i = 0; i < parentClass.length; i++)  {
            var s = tintClass[i].style;
            s.top = priceClass[i].offsetTop + 'px';
            s.width = priceClass[i].offsetWidth + 'px';
            s.height = priceClass[i].offsetHeight + 'px';
            s.opacity = 1;
            this.isMobile && (carClass[i].style.opacity = 1)
        }
    }

    function deletePointerEvents() {
        [tintClass, priceClass, carClass, darkClass].forEach(function (item) {
            for (var i = 0; i < parentClass.length; i++)  {
                item[i].style.pointerEvents = 'none'
            }
        })
    }

    function cssRules () {
        return [{
            sheet: document.styleSheets[0],
            selector: '.' + options.tintClass,
            rules: 'transition: all .2s !important',
            index: 0
        }, {
            sheet: document.styleSheets[0],
            selector: '.hover, .' + options.parentClass + ':hover .' + options.tintClass,
            rules: 'top: 0 !important;' +
            'width:' + parentClass[0].offsetWidth + 'px !important;' +
            'height:' + parentClass[0].offsetHeight + 'px !important;',
            index: 0
        }];
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

    function initGradientArray(color) {
        for (var i = 0, arr = []; i < parts; i++)  {
            arr[i] = color
        }
        return arr
    }

    function replaceElem(parent, child, backColor) {
        var elem = document.createElement("DIV");
        var s = elem.style;
        s.pointerEvents = 'none';
        s.position = 'absolute';
        s.left = s.top = 0;
        s.width = parent.offsetWidth + 'px';
        s.height = parent.offsetHeight + 'px';
        s.background = backColor;
        parent.appendChild(elem);
        parent.removeChild(child);
        return elem
    }

    function setOnEvents ()  {
        for (var i = 0; i < parentClass.length; i++)  {
            parentClass[i].addEventListener('mouseover', onHover.bind(this));
            parentClass[i].addEventListener('mouseout', onHover.bind(this));
            parentClass[i].addEventListener('touchend', onClick.bind(this));
            parentClass[i].addEventListener('click', clickListeners[i] = onClick.bind(this));
        }
        window.addEventListener('resize', onResize);
    }

    function onResize(event)  {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            for (var i = 0; i < parentClass.length; i++)  {
                var s = tintClass[i].style;
                s.top = priceClass[i].offsetTop + 'px';
                s.width = priceClass[i].offsetWidth + 'px';
                s.height = priceClass[i].offsetHeight + 'px';
            }
            deleteCssRule(document.styleSheets[0], 0);
            setCssRules(cssRules());
        }, 200)
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

    function onClick(event) {
        event.preventDefault();

        for (var i = 0; i < parentClass.length; i++)  {
            if (parentClass[i] === event.target)  break;
        }
        if (event.type == 'touchend')  {
            tintClass[i].classList.add('hover');
            setTimeout(function () {
                document.location.href = parentClass[i].href;
            }, 150);
            return
        }

        var s = replaceElem(parentClass[i], tintClass[i], tintColor).style;
        priceClass[i].style.zIndex = 9;
        carClass[i].style.zIndex = 10;

        var gradientColors = initGradientArray(tintColor);
        var coords = this.getEventCoordOnElem(event);
        var left = coords.x + 'px';
        var top = coords.y + 'px';

        var counter = 0;
        timer = setInterval(function () {
            gradientColors[counter++] = fillColor;
            s.background = 'radial-gradient(circle farthest-side at ' + left + ' ' + top + ',' + gradientColors.join(',') + ')';
            if (counter == parts)  {
                clearInterval(timer);
                event.target.removeEventListener('click', clickListeners[i]);
                document.location.href = parentClass[i].href;
            }
        }, interval)
    }

    setInitStyles.call(this);
    deletePointerEvents();
    setCssRules(cssRules());
    setOnEvents.call(this);
}
