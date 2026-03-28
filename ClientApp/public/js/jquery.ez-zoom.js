/*
 * jQuery ezZoom 1.2.4
 * Demo's and documentation:
 * http://igorlino.github.io/elevatezoom-plus/
 *
 * @Changes and developed by Kapil Satam and Sanket Shinde
 */
console.log('TDS es-zoom 26-01-2022');


if (typeof Object.create !== 'function') {
  Object.create = function(obj) {
    function F() {}

    F.prototype = obj;
    return new F();
  };
}

(function($, window, document) {
  var EZP = {
    init: function(options, elem) {
      var self = this;

      self.elem = elem;
      self.$elem = $(elem);

      self.options = $.extend({}, $.fn.ezZoom.options, self.responsiveConfig(options || {}));

      self.imageSrc = self.$elem.attr('data-' + self.options.attrImageZoomSrc) ? self.$elem.attr('data-' + self.options.attrImageZoomSrc) : self.$elem.attr('src');

      //sanket
      self.bestFitImage = self.$elem.attr('bestfit');
      self.actualLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAgzSURBVHja7J1pbFVFFMd/paWgLOLCJiSyGDQqohQFWVUiiFsKouKCYFCDRggJmpioX4wfTHBLXKNfDIhCUFC/iNQG97oEBDEaTFQsWAG1lL1K4fhh5oVa79x337sz997Xzj+5aTNz39yZ85+Ze+bMmXPLRASP9NDJi8AT4Anw8AR4Ajw8AZ4AD0+AJ8DDE+AJ8EgOFRmvXzlwgb6GAWcBQ4BuwMn6L8BBYI/++xPwI7AV2AxsAo5mtYFlGTTGDQCuByYDk4CTYpbXBHwE1AJvAQ2egP+jqxb67Vrw5Y6ecxSoAV4D3gT+7ugEdAPuBB7QPT9J7AZeBJ4C9nU0AiqABcBDwKkpd8I/gceA54GWjkDAKN3zRmXs3fMtcC/wWXsloBJYont+WQG/OwB8CmzUms1W4I9WWg+ttKLewNlaYxoJTGilKUWBAM8ADwL/tCcChgArC+j1DcDrwBrgqxhTQ2fgYmA6cAvQP+LvvgJuArY5l4yIuL4uE5E9Eg3rRGSqiJQ7qEe5iEwTkQ8i1qVRRCa6lo9r4c8QkeYIjX1PRC5KoDPkrjEi8n6Eeh0WkepSJeAOEWnJ08B6EZmeoODbXjNFZHueOraIyNxSI2BGBOEvFZHuKQo/d/UQkeURSKguFQIu00PXhEN6dJCx68489T7s4p1gWwsaAmwAehny9wDXJq1rF4AJwLt56j/SpnbUybKevzKk8g3AxAwLH+ATXcffDfknAyu0eps5ApaE6Pl7gKnAdyVgot+i69pkyB8NPJ61hdh44GPDCvcwcEXGe75pOlqnLbVtcQwYB3yRhRFQATwXYl64twSFn5uOFobI7WUsbGjZIGABMMKQtwx4ldLFK9okEoThwD1pT0HdtUYQZFKuB87VxrRSRg/ge2BgQN4fwCDgUFojYH6IPX9ROxA+wH5gsSGvN3B3Wsa4riLSEGLbcbloWhTwzEWOn1ljaOsOEelSbLlxRsDMEPPuo4575dyAtHmOn/mwIX2ANncnPgXNNqTXAHUOBTHS8NI/D7jQ4XO/BNYXKAtnBAxAeS8E4UnHPTGssbc7fvYThvQpQL8kCZhJsOtIA/CBQwFUoHa2TLgFt85m64CdhnpdnyQBpt6/HLdeaFcCfULy+2gzgiu0AG8Y8i5PioByvUwPwtspTj9JTUNrDOmXFiPPYhZio4CvA9IPAKcARxw1vBfKStk1z33NWjtrclSPSqCRYG+LKpT3htMRcL4h/VOHwge4MYLw0ffc6LAe/4TYts5PYgo625C+IQPTTw63Oa6LqZeflQQBpodsddjgQSjzb1SMB4Y6rM/WNAkYZEj/0WGD5xBs7v5ZX/97tzkeBSYCBidBgMlff6ejxpaFTD/LUK7mhZBmAzsLlI1VAnoY0vc7auw4w3QiHN9vEENvHOuoTvsLlI1VArob0l2ZnmeHaF0/Ab+EaCWz2yMBSSJMpVxq+L81ZgEnZLmBxRBwoMCREQfXEezm0ow6YpTDSoJ3pU4CrnFQL2vTcKc0h1+M6WdNm5XuPpRDVVLTUE9D+r4kCNhrSO9vuZF9UMa3INysX7ytr1mGe6cRbsArBv3SJOAXQ/owy420ZVqu0ITZhGnB9XMSBFhbBVo0PSRZllVrgE0Cqiw28DzU1qMtVOkybWGkLWtAMQRsDlkwdc5oj7VZZiVmu9Tmgpf5RewHlKPO1gaph+OJ74ZYDvyK/YPbvwFnEH/HbiIq9EFbNKL8hI65HgFHDRUAqLYgqMkG4QtwJsq+E3YNNpgmBlDktmEbmFxQ1hcq/Dgr4VpD+q3Ej/OQz/SQD9v0vUGIu10ZplHVJrUSBhV15KhhLTAlZiNnRDA95MPSAsuOiqlA34D0FmB1kgSEuZ8sjtnIEw3pqwooY1WBZUfF/Yb0dcCuJAkAZQo2zeEuzMB7Hd0bFWNQng9xR2dsLSiHrnpOPj0grybGVGSqUFlK5bSe4y83aFdDKTL2UJwR0IyKtROEK1Dec0V1CsOVVjmg7EwmDWoJMQI/xT2g0U1rHacF5O0AzsHdTllS6An8YBjpu7Xam9oBjYOoYEdBGAi8ROnjZYPwQbnhH4pVuqUoJN+EnDCfl8FT8VGv+SHt2mAjqoutY6pj9eLHdEx1KurUYSlhErAW8zHVsagzA7Fga0/4c1SkqSCcgNqtGl5Cwh8BvIPZFfJJG8K38RJujUrdyy825P+uR8KWEhD+Wsy7XnV6dBzJGgGgvOY2omIqBKEJtdGe1eloku75Jgerv1B7AfW2HmjbLWUbyiLabMjvpZftd2VQ+PN1zzcJ/7BuW73VpzrSHqojBGxaroMlpa3p9BSRFRECNl1XaiHL5kYgYbuI3JCi8GeJyG956nhEROaUatC+6jxRqHKoEZFLEhT8OBGpjVCvQ656flIEoMN8NUYMFVkrIlc5CltZISJXi8j6iHX5U0TGu5ZPUoFbz0C5D46OeP9O1GnENVrfLjaKbaU2I09H7WT1jfi7Om2Aq3ctmCRDF3dGRZpaVKD2dRC10b8R5fbxgzaCNXHcT7W71rD6cjx0cRXKe6GQTZhjepH1EG7Pu6VCQA5VwAshC7a0sAkVXKouyYem4Z6+QdtRFqLi7aSN3cB9qOO3dUk/PO0POHRBHSV6hOCASC6xC3gaeDa2SbmECWhNxAyUS8oU3H3CpEWvxJfpF3yH/4RJEPrx34/4nBKzvEbgQ5QXx2qK9F7oSAS0fUeN4L+fsRqM2ibsxfFTOQe0VrQX5T6f+4zVJtSXMY5ltYFZJ6Ddw39JzxPgCfDwBHgCPDwBngAPT4AnwMMT4AnwSBD/DgCJP7Ss3i51MAAAAABJRU5ErkJggg==';

      if (!self.options.enabled) {
        return;
      }

      //TINT OVERRIDE SETTINGS
      if (self.options.tint) {
        self.options.lensColour = 'transparent'; //colour of the lens background
        self.options.lensOpacity = '1'; //opacity of the lens
      }
      //INNER OVERRIDE SETTINGS
      if (self.options.zoomType === 'inner') {
        self.options.showLens = false;
      }

      // LENS OVERRIDE SETTINGS
      if (self.options.zoomType === 'lens') {
        self.options.zoomWindowWidth = 0;
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
      var galleryEvent = self.options.galleryEvent + '.ezpspace';
      galleryEvent += self.options.touchEnabled ? ' touchend.ezpspace' : '';
      self.$galleries = $(self.options.gallery ? ('#' + self.options.gallery) : self.options.gallerySelector);
      self.$galleries.on(galleryEvent, self.options.galleryItem, function(e) {

        //Set a class on the currently active gallery image
        if (self.options.galleryActiveClass) {
          $(self.options.galleryItem, self.$galleries).removeClass(self.options.galleryActiveClass);
          $(this).addClass(self.options.galleryActiveClass);
        }
        //stop any link on the a tag from working
        if (this.tagName === 'A') {
          e.preventDefault();
        }

        //call the swap image function
        if ($(this).data(self.options.attrImageZoomSrc)) {
          self.zoomImagePre = $(this).data(self.options.attrImageZoomSrc);
        } else {
          self.zoomImagePre = $(this).data('image');
        }
        self.swaptheimage($(this).data('image'), self.zoomImagePre);
        if (this.tagName === 'A') {
          return false;
        }
      });

      function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random() * 16) % 16 | 0; // jshint ignore:line
          d = Math.floor(d / 16); // jshint ignore:line
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); // jshint ignore:line
        });
        return uuid;
      }
    },
    refresh: function(length) {
      var self = this;

      setTimeout(function() {
        self.fetchNew(self.bestFitImage, self.$elem, self.options.minZoomLevel); //sanket
        self.fetch(self.imageSrc, self.$elem, self.options.minZoomLevel);

      }, length || self.options.refresh);
    },
    fetch: function(imgsrc, element, minZoom) {
      //get the image
      var self = this;
      var newImg = new Image();
      newImg.onload = function() {
        //set the large image dimensions - used to calculte ratio's
        if (!self.options.repeatBG) {
          if (newImg.width / element.width() <= minZoom) {
            self.largeWidth = element.width() * minZoom;
          } else {
            self.largeWidth = newImg.width;
          }
          if (newImg.height / element.height() <= minZoom) {
            self.largeHeight = element.height() * minZoom;
          } else {
            self.largeHeight = newImg.height;
          }
        } else {
          self.largeWidth = element.width();
          self.largeHeight = element.height();
        }
        //once image is loaded start the calls
        self.startZoom();
        self.currentImage = self.imageSrc;
        //let caller know image has been loaded
        self.options.onZoomedImageLoaded(self.$elem);
      };
      self.setImageSource(newImg, imgsrc); // this must be done AFTER setting onload

      return;
    },

    //sanket
    fetchNew: function(imgsrc, element, minZoom) {
      //get the image
      var self = this;
      var newImg = new Image();
      newImg.onload = function() {
        //set the large image dimensions - used to calculte ratio's
        // if (newImg.width / element.width() <= minZoom) {
        //     self.smallWidth = element.width() * minZoom;
        // } else {
        //     self.smallWidth = newImg.width;
        // }
        // if (newImg.height / element.height() <= minZoom) {
        //     self.smallHeight = element.height() * minZoom;
        // } else {
        //     self.smallHeight = newImg.height;
        // }

        // if (newImg.width / element.width() <= minZoom || newImg.height / element.height() <= minZoom) {
        //   self.smallWidth = element.width() * minZoom;
        //   self.smallHeight = element.height() * minZoom;
        // } else {
        self.smallWidth = newImg.width;
        self.smallHeight = newImg.height;
        // }

        if (self.options.repeatBG && self.options.isSmallImg) {
          self.smallWidth = newImg.width;
          self.smallHeight = newImg.height;
        }
        //once image is loaded start the calls

        //sanket
        /*self.startZoom();
        self.currentImage = self.imageSrc;*/
        //let caller know image has been loaded

        //self.options.onZoomedImageLoaded(self.$elem); // sanket
      };
      //sanket
      //self.setImageSource(newImg, imgsrc); // this must be done AFTER setting onload
      newImg.src = imgsrc;

      return;
    },
    setImageSource: function(image, src) {
      //sets an image's source.
      image.src = src;
    },
    startZoom: function() {
      var self = this;

      //sanket
      //console.log(self.smallWidth,self.smallHeight);

      //get dimensions of the non zoomed image

      /*self.nzWidth = self.$elem.width();
      self.nzHeight = self.$elem.height();*/

      self.nzWidth = $('#_zoomImage1Parent').width();
      self.nzHeight = $('#_zoomImage1Parent').height();

      //activated elements
      self.isWindowActive = false;
      self.isLensActive = false;
      self.isTintActive = false;
      self.overWindow = false;

      //CrossFade Wrapper
      if (self.options.imageCrossfade) {
        var elementZoomWrapper = $('<div class="zoomWrapper"/>')
          .css({
            height: self.nzHeight,
            width: self.nzWidth
          });
        if (self.$elem.parent().hasClass('zoomWrapper')) {
          self.$elem.unwrap();
        }
        self.zoomWrap = self.$elem.wrap(elementZoomWrapper);
        self.$elem.css({
          position: 'absolute'
        });
      }

      self.zoomLock = 1;
      self.scrollingLock = false;
      self.changeBgSize = false;
      self.currentZoomLevel = self.options.zoomLevel;

      //get offset of the non zoomed image
      self.updateOffset(self);
      //calculate the width ratio of the large/small image
      self.widthRatio = (self.largeWidth / self.currentZoomLevel) / self.nzWidth;
      self.heightRatio = (self.largeHeight / self.currentZoomLevel) / self.nzHeight;

      function getWindowZoomStyle() {
        return {
          display: 'none',
          position: 'absolute',
          height: self.options.zoomWindowHeight,
          width: self.options.zoomWindowWidth,
          border: '' + self.options.borderSize + 'px solid ' + self.options.borderColour,
          backgroundSize: '' + (self.largeWidth / self.currentZoomLevel) + 'px ' + (self.largeHeight / self.currentZoomLevel) + 'px',
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '' + self.options.zoomWindowBgColour,
          overflow: 'hidden',
          zIndex: 100
        };
      }

      //if window zoom
      if (self.options.zoomType === 'window') {
        self.zoomWindowStyle = getWindowZoomStyle();
      }

      function getInnerZoomStyle() {
        //has a border been put on the image? Lets cater for this
        var borderWidth = self.$elem.css('border-left-width');

        if (self.options.scrollZoom)
          self.zoomLens = $('<div class="zoomLens"/>');

        return {
          display: 'block',
          position: 'absolute',
          /*height: self.nzHeight,
          width: self.nzWidth,*/
          height: '100%',
          width: '100%',
          marginTop: borderWidth,
          marginLeft: borderWidth,
          border: '' + self.options.borderSize + 'px solid ' + self.options.borderColour,
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          cursor: self.options.cursor,
          overflow: 'hidden',
          zIndex: self.options.zIndex
        };
      }

      //if inner  zoom
      if (self.options.zoomType === 'inner') {
        self.zoomWindowStyle = getInnerZoomStyle();
      }

      function getWindowLensStyle() {
        // adjust images less than the window height

        if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
          self.lensHeight = self.nzHeight;
        } else {
          self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
        }
        if (self.largeWidth < self.options.zoomWindowWidth) {
          self.lensWidth = self.nzWidth;
        } else {
          self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
        }

        return {
          display: 'none',
          position: 'absolute',
          height: self.lensHeight,
          width: self.lensWidth,
          border: '' + self.options.lensBorderSize + 'px' + ' solid ' + self.options.lensBorderColour,
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: self.options.lensColour,
          opacity: self.options.lensOpacity,
          cursor: self.options.cursor,
          zIndex: 999,
          overflow: 'hidden'
        };
      }

      //lens style for window zoom
      if (self.options.zoomType === 'window') {
        self.lensStyle = getWindowLensStyle();
      }

      //tint style
      self.tintStyle = {
        display: 'block',
        position: 'absolute',
        height: self.nzHeight,
        width: self.nzWidth,
        backgroundColor: self.options.tintColour,
        opacity: 0
      };

      //lens style for lens zoom with optional round for modern browsers
      self.lensRound = {};

      if (self.options.zoomType === 'lens') {
        self.lensStyle = {
          display: 'none',
          position: 'absolute',
          float: 'left',
          height: self.options.lensSize,
          width: self.options.lensSize,
          border: '' + self.options.borderSize + 'px solid ' + self.options.borderColour,
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: self.options.lensColour,
          cursor: self.options.cursor
        };
      }

      //does not round in all browsers
      if (self.options.lensShape === 'round') {
        self.lensRound = {
          borderRadius: self.options.lensSize / 2 + self.options.borderSize
        };
      }

      //create the div's                                                + ""
      //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

      self.zoomContainer = $('<div class="' + self.options.container + '" ' + 'uuid="' + self.options.zoomId + '"/>');
      self.zoomContainer.css({
        position: 'absolute',
        top: self.nzOffset.top,
        left: self.nzOffset.left,
        height: self.nzHeight,
        width: self.nzWidth,
        zIndex: self.options.zIndex
      });
      if (self.$elem.attr('id')) {
        self.zoomContainer.attr('id', self.$elem.attr('id') + '-' + self.options.container);
      }
      $('.' + self.options.container).remove();
      $(self.options.zoomContainerAppendTo).append(self.zoomContainer);

      //this will add overflow hidden and contrain the lens on lens mode
      if (self.options.containLensZoom && self.options.zoomType === 'lens') {
        self.zoomContainer.css('overflow', 'hidden');
      }
      if (self.options.zoomType !== 'inner') {
        self.zoomLens = $('<div class="zoomLens"/>')
          .css($.extend({}, self.lensStyle, self.lensRound))
          .appendTo(self.zoomContainer)
          .click(function() {
            self.$elem.trigger('click');
          });

        if (self.options.tint) {
          self.tintContainer = $('<div class="tintContainer"/>');
          self.zoomTint = $('<div class="zoomTint"/>').css(self.tintStyle);

          self.zoomLens.wrap(self.tintContainer);

          self.zoomTintcss = self.zoomLens.after(self.zoomTint);

          //if tint enabled - set an image to show over the tint

          self.zoomTintImage = $('<img src="' + self.$elem.attr('src') + '">')
            .css({
              position: 'absolute',
              top: 0,
              left: 0,
              height: self.nzHeight,
              width: self.nzWidth,
              maxWidth: 'none'
            })
            .appendTo(self.zoomLens)
            .click(function() {
              self.$elem.trigger('click');
            });
        }
      }

      //create zoom window
      var targetZoomContainer = isNaN(self.options.zoomWindowPosition) ? 'body' : self.zoomContainer;
      self.zoomWindow = $('<div class="_zoomWindow"/>')
        .css($.extend({
          zIndex: 999,
          top: self.windowOffsetTop,
          left: self.windowOffsetLeft,
        }, self.zoomWindowStyle))
        .appendTo(targetZoomContainer).click(function() {
          self.$elem.trigger('click');
        });

      self.windowRatioX = self.nzWidth / self.smallWidth;
      self.windowRatioY = self.nzHeight / self.smallHeight;

      self.imageRatioX = self.smallWidth / self.largeWidth;
      self.imageRatioY = self.smallHeight / self.largeHeight;

      self.dpiRatioX = parseFloat(self.options.screenDpiX) / parseFloat(self.options.smallImageDpiX);
      self.dpiRatioY = parseFloat(self.options.screenDpiY) / parseFloat(self.options.smallImageDpiY);

      self.scaleRatioX = self.options.zoomLevel * self.imageRatioX * self.dpiRatioX;
      self.scaleRatioY = self.options.zoomLevel * self.imageRatioY * self.dpiRatioY;

      self.bgSizeX = self.scaleRatioX * self.largeWidth;
      self.bgSizeY = self.scaleRatioY * self.largeHeight;

      self.zoomPercentage = 1;
      // self.setCenterPosition = false;

      if (self.options.repeatBG) {
        self.zoomWindow.css('background-size', self.bgSizeX + "px " + self.bgSizeY + "px");
        self.zoomWindow.css('background-repeat', 'repeat');
      } else {
        self.widthRatio = self.largeWidth / self.nzWidth;
        self.heightRatio = self.largeHeight / self.nzHeight;
        self.fisrtZoomLevel = self.currentZoomLevel = Math.max(self.widthRatio, self.heightRatio);
        self.bgSizeX = self.largeWidth / self.currentZoomLevel;
        self.bgSizeY = self.largeHeight / self.currentZoomLevel;
        self.zoomWindow.css('background-size', self.bgSizeX + "px " + self.bgSizeY + "px");
        self.zoomWindow.css('background-position', 'center center');
        self.setCenterPosition = true;
      }
      // self.zoomWindow.css('image-rendering','optimizespeed');
      // self.zoomWindow.css('image-rendering','pixelated');
      self.zoomWindow.css('display', 'none');
      $('._ZoomContainer').css('cursor', 'crosshair');
      self.zoomWindowContainer = $('<div class="_zoomWindowContainer" />')
        .css({
          width: self.options.zoomWindowWidth
        });
      self.zoomWindow.wrap(self.zoomWindowContainer);
      var marginTop = 0;
      if ($('#_header').is(':visible')) {
        marginTop = 45;
      }
      $(self.zoomContainer).append('<center><div id="_zoomPercentage" style="width: 100px;height: 29px;margin-top:' + marginTop + 'px;background: white;position: relative;z-index: 9999999;font-size: 25px;">100%</div>');
      if (self.options.repeatBG) {
        var _zoom = Math.round((1 / self.currentZoomLevel) * 100);
        $('#_zoomPercentage').text(parseInt(_zoom) + ' %');
        // $(self.zoomContainer).append('<div id="_actualBtn" title="Actual" style="float:right;right:14px;top:20px;border:1px solid black;width: 32px;height: 32px;background: black;position: relative;z-index: 9999999;cursor:pointer;border-radius: 50%;background-size: 100%;/*opacity: 0.8;*/background-image: url(' + self.actualLogo + ')"></div></center>');
        self.addActualButtonEvent(self);
      } else {
        var bestfitRation = self.smallWidth / self.smallHeight;
        var windowRation = $('#_zoomImage1').width() / $('#_zoomImage1').height();
        if (bestfitRation < windowRation) {
          var condition = 1;
          var _zoom = self.bgSizeY / $('#_zoomImage1').height() * 100;
        } else {
          var condition = 0;
          var _zoom = self.bgSizeX / $('#_zoomImage1').width() * 100;
        }
        $('#_zoomPercentage').text(Math.round(_zoom) + ' %');
      }

      if (self.options.zoomType === 'lens') {
        self.zoomContainer.css('display', 'none');
        self.zoomLens.css({
          backgroundImage: 'url("' + self.imageSrc + '")'
        });
      }
      if (self.options.zoomType === 'window') {
        self.zoomWindow.css({
          backgroundImage: 'url("' + self.imageSrc + '")'
        });
      }
      if (self.options.zoomType === 'inner') {
        self.zoomWindow.css({
          backgroundImage: 'url("' + self.imageSrc + '")'
        });
      }

      $('#_centerLoader').hide(); //center loader
      /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
      if (self.options.touchEnabled) {
        //touch events
        self.$elem.on('touchmove.ezpspace', function(e) {
          e.preventDefault();
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          self.setPosition(touch);
        });
        self.zoomContainer.on('touchmove.ezpspace', function(e) {
          self.setElements('show');
          e.preventDefault();
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          self.setPosition(touch);

        });
        self.zoomContainer
          .add(self.$elem)
          .on('touchend.ezpspace', function(e) {
            self.showHideWindow('hide');
            if (self.options.showLens) {
              self.showHideLens('hide');
            }
            if (self.options.tint && self.options.zoomType !== 'inner') {
              self.showHideTint('hide');
            }
          });

        if (self.options.showLens) {
          self.zoomLens.on('touchmove.ezpspace', function(e) {

            e.preventDefault();
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            self.setPosition(touch);
          });

          self.zoomLens.on('touchend.ezpspace', function(e) {
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

      // Needed to work in IE
      self.zoomContainer.on('click.ezpspace touchstart.ezpspace', self.options.onImageClick);

      self.zoomContainer
        .add(self.$elem)
        .on('mousemove.ezpspace', function(e) {
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
        if (parseInt($('#_zoomPercentage').text()) == 100) {
          self.zoomWindow.css('display', 'none');
        } else {
          self.zoomWindow.css('display', 'block');
        }
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
        elementToTrack.on('mousemove.ezpspace', mouseMoveZoomHandler);
      }

      //  lensFadeOut: 500,  zoomTintFadeIn
      self.zoomContainer
        .add(self.$elem)
        .hover(function() {
          if (self.overWindow === false) {
            self.setElements('show');
          }
        }, function() {
          if (!self.scrollLock) {
            self.setElements('hide');
            self.options.onDestroy(self.$elem);
          }
        });
      //end ove image

      if (self.options.zoomType !== 'inner') {
        self.zoomWindow.hover(function() {
          self.overWindow = true;
          self.setElements('hide');
        }, function() {
          self.overWindow = false;
        });
      }
      //end ove image

      // var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

      //      $(this).empty();
      //    return false;

      //fix for initial zoom setting
      //if (self.options.zoomLevel !== 1) {
      //    	self.changeZoomLevel(self.currentZoomLevel);
      //}
      //set the min zoomlevel
      if (self.options.minZoomLevel) {
        self.minZoomLevel = self.options.minZoomLevel;
      } else {
        self.minZoomLevel = self.options.scrollZoomIncrement * 2;
      }

      if (self.options.scrollZoom) {
        //see compatibility of mouse events at https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel
        self.zoomContainer.add(self.$elem).on('wheel DOMMouseScroll MozMousePixelScroll', function(e) {
          // in IE there is issue with firing of mouseleave - So check whether still scrolling
          // and on mouseleave check if scrolllock
          self.scrollLock = true;
          clearTimeout($.data(this, 'timer'));
          $.data(this, 'timer', setTimeout(function() {
            self.scrollLock = false;
            //do something
          }, 250));

          var theEvent = e.originalEvent.deltaY || e.originalEvent.detail * -1;

          //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
          //   e.preventDefault();

          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();

          if (theEvent === 0) {
            // fixes last event inversion bug
            return false;
          }
          mouseMoveZoomHandler(e);
          var nextZoomLevel;
          var nextZoomLevelRvs;
          var currentZoomLevelRvs = 1.0 / self.currentZoomLevel;
          //currentZoomLevelRvs = parseFloat(currentZoomLevelRvs ).toFixed(2);
          // invert mouse wheel zoom if default (theEvent / 120 > 0) {
          if (theEvent / 120 < 0) {
            self.zoomWindow.css('display', 'block');
            nextZoomLevelRvs = currentZoomLevelRvs + self.options.scrollZoomIncrement;
            // nextZoomLevel = 1 / parseFloat(nextZoomLevelRvs).toFixed(2); //kapil sir
            nextZoomLevel = 1 / nextZoomLevelRvs; //sanket
            //scrolling up
            if (nextZoomLevel >= self.minZoomLevel) {
              if (!self.options.repeatBG) {
                /*var _zoom = Math.round((1 / self.currentZoomLevel) * 100);
                if (_zoom > 59) {
                    return false;
                }*/
                var addWidth = (self.largeWidth / self.fisrtZoomLevel) * 0.50;
                var addHeight = (self.largeHeight / self.fisrtZoomLevel) * 0.50;

                var size = $('._zoomWindow').css('background-size').split(' ');
                var bgWidth = size[0].replace('px', '');
                var bgHeight = size[1].replace('px', '');

                var totalWidth = addWidth + parseFloat(bgWidth);
                var totalHeight = addHeight + parseFloat(bgHeight);

                nextZoomLevel = self.largeWidth / totalWidth;

                var bestfitRation = self.smallWidth / self.smallHeight;
                var windowRation = $('#_zoomImage1').width() / $('#_zoomImage1').height();
                if (bestfitRation < windowRation) {
                  var condition = 1;
                  var _zoom = totalHeight / $('#_zoomImage1').height() * 100;
                } else {
                  var condition = 0;
                  var _zoom = totalWidth / $('#_zoomImage1').width() * 100;
                }
                if (Math.round(_zoom) > 300) {
                  return false;
                }

              }
              self.changeZoomLevel(nextZoomLevel);
              if (!self.options.repeatBG) {
                // console.log(nextZoomLevel);
                var bestfitRation = self.smallWidth / self.smallHeight;
                var size = $('._zoomWindow').css('background-size').split(' ');
                var bgWidth = size[0].replace('px', '');
                var bgHeight = size[1].replace('px', '');
                var windowRation = $('#_zoomImage1').width() / $('#_zoomImage1').height();
                if (bestfitRation < windowRation) {
                  var condition = 1;
                  var _zoom = bgHeight / $('#_zoomImage1').height() * 100;
                } else {
                  var condition = 0;
                  var _zoom = bgWidth / $('#_zoomImage1').width() * 100;
                }
                $('#_zoomPercentage').text(Math.round(_zoom) + ' %');

              } else {
                var _zoom = Math.round((1 / self.currentZoomLevel) * 100);
                $('#_zoomPercentage').text(parseInt(_zoom) + ' %');
              }
            }
          } else {

            //scrolling down

            //Check if it has to maintain original zoom window aspect ratio or not
            if ((!self.fullheight && !self.fullwidth) || !self.options.mantainZoomAspectRatio) {
              nextZoomLevelRvs = currentZoomLevelRvs - self.options.scrollZoomIncrement;
              // nextZoomLevel = 1 / parseFloat(nextZoomLevelRvs).toFixed(2); //kapil sir
              nextZoomLevel = 1 / nextZoomLevelRvs; //sanket
              if (!self.options.repeatBG) {
                var addWidth = (self.largeWidth / self.fisrtZoomLevel) * 0.50;
                // var addHeight = (self.largeHeight / self.fisrtZoomLevel) * 0.50;
                var size = $('._zoomWindow').css('background-size').split(' ');
                var bgWidth = size[0].replace('px', '');
                var totalWidth = parseFloat(bgWidth) - addWidth;
                // var totalHeight = addHeight + (self.largeHeight / self.fisrtZoomLevel);
                nextZoomLevel = self.largeWidth / totalWidth;
              }
              if (nextZoomLevel > 0) {
                if (self.options.maxZoomLevel) {
                  if (nextZoomLevel <= self.options.maxZoomLevel) {
                    self.changeZoomLevel(nextZoomLevel);
                  }
                } else {
                  //andy
                  if (self.options.repeatBG) {
                    if (nextZoomLevel > 1) {
                      self.zoomWindow.css('display', 'none');
                      return false;
                    }
                  }
                  self.changeZoomLevel(nextZoomLevel);
                  if (!self.options.repeatBG) {
                    var bestfitRation = self.smallWidth / self.smallHeight;
                    var size = $('._zoomWindow').css('background-size').split(' ');
                    var bgWidth = size[0].replace('px', '');
                    var bgHeight = size[1].replace('px', '');
                    var windowRation = $('#_zoomImage1').width() / $('#_zoomImage1').height();
                    if (bestfitRation < windowRation) {
                      var condition = 1;
                      var _zoom = bgHeight / $('#_zoomImage1').height() * 100;
                    } else {
                      var condition = 0;
                      var _zoom = bgWidth / $('#_zoomImage1').width() * 100;
                    }
                    $('#_zoomPercentage').text(Math.round(_zoom) + ' %');

                  } else {
                    var _zoom = Math.round((1 / self.currentZoomLevel) * 100);
                    $('#_zoomPercentage').text(parseInt(_zoom) + ' %');
                  }
                  if (parseInt($('#_zoomPercentage').text()) == 100) {
                    self.zoomWindow.css('display', 'none');
                  } else {
                    self.zoomWindow.css('display', 'block');
                  }
                }
              }
            }
          }
          return false;
        });
      }
    },
    destroy: function() {
      var self = this;
      self.$elem.off('.ezpspace');
      self.$galleries.off('.ezpspace');
      $(self.zoomContainer).remove();
      if (self.options.loadingIcon && !!self.spinner && !!self.spinner.length) {
        self.spinner.remove();
        delete self.spinner;
      }
    },
    getIdentifier: function() {
      var self = this;
      return self.options.zoomId;
    },
    setElements: function(type) {
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
            self.showHideZoomContainer('show');
            self.showHideLens('show');
          }
          if (self.options.tint && self.options.zoomType !== 'inner') {
            self.showHideTint('show');
          }
        }
      }

      //dont hide zoom screen if we move curser to another div
      /*if (type === 'hide') {
          if (self.options.zoomType === 'window') {
              self.showHideWindow('hide');
          }
          if (!self.options.tint) {
              self.showHideWindow('hide');
          }
          if (self.options.showLens) {
              self.showHideZoomContainer('hide');
              self.showHideLens('hide');
          }
          if (self.options.tint) {
              self.showHideTint('hide');
          }
      }*/
    },
    setPosition: function(e) {

      var self = this;

      if (!self.options.zoomEnabled || e === undefined) {
        return false;
      }

      //recaclc offset each time in case the image moves
      //this can be caused by other on page elements

      /*self.nzHeight = self.$elem.height();
      self.nzWidth = self.$elem.width();*/

      self.nzWidth = $('#_zoomImage1Parent').width();
      self.nzHeight = $('#_zoomImage1Parent').height();

      self.updateOffset(self);

      if (self.options.tint && self.options.zoomType !== 'inner') {
        self.zoomTint.css({
          top: 0,
          left: 0
        });
      }
      /*//set responsive
      //will checking if the image needs changing before running this code work faster?
      if (self.options.responsive && !self.options.scrollZoom) {
          if (self.options.showLens) {
              var lensHeight, lensWidth;
              if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                  self.lensHeight = self.nzHeight;
              }
              else {
                  self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
              }
              if (self.largeWidth < self.options.zoomWindowWidth) {
                  self.lensWidth = self.nzWidth;
              }
              else {
                  self.lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
              }
              self.widthRatio = self.largeWidth / self.nzWidth;
              self.heightRatio = self.largeHeight / self.nzHeight;
              if (self.options.zoomType !== 'lens') {
                  //possibly dont need to keep recalcalculating
                  //if the lens is heigher than the image, then set lens size to image size
                  if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                      self.lensHeight = self.nzHeight;

                  }
                  else {
                      self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
                  }

                  if (self.nzWidth < self.options.zoomWindowHeight / self.heightRatio) {
                      self.lensWidth = self.nzWidth;
                  }
                  else {
                      self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
                  }

                  self.zoomLens.css({
                      width: self.lensWidth,
                      height: self.lensHeight
                  });

                  if (self.options.tint) {
                      self.zoomTintImage.css({
                          width: self.nzWidth,
                          height: self.nzHeight
                      });
                  }

              }
              if (self.options.zoomType === 'lens') {
                  self.zoomLens.css({
                      width: self.options.lensSize,
                      height: self.options.lensSize
                  });
              }
              //end responsive image change
          }
      }*/

      var scrollwidth = $('._zoomWindow').width() - $('#_mainBackgroundDivZoom').width();
      var scrollheight = $('._zoomWindow').height() - $('#_mainBackgroundDivZoom').height();

      /*scrollwidth = Math.max(scrollwidth, 0);
      scrollheight = Math.max(scrollheight, 0);
      console.log(scrollwidth,scrollheight);*/

      //container fix
      self.zoomContainer.css({
        top: self.nzOffset.top,
        left: self.nzOffset.left,
        width: self.nzWidth, // new code
        height: self.nzHeight // new code
      });
      self.mouseLeft = parseInt(e.pageX - self.pageOffsetX - self.nzOffset.left);
      self.mouseTop = parseInt(e.pageY - self.pageOffsetY - self.nzOffset.top);
      //calculate the Location of the Lens

      //calculate the bound regions - but only if zoom window
      if (self.options.zoomType === 'window') {
        var zoomLensHeight = self.zoomLens.height() / 2;
        var zoomLensWidth = self.zoomLens.width() / 2;
        self.Etoppos = (self.mouseTop < 0 + zoomLensHeight);
        self.Eboppos = (self.mouseTop > self.nzHeight - zoomLensHeight - (self.options.lensBorderSize * 2));
        self.Eloppos = (self.mouseLeft < 0 + zoomLensWidth);
        self.Eroppos = (self.mouseLeft > (self.nzWidth - zoomLensWidth - (self.options.lensBorderSize * 2)));
      }
      //calculate the bound regions - but only for inner zoom
      if (self.options.zoomType === 'inner') {
        self.Etoppos = (self.mouseTop < ((self.nzHeight / 2) / self.heightRatio));
        self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight / 2) / self.heightRatio)));
        self.Eloppos = (self.mouseLeft < 0 + (((self.nzWidth / 2) / self.widthRatio)));
        self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth / 2) / self.widthRatio - (self.options.lensBorderSize * 2)));
      }

      // if the mouse position of the slider is one of the outerbounds, then hide  window and lens
      if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight) {
        self.setElements('hide');
        return;
      }
      //else continue with operations
      else {
        //lens options
        if (self.options.showLens) {
          //		self.showHideLens('show');
          //set background position of lens
          self.lensLeftPos = Math.floor(self.mouseLeft - self.zoomLens.width() / 2);
          self.lensTopPos = Math.floor(self.mouseTop - self.zoomLens.height() / 2);
        }
        //adjust the background position if the mouse is in one of the outer regions

        //Top region
        if (self.Etoppos) {
          self.lensTopPos = 0;
        }
        //Left Region
        if (self.Eloppos) {
          self.windowLeftPos = 0;
          self.lensLeftPos = 0;
          self.tintpos = 0;
        }
        //Set bottom and right region for window mode
        if (self.options.zoomType === 'window') {
          if (self.Eboppos) {
            self.lensTopPos = Math.max((self.nzHeight) - self.zoomLens.height() - (self.options.lensBorderSize * 2), 0);
          }
          if (self.Eroppos) {
            self.lensLeftPos = (self.nzWidth - (self.zoomLens.width()) - (self.options.lensBorderSize * 2));
          }
        }
        //Set bottom and right region for inner mode
        if (self.options.zoomType === 'inner') {
          if (self.Eboppos) {
            self.lensTopPos = Math.max(((self.nzHeight) - (self.options.lensBorderSize * 2)), 0);
          }
          if (self.Eroppos) {
            self.lensLeftPos = (self.nzWidth - (self.nzWidth) - (self.options.lensBorderSize * 2));
          }
        }
        //if lens zoom
        if (self.options.zoomType === 'lens') {

          self.windowLeftPos = ((e.pageX - self.pageOffsetX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * -1;
          self.windowTopPos = ((e.pageY - self.pageOffsetY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * -1;
          self.zoomLens.css({
            backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
          });

          if (self.changeBgSize) {
            if (self.nzHeight > self.nzWidth) {
              if (self.options.zoomType === 'lens') {
                self.zoomLens.css({
                  backgroundSize: '' +
                    (self.largeWidth / self.newvalueheight) + 'px ' +
                    (self.largeHeight / self.newvalueheight) + 'px'
                });
              }

              self.zoomWindow.css({
                backgroundSize: '' +
                  (self.largeWidth / self.newvalueheight) + 'px ' +
                  (self.largeHeight / self.newvalueheight) + 'px'
              });
            } else {
              if (self.options.zoomType === 'lens') {
                self.zoomLens.css({
                  backgroundSize: '' +
                    (self.largeWidth / self.newvaluewidth) + 'px ' +
                    (self.largeHeight / self.newvaluewidth) + 'px'
                });
              }
              self.zoomWindow.css({
                backgroundSize: '' +
                  (self.largeWidth / self.newvaluewidth) + 'px ' +
                  (self.largeHeight / self.newvaluewidth) + 'px'
              });
            }
            self.changeBgSize = false;
          }

          self.setWindowPosition(e);
        }
        //if tint zoom
        if (self.options.tint && self.options.zoomType !== 'inner') {
          self.setTintPosition(e);
        }
        //set the css background position
        if (self.options.zoomType === 'window') {
          self.setWindowPosition(e);
        }
        if (self.options.zoomType === 'inner') {
          self.setWindowPosition(e);
        }
        if (self.options.showLens) {
          if (self.fullwidth && self.options.zoomType !== 'lens') {
            self.lensLeftPos = 0;
          }
          self.zoomLens.css({
            left: self.lensLeftPos,
            top: self.lensTopPos
          });
        }

      } //end else
    },
    showHideZoomContainer: function(change) {
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
    showHideWindow: function(change) {
      var self = this;
      if (change === 'show') {
        if (!self.isWindowActive && self.zoomWindow) {
          self.options.onShow(self);
          if (self.options.zoomWindowFadeIn) {
            self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
          } else {
            self.zoomWindow.show();
          }
          self.isWindowActive = true;
        }
      }
      if (change === 'hide') {
        if (self.isWindowActive) {
          if (self.options.zoomWindowFadeOut) {
            self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function() {
              if (self.loop) {
                //stop moving the zoom window when zoom window is faded out
                clearInterval(self.loop);
                self.loop = false;
              }
            });
          } else {
            self.zoomWindow.hide();
          }
          self.options.onHide(self);
          self.isWindowActive = false;
        }
      }
    },
    showHideLens: function(change) {
      var self = this;
      if (change === 'show') {
        if (!self.isLensActive) {
          if (self.zoomLens) {
            if (self.options.lensFadeIn) {
              self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
            } else {
              self.zoomLens.show();
            }
          }
          self.isLensActive = true;
        }
      }
      if (change === 'hide') {
        if (self.isLensActive) {
          if (self.zoomLens) {
            if (self.options.lensFadeOut) {
              self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
            } else {
              self.zoomLens.hide();
            }
          }
          self.isLensActive = false;
        }
      }
    },
    showHideTint: function(change) {
      var self = this;
      if (change === 'show') {
        if (!self.isTintActive && self.zoomTint) {

          if (self.options.zoomTintFadeIn) {
            self.zoomTint.css('opacity', self.options.tintOpacity).animate().stop(true, true).fadeIn('slow');
          } else {
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
          } else {
            self.zoomTint.hide();
          }
          self.isTintActive = false;
        }
      }
    },

    setLensPosition: function(e) {},

    setWindowPosition: function(e) {
      //return obj.slice( 0, count );
      var self = this;

      if (!isNaN(self.options.zoomWindowPosition)) {

        switch (self.options.zoomWindowPosition) {
          case 1: //done
            self.windowOffsetTop = (self.options.zoomWindowOffsetY); //DONE - 1
            self.windowOffsetLeft = (+self.nzWidth); //DONE 1, 2, 3, 4, 16
            break;
          case 2:
            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

              self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
              self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
            } else { //negative margin
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
              self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8

              self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
            } else { //negative margin
              $.noop();
            }

            break;
          case 7: //done
            self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
            self.windowOffsetLeft = 0; //DONE 7, 13
            break;
          case 8: //done
            self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
            break;
          case 9: //done
            self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
            break;
          case 10:
            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

              self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
              self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
            } else { //negative margin
              $.noop();
            }
            break;
          case 11:
            self.windowOffsetTop = (self.options.zoomWindowOffsetY);
            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
            break;
          case 12: //done
            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
            break;
          case 13: //done
            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
            self.windowOffsetLeft = (0); //DONE 7, 13
            break;
          case 14:
            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
              self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16

              self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
            } else { //negative margin
              $.noop();
            }
            break;
          case 15: //done
            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
            self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
            break;
          case 16: //done
            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
            break;
          default: //done
            self.windowOffsetTop = (self.options.zoomWindowOffsetY); //DONE - 1
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

        self.windowOffsetTop = self.externalContainerOffset.top; //DONE - 1
        self.windowOffsetLeft = self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

      }
      self.isWindowSet = true;
      self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffsetY;
      self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffsetX;

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

      self.windowLeftPos = ((e.pageX - self.pageOffsetX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * -1;
      self.windowTopPos = ((e.pageY - self.pageOffsetY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * -1;
      if (self.Etoppos) {
        self.windowTopPos = 0;
      }
      if (self.Eloppos) {
        self.windowLeftPos = 0;
      }
      if (self.Eboppos) {
        self.windowTopPos = (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height()) * (-1);
      }
      if (self.Eroppos) {
        self.windowLeftPos = ((self.largeWidth / self.currentZoomLevel - self.zoomWindow.width()) * (-1));
      }

      //stops micro movements
      if (self.fullheight) {
        self.windowTopPos = 0;
      }
      if (self.fullwidth) {
        self.windowLeftPos = 0;
      }

      //set the css background position
      if (self.options.zoomType === 'window' || self.options.zoomType === 'inner') {

        if (self.zoomLock === 1) {
          //overrides for images not zoomable
          if (self.widthRatio <= 1) {
            self.windowLeftPos = 0;
          }
          if (self.heightRatio <= 1) {
            self.windowTopPos = 0;
          }
        }
        // adjust images less than the window height

        // if (self.options.zoomType === 'window') {
        //     if (self.largeHeight < self.options.zoomWindowHeight) {
        //         self.windowTopPos = 0;
        //     }
        //     if (self.largeWidth < self.options.zoomWindowWidth) {
        //         self.windowLeftPos = 0;
        //     }
        // }
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
          var easingInterval = parseInt(self.options.easing);
          if (typeof easingInterval === 'number' && isFinite(easingInterval) && Math.floor(easingInterval) === easingInterval) {
            interval = easingInterval;
          }
          //if loop not already started, then run it
          if (!self.loop) {
            self.loop = setInterval(function() {
              //using zeno's paradox

              self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount;
              self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount;
              if (self.scrollingLock) {

                clearInterval(self.loop);
                self.xp = self.windowLeftPos;
                self.yp = self.windowTopPos;

                self.xp = ((e.pageX - self.pageOffsetX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
                self.yp = (((e.pageY - self.pageOffsetY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));

                if (self.changeBgSize) {
                  if (self.nzHeight > self.nzWidth) {
                    if (self.options.zoomType === 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' +
                          (self.largeWidth / self.newvalueheight) + 'px ' +
                          (self.largeHeight / self.newvalueheight) + 'px'
                      });
                    }
                    self.zoomWindow.css({
                      backgroundSize: '' +
                        (self.largeWidth / self.newvalueheight) + 'px ' +
                        (self.largeHeight / self.newvalueheight) + 'px'
                    });
                  } else {
                    if (self.options.zoomType !== 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' +
                          (self.largeWidth / self.newvaluewidth) + 'px ' +
                          (self.largeHeight / self.newvalueheight) + 'px'
                      });
                    }
                    self.zoomWindow.css({
                      backgroundSize: '' +
                        (self.largeWidth / self.newvaluewidth) + 'px ' +
                        (self.largeHeight / self.newvaluewidth) + 'px'
                    });
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

                self.zoomWindow.css({
                  backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                });
                self.scrollingLock = false;
                self.loop = false;

              } else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
                //stops micro movements
                clearInterval(self.loop);
                self.zoomWindow.css({
                  backgroundPosition: '' + self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                });
                self.loop = false;
              } else {
                if (self.changeBgSize) {
                  if (self.nzHeight > self.nzWidth) {
                    if (self.options.zoomType === 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' +
                          (self.largeWidth / self.newvalueheight) + 'px ' +
                          (self.largeHeight / self.newvalueheight) + 'px'
                      });
                    }
                    self.zoomWindow.css({
                      backgroundSize: '' +
                        (self.largeWidth / self.newvalueheight) + 'px ' +
                        (self.largeHeight / self.newvalueheight) + 'px'
                    });
                  } else {
                    if (self.options.zoomType !== 'lens') {
                      self.zoomLens.css({
                        backgroundSize: '' +
                          (self.largeWidth / self.newvaluewidth) + 'px ' +
                          (self.largeHeight / self.newvaluewidth) + 'px'
                      });
                    }
                    self.zoomWindow.css({
                      backgroundSize: '' +
                        (self.largeWidth / self.newvaluewidth) + 'px ' +
                        (self.largeHeight / self.newvaluewidth) + 'px'
                    });
                  }
                  self.changeBgSize = false;
                }

                self.zoomWindow.css({
                  backgroundPosition: '' + self.xp + 'px ' + self.yp + 'px'
                });
              }
            }, interval);
          }
        } else {
          if (self.changeBgSize) {
            if (self.nzHeight > self.nzWidth) {
              if (self.options.zoomType === 'lens') {
                self.zoomLens.css({
                  backgroundSize: '' +
                    (self.largeWidth / self.newvalueheight) + 'px ' +
                    (self.largeHeight / self.newvalueheight) + 'px'
                });
              }
              if (self.options.repeatBG) {
                self.zoomWindow.css({
                  backgroundSize: '' +
                    ((self.largeWidth / self.newvalueheight) * self.scaleRatioX) + 'px ' +
                    ((self.largeHeight / self.newvalueheight) * self.scaleRatioY) + 'px'
                });
              } else {
                self.zoomWindow.css({
                  backgroundSize: '' +
                    (self.largeWidth / self.newvalueheight) + 'px ' +
                    (self.largeHeight / self.newvalueheight) + 'px'
                });
              }
            } else {
              if (self.options.zoomType === 'lens') {
                self.zoomLens.css({
                  backgroundSize: '' +
                    (self.largeWidth / self.newvaluewidth) + 'px ' +
                    (self.largeHeight / self.newvaluewidth) + 'px'
                });
              }
              if ((self.largeHeight / self.newvaluewidth) < self.options.zoomWindowHeight) {
                if (self.options.repeatBG) {
                  self.zoomWindow.css({
                    backgroundSize: '' +
                      ((self.largeWidth / self.newvaluewidth) * self.scaleRatioX) + 'px ' +
                      ((self.largeHeight / self.newvaluewidth) * self.scaleRatioY) + 'px'
                  });
                } else {
                  self.zoomWindow.css({
                    backgroundSize: '' +
                      (self.largeWidth / self.newvaluewidth) + 'px ' +
                      (self.largeHeight / self.newvaluewidth) + 'px'
                  });
                }
              } else {
                if (self.options.repeatBG) {
                  self.zoomWindow.css({
                    backgroundSize: '' +
                      ((self.largeWidth / self.newvalueheight) * self.scaleRatioX) + 'px ' +
                      ((self.largeHeight / self.newvalueheight) * self.scaleRatioY) + 'px'
                  });
                } else {
                  self.zoomWindow.css({
                    backgroundSize: '' +
                      (self.largeWidth / self.newvalueheight) + 'px ' +
                      (self.largeHeight / self.newvalueheight) + 'px'
                  });
                }
              }

            }
            self.changeBgSize = false;
          }
          //self.zoomWindow.css('background-repeat','repeat');

          if (self.options.repeatBG) {
            self.zoomWindow.css('background-repeat', 'repeat');
          } else {
            self.zoomWindow.css('background-repeat', 'no-repeat');
          }
          /*
          self.virtualWidth = self.bgSizeX * self.windowRatioX;
          self.virtualHeight = self.bgSizeY * self.windowRatioY;
          self.scrollSizeX = self.virtualWidth - self.nzWidth;
          self.scrollSizeY = self.virtualHeight - self.nzHeight;

          self.positionX = self.mouseLeft / self.nzWidth * self.scrollSizeX;
          self.positionY = self.mouseTop / self.nzHeight * self.scrollSizeY;*/
          if (!self.options.repeatBG) {
            if (!self.setCenterPosition) {
              self.zoomWindow.css({
                backgroundPosition: '' +
                  self.windowLeftPos + 'px ' +
                  self.windowTopPos + 'px'
              });
            } else {
              self.zoomWindow.css('background-position', 'center');
            }
          } else {
            self.zoomWindow.css({
              backgroundPosition: '' +
                self.windowLeftPos + 'px ' +
                self.windowTopPos + 'px'
            });
          }

          /*if(!self.options.repeatBG) {
              self.zoomWindow.css('background-position','center');
          }*/

          /*self.zoomWindow.css({
              backgroundPosition: '' +
              self.positionX + 'px ' +
              self.positionY + 'px'
          });*/
        }
      }
    },

    setTintPosition: function(e) {
      var self = this;
      var zoomLensWidth = self.zoomLens.width();
      var zoomLensHeight = self.zoomLens.height();
      self.updateOffset(self);
      self.tintpos = ((e.pageX - self.pageOffsetX - self.nzOffset.left) - (zoomLensWidth / 2)) * -1;
      self.tintposy = ((e.pageY - self.pageOffsetY - self.nzOffset.top) - zoomLensHeight / 2) * -1;
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
          left: self.tintpos,
          top: self.tintposy
        });
      }
    },

    swaptheimage: function(smallimage, largeimage) {
      var self = this;
      var newImg = new Image();

      if (self.options.loadingIcon && !self.spinner) {
        var styleAttr = {
          background: 'url("' + self.options.loadingIcon + '") no-repeat',
          height: self.nzHeight,
          width: self.nzWidth,
          zIndex: 2000,
          position: 'absolute',
          backgroundPosition: 'center center',
        };
        if (self.options.zoomType === 'inner') {
          styleAttr.setProperty('top', 0);
        }
        self.spinner = $('<div class="ezp-spinner"></div>')
          .css(styleAttr);
        self.$elem.after(self.spinner);
      } else if (self.spinner) {
        self.spinner.show();
      }

      self.options.onImageSwap(self.$elem);

      newImg.onload = function() {
        self.largeWidth = newImg.width;
        self.largeHeight = newImg.height;
        self.zoomImage = largeimage;
        self.zoomWindow.css({
          backgroundSize: '' + self.largeWidth + 'px ' + self.largeHeight + 'px'
        });

        self.swapAction(smallimage, largeimage);
        return;
      };
      self.setImageSource(newImg, largeimage); // this must be done AFTER setting onload
    },

    swapAction: function(smallimage, largeimage) {
      var self = this;
      var elemWidth = self.$elem.width();
      var elemHeight = self.$elem.height();
      var newImg2 = new Image();
      newImg2.onload = function() {
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
        newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
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
          newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
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
      } else {
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
          } else {
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
          } else {
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

    doneCallback: function() {
      var self = this;
      if (self.options.loadingIcon && !!self.spinner && !!self.spinner.length) {
        self.spinner.hide();
      }

      self.updateOffset(self);
      self.nzWidth = self.$elem.width();
      self.nzHeight = self.$elem.height();

      // reset the zoomlevel back to default
      self.currentZoomLevel = self.options.zoomLevel;

      //ratio of the large to small image
      self.widthRatio = self.largeWidth / self.nzWidth;
      self.heightRatio = self.largeHeight / self.nzHeight;

      //NEED TO ADD THE LENS SIZE FOR ROUND
      // adjust images less than the window height
      if (self.options.zoomType === 'window') {

        if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
          self.lensHeight = self.nzHeight;

        } else {
          self.lensHeight = self.options.zoomWindowHeight / self.heightRatio;
        }

        if (self.nzWidth < self.options.zoomWindowWidth) {
          self.lensWidth = self.nzWidth;
        } else {
          self.lensWidth = self.options.zoomWindowWidth / self.widthRatio;
        }

        if (self.zoomLens) {
          self.zoomLens.css({
            'width': self.lensWidth,
            'height': self.lensHeight
          });
        }
      }
    },

    getCurrentImage: function() {
      var self = this;
      return self.zoomImage;
    },

    getGalleryList: function() {
      var self = this;
      //loop through the gallery options and set them in list for fancybox
      self.gallerylist = [];
      if (self.options.gallery) {
        $('#' + self.options.gallery + ' a').each(function() {

          var imgSrc = '';
          if ($(this).data(self.options.attrImageZoomSrc)) {
            imgSrc = $(this).data(self.options.attrImageZoomSrc);
          } else if ($(this).data('image')) {
            imgSrc = $(this).data('image');
          }
          //put the current image at the start
          if (imgSrc === self.zoomImage) {
            self.gallerylist.unshift({
              href: '' + imgSrc + '',
              title: $(this).find('img').attr('title')
            });
          } else {
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

    changeZoomLevel: function(value) {
      var self = this;

      //flag a zoom, so can adjust the easing during setPosition
      self.scrollingLock = true;

      //round to two decimal places
      self.newvalue = value; //parseFloat(value).toFixed(2);
      var newvalue = self.newvalue;

      //maxwidth & Maxheight of the image
      var maxheightnewvalue = self.largeHeight / ((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);
      var maxwidthtnewvalue = self.largeWidth / ((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);

      var maxValue = Math.max(maxheightnewvalue, maxwidthtnewvalue);
      maxheightnewvalue = maxwidthtnewvalue = maxValue;

      if (newvalue > maxheightnewvalue) {
        newvalue = maxheightnewvalue;
      }
      if (newvalue > maxwidthtnewvalue) {
        newvalue = maxwidthtnewvalue;
      }

      //calculate new heightratio
      if (self.options.zoomType !== 'inner') {
        if (maxheightnewvalue <= newvalue) {
          self.heightRatio = (self.largeHeight / maxheightnewvalue) / self.nzHeight;
          self.newvalueheight = maxheightnewvalue;
          self.fullheight = true;
        } else {
          self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
          self.newvalueheight = newvalue;
          self.fullheight = false;
        }

        // calculate new width ratio

        if (maxwidthtnewvalue <= newvalue) {
          self.widthRatio = (self.largeWidth / maxwidthtnewvalue) / self.nzWidth;
          self.newvaluewidth = maxwidthtnewvalue;
          self.fullwidth = true;
        } else {
          self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
          self.newvaluewidth = newvalue;
          self.fullwidth = false;
        }
        if (self.options.zoomType === 'lens') {
          if (maxheightnewvalue <= newvalue) {
            self.fullwidth = true;
            self.newvaluewidth = maxheightnewvalue;
          } else {
            self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
            self.newvaluewidth = newvalue;

            self.fullwidth = false;
          }
        }
      }

      if (self.options.zoomType === 'inner') {
        maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight).toFixed(2);
        maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth).toFixed(2);
        self.setCenterPosition = false;
        if (newvalue > maxheightnewvalue) {
          self.setCenterPosition = true;
        }
        if (newvalue > maxwidthtnewvalue) {
          self.setCenterPosition = true;
        }


        var maxValue = Math.max(maxheightnewvalue, maxwidthtnewvalue);
        maxheightnewvalue = maxwidthtnewvalue = maxValue;

        if (newvalue > maxheightnewvalue) {
          newvalue = maxheightnewvalue;
        }
        if (newvalue > maxwidthtnewvalue) {
          newvalue = maxwidthtnewvalue;
        }

        if (maxheightnewvalue <= newvalue) {
          self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
          if (newvalue > maxheightnewvalue) {
            self.newvalueheight = maxheightnewvalue;
          } else {
            self.newvalueheight = newvalue;
          }
          self.fullheight = true;
        } else {
          self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;

          if (newvalue > maxheightnewvalue) {

            self.newvalueheight = maxheightnewvalue;
          } else {
            self.newvalueheight = newvalue;
          }
          self.fullheight = false;
        }

        if (maxwidthtnewvalue <= newvalue) {

          self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
          if (newvalue > maxwidthtnewvalue) {

            self.newvaluewidth = maxwidthtnewvalue;
          } else {
            self.newvaluewidth = newvalue;
          }

          self.fullwidth = true;
        } else {
          self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
          self.newvaluewidth = newvalue;
          self.fullwidth = false;
        }
      } //end inner
      var scrcontinue = false;

      if (self.options.zoomType === 'inner') {
        if (self.nzWidth >= self.nzHeight) {
          if (self.newvaluewidth <= maxwidthtnewvalue) {
            scrcontinue = true;
          } else {
            scrcontinue = false;
            self.fullheight = true;
            self.fullwidth = true;
          }
        }
        if (self.nzHeight > self.nzWidth) {
          if (self.newvaluewidth <= maxwidthtnewvalue) {
            scrcontinue = true;
          } else {
            scrcontinue = false;
            self.fullheight = true;
            self.fullwidth = true;
          }
        }
      }

      if (self.options.zoomType !== 'inner') {
        scrcontinue = true;
      }

      if (scrcontinue) {
        self.zoomLock = 0;
        self.changeZoom = true;

        //if lens height is less than image height
        if (((self.options.zoomWindowHeight) / self.heightRatio) <= self.nzHeight) {
          self.currentZoomLevel = self.newvalueheight;
          if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
            self.changeBgSize = true;
            self.zoomLens.css({
              height: self.options.zoomWindowHeight / self.heightRatio
            });
          }
          if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
            self.changeBgSize = true;
          }
        }

        if ((self.options.zoomWindowWidth / self.widthRatio) <= self.nzWidth) {
          if (self.options.zoomType !== 'inner') {
            if (self.newvaluewidth > self.newvalueheight) {
              self.currentZoomLevel = self.newvaluewidth;
            }
          }

          if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
            self.changeBgSize = true;

            self.zoomLens.css({
              width: self.options.zoomWindowWidth / self.widthRatio
            });
          }
          if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
            self.changeBgSize = true;
          }

        }
        if (self.options.zoomType === 'inner') {
          self.changeBgSize = true;

          if (self.nzWidth > self.nzHeight) {
            self.currentZoomLevel = self.newvaluewidth;
          } else if (self.nzHeight >= self.nzWidth) {
            self.currentZoomLevel = self.newvaluewidth;
          }
        }
      } //under

      //sets the boundry change, called in setWindowPos
      self.setPosition(self.currentLoc);
      //
    },

    closeAll: function() {
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
    updateOffset: function(self) {
      if (self.options.zoomContainerAppendTo !== 'body') {
        self.nzOffset = self.$elem.offset();
        var appendedPosition = $(self.options.zoomContainerAppendTo).offset();
        /*self.nzOffset.top = self.$elem.offset().top - appendedPosition.top;
        self.nzOffset.left = self.$elem.offset().left - appendedPosition.left;*/

        self.nzOffset.top = 0;
        self.nzOffset.left = 0;

        // NOTE: When initialising ezZoom on an element
        // present inside a dialog the positions will
        // not be correct unless the dialog occupies the
        // entire viewport. These page offsets will help
        // zoom lens and zoom window to be positioned
        // correctly

        // Update page offsets
        self.pageOffsetX = appendedPosition.left;
        self.pageOffsetY = appendedPosition.top;
      } else {
        self.nzOffset = self.$elem.offset();

        // Update page offsets
        self.pageOffsetX = 0;
        self.pageOffsetY = 0;
      }
    },

    changeState: function(value) {
      var self = this;
      if (value === 'enable') {
        self.options.zoomEnabled = true;
      }
      if (value === 'disable') {
        self.options.zoomEnabled = false;
      }
    },

    responsiveConfig: function(options) {
      if (options.respond && options.respond.length > 0) {
        return $.extend({}, options, this.configByScreenWidth(options));
      }
      return options;
    },

    configByScreenWidth: function(options) {
      var screenWidth = $(window).width();

      var config = $.grep(options.respond, function(item) {
        var range = item.range.split('-');
        return (screenWidth >= range[0]) && (screenWidth <= range[1]);
      });

      if (config.length > 0) {
        return config[0];
      } else {
        return options;
      }
    },

    addActualButtonEvent: function(self) {
      $('#_actualBtn').unbind('click');
      $('#_actualBtn').on('click', function() {
        self.changeZoomLevel(1);
        self.zoomPercentage = 1;
        $('#_zoomPercentage').text(Math.round(self.zoomPercentage * 100) + ' %');

      });
    }
  };

  $.fn.ezZoom = function(options) {
    return this.each(function() {
      var elevate = Object.create(EZP);

      elevate.init(options, this);

      $.data(this, 'ezZoom', elevate);

    });
  };

  $.fn.ezZoom.options = {
    container: '_ZoomContainer',
    attrImageZoomSrc: 'zoom-image', // attribute to plugin use for zoom
    borderColour: '#888',
    borderSize: 0,
    constrainSize: false, //in pixels the dimensions you want to constrain on
    constrainType: false, //width or height
    containLensZoom: false,
    cursor: 'inherit', // user should set to what they want the cursor as, if they have set a click function
    debug: false,
    easing: false,
    easingAmount: 12,
    enabled: true,

    gallery: false,
    galleryActiveClass: 'zoomGalleryActive',
    gallerySelector: false,
    galleryItem: '_galleryList',
    galleryEvent: 'click',

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
    maxZoomLevel: false, //default false
    // minZoomLevel: 0.199, // for 500% zoom design
    minZoomLevel: 0.330, //for 300% zoom design

    onComplete: $.noop,
    onDestroy: $.noop,
    onImageClick: $.noop,
    onImageSwap: $.noop,
    onImageSwapComplete: $.noop,
    onShow: $.noop,
    onHide: $.noop,
    onZoomedImageLoaded: $.noop,

    preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
    respond: [],
    responsive: true,
    scrollZoom: false, //allow zoom on mousewheel, true to activate
    scrollZoomIncrement: 0.5, //steps of the scrollzoom (0.1 => 10)
    showLens: true,
    tint: false, //enable the tinting
    tintColour: '#333', //default tint color, can be anything, red, #ccc, rgb(0,0,0)
    tintOpacity: 0.4, //opacity of the tint
    touchEnabled: true,

    zoomActivation: 'hover', // Can also be click (PLACEHOLDER FOR NEXT VERSION)
    zoomContainerAppendTo: '#_mainBackgroundDiv', //zoom container parent selector
    zoomId: -1, // identifier for the zoom container
    zoomLevel: 1, //default zoom level of image
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
    zIndex: 9999999
  };

})(window.jQuery, window, document);