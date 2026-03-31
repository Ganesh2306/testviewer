(function ($, window, documnet, undefined) {
    console.log('TDS-Q3D-Plugin v4');
    // Create the defaults once
    var pluginName = "TDS_Q3D",
        defaults = {

        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.init();
    }

    Plugin.prototype = {

        init: function () {
            __that = this;
            __that.Tailoriconfig = undefined;
            loadPlugin(__that);
        },

        getImage: function (width, height, bgFlag, type, quality, callback) {
            //__that.options.Tailoriconfig.getImage(width, height, bgFlag, type, quality,(data) => callback(data));
        },

        generateFabricImage: function (url, Fwidth, Fheight, scalse, type, productName, quality, callback) {
            productName = productName.map(v => v.toLowerCase());
            __that.returnResult = [];
            __that.productThreeDList = [];
            var threeDImageList = [];
            for (let i = 0; i < productName.length; i++) {
                for (let j = 0; j < __that.mainConfigData[productName[i]].length; j++) {
                    threeDImageList.push(__that.mainConfigData[productName[i]][j]);
                    let newObj = [__that.mainConfigData[productName[i]][j].name, productName[i]];
                    __that.productThreeDList.push(newObj);
                }
            }
            __that.options.Tailoriconfig.stopAnimation(false);
            loadModel(__that, threeDImageList, url, Fwidth, Fheight, parseFloat(scalse), type, 0, quality, (data) => {
                __that.options.Tailoriconfig.stopAnimation(true);
                callback(data);
            })
        }
    };

    $.fn[pluginName] = function (options) {
        return $.data(this, "plugin_" + pluginName,
            new Plugin(this, options));
    };

    function loadPlugin(__that) {
        __that.options.Tailoriconfig = new Tds.DotNetQ3d({
            ServiceUrl: __that.options.ServiceUrl,
            Key: __that.options.Key,
            OrganisationId: __that.options.OrganisationId,
            texture: __that.options.textur,
            defaultThreeDImage: __that.options.defaultThreeDImage,
            container: __that.options.container,
            twidth: __that.options.twidth,
            theight: __that.options.theigh,
            dracoPath: '../darco/',
            isSkinColor: __that.options.isSkinColor,
            isShoesColor: __that.options.isShoesColo,
            rotationWithPan: __that.options.rotationWithPan,
            isQ3d: __that.options.isQ3d,
            isRedirect: __that.options.isRedirec,
            designProductName: __that.options.designProductNam,
            isShowProduct: __that.options.isShowProduct,
            productName: __that.options.productName,
            CursorZoom: __that.options.CursorZoo,

            onConfigLoad: function () {
                __that.mainConfigData = [];
                for (var key in __that.options.Tailoriconfig.getProducts()) {
                    if (!__that.options.Tailoriconfig.getProducts().hasOwnProperty(key)) continue;
                    var obj = __that.options.Tailoriconfig.getProducts()[key];
                    subData = []
                    for (var key1 in __that.options.Tailoriconfig.getThreeDImages(obj.name)) {
                        if (!__that.options.Tailoriconfig.getThreeDImages(obj.name).hasOwnProperty(key1)) continue;
                        var obj1 = __that.options.Tailoriconfig.getThreeDImages(obj.name)[key1];
                        if (!obj1.isThreeD) {
                            subData.push(obj1);
                        }
                    }
                    __that.mainConfigData[obj.name.toLowerCase()] = subData;
                }
                __that.options.onConfigLoad(__that.mainConfigData);
            },
            onTextureChange: function () {
                // console.log('texture change');
            },
            onImageChange: function () {
                // console.log('image change');
                __that.options.onImageChange();
            },
            onDataLoad: function () {
                __that.options.Tailoriconfig.stopAnimation(true);
            },

        });
    }

    function loadModel(__that, threeDImageList, imageUrl, Fwidth, Fheight, scalse, type, threeDImageID, quality, callback) {
        if (!threeDImageList[threeDImageID].isThreeD) {
            recursiveLoadPlugin(__that, threeDImageList, imageUrl, Fwidth, Fheight, scalse, type, threeDImageID, quality, callback);
        } else {
            if ((threeDImageID + 1) < threeDImageList.length) {
                threeDImageID++;
                recursiveLoadPlugin(__that, threeDImageList, imageUrl, Fwidth, Fheight, scalse, type, threeDImageID, quality, callback);
            } else {
                callback(__that.returnResult);
            }
        }
    }

    function recursiveLoadPlugin(__that, threeDImageList, imageUrl, Fwidth, Fheight, scalse, type, threeDImageID, quality, callback) {
        let id = threeDImageList[threeDImageID].id;
        let groupName = __that.options.Tailoriconfig.getGroups(id).length > 1 ? __that.options.Tailoriconfig.getGroups(id)[1].name : __that.options.Tailoriconfig.getGroups(id)[0].name;
        __that.options.Tailoriconfig.loadThreeDImage(id.toString(), imageUrl, Fwidth, Fheight, groupName, () => {
            setTimeout(() => {
                let size = __that.options.Tailoriconfig.getThreeDImageSize();
                __that.options.Tailoriconfig.getImage((size.width * scalse), (size.height * scalse), true, type, quality, (data) => {
                    let resultData = {
                        'id': id,
                        'threeDImageName': threeDImageList[threeDImageID].name,
                        'data': data,
                        'productName': findElementByIndex(__that.productThreeDList, threeDImageList[threeDImageID].name)
                    }
                    __that.returnResult.push(resultData);
                    if ((threeDImageID + 1) < threeDImageList.length) {
                        setTimeout(() => {
                            threeDImageID++;
                            loadModel(__that, threeDImageList, imageUrl, Fwidth, Fheight, scalse, type, threeDImageID, quality, callback)
                        }, 200);
                    } else {
                        callback(__that.returnResult);
                    }
                });
            }, 0);
        });
    }

    function findElementByIndex(array, index) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] === index) {
                return array[i][1];
            }
        }
        return null;
    }

})(jQuery, window, document);