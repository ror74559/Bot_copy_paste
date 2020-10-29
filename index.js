const scrape_images = require('./scrape_images.js');

const paste_images = require('./paste_images.js');

async function pasteImages(){
	const paste = paste_images()
}


async function bookImages(){

	const images = await scrape_images();

	await console.log('Abrindo navegador para iniciar o redimensionamento e a colagem das imagens...')

	await pasteImages()

}

bookImages()


