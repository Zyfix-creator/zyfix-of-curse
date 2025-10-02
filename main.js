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

// Mostra mensagem quando 
client.on('ready', () => {
    console.log('✅ Cliente conectado e pronto!');
});

// Escuta mensagens
client.on('message_create', (message) => {
    if (message.body === 'Olá GymRed! Gostaria de falar com um atendente.') {
        client.sendMessage(message.from, 'Olá, somos da GymRed, como poderíamos ajudá-lo?');
    }

    if (message.body === 'Planos') {
        client.sendMessage(message.from, 'Temos os seguintes planos:\n\n📌 Plano Básico: R$ 99/mês\n💪 Plano Premium: R$ 149/mês\n Plano black R$ 199/mes\n 📞 Para mais informações, fale com um atendente.');
    }

    if (message.body === 'Endereço') {
        client.sendMessage(message.from, 'Estamos atualmente com uma unidade, localizada no bairro Floresta, Avenida Espírito Santo, número 900.');
    }


    if (message.body === 'Horarios') {
        client.sendMessage(message.from, 'Nossos horarios sao de 09:00 as 23:00 de segunda a sexta e de 08:00 as 13: nos sabados e domingos');
    }
    

    if (message.body === 'Falar com um atendente') {
        client.sendMessage(message.from, 'Em alguns segundos te redicionaremos a uma de nossas atendentes');
    }

    if (message.body === 'obrigado') {
        client.sendMessage(message.from, 'Foi um prazer lhe atender, estarei sempre disponivel a qualquer duvida!');
    }
});

// Inicia o cliente
client.initialize();
