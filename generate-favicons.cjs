const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
    try {
        // Standard Favicon for Google Search (48x48 is recommended)
        await sharp('public/app-icon-real.png')
            .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .png()
            .toFile('public/favicon-48x48.png');
            
        // Apple Touch Icon (180x180 is recommended)
        await sharp('public/app-icon-real.png')
            .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
            .png()
            .toFile('public/apple-touch-icon.png');
            
        console.log('Successfully generated favicons.');
    } catch (error) {
        console.error('Error generating favicons:', error);
    }
}

generateFavicons();
