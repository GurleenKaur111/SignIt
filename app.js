window.onload = function() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var isSign = false;
        
        canvas.addEventListener('mousedown', function(e) {
            isSign = true;
            context.beginPath();
            context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        });

        canvas.addEventListener('mousemove', function(e) {
            if (isSign) {
                context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                context.stroke();
            }
        }); 

        canvas.addEventListener('mouseup', function() {
            isSign = false;
        });

        canvas.addEventListener('mouseleave', function() {
            isSign = false;
        });

        // Clear the canvas
        document.getElementById('clearBtn').addEventListener('click', function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        });

        // Copy the signature as an image URL
        document.getElementById('copyBtn').addEventListener('click', function() {
            var image = canvas.toDataURL(); // Convert canvas to image URL
            navigator.clipboard.writeText(image).then(function() {
                alert('Signature copied to clipboard as image URL.');
            }, function(error) {
                console.error('Unable to copy signature:', error);
            });
        });

        // Download the signature as an image file
        document.getElementById('downloadBtn').addEventListener('click', function() {
            var image = canvas.toDataURL('image/png'); // Convert canvas to PNG image
            var link = document.createElement('a');
            link.href = image;
            link.download = 'signature.png'; // File name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };