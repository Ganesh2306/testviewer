
/*------------------------------------------------------------------*/

    //Require dependacy bootstrap.min.css and bootstrap.min.js.
    //Aslo require setdpi.tds.css.

/*------------------------------------------------------------------*/

;(function($,window,documnet,undefined){
	console.log('TDS Set DPI Plugin v1.4 (09-09) [1.3.1]')
    // Create the defaults once
	var pluginName = "setDPIPlugin",
		defaults = {
            
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this.init();
    }

    Plugin.prototype = {
        
        init: function() {
            that2 = this;
            $(this.element).attr("data-toggle","modal");
            $(this.element).attr("data-target","#_setDPIModal");
            $('body').append('<div class="modal in" id="_setDPIModal" role="dialog"> <div class="modal-dialog">  <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">×</button> <h4 class="modal-title">Screen DPI Setup</h4> </div> <div class="modal-body"> <div class="col-md-12"> <div class="measurement col-md-7" id="rulerArea"> <div class="rulerH"></div> <div class="rulerV"></div> <div class="hLine" style="margin-left: 10px;overflow: hidden;"></div> <div class="vLine" style="margin-left: 10px;overflow: hidden;"></div></div> <div class="measuresment_box col-md-4 col-md-offset-1"> <form> <div class="row col-md-12 screen_resolution" style="height:14vh;border-bottom: none;"> <div class="form-group col-md-6"> <label class="control-label col-sm-9 ">Horizontal</label> <div > <input type="text" id="hResolution" class="form-control col-sm-3" readonly="readonly"> </div> </div> <div class="form-group col-md-6" > <label class="control-label col-sm-9 " >Vertical</label> <div > <input type="text" id="vResolution" class="form-control col-sm-3" readonly="readonly"> </div> </div> </div> <div class="row col-md-12 screen_size" style="height:22vh;"> <div class="form-group col-md-6" style="margin-top: 10px;"> <div > <input type="radio" value="inch" name="radio" class="col-sm-2" checked > </div> <label class="control-label col-sm-9 " >Inch</label> </div> <div class="form-group col-md-6" style="margin-top: 10px;"> <div > <input type="radio" value="centmeter" name="radio" class="col-sm-2" > </div> <label class="control-label col-sm-9 " >Centimeter</label> </div> <div class="form-group col-md-6" style="margin-top: 10px;"> <label class="control-label col-sm-9 ">Width</label> <div > <input type="text" id="ssWidth" class="form-control col-sm-3"> </div> </div> <div class="form-group col-md-6" style="margin-top: 10px;"> <label class="control-label col-sm-9 " >Height</label> <div > <input type="text" id="ssHeight" class="form-control col-sm-3" required> </div> </div> </div> <div class="col-md-12 density" > <span>Horizontal Density</span> <div class="input-group" style="margin-bottom: 20px;"> <span class="input-group-btn"> <button type="button" id="hDensityBtnM" class="btn btn-default btn-number" data-type="minus"> <span class="glyphicon glyphicon-minus"></span> </button> </span> <input type="text" id="hDensity" class="form-control input-number" value="100"> <span class="input-group-btn"> <button type="button" id="hDensityBtnP" class="btn btn-default btn-number" data-type="plus"> <span class="glyphicon glyphicon-plus"></span> </button> </span> </div> <span style="padding-bottom: 10px;">Vertical Density</span> <div class="input-group"> <span class="input-group-btn"> <button type="button" id="vDensityBtnM" class="btn btn-default btn-number mm" data-type="minus"> <span class="glyphicon glyphicon-minus"></span> </button> </span> <input type="text" id="vDensity" class="form-control input-number" value="100"> <span class="input-group-btn"> <button type="button" id="vDensityBtnP" class="btn btn-default btn-number" data-type="plus"> <span class="glyphicon glyphicon-plus"></span> </button> </span> </div> </div> <div class="checkbox col-md-12  aspect_ratio"><label><input id="aspect_ratio" type="checkbox" checked>Aspect Ratio</label></div> </form> </div> </div> </div> <div class="modal-footer"> <button type="button" id="saveDPI" class="btn btn-danger">Save DPI Setting</button> </div> </div> </div> </div>');
            addEvent(this.element);
            $('input[name="radio"]').eq(0).prop('checked',true);
            $("#hDensity").val('100');
            $("#vDensity").val('100');
            setScreenResolutin();
            setClickEvents();
        }
     };

    $.fn[pluginName] = function ( options ) {
        return    $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
    };

})( jQuery, window, document );

