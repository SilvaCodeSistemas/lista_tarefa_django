document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const username = document.getElementById('username');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');

    clearErrors();

    let hasErrors = false;

    // Validar nome de usuário
    if (!username.value.trim()) {
        showError('username', 'Nome de usuário é obrigatório');
        hasErrors = true;
    } else if (username.value.trim().length < 3) {
        showError('username', 'Nome de usuário deve ter pelo menos 3 caracteres');
        hasErrors = true;
    }

    // Validar senha
    if (!password1.value) {
        showError('password1', 'Senha é obrigatória');
        hasErrors = true;
    } else if (!isStrongPassword(password1.value)) {
        showError('password1', 'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um símbolo.');
        hasErrors = true;
    }

    // Validar confirmação de senha
    if (!password2.value) {
        showError('password2', 'Confirmação de senha é obrigatória');
        hasErrors = true;
    } else if (password1.value !== password2.value) {
        showError('password2', 'As senhas não coincidem');
        hasErrors = true;
    }

    if (hasErrors) return;

    // Simular envio com animação elegante
    form.classList.add('loading');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Criando conta...';

    setTimeout(() => {
        form.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Conta criada com sucesso!';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-success');

        setTimeout(() => {
            console.log('Redirecionando para login...');
            // window.location.href = '/login/';
        }, 1500);
    }, 2000);
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + '-error');

    field.classList.add('is-invalid');
    errorDiv.textContent = message;

    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearErrors() {
    const fields = ['username', 'password1', 'password2'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + '-error');

        field.classList.remove('is-invalid');
        errorDiv.textContent = '';
    });
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + '-error');

    field.classList.remove('is-invalid');
    errorDiv.textContent = '';
}

// Validar senha segura
function isStrongPassword(password) {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
}

// Atualizar checklist ao digitar a senha
function updatePasswordChecklist(password) {
    toggleValidity('length', password.length >= 8);
    toggleValidity('uppercase', /[A-Z]/.test(password));
    toggleValidity('lowercase', /[a-z]/.test(password));
    toggleValidity('number', /[0-9]/.test(password));
    toggleValidity('symbol', /[!@#$%^&*(),.?":{}|<>]/.test(password));
}

function toggleValidity(id, condition) {
    const item = document.getElementById(id);
    if (!item) return;
    item.classList.toggle('valid', condition);
    item.classList.toggle('invalid', !condition);
}

// Eventos para limpar erros e atualizar a checklist
document.getElementById('username').addEventListener('input', () => clearFieldError('username'));
document.getElementById('password1').addEventListener('input', function () {
    clearFieldError('password1');
    updatePasswordChecklist(this.value);
});
document.getElementById('password2').addEventListener('input', () => clearFieldError('password2'));

// Shake animation
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;
document.head.appendChild(style);

// Foco automático no campo username
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 500);
});
