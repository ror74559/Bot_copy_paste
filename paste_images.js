const puppeteer = require('puppeteer');
const fs = require('fs');


async function paste_images () {

  const url = 'https://docs.google.com/document/d/1hs9GhMzrmzCXdOEBjxsACt888R5Gw6gfCrtkCo5M5U0/edit?usp=sharing'
  const browser = await puppeteer.launch({headless:false,
    });

 // incicia browser
  const page = await browser.newPage();
  // acessa o link da página descrita
  await page.goto(url)
  // clica no aviso inicial
  await page.click('span.docs-butterbar-dismiss')

  // Lê arquivo ./zebrinha.json e coloca os dados como string na variável data

  const data = await fs.readFileSync('./zebrinha.json', 'utf-8', function (err, data) {

        if(err) throw err;
    
   });
      
 //Passa a string que está na variável data para json e coloca os dados na variável linkImg

  const linkImg = await JSON.parse(data);

  const clock = 500
      
  // a variável link possui Json com 67 objetos e eu só preciso dos primeiros 29
  //--------------------------------------------------------------------------------------
  for(let i = 0; i < 29; i++){
      
        // clica no INSERIR para abrir o submenu

        await page.click('#docs-insert-menu')
        
        //seleciona o item IMAGEM no submenu, acessando o primeiro item de um segundo submenu
        await page.keyboard.press('Alt')
        await page.keyboard.press('I')

        // Seta para baixo duas vezes para pular dois itens e chegar no item para inserir imagem por link 
        
        await page.waitForTimeout(clock)
        await page.keyboard.press('ArrowDown')
        await page.waitForTimeout(clock)
        await page.keyboard.press('ArrowDown')
        await page.waitForTimeout(clock)
        // enter para acessar o modal para inserir o link
        await page.keyboard.press('Enter')
        await page.waitForTimeout(clock)
        //aumenta tamanho da imagem substituindo no link /s400 por /s800
        let imagem = await linkImg[i].src.replace('/s400','/s800')
         // insere o link no input do modal
         
        await page.keyboard.sendCharacter(imagem)
        await console.log(`Inserindo ${i + 1}° imagem...`)
        await page.waitForTimeout(clock)
        // Enter para confirmar 
        await page.keyboard.press('Enter')
        // espera de dois segundos 
        await page.waitForTimeout(clock + 3500)
        // clique no botão inserir do modal através do posicionamento do botão
        await page.mouse.click(486,497)
        await page.waitForTimeout(clock)
        await page.waitForTimeout(clock)
      }
      console.log('Finalizado!!!!!')

  };

  module.exports = paste_images