function demo() {
    // console.log('demo');
}

function addEvent(element) {
    $(element).click(function() {
        /*$('input[name="radio"]').eq(0).prop('checked',true);
        $("#hDensity").val('100');
        $("#vDensity").val('100');
        setScreenResolutin();
        setClickEvents();*/
        setTimeout(function() {
            createRuler( $("#hDensity").val(), $("#vDensity").val());
        },500);
    });
}

function setScreenResolutin() {
    $("#hResolution").val(screen.width);
    $("#vResolution").val(screen.height);
    $("#ssWidth").val((parseFloat($("#hResolution").val()) / 100).toFixed(2));
    $("#ssHeight").val((parseFloat($("#vResolution").val()) / 100).toFixed(2));
}

function setScreenSize() {
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if (unit == 'inch') {
        var width = parseFloat($("#ssWidth").val()) / 2.54;
        var height = parseFloat($("#ssHeight").val()) / 2.54;
        $("#ssWidth").val(width.toFixed(2));
        $("#ssHeight").val(height.toFixed(2));
    } else {
        var width = parseFloat($("#hResolution").val()) / parseFloat($("#hDensity").val());
        var height = parseFloat($("#vResolution").val()) / parseFloat($("#vDensity").val());
        $("#ssWidth").val((width * 2.54).toFixed(2));
        $("#ssHeight").val((height * 2.54).toFixed(2));
    }
}

function setDensity() {
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if (unit == 'inch') {
        var hDensity = parseFloat($("#hResolution").val()) / parseFloat($("#ssWidth").val());
        var vDensity = parseFloat($("#vResolution").val()) /parseFloat($("#ssHeight").val());
        $("#hDensity").val(hDensity.toFixed(2));
        if ($('#aspect_ratio').is(":checked")) {
            $("#vDensity").val($("#hDensity").val());
        } else {
            $("#vDensity").val(vDensity.toFixed(2));
        }

    } else {
        var hDensity = parseFloat($("#hDensity").val()) / 2.54;
        var vDensity = parseFloat($("#vDensity").val()) / 2.54;
        $("#hDensity").val(hDensity.toFixed(2));
        $("#vDensity").val(vDensity.toFixed(2));
    }
}

function setScreenWidth() {
    var width = parseFloat($("#hResolution").val()) / parseFloat($("#hDensity").val());
    $("#ssWidth").val(width.toFixed(2));
    $("#ssWidth").css('border','');
    createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
}

function setScreenHeight() {
    var height = parseFloat($("#vResolution").val()) / parseFloat($("#vDensity").val());
    $("#ssHeight").val(height.toFixed(2));
    $("#ssHeight").css('border','');
    createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
}

function setHDensity() {
    var hDensity = parseFloat($("#hResolution").val()) / parseFloat($("#ssWidth").val());
    $("#hDensity").val(hDensity.toFixed(2));
    $("#hDensity").css('border','');
    createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val())); 
}

function setVDensity() {
    var vDensity = parseFloat($("#vResolution").val()) / parseFloat($("#ssHeight").val());
    $("#vDensity").val(vDensity.toFixed(2));
    $("#vDensity").css('border','');
    createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
}

