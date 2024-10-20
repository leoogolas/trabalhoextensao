document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');

    // Configuração do flatpickr com idioma em português
    flatpickr(dateInput, {
        minDate: "today",
        disable: [
            function(date) {
                // Desativar domingos (getDay() retorna 0 para domingo)
                return (date.getDay() === 0);
            }
        ],
        dateFormat: "Y-m-d",
        locale: "pt", // Configuração do idioma
        onChange: function(selectedDates, dateStr, instance) {
            // Verificar se a data selecionada é hoje e limpar se for
            const now = new Date();
            if (selectedDates.length > 0) {
                const selectedDate = selectedDates[0];
                if (selectedDate.toDateString() === now.toDateString()) {
                    alert('O dia atual não é permitido. Por favor, selecione outra data.');
                    instance.clear();
                }
            }

            // Atualizar os horários disponíveis baseado no dia selecionado
            updateAvailableTimes(selectedDates[0]);
        }
    });

    // Preencher faixas de horários baseado no dia da semana
    function populateTimeOptions(date) {
        timeSelect.innerHTML = '';

        // Verificar o dia da semana
        const dayOfWeek = date.getDay(); // 0 (domingo) a 6 (sábado)

        // Definir as faixas de horários baseado no dia da semana
        if (dayOfWeek === 6) { // Sábado (dayOfWeek == 6)
            addTimeOption("08:00 - 12:00");
        } else { // Outros dias da semana
            addTimeOption("08:00 - 12:00");
            addTimeOption("14:00 - 17:00");
            addTimeOption("17:00 - 20:00");
        }
    }

    // Função auxiliar para adicionar opções de horário ao select
    function addTimeOption(range) {
        const option = document.createElement('option');
        option.value = range;
        option.textContent = range;
        timeSelect.appendChild(option);
    }

    // Atualizar os horários disponíveis inicialmente
    updateAvailableTimes(new Date());

    // Função para atualizar os horários disponíveis baseado na data selecionada
    function updateAvailableTimes(selectedDate) {
        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            populateTimeOptions(selectedDate);
        }
    }

    document.getElementById('discardForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const phone = document.getElementById('phone').value;
        const item = document.getElementById('item').value;
        const quantity = document.getElementById('quantity').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const observations = document.getElementById('observations').value;

        // Validação de nome e sobrenome apenas letras
        const nameRegex = /^[A-Za-zÀ-ú\s]+$/;
        if (!nameRegex.test(name) || !nameRegex.test(surname)) {
            alert('Por favor, insira apenas letras para nome e sobrenome.');
            return;
        }

        // Validação de telefone apenas números
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
            alert('Por favor, insira um número de telefone válido (apenas números, 10 ou 11 dígitos).');
            return;
        }

        // Validação de quantidade mínima
        if (parseInt(quantity) < 1) {
            alert('Por favor, insira uma quantidade válida (mínimo 1).');
            return;
        }

        // Redirecionamento simulado (para teste)
        console.log('Formulário enviado com sucesso.');
        alert('Obrigado por tornar Joinville mais limpa! Em breve entraremos em contato para agendar a coleta.');
        window.location.replace('pagina-de-agradecimento.html');
    });
});
