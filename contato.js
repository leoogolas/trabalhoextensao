document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Montando o link de email
        const mailtoLink = `mailto:seu-email@aqui.com?subject=Contato%20Descarte%20Consciente%20de%20Lixo%20Eletrônico&body=Nome:%20${name}%0D%0AEmail:%20${email}%0D%0AMensagem:%20${message}`;

        // Abrindo o cliente de email padrão do usuário
        window.location.href = mailtoLink;
    });
});