function hDensityBtn(hDensity) {
    var goAhead = false;
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if (unit == 'inch') {
        if( hDensity > 200) {
            $('#hDensity').css('border','1px solid red');
        } else if (hDensity < 50){
            $('#hDensity').css('border','1px solid red');
        } else {
            $('#hDensity').val(hDensity);
            $('#hDensity').css('border','');
            goAhead = true;
        }
    } else {
        if( hDensity > 80) {
            $('#hDensity').css('border','1px solid red');
        } else if (hDensity < 20){
            $('#hDensity').css('border','1px solid red');
        } else {
            $('#hDensity').val(hDensity);
            $('#hDensity').css('border','');
            goAhead = true;            
        }
    }

    if (goAhead) {
        if ($('#aspect_ratio').is(":checked")) {
            $('#hDensity').val(parseFloat(hDensity).toFixed(2));
            $('#vDensity').val(parseFloat(hDensity).toFixed(2));
            $('#ssWidth').val(parseFloat($('#hResolution').val() / $('#vDensity').val()).toFixed(2));
            $('#ssHeight').val(parseFloat($('#vResolution').val() / $('#vDensity').val()).toFixed(2));
            createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
        } else {
            setScreenWidth();
        }
    }
}

function vDensityBtn(vDensity) {
    var goAhead = false;
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if (unit == 'inch') {
        if( vDensity > 200) {
            $('#vDensity').css('border','1px solid red');
        } else if (vDensity < 50){
            $('#vDensity').css('border','1px solid red');
        } else {
            $('#vDensity').val(vDensity);
            $('#vDensity').css('border','');
            goAhead = true;
        }
    } else {
        if( vDensity > 80) {
            $('#vDensity').css('border','1px solid red');
        } else if (vDensity < 20){
            $('#vDensity').css('border','1px solid red');
        } else {
            $('#vDensity').val(vDensity);
            $('#vDensity').css('border','');
            goAhead = true;
        }
    }

    if (goAhead) {
        if ($('#aspect_ratio').is(":checked")) {
            $('#hDensity').val(parseFloat(vDensity).toFixed(2));
            $('#vDensity').val(parseFloat(vDensity).toFixed(2));
            $('#ssWidth').val(parseFloat($('#hResolution').val() / $('#hDensity').val()).toFixed(2));
            $('#ssHeight').val(parseFloat($('#vResolution').val() / $('#vDensity').val()).toFixed(2));
            createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
        } else {
            setScreenHeight();
        }
    }
}

function ssWidthC(ssWidth) {
    var goAhead = false;
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if (unit == 'inch') {
        if( ssWidth > 27.32) {
            $('#ssWidth').css('border','1px solid red');
        } else if (ssWidth < 6.83){
            $('#ssWidth').css('border','1px solid red');
        } else {
            $('#ssWidth').val(ssWidth);
            $('#ssWidth').css('border','');
            goAhead = true;
        }
    } else {
        if( ssWidth > 69.39) {
            $('#ssWidth').css('border','1px solid red');
        } else if (ssWidth < 17.35){
            $('#ssWidth').css('border','1px solid red');
        } else {
            $('#ssWidth').val(ssWidth);
            $('#ssWidth').css('border','');
            goAhead = true;            
        }
    }

    if (goAhead) {
        if ($('#aspect_ratio').is(":checked")) {
            $('#hDensity').val(parseFloat($('#hResolution').val() / ssWidth).toFixed(2));
            $('#vDensity').val($('#hDensity').val());
            $('#ssHeight').val(parseFloat($('#vResolution').val() / $('#vDensity').val()).toFixed(2));
            createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
        } else {
            setHDensity();
        }
    }
}

function ssHeightC(ssHeight) {
    var goAhead = false;
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if (unit == 'inch') {
        if( ssHeight > 15.36) {
            $('#ssHeight').css('border','1px solid red');
        } else if (ssHeight < 3.84){
            $('#ssHeight').css('border','1px solid red');
        } else {
            $('#ssHeight').val(ssHeight);
            $('#ssHeight').css('border','');
            goAhead = true;
        }
    } else {
        if( ssHeight > 39.01) {
            $('#ssHeight').css('border','1px solid red');
        } else if (ssHeight < 9.75){
            $('#ssHeight').css('border','1px solid red');
        } else {
            $('#ssHeight').val(ssHeight);
            $('#ssHeight').css('border','');
            goAhead = true;         
        }
    }

    if (goAhead) {
        if ($('#aspect_ratio').is(":checked")) {
            $('#vDensity').val(parseFloat($('#vResolution').val() / ssHeight).toFixed(2));
            $('#hDensity').val($('#vDensity').val());
            $('#ssWidth').val(parseFloat($('#hResolution').val() / $('#hDensity').val()).toFixed(2));
            createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
        } else {
            setVDensity();
        }
    }
}

