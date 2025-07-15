function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordToggle = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggle.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                passwordToggle.textContent = '👁️';
            }
        }

        function showMessage(message) {
            alert(message);
        }

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // Simular processo de login
                const loginBtn = document.querySelector('.login-btn');
                loginBtn.textContent = 'Entrando...';
                loginBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Login realizado com sucesso!\\n\\nEmail: ' + email);
                    loginBtn.textContent = 'Entrar';
                    loginBtn.disabled = false;
                }, 2000);
            }
        });

        // Animação suave ao carregar
        window.addEventListener('load', function() {
            document.querySelector('.login-container').style.opacity = '0';
            document.querySelector('.login-container').style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.querySelector('.login-container').style.transition = 'all 0.5s ease';
                document.querySelector('.login-container').style.opacity = '1';
                document.querySelector('.login-container').style.transform = 'translateY(0)';
            }, 100);
        });