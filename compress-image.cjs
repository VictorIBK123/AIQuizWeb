const sharp = require('sharp');
const fs = require('fs');

async function compressImage() {
    try {
        await sharp('public/app-icon-real.png')
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .jpeg({ quality: 80 })
            .toFile('public/og-image.jpg');
        console.log('Successfully compressed og-image.jpg');
        
        const stats = fs.statSync('public/og-image.jpg');
        console.log(`New size: ${stats.size / 1024} KB`);
    } catch (error) {
        console.error('Error compressing image:', error);
    }
}

compressImage();