function _checkAllValidValue(btn) {
    var goAhead = false;
    if (btn != 'save') {
        var unit = ($('input[type="radio"]'). not(':checked').val()).toLowerCase();
    } else {
        var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    }

    if (!goAhead) {
        hDensity = parseFloat($('#hDensity').val());
        if (unit == 'inch') {
            if( hDensity > 200) {
                $('#hDensity').css('border','1px solid red');
                goAhead = false;
            } else if (hDensity < 50){
                $('#hDensity').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#hDensity').css('border','');
                goAhead = true;
            }
        } else {
            if( hDensity > 80) {
                $('#hDensity').css('border','1px solid red');
                goAhead = false;
            } else if (hDensity < 20){
                $('#hDensity').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#hDensity').css('border','');
                goAhead = true;            
            }
        }
    }

    if (goAhead) {
        vDensity = parseFloat($('#vDensity').val());
        if (unit == 'inch') {
            if( vDensity > 200) {
                $('#vDensity').css('border','1px solid red');
                goAhead = false;
            } else if (vDensity < 50){
                $('#vDensity').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#vDensity').css('border','');
                goAhead = true;
            }
        } else {
            if( vDensity > 80) {
                $('#vDensity').css('border','1px solid red');
                goAhead = false;
            } else if (vDensity < 20){
                $('#vDensity').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#vDensity').css('border','');
                goAhead = true;
            }
        }
    }

    if (goAhead) {
        ssWidth = parseFloat($('#ssWidth').val());
        if (unit == 'inch') {
            if( ssWidth > 27.32) {
                $('#ssWidth').css('border','1px solid red');
                goAhead = false;
            } else if (ssWidth < 6.83){
                $('#ssWidth').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#ssWidth').css('border','');
                goAhead = true;
            }
        } else {
            if( ssWidth > 69.39) {
                $('#ssWidth').css('border','1px solid red');
                goAhead = false;
            } else if (ssWidth < 17.35){
                $('#ssWidth').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#ssWidth').css('border','');
                goAhead = true;            
            }
        }
    }

    if (goAhead) {
        ssHeight = parseFloat($('#ssHeight').val());
        if (unit == 'inch') {
            if( ssHeight > 15.36) {
                $('#ssHeight').css('border','1px solid red');
                goAhead = false;
            } else if (ssHeight < 3.84){
                $('#ssHeight').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#ssHeight').val(ssHeight);
                $('#ssHeight').css('border','');
                goAhead = true;
            }
        } else {
            if( ssHeight > 39.01) {
                $('#ssHeight').css('border','1px solid red');
                goAhead = false;
            } else if (ssHeight < 9.75){
                $('#ssHeight').css('border','1px solid red');
                goAhead = false;
            } else {
                $('#ssHeight').css('border','');
                goAhead = true;         
            }
        }
    }
    return goAhead;
}

