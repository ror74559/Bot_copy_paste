const puppeteer = require('puppeteer');
const fs = require('fs');


//Robo acessa o site e captura o link das imagens do site
async function scrapeImages(){

    const browser = await puppeteer.launch({headless:true,
      });

    const page = await browser.newPage();

    console.log('Acessando a página web...')

    await page.goto('http://turminhadeestudo.blogspot.com/p/a-zebrinha-preocupada.html');

    //await page.screenshot({path: 'example.png'});
    console.log('Preparando para a captura dos links das imagens...')

    await page.waitForTimeout(2000)

    const imgListZebra = await page.evaluate(async() =>{

        const NodeList = await document.querySelectorAll('div.separator > a >img')

        const data = await [...NodeList]

        const imglist = await data.map(({src})=>({
    		src
    	}));

   
    	return imglist
     });

    if(imgListZebra != ''){
          await page.waitForTimeout(2000)
          console.log('Links capturados...')
     else{
           await page.waitForTimeout(2000)
           console.log('Ocorreu algum erro!')
     }
    await page.waitForTimeout(2000)
    console.log('Preparando para criar arquivo...')
    // gravar dados em um arquivo json
    await page.waitForTimeout(2000)
    fs.writeFile('zebrinha.json',JSON.stringify(imgListZebra,null,2), err =>{
        if(err) throw new Error('Erro ao criar arquivo')

        console.log('Arquivo criado!')
    });
    
    await page.waitForTimeout(2000)
    await browser.close();
  
};

module.exports = scrapeImages;








  //-------------------------------------------------------------------------------------------------

