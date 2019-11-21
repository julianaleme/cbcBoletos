const Gerador = require('../index');
const fs = require('fs');

console.log('Gerando boletos ...');

const init = () => {
  const boleto = createBoleto();

  const dir = '../temp'
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const writeStream = fs.createWriteStream('../temp/boleto_.pdf');

  new Gerador.boleto.Gerador(boleto).gerarPDF({
    creditos: '',
    stream: writeStream
  }, (err, pdf) => {
    if (err) return console.error(err);

    writeStream.on('finish', () => {
      console.log('Boleto Criado! Verifique na pasta temp ...');
    });
  });
}

const createBoleto = () => {
  const Datas = Gerador.boleto.Datas;
  const bancos = Gerador.boleto.bancos;
  
  return Gerador.boleto.Boleto.novoBoleto()

}

init();
