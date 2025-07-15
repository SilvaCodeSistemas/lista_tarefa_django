# Importa a classe base para criar modelos (tabelas) no Django
from django.db import models
# Importa o modelo de usuário padrão do Django
from django.contrib.auth.models import User

# Define um modelo chamado Tarefa, que será uma tabela no banco de dados
class Tarefa(models.Model):

    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    concluida = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    # Representação em texto da tarefa (usada por exemplo no painel admin)
    def __str__(self):
        return self.titulo