function setClickEvents() {
    $("input[type=radio][name=radio]").unbind( "change" );
    $("input[type=radio][name=radio]").change(function() {
        if ($('#ssWidth').css('border') != "1px solid rgb(255, 0, 0)" &&
            $('#ssHeight').css('border') != "1px solid rgb(255, 0, 0)" &&
            $('#hDensity').css('border') != "1px solid rgb(255, 0, 0)" &&
            $('#vDensity').css('border') != "1px solid rgb(255, 0, 0)" ) { 
            if (_checkAllValidValue('change')) {
                setScreenSize();
                setDensity();
                createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
            } else {
                $('input[type="radio"]'). not(':checked'). prop("checked", true);
                // alert('Please enter valid number');    
            }
        } else {
            $('input[type="radio"]'). not(':checked'). prop("checked", true);
            // alert('Please enter valid number');
        }
    });

    $("#hDensityBtnM").unbind( "click" );
    $("#hDensityBtnM").click(function() {
        var hDensity = (parseFloat($('#hDensity').val()) - 1);
        hDensityBtn(hDensity.toFixed(2));
        var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
        if (unit == 'inch') {
            if( (hDensity-1) == 200 || (hDensity+1) == 50) {
                $('#hDensity').css('border','');
            }
        } else {
            if( (hDensity-1) == 80 || (hDensity+1) == 20) {
                $('#hDensity').css('border','');
            }
        }
    });

    $("#hDensityBtnP").unbind( "click" );
    $("#hDensityBtnP").click(function() {
        var hDensity = (parseFloat($('#hDensity').val()) + 1);
        hDensityBtn(hDensity.toFixed(2));
        var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
        if (unit == 'inch') {
            if( (hDensity-1) == 200 || (hDensity+1) == 50) {
                $('#hDensity').css('border','');
            }
        } else {
            if( (hDensity-1) == 80 || (hDensity+1) == 20) {
                $('#hDensity').css('border','');
            }
        }
    });

    $("#vDensityBtnM").unbind( "click" );
    $("#vDensityBtnM").click(function() {
        var vDensity = (parseFloat($('#vDensity').val()) - 1);
        vDensityBtn(vDensity.toFixed(2));
        var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
        if (unit == 'inch') {
            if( (vDensity-1) == 200 || (vDensity+1) == 50) {
                $('#vDensity').css('border','');
            }
        } else {
            if( (vDensity-1) == 80 || (vDensity+1) == 20) {
                $('#vDensity').css('border','1px solid red');
            }
        }
    });

    $("#vDensityBtnP").unbind( "click" );
    $("#vDensityBtnP").click(function() {
        var vDensity = (parseFloat($('#vDensity').val()) + 1);
        vDensityBtn(vDensity.toFixed(2));
        var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
        if (unit == 'inch') {
            if( (vDensity-1) == 200 || (vDensity+1) == 50) {
                $('#vDensity').css('border','');
            }
        } else {
            if( (vDensity-1) == 80 || (vDensity+1) == 20) {
                $('#vDensity').css('border','1px solid red');
            }
        }
    });

    $("#hDensity").unbind( "keyup" );
    $("#hDensity").keyup(function(){
        var hDensity = parseFloat($('#hDensity').val());
        if (hDensity.toString() != "NaN") {
            if ( hDensity.toString().length >= 2) {
                hDensityBtn(parseFloat(hDensity));
            }
        }
    });

    $("#vDensity").unbind( "keyup" );
    $("#vDensity").keyup(function(){
        var vDensity = parseFloat($('#vDensity').val());
        if (vDensity.toString() != "NaN") {
            if ( vDensity.toString().length >= 2) {
                vDensityBtn(parseFloat(vDensity));
            }
        }
    });

    $("#ssWidth").unbind( "keyup" );
    $("#ssWidth").keyup(function(){
        var ssWidth = parseFloat($('#ssWidth').val());
        if (ssWidth.toString() != "NaN") {
            if ( ssWidth.toString().length >= 1) {
                ssWidthC(ssWidth);
            }
        }
    });

    $("#ssHeight").unbind( "keyup" );
    $("#ssHeight").keyup(function(){
        var ssHeight = parseFloat($('#ssHeight').val());
        if (ssHeight.toString() != "NaN") {
            if ( ssHeight.toString().length >= 1) {
                ssHeightC(ssHeight);
            }
        }
    });

    $("#aspect_ratio").unbind( "change" );
    $('#aspect_ratio').change(function() {
        if ($('#aspect_ratio').is(":checked")) {
            $('#vDensity').val(parseFloat($('#hDensity').val()).toFixed(2));
            $('#ssWidth').val(parseFloat($('#hResolution').val() / $('#vDensity').val()).toFixed(2));
            $('#ssHeight').val(parseFloat($('#vResolution').val() / $('#vDensity').val()).toFixed(2));
            createRuler(parseFloat($("#hDensity").val()),parseFloat($("#vDensity").val()));
        }
    });

    $("#saveDPI").unbind( "click" );
    $("#saveDPI").click(function() {
        if (_checkAllValidValue('save')) {
            var widthInch,heightInch,hDensityInch,vDensityInch;
            var widthCent,heightCent,hDensityCent,vDensityCent;
            var unit = ($('input[name="radio"]:checked').val()).toLowerCase();

            if (unit == 'inch') {
                widthInch = parseFloat($("#ssWidth").val());
                heightInch = parseFloat($("#ssHeight").val());
                var width = widthInch * 2.54;
                var height = heightInch * 2.54;
                widthCent = width.toFixed(2);
                heightCent = height.toFixed(2);
            } else {
                widthCent = parseFloat($("#ssWidth").val());
                heightCent = parseFloat($("#ssHeight").val());
                var width = parseFloat($("#hResolution").val()) / parseFloat($("#hDensity").val());
                var height = parseFloat($("#vResolution").val()) / parseFloat($("#vDensity").val());
                widthInch = (width / 2.54).toFixed(2);
                heightInch = (height / 2.54).toFixed(2);
            }
            
            if (unit == 'inch') {
                hDensityInch = parseFloat($("#hDensity").val());
                vDensityInch = parseFloat($("#vDensity").val());
                var hDensity = parseFloat($("#hDensity").val()) / 2.54;
                var vDensity = parseFloat($("#vDensity").val()) / 2.54;
                hDensityCent = hDensity.toFixed(2);
                vDensityCent = vDensity.toFixed(2);
            } else {
                hDensityCent = parseFloat($("#hDensity").val());
                vDensityCent = parseFloat($("#vDensity").val());
                var hDensity = parseFloat($("#hResolution").val()) / ((parseFloat($("#ssWidth").val()) / 2.54)).toFixed(2);
                var vDensity = parseFloat($("#vResolution").val()) / ((parseFloat($("#ssHeight").val()) / 2.54)).toFixed(2);
                hDensityInch = hDensity.toFixed(2);
                vDensityInch = vDensity.toFixed(2);
            }
            var data = {
                'inch' : {
                    'screenWidth' : widthInch,
                    'screenHeight' : heightInch,
                    'horizontalDensity' : hDensityInch,
                    'verticalDensity' : vDensityInch
                },
                'Centimeter' : {
                    'screenWidth' : parseFloat(widthCent),
                    'screenHeight' : parseFloat(heightCent),
                    'horizontalDensity' : parseFloat(hDensityCent),
                    'verticalDensity' : parseFloat(vDensityCent)
                }
            }
            var callback = that2.options["getDPIValue"];
            if (typeof callback == 'function')
                callback(data);
                $('#_setDPIModal').modal('hide');
        } else {
            // alert('Please enter valid number');

        }
    });
}

