/* jshint -W071, -W074 */
/* global jQuery:false */

/* Disabled options are:
 * W071: This function has too many statements
 * W074: This function's cyclomatic complexity is too high
 */

/*
 *  jQuery ezPlusCard 1.1.11
 *  Demo's and documentation:
 *  http://igorlino.github.io/elevatezoom-plus/
 *
 *  licensed under MIT license.
 *  http://en.wikipedia.org/wiki/MIT_License
 *
 */
console.log('Textronics LENS ZOOM PLUGIN v1.6 (02-12,l:v1.5)');

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {
        }

        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {
    var EZP = {
        init: function (options, elem) {
            var self = this;
            var $galleries;

            self.elem = elem;
            self.$elem = $(elem);

            self.options = $.extend({}, $.fn.ezPlusCard.options, self.responsiveConfig(options || {}));

            self.imageSrc = self.$elem.data(self.options.attrImageZoomSrc) ? self.$elem.data(self.options.attrImageZoomSrc) : self.$elem.attr('src');

            if (!self.options.enabled) {
                return;
            }

            //TINT OVERRIDE SETTINGS
            if (self.options.tint) {
                self.options.lensColour = 'none'; //colour of the lens background
                self.options.lensOpacity = '1'; //opacity of the lens
            }
            //INNER OVERRIDE SETTINGS
            if (self.options.zoomType === 'inner') {
                self.options.showLens = false;
            }

            //UUID WHEN MISSING IDENTIFIER
            if (self.options.zoomId === -1) {
                self.options.zoomId = generateUUID();
            }

            //Remove alt on hover

            self.$elem.parent().removeAttr('title').removeAttr('alt');

            self.zoomImage = self.imageSrc;

            self.refresh(1);

            //Create the image swap from the gallery
            $galleries = $(self.options.gallery ? ('#' + self.options.gallery) : self.options.gallerySelector);
            $galleries.on('click.zoom', self.options.galleryItem, function (e) {

                //Set a class on the currently active gallery image
                if (self.options.galleryActiveClass) {
                    $(self.options.galleryItem, $galleries).removeClass(self.options.galleryActiveClass);
                    $(this).addClass(self.options.galleryActiveClass);
                }
                //stop any link on the a tag from working
                if (this.tagName === 'A') {
                    e.preventDefault();
                }

                //call the swap image function
                if ($(this).data(self.options.attrImageZoomSrc)) {
                    self.zoomImagePre = $(this).data(self.options.attrImageZoomSrc);
                }
                else {
                    self.zoomImagePre = $(this).data('image');
                }
                self.swaptheimage($(this).data('image'), self.zoomImagePre);
                if (this.tagName === 'A') {
                    return false;
                }
            });

            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            }
        },
        refresh: function (length) {
            var self = this;

            setTimeout(function () {
                self.fetch(self.imageSrc);

            }, length || self.options.refresh);
        },
        fetch: function (imgsrc) {
            var self = this;
            //getthumbnailiamge
            var thumbImg = new Image();
            thumbImg.onload = function () {
                //get the image
                self.tumbImageWidth = thumbImg.width;//* (self.$elem.width()/thumbImg.width);
                self.tumbImageHeight = thumbImg.height;//* (self.$elem.height()/thumbImg.height);

                // console.log('thum width : '+thumbImg.width);
                // console.log('thum height : '+thumbImg.height);

                var newImg = new Image();
                newImg.onload = function () {
                    // console.log('z width : '+newImg.width);
                    // console.log('z height : '+newImg.height);

                    //set the large image dimensions - used to calculte ratio's
                    self.largeWidth = newImg.width;//* (self.$elem.width()/thumbImg.width);
                    self.largeHeight = newImg.height;//* (self.$elem.height()/thumbImg.height);

                    // console.log('largeWidth : '+self.largeWidth);
                    // console.log('largeHeight : '+self.largeHeight);

                    //once image is loaded start the calls
                    self.startZoom();
                    self.currentImage = self.imageSrc;
                    //let caller know image has been loaded
                    self.options.onZoomedImageLoaded(self.$elem);
                };
                self.setImageSource(newImg, imgsrc); // this must be done AFTER setting onload
            };
            if (imgsrc != undefined)
                thumbImg.src = imgsrc.replace("z.", "t.");

            return;
        },
        setImageSource: function (image, src) {
            //sets an image's source.
            image.src = src;
        },
        startZoom: function () {
            var self = this;
            //get dimensions of the non zoomed image
            self.nzWidth = self.$elem.width();
            self.nzHeight = self.$elem.height();

            // console.log('shape Width : ' + self.nzWidth);
            // console.log('shape Height : ' + self.nzHeight);

            //activated elements
            self.isWindowActive = false;
            self.isLensActive = false;
            self.isTintActive = false;
            self.overWindow = false;

            //CrossFade Wrapper
            if (self.options.imageCrossfade) {
                self.zoomWrap = self.$elem.wrap('<div style="height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;" class="zoomWrapper" />');
                self.$elem.css('position', 'absolute');
            }

            self.zoomLock = 1;
            self.scrollingLock = false;
            self.changeBgSize = false;
            self.currentZoomLevel = self.options.zoomLevel;

            //get offset of the non zoomed image
            self.nzOffset = self.$elem.offset();
            //calculate the width ratio of the large/small image
            self.widthRatio = self.tumbImageWidth / self.largeWidth;
            self.heightRatio = self.tumbImageHeight / self.largeHeight;

            // console.log('widthRatio : ' + self.widthRatio);
            // console.log('heightRatio : ' + self.heightRatio);

            //var zoomScale = $(".wowbook-zoomcontent").css("zoom");


            function getWindowLensStyle() {
                // adjust images less than the window height

                //if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
                //    self.lensHeight = self.nzHeight;
                //}
                //else {
                //    self.lensHeight = String(self.options.zoomWindowHeight / self.heightRatio);
                //}
                //if (self.largeWidth < self.options.zoomWindowWidth) {
                //    self.lensWidth = self.nzWidth;
                //}
                //else {
                //    self.lensWidth = String(self.options.zoomWindowWidth / self.widthRatio);
                //}

                var newvalue = self.currentZoomLevel;

                var minWindow = Math.min(self.nzWidth, self.nzHeight);

                var lenseWidth = self.options.zoomWindowWidth / newvalue;
                var lenseHeight = self.options.zoomWindowHeight / newvalue;

                if (lenseWidth > minWindow || lenseHeight > minWindow) {
                    var maxLenseSz = Math.max(lenseWidth, lenseHeight);

                    newvalue = newvalue * maxLenseSz / minWindow;
                    lenseWidth = self.options.zoomWindowWidth / newvalue;
                    lenseHeight = self.options.zoomWindowHeight / newvalue;
                }

                var maxzoom = 5;

                if (newvalue > maxzoom) {
                    newvalue = maxzoom;
                    lenseWidth = self.options.zoomWindowWidth / newvalue;
                    lenseHeight = self.options.zoomWindowHeight / newvalue;
                }

                if (self.options.zoomType !== 'inner') {

                    self.heightRatio = self.tumbImageHeight / self.largeHeight * newvalue;
                    self.newvalueheight = self.heightRatio * newvalue;

                    self.widthRatio = self.tumbImageWidth / self.largeWidth * newvalue;
                    self.newvaluewidth = self.widthRatio * newvalue;
                }

                self.currentZoomLevel = newvalue;
                self.lensWidth = lenseWidth;
                self.lensHeight = lenseHeight;

                self.maxZoomLevel = self.currentZoomLevel; //3-8 sanket

                //if (self.lensHeight > minWindow || self.lensWidth > minWindow) {
                //    self.currentZoomLevel = self.currentZoomLevel * minWindow / self.lensWidth;
                //    self.lensHeight = self.lensWidth = minWindow;
                //}
                if (!self.options.displayLens) {
                    self.options.lensColour = '';
                    self.options.lensBorderSize = 0;
                    self.options.cursor = 'crosshair';
                }

                return 'background-position: 0px 0px;width: ' + String((self.options.zoomWindowWidth) / self.widthRatio) + 'px;' +
                    'height: ' + String((self.options.zoomWindowHeight) / self.heightRatio) +
                    'px;float: right;display: none;' +
                    'overflow: hidden;' +
                    'z-index: 999;' +
                    'opacity:' + (self.options.lensOpacity) + ';filter: alpha(opacity = ' + (self.options.lensOpacity * 100) + '); zoom:1;' +
                    'width:' + self.lensWidth + 'px;' +
                    'height:' + self.lensHeight + 'px;' +
                    'background-color:' + (self.options.lensColour) + ';' +
                    'cursor:' + (self.options.cursor) + ';' +
                    'border: ' + (self.options.lensBorderSize) + 'px' +
                    ' solid ' + (self.options.lensBorderColour) + ';background-repeat: no-repeat;position: absolute;';
            }

            //lens style for window zoom
            if (self.options.zoomType === 'window') {
                self.lensStyle = getWindowLensStyle();
            }
            function getWindowZoomStyle() {

                // console.log('bg x : ' + (self.largeWidth * self.currentZoomLevel) * zoomScale);
                // console.log('bg y : ' + (self.largeHeight * self.currentZoomLevel) * zoomScale);

                //var bgwidth = self.largeWidth * self.newvaluewidth;//* zoomScale;
                //var bgheight = self.largeHeight * self.newvalueheight;//* zoomScale;

                var backgroundWidth = self.tumbImageWidth * self.options.zoomWindowWidth / self.lensWidth;
                var backgroundHeight = self.tumbImageHeight * self.options.zoomWindowHeight / self.lensHeight;

                return 'overflow: hidden;' +
                    'background-position: 0px 0px;text-align:center;' +
                    'background-color: ' + String(self.options.zoomWindowBgColour) + ';' +
                    'width: ' + String(self.options.zoomWindowWidth) + 'px;' +
                    'height: ' + String(self.options.zoomWindowHeight) + 'px;' +
                    'float: left;' +
                    'background-size: ' + backgroundWidth + 'px ' + backgroundHeight + 'px;' +
                    // 'display: none;z-index:100;' + //sanket
                    'display: none;z-index:999999;' +
                    'border: ' + String(self.options.borderSize) + 'px solid ' + self.options.borderColour + ';' +
                    'background-repeat: repeat;' +
                    'position: absolute;';
            }

            //if window zoom
            if (self.options.zoomType === 'window') {
                self.zoomWindowStyle = getWindowZoomStyle();
            }

            function getInnerZoomStyle() {
                //has a border been put on the image? Lets cater for this
                var borderWidth = self.$elem.css('border-left-width');

                return 'overflow: hidden;' +
                    'margin-left: ' + String(borderWidth) + ';' +
                    'margin-top: ' + String(borderWidth) + ';' +
                    'background-position: 0px 0px;' +
                    'width: ' + String(self.nzWidth) + 'px;' +
                    'height: ' + String(self.nzHeight) + 'px;' +
                    'float: left;' +
                    'display: none;' +
                    'cursor:' + (self.options.cursor) + ';' +
                    'border: ' + String(self.options.borderSize) + 'px solid ' + self.options.borderColour + ';' +
                    'background-repeat: no-repeat;' +
                    'position: absolute;';
            }

            //if inner  zoom
            if (self.options.zoomType === 'inner') {
                self.zoomWindowStyle = getInnerZoomStyle();
            }

            //tint style
            self.tintStyle = 'display: block;' +
                'position: absolute;' +
                'background-color: ' + self.options.tintColour + ';' +
                'filter:alpha(opacity=0);' +
                'opacity: 0;' +
                'width: ' + self.nzWidth + 'px;' +
                'height: ' + self.nzHeight + 'px;';

            //lens style for lens zoom with optional round for modern browsers
            self.lensRound = '';

            if (self.options.zoomType === 'lens') {
                self.lensStyle = 'background-position: 0px 0px;' +
                    'float: left;display: none;' +
                    'border: ' + String(self.options.borderSize) + 'px solid ' + self.options.borderColour + ';' +
                    'width:' + String(self.options.lensSize) + 'px;' +
                    'height:' + String(self.options.lensSize) + 'px;' +
                    'background-repeat: no-repeat;position: absolute;';
            }

            //does not round in all browsers
            if (self.options.lensShape === 'round') {
                self.lensRound = 'border-top-left-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;' +
                    'border-top-right-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;' +
                    'border-bottom-left-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;' +
                    'border-bottom-right-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;';
            }

            //create the div's                                                + ""
            //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

            self.zoomContainer =
                $('<div class="zoomContainerLens" ' +
                    'uuid="' + self.options.zoomId + '"' +
                    'style="' +
                    'position:absolute;' +
                    // 'left:' + self.$elem.css("left") + ';' +
                    // 'top:' + self.$elem.css("top") + ';' +
                    'left:0px;' +
                    'top:0px;' +
                    'height:' + self.nzHeight + 'px;' + '' +
                    'width:' + self.nzWidth + 'px;' +
                    // 'z-index:' + self.options.zIndex + '"></div>');
                    'z-index:1"></div>'); // 8-8
            if (self.$elem.attr("id")) {
                self.zoomContainer.attr("id", self.$elem.attr("id") + "-zoomContainer");
            }
            //$(self.options.zoomContainerAppendTo).append(self.zoomContainer);
            // self.$elem.parent().append(self.zoomContainer);
            self.$elem.append(self.zoomContainer); // 8-8

            //this will add overflow hidden and contrain the lens on lens mode
            if (self.options.containLensZoom && self.options.zoomType === 'lens') {
                self.zoomContainer.css('overflow', 'hidden');
            }
            if (self.options.zoomType !== 'inner') {
                self.zoomLens = $('<div class="zoomLens" style="' + self.lensStyle + self.lensRound + '">&nbsp;</div>')
                    .appendTo(self.zoomContainer)
                    .click(function () {
                        //     self.$elem.trigger('click');
                    });

                if (self.options.tint) {
                    self.tintContainer = $('<div/>').addClass('tintContainer');
                    self.zoomTint = $('<div class="zoomTint" style="' + self.tintStyle + '"></div>');

                    self.zoomLens.wrap(self.tintContainer);

                    self.zoomTintcss = self.zoomLens.after(self.zoomTint);

                    //if tint enabled - set an image to show over the tint

                    self.zoomTintImage = $('<img style="' +
                        'position: absolute; left: 0px; top: 0px; max-width: none; ' +
                        'width: ' + self.nzWidth + 'px; ' +
                        'height: ' + self.nzHeight + 'px;" ' +
                        'src="' + self.imageSrc + '">')
                        .appendTo(self.zoomLens)
                        .click(function () {

                            self.$elem.trigger('click');
                        });
                }
            }

            var targetZoomContainer = isNaN(self.options.zoomWindowPosition) ? 'body' : self.zoomContainer;
            //create zoom window
            self.zoomWindow = $('<div style="z-index:999;' +
                'left:' + (self.windowOffsetLeft) + 'px;' +
                'top:' + (self.windowOffsetTop) + 'px;' + self.zoomWindowStyle + '" class="zoomWindow">&nbsp;</div>')
                .appendTo(targetZoomContainer.parent()).click(function () {
                    // .appendTo(targetZoomContainer).click(function () {
                    //self.$elem.trigger('click');
                });
            self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainerLens').css('width', self.options.zoomWindowWidth);
            self.zoomWindow.wrap(self.zoomWindowContainer);

            //  self.captionStyle = "text-align: left;background-color: black;'+
            // 'color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";
            // self.zoomCaption = $('<div class="ezplus-caption" '+
            // 'style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

            if (self.options.zoomType === 'lens') {
                self.zoomLens.css('background-image', 'url("' + self.imageSrc + '")');
            }
            if (self.options.zoomType === 'window') {
                self.zoomWindow.css('background-image', 'url("' + self.imageSrc + '")');
            }
            if (self.options.zoomType === 'inner') {
                self.zoomWindow.css('background-image', 'url("' + self.imageSrc + '")');
            }

            /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
            if (self.options.touchEnabled) {
                //touch events
                self.$elem.bind('touchmove.ezpspace', function (e) {
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);
                });
                self.zoomContainer.bind('touchmove.ezpspace', function (e) {
                    if (self.options.zoomType === 'inner') {
                        self.showHideWindow('show');

                    }
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);

                });
                self.zoomContainer.bind('touchend.ezpspace', function (e) {
                    self.showHideWindow('hide');
                    if (self.options.showLens) {
                        self.showHideLens('hide');
                    }
                    if (self.options.tint && self.options.zoomType !== 'inner') {
                        self.showHideTint('hide');
                    }
                });

                self.$elem.bind('touchend.ezpspace', function (e) {
                    self.showHideWindow('hide');
                    if (self.options.showLens) {
                        self.showHideLens('hide');
                    }
                    if (self.options.tint && self.options.zoomType !== 'inner') {
                        self.showHideTint('hide');
                    }
                });
                if (self.options.showLens) {
                    self.zoomLens.bind('touchmove.ezpspace', function (e) {

                        e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch);
                    });

                    self.zoomLens.bind('touchend.ezpspace', function (e) {
                        self.showHideWindow('hide');
                        if (self.options.showLens) {
                            self.showHideLens('hide');
                        }
                        if (self.options.tint && self.options.zoomType !== 'inner') {
                            self.showHideTint('hide');
                        }
                    });
                }
            }
            //Needed to work in IE
            self.$elem.bind('mousemove.ezpspace', function (e) {
                if (self.overWindow === false) {
                    self.setElements('show');
                }
                //make sure on orientation change the setposition is not fired
                if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                    self.setPosition(e);
                    self.currentLoc = e;
                }
                self.lastX = e.clientX;
                self.lastY = e.clientY;

            });

            self.zoomContainer.bind('click.ezpspace', self.options.onImageClick);

            self.zoomContainer.bind('mousemove.ezpspace', function (e) {
                if (self.overWindow === false) {
                    self.setElements('show');
                }
                mouseMoveZoomHandler(e);
            });

            function mouseMoveZoomHandler(e) {
                //self.overWindow = true;
                //make sure on orientation change the setposition is not fired
                if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                    self.setPosition(e);
                    self.currentLoc = e;
                }
                self.lastX = e.clientX;
                self.lastY = e.clientY;
            }

            var elementToTrack = null;
            if (self.options.zoomType !== 'inner') {
                elementToTrack = self.zoomLens;
            }
            if (self.options.tint && self.options.zoomType !== 'inner') {
                elementToTrack = self.zoomTint;
            }
            if (self.options.zoomType === 'inner') {
                elementToTrack = self.zoomWindow;
            }

            //register the mouse tracking
            if (elementToTrack) {
                elementToTrack.bind('mousemove.ezpspace', mouseMoveZoomHandler);
            }

            //  lensFadeOut: 500,  zoomTintFadeIn
            self.zoomContainer.add(self.$elem).mouseenter(function () {
                if (self.overWindow === false) {
                    self.setElements('show');
                }
            }).mouseleave(function () {
                if (!self.scrollLock) {
                    self.setElements('hide');
                    self.options.onDestroy(self.$elem);
                }
            });
            //end ove image

            if (self.options.zoomType !== 'inner') {
                self.zoomWindow.mouseenter(function () {
                    self.overWindow = true;
                    self.setElements('hide');
                }).mouseleave(function () {
                    self.overWindow = false;
                });
            }
            //end ove image

            // var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

            //      $(this).empty();
            //    return false;

            //fix for initial zoom setting
            //if (self.options.zoomLevel !== 1) {
            //      self.changeZoomLevel(self.currentZoomLevel);
            //}
            //set the min zoomlevel
            if (self.options.minZoomLevel) {
                self.minZoomLevel = self.options.minZoomLevel;
            }
            else {
                self.minZoomLevel = self.options.scrollZoomIncrement * 2;
            }

            if (self.options.scrollZoom) {
                //see compatibility of mouse events at https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel
                self.zoomContainer.add(self.$elem).bind('wheel DOMMouseScroll MozMousePixelScroll', function (e) {
                    // in IE there is issue with firing of mouseleave - So check whether still scrolling
                    // and on mouseleave check if scrolllock
                    self.scrollLock = true;
                    clearTimeout($.data(this, 'timer'));
                    $.data(this, 'timer', setTimeout(function () {
                        self.scrollLock = false;
                        //do something
                    }, 250));

                    var theEvent = e.originalEvent.deltaY || e.originalEvent.detail * -1;

                    //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                    //   e.preventDefault();

                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    var nextZoomLevel = self.currentZoomLevel;
                    if (theEvent / 120 > 0) {
                        nextZoomLevel = parseFloat(nextZoomLevel) - parseFloat(self.options.scrollZoomIncrement);
                    }
                    else {
                        nextZoomLevel = parseFloat(nextZoomLevel) + parseFloat(self.options.scrollZoomIncrement);
                    }

                    //if (nextZoomLevel >= self.maxZoomLevel)
                    //{
                    self.changeZoomLevel(nextZoomLevel);
                    //}

                    /////

                    //var nextZoomLevel;
                    //var nextZoomLevelRvs;
                    //var currentZoomLevelRvs = 1.0 / self.currentZoomLevel;

                    //if (theEvent / 120 < 0) {
                    //    nextZoomLevelRvs = currentZoomLevelRvs + self.options.scrollZoomIncrement;
                    //    // nextZoomLevel = 1 / parseFloat(nextZoomLevelRvs).toFixed(2); //kapil sir
                    //    nextZoomLevel = 1 / nextZoomLevelRvs; //sanket
                    //    //scrolling up
                    //    if (nextZoomLevel >= self.minZoomLevel) {
                    //        self.changeZoomLevel(nextZoomLevel);
                    //        //var _zoom = Math.round((1 / self.currentZoomLevel) * 100);
                    //        //$('#_zoomPercentage').text(parseInt(_zoom)+' %');
                    //    }
                    //}
                    //else {

                    //    //scrolling down

                    //    //Check if it has to maintain original zoom window aspect ratio or not
                    //    if ((!self.fullheight && !self.fullwidth) || !self.options.mantainZoomAspectRatio) {
                    //        nextZoomLevelRvs = currentZoomLevelRvs - self.options.scrollZoomIncrement;
                    //        // nextZoomLevel = 1 / parseFloat(nextZoomLevelRvs).toFixed(2); //kapil sir
                    //        nextZoomLevel = 1 / nextZoomLevelRvs; //sanket
                    //        if (nextZoomLevel > 0) {
                    //            if (self.options.maxZoomLevel) {
                    //                if (nextZoomLevel <= self.options.maxZoomLevel) {
                    //                    self.changeZoomLevel(nextZoomLevel);
                    //                }
                    //            }
                    //            else {
                    //                //andy
                    //                self.changeZoomLevel(nextZoomLevel);
                    //                //var _zoom = Math.round((1 / self.currentZoomLevel) * 100);
                    //                //$('#_zoomPercentage').text(parseInt(_zoom)+' %');
                    //            }
                    //        }
                    //    }
                    //}
                    return false;
                });
            }
        },
        destroy: function () {
            var self = this;
            self.$elem.unbind('ezpspace');
            $(self.zoomContainer).remove();
            if (self.options.loadingIcon && !!self.spinner && !!self.spinner.length) {
                self.spinner.remove();
                delete self.spinner;
            }
        },
        getIdentifier: function () {
            var self = this;
            return self.options.zoomId;
        },
        setElements: function (type) {
            var self = this;
            if (!self.options.zoomEnabled) {
                return false;
            }
            if (type === 'show') {
                if (self.isWindowSet) {
                    if (self.options.zoomType === 'inner') {
                        self.showHideWindow('show');
                    }
                    if (self.options.zoomType === 'window') {
                        self.showHideWindow('show');
                    }
                    if (self.options.showLens) {
                        self.showHideLens('show');
                    }
                    if (self.options.tint && self.options.zoomType !== 'inner') {
                        self.showHideTint('show');
                    }
                }
            }

            if (type === 'hide') {
                if (self.options.zoomType === 'window') {
                    self.showHideWindow('hide');
                }
                if (!self.options.tint) {
                    self.showHideWindow('hide');
                }
                if (self.options.showLens) {
                    self.showHideLens('hide');
                }
                if (self.options.tint) {
                    self.showHideTint('hide');
                }
            }
        },
        setPosition: function (e) {

            var self = this;

            if (!self.options.zoomEnabled) {
                return false;
            }

            ////////////////////////////

            $(".wowbook-page-content").css("overflow", "visible");
            $(".wowbook-page-content .book_page_card").css("overflow", "visible");
            $(".wowbook-page-content .content-wrapper").css("overflow", "visible");
            $(".wowbook-zoomcontent").css("overflow", "visible");          
            $(".wowbook-inner-clipper").css("overflow", "visible");
            $(".wowbook-clipper").css("overflow", "visible");

            self.boundingBox = self.elem.getBoundingClientRect();
            var zoomScale = $(".wowbook-zoomcontent").css("zoom");

            if (zoomScale == undefined) {
                var zoom = $(".wowbook-zoomcontent").css("transform");
                var values = zoom.split('(')[1],
                    values = values.split(')')[0],
                    values = values.split(',');

                var firefoxScale = parseFloat(values[0]);
                self.boundingBox.left = self.boundingBox.x = self.boundingBox.left / firefoxScale;
                self.boundingBox.top = self.boundingBox.y = self.boundingBox.top / firefoxScale;
                self.boundingBox.width = self.boundingBox.width / firefoxScale;
                self.boundingBox.height = self.boundingBox.height / firefoxScale;

                self.boundingBox.right = self.boundingBox.left + self.boundingBox.width;
                self.boundingBox.bottom = self.boundingBox.top + self.boundingBox.height;
                zoomScale = firefoxScale;
            }

            zoomScale = Math.round(zoomScale *2)/2;

            var mouseleft = 0;
            var mousetop = 0;

            mouseleft = parseInt(e.pageX - parseInt(self.boundingBox.left * zoomScale));
            mousetop = parseInt(e.pageY - parseInt(self.boundingBox.top * zoomScale));


            self.mouseLeft = mouseleft / zoomScale;
            self.mouseTop = mousetop / zoomScale;

            var zoomLensHeight = self.lensHeight;//self.zoomLens.height();
            var zoomLensWidth = self.lensWidth;//self.zoomLens.width();

            var isMousePointinRect = false;

            if (self.mouseLeft >= 0 && self.mouseLeft <= self.boundingBox.width &&
                self.mouseTop >= 0 && self.mouseTop <= self.boundingBox.height) {
                isMousePointinRect = true;

                var scrollwidth = self.boundingBox.width - zoomLensWidth;
                var scrollheight = self.boundingBox.height - zoomLensHeight;

                scrollwidth = Math.max(scrollwidth, 0);
                scrollheight = Math.max(scrollheight, 0);

                self.lensLeftPos = 0;
                self.lensTopPos = 0;

                if (self.options.displayLens) {
                    if (scrollwidth > 0) {
                        if (zoomLensWidth / 2 > self.mouseLeft)
                            self.lensLeftPos = 0;
                        else if (zoomLensWidth / 2 < self.mouseLeft && (self.boundingBox.width - zoomLensWidth / 2) > self.mouseLeft)
                            self.lensLeftPos = self.mouseLeft - zoomLensWidth / 2;
                        else
                            self.lensLeftPos = self.boundingBox.width - zoomLensWidth;
                    }
                    if (scrollheight > 0) {
                        if (zoomLensHeight / 2 > self.mouseTop)
                            self.lensTopPos = 0;
                        else if (zoomLensHeight / 2 < self.mouseTop && (self.boundingBox.height - zoomLensHeight / 2) > self.mouseTop)
                            self.lensTopPos = self.mouseTop - zoomLensHeight / 2;
                        else
                            self.lensTopPos = self.boundingBox.height - zoomLensHeight;
                    }

                }
                else {
                    if (scrollwidth > 0) {
                        var scrollwidthratio = scrollwidth / self.boundingBox.width;
                        self.lensLeftPos = scrollwidthratio * self.mouseLeft;
                    }
                    if (scrollheight > 0) {
                        var scrollheightratio = scrollheight / self.boundingBox.height;
                        self.lensTopPos = scrollheightratio * self.mouseTop;
                    }
                }

                self.lensLeftPos = Math.max(self.lensLeftPos, 0);
                self.lensTopPos = Math.max(self.lensTopPos, 0);

                self.windowLeftPos = self.lensLeftPos * self.options.zoomWindowWidth / zoomLensWidth * (-1);
                self.windowTopPos = self.lensTopPos * self.options.zoomWindowWidth / zoomLensHeight * (-1);
                //self.windowLeftPos = self.lensLeftPos * self.largeWidth / self.tumbImageWidth  ;
                //self.windowTopPos = self.lensTopPos * self.largeHeight / self.tumbImageHeigh;

                self.zoomLens.css({
                    left: self.lensLeftPos + 'px',
                    top: self.lensTopPos + 'px'
                });

                self.setWindowPosition(e);
            }






            ////////////////////////////








            //$(".wowbook-page-content").css("overflow","visible");
            //$(".wowbook-page-content .book_page_card").css("overflow","visible");
            //$(".wowbook-page-content .content-wrapper").css("overflow","visible");
            //$(".wowbook-zoomcontent").css("overflow","visible");
            //$(".wowbook-inner-clipper").css("overflow","visible");
            //$(".wowbook-clipper").css("overflow","visible");

            ////recaclc offset each time in case the image moves
            ////this can be caused by other on page elements
            //self.nzHeight = self.$elem.height();
            //self.nzWidth = self.$elem.width();
            //self.nzOffset = self.$elem.offset();
            ////console.log(self.elem.getBoundingClientRect());

            //if (self.options.tint && self.options.zoomType !== 'inner') {
            //    self.zoomTint.css({
            //        top: 0,
            //        left: 0
            //    });
            //}
            ////set responsive
            ////will checking if the image needs changing before running this code work faster?
            //if (self.options.responsive && !self.options.scrollZoom) {
            //    if (self.options.showLens) {
            //        var lensHeight, lensWidth;
            //        if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
            //            self.lensHeight = self.nzHeight;
            //        }
            //        else {
            //            self.lensHeight = String((self.options.zoomWindowHeight / self.heightRatio));
            //        }
            //        if (self.largeWidth < self.options.zoomWindowWidth) {
            //            self.lensWidth = self.nzWidth;
            //        }
            //        else {
            //            self.lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
            //        }
            //        self.widthRatio = self.largeWidth / self.nzWidth;
            //        self.heightRatio = self.largeHeight / self.nzHeight;
            //      //self.heightRatio = self.widthRatio;
            //        if (self.options.zoomType !== 'lens') {
            //            //possibly dont need to keep recalcalculating
            //            //if the lens is heigher than the image, then set lens size to image size
            //            if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
            //                self.lensHeight = self.nzHeight;

            //            }
            //            else {
            //                self.lensHeight = String((self.options.zoomWindowHeight / self.heightRatio));
            //            }

            //            if (self.nzWidth < self.options.zoomWindowHeight / self.heightRatio) {
            //                self.lensWidth = self.nzWidth;
            //            }
            //            else {
            //                self.lensWidth = String((self.options.zoomWindowWidth / self.widthRatio));
            //            }

            //            self.zoomLens.css({
            //                'width': self.lensWidth,
            //                'height': self.lensHeight
            //            });

            //            if (self.options.tint) {
            //                self.zoomTintImage.css({
            //                    'width': self.nzWidth,
            //                    'height': self.nzHeight
            //                });
            //            }

            //        }
            //        if (self.options.zoomType === 'lens') {
            //            self.zoomLens.css({
            //                width: String(self.options.lensSize) + 'px',
            //                height: String(self.options.lensSize) + 'px'
            //            });
            //        }
            //        //end responsive image change
            //    }
            //}

            ////container fix
            ///*self.zoomContainer.css({
            //    top: self.nzOffset.top,
            //    left: self.nzOffset.left,
            //    width: self.nzWidth,  // new code
            //    height: self.nzHeight // new code
            //});*/
            //self.zoomContainer.css({
            //    top: self.$elem.css("top"),
            //    left: self.$elem.css("left"),
            //    width: self.nzWidth,  // new code
            //    height: self.nzHeight // new code
            //});
            ///*self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
            //self.mouseTop = parseInt(e.pageY - self.nzOffset.top);*/

            //self.boundingBox = self.elem.getBoundingClientRect();
            //var zoomScale = $(".wowbook-zoomcontent").css("zoom");


            //self.mouseLeft = parseInt(e.pageX - parseInt(self.boundingBox.left * zoomScale));
            //self.mouseTop = parseInt(e.pageY - parseInt(self.boundingBox.top * zoomScale));

            ////calculate the Location of the Lens

            ////calculate the bound regions - but only if zoom window
            //if (self.options.zoomType === 'window') {
            //    var zoomLensHeight = (self.zoomLens.height() / 2) * zoomScale;
            //    var zoomLensWidth = (self.zoomLens.width() / 2) * zoomScale;
            //    self.Etoppos = (self.mouseTop < 0 + zoomLensHeight);
            //    self.Eboppos = (self.mouseTop > (self.nzHeight * zoomScale) - zoomLensHeight - (self.options.lensBorderSize * 2));
            //    self.Eloppos = (self.mouseLeft < 0 + zoomLensWidth);
            //    self.Eroppos = (self.mouseLeft > ((self.nzWidth * zoomScale) - zoomLensWidth - (self.options.lensBorderSize * 2)));

            //}
            ////calculate the bound regions - but only for inner zoom
            //if (self.options.zoomType === 'inner') {
            //    self.Etoppos = (self.mouseTop < ((self.nzHeight / 2) / self.heightRatio));
            //    self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight / 2) / self.heightRatio)));
            //    self.Eloppos = (self.mouseLeft < 0 + (((self.nzWidth / 2) / self.widthRatio)));
            //    self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth / 2) / self.widthRatio - (self.options.lensBorderSize * 2)));
            //}

            //// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
            //if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight) {
            //    self.setElements('hide');
            //    return;
            //}
            ////else continue with operations
            //else {
            //    //lens options
            //    if (self.options.showLens) {
            //        //        self.showHideLens('show');
            //        //set background position of lens
            //        //self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
            //        //self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));
            //      self.lensLeftPos = String((self.mouseLeft/zoomScale) - self.zoomLens.width() / 2);
            //        self.lensTopPos = String((self.mouseTop/zoomScale) - self.zoomLens.height() / 2);
            //    }
            //    //adjust the background position if the mouse is in one of the outer regions

            //    //Top region
            //    if (self.Etoppos) {
            //        self.lensTopPos = 0;
            //    }
            //    //Left Region
            //    if (self.Eloppos) {
            //        self.windowLeftPos = 0;
            //        self.lensLeftPos = 0;
            //        self.tintpos = 0;
            //    }
            //    //Set bottom and right region for window mode
            //    if (self.options.zoomType === 'window') {
            //        if (self.Eboppos) {
            //            self.lensTopPos = Math.max((self.nzHeight) - self.zoomLens.height() - (self.options.lensBorderSize * 2), 0);
            //        }
            //        if (self.Eroppos) {
            //            self.lensLeftPos = (self.nzWidth - (self.zoomLens.width()) - (self.options.lensBorderSize * 2));
            //        }
            //    }
            //    //Set bottom and right region for inner mode
            //    if (self.options.zoomType === 'inner') {
            //        if (self.Eboppos) {
            //            self.lensTopPos = Math.max(((self.nzHeight) - (self.options.lensBorderSize * 2)), 0);
            //        }
            //        if (self.Eroppos) {
            //            self.lensLeftPos = (self.nzWidth - (self.nzWidth) - (self.options.lensBorderSize * 2));
            //        }
            //    }
            //    //if lens zoom
            //    if (self.options.zoomType === 'lens') {

            //        self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));
            //        self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));
            //        self.zoomLens.css('background-position', self.windowLeftPos + 'px ' + self.windowTopPos + 'px');

            //        if (self.changeBgSize) {
            //            if (self.nzHeight > self.nzWidth) {
            //                if (self.options.zoomType === 'lens') {
            //                    self.zoomLens.css('background-size',
            //                        self.largeWidth / self.newvalueheight + 'px ' +
            //                        self.largeHeight / self.newvalueheight + 'px');
            //                }

            //                self.zoomWindow.css('background-size',
            //                    self.largeWidth / self.newvalueheight + 'px ' +
            //                    self.largeHeight / self.newvalueheight + 'px');
            //            }
            //            else {
            //                if (self.options.zoomType === 'lens') {
            //                    self.zoomLens.css('background-size',
            //                        self.largeWidth / self.newvaluewidth + 'px ' +
            //                        self.largeHeight / self.newvaluewidth + 'px');
            //                }
            //                self.zoomWindow.css('background-size',
            //                    self.largeWidth / self.newvaluewidth + 'px ' +
            //                    self.largeHeight / self.newvaluewidth + 'px');
            //            }
            //            self.changeBgSize = false;
            //        }

            //        self.setWindowPosition(e);
            //    }
            //    //if tint zoom
            //    if (self.options.tint && self.options.zoomType !== 'inner') {
            //        self.setTintPosition(e);
            //    }
            //    //set the css background position
            //    if (self.options.zoomType === 'window') {
            //        self.setWindowPosition(e);
            //    }
            //    if (self.options.zoomType === 'inner') {
            //        self.setWindowPosition(e);
            //    }
            //    if (self.options.showLens) {
            //        if (self.fullwidth && self.options.zoomType !== 'lens') {
            //            self.lensLeftPos = 0;
            //        }
            //        self.zoomLens.css({
            //            left: self.lensLeftPos + 'px',
            //            top: self.lensTopPos + 'px'
            //        });
            //    }

            //} //end else
        },
        showHideZoomContainer: function (change) {
            var self = this;
            if (change === 'show') {
                if (self.zoomContainer) {
                    self.zoomContainer.show();
                }
            }
            if (change === 'hide') {
                if (self.zoomContainer) {
                    self.zoomContainer.hide();
                }
            }
        },
        showHideWindow: function (change) {
            var self = this;
            if (change === 'show') {
                if (!self.isWindowActive && self.zoomWindow) {
                    if (self.$elem.parents(".wowbook-page").eq(0).css("z-index") != '999') {
                        self.zindexvalue = self.$elem.parents(".wowbook-page").eq(0).css("z-index");
                        self.$elem.parents(".wowbook-page").eq(0).css("z-index", "999");
                    }
                    self.options.onShow(self);
                    if (self.options.zoomWindowFadeIn) {
                        self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
                    }
                    else {
                        self.zoomWindow.show();
                    }
                    self.isWindowActive = true;
                }
            }
            if (change === 'hide') {
                if (self.isWindowActive) {
                    if (self.zindexvalue != null) {
                        if (self.zindexvalue.toString() != '999') {
                            self.$elem.parents(".wowbook-page").eq(0).css("z-index", self.zindexvalue.toString());
                        }
                    }
                    if (self.options.zoomWindowFadeOut) {
                        self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
                            if (self.loop) {
                                //stop moving the zoom window when zoom window is faded out
                                clearInterval(self.loop);
                                self.loop = false;
                            }
                        });
                    }
                    else {
                        // $('.zoomWindow,.zoomLens').css('display','none');
                        self.zoomWindow.hide();
                    }
                    self.isWindowActive = false;
                }
            }
        },
        showHideLens: function (change) {
            var self = this;
            if (change === 'show') {
                if (!self.isLensActive) {
                    if (self.options.lensFadeIn && self.zoomLens) {
                        self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
                    }
                    else {
                        self.zoomLens.show();
                    }
                    self.isLensActive = true;
                }
            }
            if (change === 'hide') {
                if (self.isLensActive) {
                    if (self.options.lensFadeOut) {
                        self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
                    }
                    else {
                        self.zoomLens.hide();
                    }
                    self.isLensActive = false;
                }
            }
        },
        showHideTint: function (change) {
            var self = this;
            if (change === 'show') {
                if (!self.isTintActive && self.zoomTint) {

                    if (self.options.zoomTintFadeIn) {
                        self.zoomTint.css('opacity', self.options.tintOpacity).animate().stop(true, true).fadeIn('slow');
                    }
                    else {
                        self.zoomTint.css('opacity', self.options.tintOpacity).animate();
                        self.zoomTint.show();
                    }
                    self.isTintActive = true;
                }
            }
            if (change === 'hide') {
                if (self.isTintActive) {

                    if (self.options.zoomTintFadeOut) {
                        self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
                    }
                    else {
                        self.zoomTint.hide();
                    }
                    self.isTintActive = false;
                }
            }
        },

        setLensPosition: function (e) {
        },

        setWindowPosition: function (e) {
            //return obj.slice( 0, count );
            var self = this;
            // var zoomScale = $(".wowbook-zoomcontent").css("zoom");
            var zoomScale = $(".swiper-slide").css("zoom");
            if (zoomScale == undefined) {
                var zoom = $(".swiper-slide").css("transform");
                var values = zoom.split('(')[1],
                    values = values.split(')')[0],
                    values = values.split(',');

                var firefoxScale = parseFloat(values[0]);
                zoomScale = firefoxScale;
            }
            // zoomScale = Math.round(zoomScale *2)/2;

            if ((($(window).width()) - ((self.boundingBox.left + self.boundingBox.width) * zoomScale)) > self.options.zoomWindowWidth && (self.boundingBox.left < self.options.zoomWindowWidth)) {
                self.options.zoomWindowPosition = 1;
            } else if ((($(window).width()) - ((self.boundingBox.left + self.boundingBox.width) * zoomScale)) < self.options.zoomWindowWidth && (self.boundingBox.left > self.options.zoomWindowWidth)) {
                self.options.zoomWindowPosition = 11;
            }

            if ($(window).width() < 763 && self.boundingBox.left < 830 && self.options.zoomWindowPosition == 11) {
                self.options.zoomWindowPosition = 1;
            }

            if ((self.boundingBox.top <= 0) && (($(window).width()) - ((self.boundingBox.left + self.boundingBox.width) * zoomScale)) < self.options.zoomWindowWidth && (self.boundingBox.left > self.options.zoomWindowWidth)) {
                self.options.zoomWindowPosition = 8;
            } else if ((self.boundingBox.top <= 0) && (($(window).width()) - ((self.boundingBox.left + self.boundingBox.width) * zoomScale)) > self.options.zoomWindowWidth) {
                self.options.zoomWindowPosition = 4;
            }

            if ( ((screen.height - (self.boundingBox.top * zoomScale)) < self.options.zoomWindowWidth) && (($(window).width()) - ((self.boundingBox.left + self.boundingBox.width) * zoomScale)) < self.options.zoomWindowWidth && (self.boundingBox.left > self.options.zoomWindowWidth)){
                self.options.zoomWindowPosition = 12;
            } else if ( ((screen.height - (self.boundingBox.top * zoomScale)) < self.options.zoomWindowWidth) && (($(window).width()) - ((self.boundingBox.left + self.boundingBox.width) * zoomScale)) > self.options.zoomWindowWidth) {
                self.options.zoomWindowPosition = 16;               
            }
            
            if ( ((self.boundingBox.top * zoomScale) - parseInt($('.header_sub').parent().height())) <= 0 && (self.options.zoomWindowPosition == 1 || self.options.zoomWindowPosition == 11) ) {
                if (self.options.zoomWindowPosition == 1) {
                    self.options.zoomWindowPosition = 4;
                } else {
                    self.options.zoomWindowPosition = 8;
                }
            }
			
			//1-12
			if($(window).width() - ((self.boundingBox.left + self.boundingBox.width) * zoomScale + (self.options.zoomWindowWidth * zoomScale)) < 250) {
				self.options.zoomWindowPosition = 11;
			}
			// if(screen.height - (self.boundingBox.top + (self.boundingBox.height * zoomScale) + (self.options.zoomWindowWidth * zoomScale)) < 50 && self.options.zoomWindowPosition == 11) {
			// if(screen.height - (self.boundingBox.top + self.boundingBox.height) < (self.options.zoomWindowHeight * zoomScale) && self.options.zoomWindowPosition == 11) {
				// self.options.zoomWindowPosition = 12;
			// }

            if (!isNaN(self.options.zoomWindowPosition)) {

                switch (self.options.zoomWindowPosition) {
                    case 1: //done
                        self.windowOffsetTop = (self.options.zoomWindowOffsetY);//DONE - 1
                        self.windowOffsetLeft = (+self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 2:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

                            self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        }
                        else { //negative margin
                            $.noop();
                        }
                        break;
                    case 3: //done
                        self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 4: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 5: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
                        break;
                    case 6:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
                            self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

                            self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                        }
                        else { //negative margin
                            $.noop();
                        }

                        break;
                    case 7: //done
                        self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = 0; //DONE 7, 13
                        break;
                    case 8: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 9:  //done
                        self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 10:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

                            self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        }
                        else { //negative margin
                            $.noop();
                        }
                        break;
                    case 11:
                        self.windowOffsetTop = (self.options.zoomWindowOffsetY);
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 12: //done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 13: //done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (0); //DONE 7, 13
                        break;
                    case 14:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
                            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16

                            self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                        }
                        else { //negative margin
                            $.noop();
                        }
                        break;
                    case 15://done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
                        break;
                    case 16:  //done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    default: //done
                        self.windowOffsetTop = (self.options.zoomWindowOffsetY);//DONE - 1
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                }
            } //end isNAN
            else {
                // For BC purposes, treat passed element as ID if element not found
                self.externalContainer = $(self.options.zoomWindowPosition);
                if (!self.externalContainer.length) {
                    self.externalContainer = $('#' + self.options.zoomWindowPosition);
                }

                self.externalContainerWidth = self.externalContainer.width();
                self.externalContainerHeight = self.externalContainer.height();
                self.externalContainerOffset = self.externalContainer.offset();

                self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
                self.windowOffsetLeft = self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

            }
            self.isWindowSet = true;
            self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffsetY;
            self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffsetX;

            self.windowOffsetLeft = (self.windowOffsetLeft > 0 ? (self.windowOffsetLeft + 10) : (self.windowOffsetLeft - 10))

            // 5-8 sanket
            self.windowOffsetTop += parseFloat(self.$elem.parent().css('top'));
            self.windowOffsetLeft += parseFloat(self.$elem.parent().css('left'));

            // 5-8 sanket
            self.zoomWindow.css({
                top: self.windowOffsetTop,
                left: self.windowOffsetLeft
            });

            if (self.options.zoomType === 'inner') {
                self.zoomWindow.css({
                    top: 0,
                    left: 0
                });

            }

            //var zoomScale = $(".wowbook-zoomcontent").css("zoom");

            //self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));
            //self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));

            //self.windowLeftPos = String(((e.pageX - parseInt(self.boundingBox.left * zoomScale)) * self.widthRatio - (self.zoomWindow.width() / zoomScale) / 2) * (-1));
            //self.windowTopPos = String(((e.pageY - parseInt(self.boundingBox.top * zoomScale)) * self.heightRatio - (self.zoomWindow.height() / zoomScale) / 2) * (-1));

            //self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.newvaluewidth - self.zoomWindow.width() / 2) * (-1));
            //self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.newvalueheight - self.zoomWindow.height() / 2) * (-1));

            //if (self.Etoppos) {
            //    self.windowTopPos = 0;
            //}
            //if (self.Eloppos) {
            //    self.windowLeftPos = 0;
            //}
            //if (self.Eboppos) {
            //    self.windowTopPos = (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height()) * (-1);
            //}
            //if (self.Eroppos) {
            //    self.windowLeftPos = ((self.largeWidth / self.currentZoomLevel - self.zoomWindow.width()) * (-1));
            //}

            ////stops micro movements
            //if (self.fullheight) {
            //    self.windowTopPos = 0;
            //}
            //if (self.fullwidth) {
            //    self.windowLeftPos = 0;
            //}

            //set the css background position
            if (self.options.zoomType === 'window' || self.options.zoomType === 'inner') {

                //if (self.zoomLock === 1) {
                //    //overrides for images not zoomable
                //    if (self.widthRatio <= 1) {
                //        self.windowLeftPos = 0;
                //    }
                //    if (self.heightRatio <= 1) {
                //        self.windowTopPos = 0;
                //    }
                //}
                //// adjust images less than the window height

                //if (self.options.zoomType === 'window') {
                //    if (self.largeHeight < self.options.zoomWindowHeight) {
                //        self.windowTopPos = 0;
                //    }
                //    if (self.largeWidth < self.options.zoomWindowWidth) {
                //        self.windowLeftPos = 0;
                //    }
                //}
                //set the zoomwindow background position
                if (self.options.easing) {

                    //     if(self.changeZoom){
                    //           clearInterval(self.loop);
                    //           self.changeZoom = false;
                    //           self.loop = false;

                    //            }
                    //set the pos to 0 if not set
                    if (!self.xp) {
                        self.xp = 0;
                    }
                    if (!self.yp) {
                        self.yp = 0;
                    }
                    var interval = 16;
                    if (Number.isInteger(parseInt(self.options.easing))) {
                        interval = parseInt(self.options.easing);
                    }
                    //if loop not already started, then run it
                    if (!self.loop) {
                        self.loop = setInterval(function () {
                            //using zeno's paradox

                            self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount;
                            self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount;
                            if (self.scrollingLock) {

                                clearInterval(self.loop);
                                self.xp = self.windowLeftPos;
                                self.yp = self.windowTopPos;

                                self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
                                self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));

                                if (self.changeBgSize) {
                                    if (self.nzHeight > self.nzWidth) {
                                        if (self.options.zoomType === 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvalueheight + 'px ' +
                                                self.largeHeight / self.newvalueheight + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvalueheight + 'px ' +
                                            self.largeHeight / self.newvalueheight + 'px');
                                    }
                                    else {
                                        if (self.options.zoomType !== 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvaluewidth + 'px ' +
                                                self.largeHeight / self.newvalueheight + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvaluewidth + 'px ' +
                                            self.largeHeight / self.newvaluewidth + 'px');
                                    }

                                    /*
                                     if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
                                     if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}
                                     if (!self.bgloop){
                                     self.bgloop = setInterval(function(){

                                     self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount;
                                     self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

                                     self.zoomWindow.css('background-size', self.bgxp + 'px ' + self.bgyp + 'px' );


                                     }, 16);

                                     }
                                     */
                                    self.changeBgSize = false;
                                }

                                self.zoomWindow.css('background-position', self.windowLeftPos + 'px ' + self.windowTopPos + 'px');
                                self.scrollingLock = false;
                                self.loop = false;

                            }
                            else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
                                //stops micro movements
                                clearInterval(self.loop);
                                self.zoomWindow.css('background-position', self.windowLeftPos + 'px ' + self.windowTopPos + 'px');
                                self.loop = false;
                            }
                            else {
                                if (self.changeBgSize) {
                                    if (self.nzHeight > self.nzWidth) {
                                        if (self.options.zoomType === 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvalueheight + 'px ' +
                                                self.largeHeight / self.newvalueheight + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvalueheight + 'px ' +
                                            self.largeHeight / self.newvalueheight + 'px');
                                    }
                                    else {
                                        if (self.options.zoomType !== 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvaluewidth + 'px ' +
                                                self.largeHeight / self.newvaluewidth + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvaluewidth + 'px ' +
                                            self.largeHeight / self.newvaluewidth + 'px');
                                    }
                                    self.changeBgSize = false;
                                }

                                self.zoomWindow.css('background-position', self.xp + 'px ' + self.yp + 'px');
                            }
                        }, interval);
                    }
                }
                else {
                    if (self.changeBgSize) {
                        var backgroundWidth = self.tumbImageWidth * self.options.zoomWindowWidth / self.lensWidth;//self.zoomLens.width();
                        var backgroundHeight = self.tumbImageHeight * self.options.zoomWindowHeight / self.lensHeight;//self.zoomLens.height();
                        // self.zoomWindow.css('background-size',
                        //     self.largeWidth * self.newvaluewidth   + 'px ' +
                        //     self.largeHeight * self.newvalueheight  + 'px');
                        self.zoomWindow.css('background-size',
                            backgroundWidth + 'px ' +
                            backgroundHeight + 'px');

                        //if (self.nzHeight > self.nzWidth) {
                        //    if (self.options.zoomType === 'lens') {
                        //        self.zoomLens.css('background-size',
                        //            self.largeWidth / self.newvalueheight + 'px ' +
                        //            self.largeHeight / self.newvalueheight + 'px');
                        //    }

                        //    self.zoomWindow.css('background-size',
                        //        self.largeWidth * self.newvalueheight + 'px ' +
                        //        self.largeHeight * self.newvalueheight + 'px');
                        //}
                        //else {
                        //  var zoomScale = $(".wowbook-zoomcontent").css("zoom");
                        //    if (self.options.zoomType === 'lens') {
                        //        self.zoomLens.css('background-size',
                        //            self.largeWidth / self.newvaluewidth + 'px ' +
                        //            self.largeHeight / self.newvaluewidth + 'px');
                        //    }
                        //    if ((self.largeHeight / self.newvaluewidth) < self.options.zoomWindowHeight) {

                        //        self.zoomWindow.css('background-size',
                        //            // (self.largeWidth / self.newvaluewidth) * zoomScale + 'px ' +
                        //            // (self.largeHeight / self.newvaluewidth) * zoomScale + 'px');
                        //          (self.largeWidth / self.newvaluewidth) * zoomScale + 'px ' +
                        //            (self.largeWidth / self.newvaluewidth) * zoomScale + 'px');
                        //    }
                        //    else {

                        //        self.zoomWindow.css('background-size',
                        //            // (self.largeWidth / self.newvaluewidth) * zoomScale + 'px ' +
                        //            // (self.largeHeight / self.newvaluewidth) * zoomScale + 'px');
                        //          (self.largeWidth / self.newvaluewidth) * zoomScale + 'px ' +
                        //            (self.largeWidth / self.newvaluewidth) * zoomScale + 'px');
                        //    }
                        //}
                        self.changeBgSize = false;
                    }

                    self.zoomWindow.css('background-position',
                        self.windowLeftPos + 'px ' +
                        self.windowTopPos + 'px');
                }
            }
        },

        setTintPosition: function (e) {
            var self = this;
            var zoomLensWidth = self.zoomLens.width();
            var zoomLensHeight = self.zoomLens.height();
            self.nzOffset = self.$elem.offset();
            self.tintpos = String(((e.pageX - self.nzOffset.left) - (zoomLensWidth / 2)) * (-1));
            self.tintposy = String(((e.pageY - self.nzOffset.top) - zoomLensHeight / 2) * (-1));
            if (self.Etoppos) {
                self.tintposy = 0;
            }
            if (self.Eloppos) {
                self.tintpos = 0;
            }
            if (self.Eboppos) {
                self.tintposy = (self.nzHeight - zoomLensHeight - (self.options.lensBorderSize * 2)) * (-1);
            }
            if (self.Eroppos) {
                self.tintpos = ((self.nzWidth - zoomLensWidth - (self.options.lensBorderSize * 2)) * (-1));
            }
            if (self.options.tint) {
                //stops micro movements
                if (self.fullheight) {
                    self.tintposy = 0;

                }
                if (self.fullwidth) {
                    self.tintpos = 0;

                }
                self.zoomTintImage.css({
                    'left': self.tintpos + 'px',
                    'top': self.tintposy + 'px'
                });
            }
        },

        swaptheimage: function (smallimage, largeimage) {
            var self = this;
            var newImg = new Image();

            if (self.options.loadingIcon && !self.spinner) {
                var styleAttr = 'background: url(\'' + self.options.loadingIcon + '\') no-repeat center;' +
                    'height:' + self.nzHeight + 'px;' +
                    'width:' + self.nzWidth + 'px;' +
                    'z-index: 2000;' +
                    'position: absolute; ' +
                    'background-position: center center;';
                if (self.options.zoomType === 'inner') {
                    styleAttr += 'top: 0px;';
                }
                self.spinner = $('<div class="ezp-spinner" style="' + styleAttr + '"></div>');
                self.$elem.after(self.spinner);
            } else if (self.spinner) {
                self.spinner.show();
            }

            self.options.onImageSwap(self.$elem);

            newImg.onload = function () {
                self.largeWidth = newImg.width;
                self.largeHeight = newImg.height;
                self.zoomImage = largeimage;
                self.zoomWindow.css('background-size', self.largeWidth + 'px ' + self.largeHeight + 'px');

                self.swapAction(smallimage, largeimage);
                return;
            };
            self.setImageSource(newImg, largeimage);  // this must be done AFTER setting onload
        },

        swapAction: function (smallimage, largeimage) {
            var self = this;
            var elemWidth = self.$elem.width();
            var elemHeight = self.$elem.height();
            var newImg2 = new Image();
            newImg2.onload = function () {
                //re-calculate values
                self.nzHeight = newImg2.height;
                self.nzWidth = newImg2.width;
                self.options.onImageSwapComplete(self.$elem);

                self.doneCallback();
                return;
            };
            self.setImageSource(newImg2, smallimage);

            //reset the zoomlevel to that initially set in options
            self.currentZoomLevel = self.options.zoomLevel;
            self.options.maxZoomLevel = false;

            //swaps the main image
            //self.$elem.attr('src',smallimage);
            //swaps the zoom image
            if (self.options.zoomType === 'lens') {
                self.zoomLens.css('background-image', 'url("' + largeimage + '")');
            }
            if (self.options.zoomType === 'window') {
                self.zoomWindow.css('background-image', 'url("' + largeimage + '")');
            }
            if (self.options.zoomType === 'inner') {
                self.zoomWindow.css('background-image', 'url("' + largeimage + '")');
            }

            self.currentImage = largeimage;

            if (self.options.imageCrossfade) {
                var oldImg = self.$elem;
                var newImg = oldImg.clone();
                self.$elem.attr('src', smallimage);
                self.$elem.after(newImg);
                newImg.stop(true).fadeOut(self.options.imageCrossfade, function () {
                    $(this).remove();
                });

                // if(self.options.zoomType === 'inner'){
                //remove any attributes on the cloned image so we can resize later
                self.$elem.width('auto').removeAttr('width');
                self.$elem.height('auto').removeAttr('height');
                //   }

                oldImg.fadeIn(self.options.imageCrossfade);

                if (self.options.tint && self.options.zoomType !== 'inner') {

                    var oldImgTint = self.zoomTintImage;
                    var newImgTint = oldImgTint.clone();
                    self.zoomTintImage.attr('src', largeimage);
                    self.zoomTintImage.after(newImgTint);
                    newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function () {
                        $(this).remove();
                    });

                    oldImgTint.fadeIn(self.options.imageCrossfade);

                    //self.zoomTintImage.attr('width',elem.data('image'));

                    //resize the tint window
                    self.zoomTint.css({
                        height: elemHeight,
                        width: elemWidth
                    });
                }

                self.zoomContainer.css({
                    'height': elemHeight,
                    'width': elemWidth
                });

                if (self.options.zoomType === 'inner') {
                    if (!self.options.constrainType) {
                        self.zoomWrap.parent().css({
                            'height': elemHeight,
                            'width': elemWidth
                        });

                        self.zoomWindow.css({
                            'height': elemHeight,
                            'width': elemWidth
                        });
                    }
                }

                if (self.options.imageCrossfade) {
                    self.zoomWrap.css({
                        'height': elemHeight,
                        'width': elemWidth
                    });
                }
            }
            else {
                self.$elem.attr('src', smallimage);
                if (self.options.tint) {
                    self.zoomTintImage.attr('src', largeimage);
                    //self.zoomTintImage.attr('width',elem.data('image'));
                    self.zoomTintImage.attr('height', elemHeight);
                    //self.zoomTintImage.attr('src') = elem.data('image');
                    self.zoomTintImage.css('height', elemHeight);
                    self.zoomTint.css('height', elemHeight);

                }
                self.zoomContainer.css({
                    'height': elemHeight,
                    'width': elemWidth
                });

                if (self.options.imageCrossfade) {
                    self.zoomWrap.css({
                        'height': elemHeight,
                        'width': elemWidth
                    });
                }
            }
            if (self.options.constrainType) {

                //This will contrain the image proportions
                if (self.options.constrainType === 'height') {

                    var autoWDimension = {
                        'height': self.options.constrainSize,
                        'width': 'auto'
                    };
                    self.zoomContainer.css(autoWDimension);

                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css(autoWDimension);
                        self.constwidth = self.zoomWrap.width();
                    }
                    else {
                        self.$elem.css(autoWDimension);
                        self.constwidth = elemWidth;
                    }

                    var constWDim = {
                        'height': self.options.constrainSize,
                        'width': self.constwidth
                    };
                    if (self.options.zoomType === 'inner') {

                        self.zoomWrap.parent().css(constWDim);
                        self.zoomWindow.css(constWDim);
                    }
                    if (self.options.tint) {
                        self.tintContainer.css(constWDim);
                        self.zoomTint.css(constWDim);
                        self.zoomTintImage.css(constWDim);
                    }

                }
                if (self.options.constrainType === 'width') {
                    var autoHDimension = {
                        'height': 'auto',
                        'width': self.options.constrainSize
                    };
                    self.zoomContainer.css(autoHDimension);

                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css(autoHDimension);
                        self.constheight = self.zoomWrap.height();
                    }
                    else {
                        self.$elem.css(autoHDimension);
                        self.constheight = elemHeight;
                    }

                    var constHDim = {
                        'height': self.constheight,
                        'width': self.options.constrainSize
                    };
                    if (self.options.zoomType === 'inner') {
                        self.zoomWrap.parent().css(constHDim);
                        self.zoomWindow.css(constHDim);
                    }
                    if (self.options.tint) {
                        self.tintContainer.css(constHDim);
                        self.zoomTint.css(constHDim);
                        self.zoomTintImage.css(constHDim);
                    }
                }
            }
        },

        doneCallback: function () {
            var self = this;
            if (self.options.loadingIcon && !!self.spinner && !!self.spinner.length) {
                self.spinner.hide();
            }

            self.nzOffset = self.$elem.offset();
            self.nzWidth = self.$elem.width();
            self.nzHeight = self.$elem.height();

            // reset the zoomlevel back to default
            self.currentZoomLevel = self.options.zoomLevel;

            //ratio of the large to small image
            self.widthRatio = self.largeWidth / self.nzWidth;
            self.heightRatio = self.largeHeight / self.nzHeight;
            //self.heightRatio = self.widthRatio;

            //NEED TO ADD THE LENS SIZE FOR ROUND
            // adjust images less than the window height
            if (self.options.zoomType === 'window') {

                if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
                    self.lensHeight = self.nzHeight;

                }
                else {
                    self.lensHeight = String((self.options.zoomWindowHeight / self.heightRatio));
                }

                if (self.nzWidth < self.options.zoomWindowWidth) {
                    self.lensWidth = self.nzWidth;
                }
                else {
                    self.lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                }

                if (self.zoomLens) {
                    self.zoomLens.css({
                        'width': self.lensWidth,
                        'height': self.lensHeight
                    });
                }
            }
        },

        getCurrentImage: function () {
            var self = this;
            return self.zoomImage;
        },

        getGalleryList: function () {
            var self = this;
            //loop through the gallery options and set them in list for fancybox
            self.gallerylist = [];
            if (self.options.gallery) {
                $('#' + self.options.gallery + ' a').each(function () {

                    var imgSrc = '';
                    if ($(this).data(self.options.attrImageZoomSrc)) {
                        imgSrc = $(this).data(self.options.attrImageZoomSrc);
                    }
                    else if ($(this).data('image')) {
                        imgSrc = $(this).data('image');
                    }
                    //put the current image at the start
                    if (imgSrc === self.zoomImage) {
                        self.gallerylist.unshift({
                            href: '' + imgSrc + '',
                            title: $(this).find('img').attr('title')
                        });
                    }
                    else {
                        self.gallerylist.push({
                            href: '' + imgSrc + '',
                            title: $(this).find('img').attr('title')
                        });
                    }
                });
            }
                //if no gallery - return current image
            else {
                self.gallerylist.push({
                    href: '' + self.zoomImage + '',
                    title: $(this).find('img').attr('title')
                });
            }
            return self.gallerylist;
        },

        changeZoomLevel: function (value) {
            var self = this;

            //flag a zoom, so can adjust the easing during setPosition
            self.scrollingLock = true;

            //round to two decimal places
            self.newvalue = parseFloat(value).toFixed(2);
            var newvalue = self.newvalue;

            var minWindow = Math.min(self.nzWidth, self.nzHeight); // lense block as per shape size

            var lenseWidth = self.options.zoomWindowWidth / newvalue;
            var lenseHeight = self.options.zoomWindowHeight / newvalue;

            minWindow = self.options.zoomWindowWidth; // lense block as per zoomWindowWidth size

            if (lenseWidth > minWindow || lenseHeight > minWindow) {
                var maxLenseSz = Math.max(lenseWidth, lenseHeight);

                newvalue = newvalue * maxLenseSz / minWindow;
                lenseWidth = self.options.zoomWindowWidth / newvalue;
                lenseHeight = self.options.zoomWindowHeight / newvalue;
            }

            var maxzoom = 5;

            if (newvalue > maxzoom) {
                newvalue = maxzoom;
                lenseWidth = self.options.zoomWindowWidth / newvalue;
                lenseHeight = self.options.zoomWindowHeight / newvalue;
            }

            if (self.options.zoomType !== 'inner') {

                self.heightRatio = self.tumbImageHeight / self.largeHeight * newvalue;
                self.newvalueheight = self.heightRatio * newvalue;
                self.fullheight = false;

                self.widthRatio = self.tumbImageWidth / self.largeWidth * newvalue;
                self.newvaluewidth = self.widthRatio * newvalue;
                self.fullwidth = false;
            }

            var scrcontinue = true;
            self.lensWidth = lenseWidth;
            self.lensHeight = lenseHeight;
            if (scrcontinue) {
                self.zoomLock = 0;
                self.changeZoom = true;
                self.changeBgSize = true;

                var lenseWidthNew = Math.min(self.lensWidth, self.nzWidth);
                var lenseHeightNew = Math.min(self.lensHeight, self.nzHeight);

                self.zoomLens.css('height', String(lenseHeightNew) + 'px');
                self.zoomLens.css('width', String(lenseWidthNew) + 'px');

                self.currentZoomLevel = newvalue;

                ////if lens height is less than image height
                //if (((self.options.zoomWindowHeight) / self.heightRatio) <= self.nzHeight)
                //{
                //    self.currentZoomLevel = self.newvalueheight;
                //    self.changeBgSize = true;
                //    //self.zoomLens.css('height', String(self.options.zoomWindowHeight / self.heightRatio) + 'px');
                //    self.zoomLens.css('height', String(lenseHeight) + 'px');

                //}

                //if ((self.options.zoomWindowWidth / self.widthRatio) <= self.nzWidth)
                //{
                //    if (self.options.zoomType !== 'inner')
                //    {
                //        if (self.newvaluewidth > self.newvalueheight)
                //        {
                //            self.currentZoomLevel = self.newvaluewidth;
                //        }
                //    }

                //    if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner')
                //    {
                //        self.changeBgSize = true;
                //        self.zoomLens.css('width', String(self.options.zoomWindowWidth / self.widthRatio) + 'px');
                //    }
                //}
            }

            ///////////////////////////////////////

            ////maxwidth & Maxheight of the image
            //var maxheightnewvalue = self.largeHeight / ((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);
            //var maxwidthtnewvalue = self.largeWidth / ((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);

            ////calculate new heightratio
            //if (self.options.zoomType !== 'inner') {
            //    if (maxheightnewvalue <= newvalue) {
            //        self.heightRatio = (self.largeHeight / maxheightnewvalue) / self.nzHeight;
            //        self.newvalueheight = maxheightnewvalue;
            //        self.fullheight = true;
            //    }
            //    else {
            //        self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
            //        self.newvalueheight = newvalue;
            //        self.fullheight = false;
            //    }

            //    // calculate new width ratio

            //    if (maxwidthtnewvalue <= newvalue) {
            //        self.widthRatio = (self.largeWidth / maxwidthtnewvalue) / self.nzWidth;
            //        self.newvaluewidth = maxwidthtnewvalue;
            //        self.fullwidth = true;
            //    }
            //    else {
            //        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
            //        self.newvaluewidth = newvalue;
            //        self.fullwidth = false;
            //    }
            //    if (self.options.zoomType === 'lens') {
            //        if (maxheightnewvalue <= newvalue) {
            //            self.fullwidth = true;
            //            self.newvaluewidth = maxheightnewvalue;
            //        } else {
            //            self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
            //            self.newvaluewidth = newvalue;

            //            self.fullwidth = false;
            //        }
            //    }
            //}

            //if (self.options.zoomType === 'inner') {
            //    maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight).toFixed(2);
            //    maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth).toFixed(2);
            //    if (newvalue > maxheightnewvalue) {
            //        newvalue = maxheightnewvalue;
            //    }
            //    if (newvalue > maxwidthtnewvalue) {
            //        newvalue = maxwidthtnewvalue;
            //    }

            //    if (maxheightnewvalue <= newvalue) {
            //        self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
            //        if (newvalue > maxheightnewvalue) {
            //            self.newvalueheight = maxheightnewvalue;
            //        } else {
            //            self.newvalueheight = newvalue;
            //        }
            //        self.fullheight = true;
            //    }
            //    else {
            //        self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;

            //        if (newvalue > maxheightnewvalue) {

            //            self.newvalueheight = maxheightnewvalue;
            //        } else {
            //            self.newvalueheight = newvalue;
            //        }
            //        self.fullheight = false;
            //    }

            //    if (maxwidthtnewvalue <= newvalue) {

            //        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
            //        if (newvalue > maxwidthtnewvalue) {

            //            self.newvaluewidth = maxwidthtnewvalue;
            //        } else {
            //            self.newvaluewidth = newvalue;
            //        }

            //        self.fullwidth = true;
            //    }
            //    else {
            //        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
            //        self.newvaluewidth = newvalue;
            //        self.fullwidth = false;
            //    }
            //} //end inner
            //var scrcontinue = false;

            //if (self.options.zoomType === 'inner') {
            //    if (self.nzWidth >= self.nzHeight) {
            //        if (self.newvaluewidth <= maxwidthtnewvalue) {
            //            scrcontinue = true;
            //        }
            //        else {
            //            scrcontinue = false;
            //            self.fullheight = true;
            //            self.fullwidth = true;
            //        }
            //    }
            //    if (self.nzHeight > self.nzWidth) {
            //        if (self.newvaluewidth <= maxwidthtnewvalue) {
            //            scrcontinue = true;
            //        }
            //        else {
            //            scrcontinue = false;
            //            self.fullheight = true;
            //            self.fullwidth = true;
            //        }
            //    }
            //}

            //if (self.options.zoomType !== 'inner') {
            //    scrcontinue = true;
            //}

            //if (scrcontinue) {
            //    self.zoomLock = 0;
            //    self.changeZoom = true;

            //    //if lens height is less than image height
            //    if (((self.options.zoomWindowHeight) / self.heightRatio) <= self.nzHeight) {
            //        self.currentZoomLevel = self.newvalueheight;
            //        if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
            //            self.changeBgSize = true;
            //            self.zoomLens.css('height', String(self.options.zoomWindowHeight / self.heightRatio) + 'px');
            //        }
            //        if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
            //            self.changeBgSize = true;
            //        }
            //    }

            //    if ((self.options.zoomWindowWidth / self.widthRatio) <= self.nzWidth) {
            //        if (self.options.zoomType !== 'inner') {
            //            if (self.newvaluewidth > self.newvalueheight) {
            //                self.currentZoomLevel = self.newvaluewidth;
            //            }
            //        }

            //        if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
            //            self.changeBgSize = true;

            //            self.zoomLens.css('width', String(self.options.zoomWindowWidth / self.widthRatio) + 'px');
            //        }
            //        if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
            //            self.changeBgSize = true;
            //        }

            //    }
            //    if (self.options.zoomType === 'inner') {
            //        self.changeBgSize = true;

            //        if (self.nzWidth > self.nzHeight) {
            //            self.currentZoomLevel = self.newvaluewidth;
            //        }
            //        else if (self.nzHeight >= self.nzWidth) {
            //            self.currentZoomLevel = self.newvaluewidth;
            //        }
            //    }
            //}      //under

            //sets the boundry change, called in setWindowPos
            self.setPosition(self.currentLoc);
            //
        },

        closeAll: function () {
            var self = this;
            if (self.zoomWindow) {
                self.zoomWindow.hide();
            }
            if (self.zoomLens) {
                self.zoomLens.hide();
            }
            if (self.zoomTint) {
                self.zoomTint.hide();
            }
        },

        changeState: function (value) {
            var self = this;
            if (value === 'enable') {
                self.options.zoomEnabled = true;
            }
            if (value === 'disable') {
                self.options.zoomEnabled = false;
            }
        },

        responsiveConfig: function (options) {
            if (options.respond && options.respond.length > 0) {
                return $.extend({}, options, this.configByScreenWidth(options));
            }
            return options;
        },

        configByScreenWidth: function (options) {
            var screenWidth = $(window).width();

            var config = $.grep(options.respond, function (item) {
                var range = item.range.split('-');
                return (screenWidth >= range[0]) && (screenWidth <= range[1]);
            });

            if (config.length > 0) {
                return config[0];
            } else {
                return options;
            }
        }
    };

    $.fn.ezPlusCard = function (options) {
        return this.each(function () {
            var elevate = Object.create(EZP);

            elevate.init(options, this);

            $.data(this, 'ezPlusCard', elevate);

        });
    };

    $.fn.ezPlusCard.options = {
        attrImageZoomSrc: 'zoom-image', // attribute to plugin use for zoom
        borderColour: '#888',
        borderSize: 1,
        constrainSize: false,  //in pixels the dimensions you want to constrain on
        constrainType: false,  //width or height
        containLensZoom: false,
        cursor: 'inherit', // user should set to what they want the cursor as, if they have set a click function
        debug: false,
        easing: false,
        easingAmount: 12,
        enabled: true,

        gallery: false,
        galleryActiveClass: 'zoomGalleryActive',
        gallerySelector: false,
        galleryItem: 'a',

        imageCrossfade: false,

        lensBorderColour: '#000',
        lensBorderSize: 1,
        lensColour: 'white', //colour of the lens background
        lensFadeIn: false,
        lensFadeOut: false,
        lensOpacity: 0.4, //opacity of the lens
        lensShape: 'square', //can be 'round'
        lensSize: 200,
        lenszoom: false,

        loadingIcon: false, //http://www.example.com/spinner.gif

        // This change will allow to decide if you want to decrease
        // zoom of one of the dimensions once the other reached it's top value,
        // or keep the aspect ratio, default behaviour still being as always,
        // allow to continue zooming out, so it keeps retrocompatibility.
        mantainZoomAspectRatio: false,
        maxZoomLevel: false,
        minZoomLevel: 0.50,

        onComplete: $.noop,
        onDestroy: $.noop,
        onImageClick: $.noop,
        onImageSwap: $.noop,
        onImageSwapComplete: $.noop,
        onShow: $.noop,
        onZoomedImageLoaded: $.noop,

        preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
        respond: [],
        responsive: true,
        scrollZoom: false, //allow zoom on mousewheel, true to activate
        scrollZoomIncrement: 0.1,  //steps of the scrollzoom (0.1 for 10%)
        showLens: true,
        tint: false, //enable the tinting
        tintColour: '#333', //default tint color, can be anything, red, #ccc, rgb(0,0,0)
        tintOpacity: 0.4, //opacity of the tint
        touchEnabled: true,

        zoomActivation: 'hover', // Can also be click (PLACEHOLDER FOR NEXT VERSION)
        zoomContainerAppendTo: 'body', //zoom container parent selector
        zoomId: -1, // identifier for the zoom container
        zoomLevel: 1.5, //default zoom level of image
        zoomTintFadeIn: false,
        zoomTintFadeOut: false,
        zoomType: 'window', //window is default,  also 'lens' available -
        zoomWindowAlwaysShow: false,
        zoomWindowBgColour: '#fff',
        zoomWindowFadeIn: false,
        zoomWindowFadeOut: false,
        zoomWindowHeight: 400,
        zoomWindowOffsetX: 0,
        zoomWindowOffsetY: 0,
        zoomWindowPosition: 1, //Possible values: 1-16, but we can also position with a selector string.
        zoomWindowWidth: 400,
        zoomEnabled: true, //false disables zoomwindow from showing
        zIndex: 99999,
        zindexvalue: false,
        displayLens: true,
    };

})(jQuery, window, document);