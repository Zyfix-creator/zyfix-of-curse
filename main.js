const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa o cliente com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // ou false se quiser ver o navegador
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Gera o QR code no terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Mostra mensagem quando o cliente estiver pronto
client.on('ready', () => {
    console.log('✅ Cliente conectado e pronto!');
});

// Escuta mensagens
client.on('message_create', (message) => {
    if (message.body === 'Ola, gostaria de saber mais sobre os planos') {
        client.sendMessage(message.from, 'Ola, somos da gymred, como poderia ajuda-lo');
    }

    if (message.body === 'Ola, gostaria de saber mais sobre os planos') {
        message.reply('Ola, somos da gymred, como poderia ajuda-lo');

    }
});

// Inicia o cliente
client.initialize();
