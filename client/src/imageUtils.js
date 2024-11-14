export const handleFileSelect = (event, setFormData, formData, previewElementId) => {
    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected
    
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
        const img = new Image();
        img.src = readerEvent.target.result;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 300; // Adjust size as needed
            const MAX_HEIGHT = 300;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const base64String = canvas.toDataURL('image/jpeg'); // Convert image to base64

            // Update form data with the base64 string
            setFormData({
                ...formData,
                profilePicture: base64String,
            });

            // Preview the selected image by updating the img tag source
            const previewImg = document.getElementById(previewElementId);
            previewImg.src = base64String;
        };
    };

    reader.readAsDataURL(file); // Read the image as data URL
};
