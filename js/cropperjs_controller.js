$( document ).ready(function() {
    let imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    let canvas  = $("#canvas"),
        context = canvas[0].getContext("2d");

    const initCropper = function(canvas) {
        let height = canvas.height + 4;

        $('.preview').css({
            width: '100%', //width,  sets the starting size to the same as orig image
            overflow: 'hidden',
            height:    height,
            maxWidth:  canvas.width,
            maxHeight: height
        });

        canvas.cropper({
            preview: '.preview',
            ready: function (e) {
                $(this).cropper('setData', {
                    height: 467,
                    rotate: 0,
                    scaleX: 1,
                    scaleY: 1,
                    width:  573,
                    x:      469,
                    y:      19
                });
            }
        });
    };

    function handleImage(e) {
        if (this.files && this.files[0]) {
            if ( this.files[0].type.match(/^image\//) ) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let img = new Image();
                    img.onload = function () {

                        context.canvas.width = img.width;
                        context.canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        let jsCanvas = document.getElementById('canvas');
                        let cropper = new Cropper(jsCanvas, {
                            aspectRatio: 16/9,
                            viewMode: 3
                        });
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            } else {
                alert('No file(s) selected.');
            }
        } else {
            alert("Invalid file type! Please select an image file.");
        }
    }
});
