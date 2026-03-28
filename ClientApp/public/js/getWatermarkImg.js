function getWatermarkImg(imgURL,type,name,callback) {
    var options = {
        init: function (img) {
            img.crossOrigin = 'anonymous';
        }
    };

    var rotateB = function(target) {
        var context = target.getContext('2d');
        var text = name;
        var metrics = context.measureText(text);
        var x = (target.width / 2) - (target.width * 0.20);
        var y = (target.height / 2) + (target.height * 0.20);

        context.translate(x, y);
        context.globalAlpha = 0.5;
        context.fillStyle = '#fff';
        context.font = '40px Josefin Slab';
        context.shadowBlur = 20;
        context.shadowColor = "gray";
        context.rotate(-45 * Math.PI / 180);
        context.fillText(text, 0, 0);
        return target;
    };

    if (type == 't') {
	    watermark([imgURL],options)
	    .image(rotateB)
	    .then(function (img) {
	        var base64 = ($(img).attr('src'));
	        return callback(base64);
	    });
	}
	if (type == 'b') {
	    watermark([imgURL],options)
	    .image(rotateB)
	    .then(function (img) {
	    	var base64 = ($(img).attr('src'));
	        return callback(base64);
	    });
	}
}