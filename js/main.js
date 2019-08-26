window.onload = function () {
    'use strict';

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var image = document.getElementById('cropper_image');
    var options = {
        aspectRatio: 16 / 9,
        viewMode: 2
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/jpeg';
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageURL;

    // Import image
    var inputImage = document.getElementById('inputImage');
    var cropImage = document.getElementById('cropImageLabel');

    if (URL) {
        // Crop image
        cropImage.onclick = function () {
            var croppedImageSrc = cropper.getCroppedCanvas({
                imageSmoothingQuality: 'high'
            });

            cropper.destroy();
            image.src = croppedImageSrc.toDataURL('image/jpeg', 1);
        };

        inputImage.onchange = function () {
            let cropImageButtonRow = document.getElementById("cropImageButtonRow");

            if (cropImageButtonRow.style.display === '')
                cropImageButtonRow.style.display = 'block';

            var files = this.files;
            var file;

            if (cropper && files && files.length) {
                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
};