function createRuler(xPX,yPX) {
    $('.rulerH').empty();
    $('.rulerV').empty();
    $(".hLine").empty();
    $(".vLine").empty();
    var unit = ($('input[name="radio"]:checked').val()).toLowerCase();
    if ( unit == 'inch') {
        xPX = xPX / 8 - 1;
        var bigLine = (xPX+1)*8;
    } else {
        xPX = xPX / 10 - 1;
        var bigLine = (xPX+1)*10;
    }
    var $ruler = $('.rulerH');
    $(".hLine").width($("#rulerArea").width()+5);
    $(".hLine").height($("#rulerArea").height());

    if ( unit == 'inch') {
        for (var i = 0, step = 0; i < $ruler.innerWidth() / 2; i++, step++) {
            var $tick = $('<div>');
            if (step == 0) {
                $tick.addClass('tickLabel').html(i / 8);
                $(".hLine").append('<div class="tickLabelH" style="margin-left:'+(bigLine-1)+'px;"></div>');
            } else if ([1, 3, 5, 7].indexOf(step) > -1) {
                $tick.addClass('tickMinor');
                if (step == 7) {
                    step = -1;
                }
                $tick.css('height','8px');
            } else if (step == 4) {
                $tick.addClass('tickMinor');
                $tick.css('height','15px');
            } else {
                $tick.css('height','10px'); 
                $tick.addClass('tickMajor');
            }
            if (i != 0) {
                $tick.css('margin-left',xPX+'px');
            }
            $ruler.append($tick);
        }
    } else {
        for (var i = 0, step = 0; i < $ruler.innerWidth() / 2; i++, step++) {
            var $tick = $('<div>');
            if (step == 0) {
                $tick.addClass('tickLabel').html(i / 10);
                $(".hLine").append('<div class="tickLabelH" style="margin-left:'+(bigLine-1)+'px;"></div>');
            } else if ([1, 3, 7, 9].indexOf(step) > -1) {
                $tick.addClass('tickMinor');
                if (step == 9) {
                    step = -1;
                }
                $tick.css('height','10px');
            } else if (step == 5) {
                $tick.addClass('tickMinor');
                $tick.css('height','15px');
            } else {
                $tick.css('height','10px'); 
                $tick.addClass('tickMajor');
            }
            if (i != 0) {
                $tick.css('margin-left',xPX+'px');
            }
            $ruler.append($tick);
        }
    }

    $(".vLine").width($("#rulerArea").width()+5);
    $(".vLine").height($("#rulerArea").height() -25);
    var top = ($("#rulerArea").height() - 25);
    $(".vLine").css('margin-top','-'+top+'px');
    var $ruler1 = $('.rulerV');
    if ( unit == 'inch') {
        yPX = yPX / 8 - 1;
        var bigLine = (yPX+1)*8;
    } else {
        yPX = yPX / 10 - 1;
        var bigLine = (yPX+1)*10;
    }
    if (unit == 'inch') { 
        for (var i = 0, step = 0; i < $ruler1.innerHeight() / 2; i++, step++) {
            var $tick = $('<div>');
            if (step == 0) {
                $tick.addClass('tickLabel').html(i / 8) ;
                $(".vLine").append('<div class="tickLabelV" style="margin-top:'+(bigLine-1)+'px;"></div>');
            } else if ([1, 3, 5, 7].indexOf(step) > -1) {
                $tick.addClass('tickMinor');
                if (step == 7) {
                    step = -1;
                }
                $tick.css('width','8px');
                $tick.css('margin-left','16px');
            } else if (step == 4) {
                $tick.addClass('tickMinor');
                $tick.css('width','20px');
                $tick.css('margin-left','10px');
            } else {
                $tick.css('width','10px');
                $tick.css('margin-left','14px');
                $tick.addClass('tickMajor');
            }
            if (i != 0) {
                $tick.css('margin-top',yPX+'px');
            }
            $ruler1.append($tick);
        }
    } else {
        for (var i = 0, step = 0; i < $ruler1.innerHeight() / 2; i++, step++) {
            var $tick = $('<div>');
            if (step == 0) {
                $tick.addClass('tickLabel').html(i / 10) ;
                $(".vLine").append('<div class="tickLabelV" style="margin-top:'+(bigLine-1)+'px;"></div>');
            } else if ([1, 3, 7, 9].indexOf(step) > -1) {
                $tick.addClass('tickMinor');
                if (step == 9) {
                    step = -1;
                }
                $tick.css('width','10px');
                $tick.css('margin-left','14px');
            } else if (step == 5) {
                $tick.addClass('tickMinor');
                $tick.css('width','20px');
                $tick.css('margin-left','10px');
            } else {
                $tick.css('width','10px');
                $tick.css('margin-left','14px');
                $tick.addClass('tickMajor');
            }
            if (i != 0) {
                $tick.css('margin-top',yPX+'px');
            }
            $ruler1.append($tick);
        }
    }
}