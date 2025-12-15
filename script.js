function convertImage() {
    const fileInput = document.getElementById('fileInput');
    const statusDiv = document.getElementById('status');
    const files = fileInput.files;

    if (files.length === 0) {
        statusDiv.textContent = 'Please select a JPG file.';
        statusDiv.style.color = 'red';
        return;
    }

    const file = files[0];

    // Simple validation
    if (file.type !== 'image/jpeg') {
         statusDiv.textContent = 'Invalid file type. Only JPG/JPEG allowed.';
         statusDiv.style.color = 'red';
         return;
    }

    statusDiv.textContent = 'Converting... This happens in your browser.';
    statusDiv.style.color = 'blue';

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        
        img.onload = function() {
            // 1. Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            // 2. Draw the loaded JPG image onto the canvas
            ctx.drawImage(img, 0, 0);

            // 3. Get the image data as a PNG Data URL
            // The browser handles the compression and format change here.
            const pngUrl = canvas.toDataURL('image/png');

            // 4. Create an invisible link to trigger the download
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'converted_image.png'; // Specify the download filename

            // 5. Append link, click it automatically, and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            statusDiv.textContent = 'Conversion complete. Download started.';
            statusDiv.style.color = 'green';
        };
        
        // Load the image data into the Image object source
        img.src = event.target.result;
    };

    // Read the file content as a Data URL string
    reader.readAsDataURL(file);
}

