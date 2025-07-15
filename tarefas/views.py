from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login as auth_login


from .models import Tarefa
from .forms import TarefaForm





# View protegida: só usuários logados podem acessar
@login_required
def home(request):
    # Filtra todas as tarefas do usuário logado, ordenadas da mais recente para a mais antiga
    tarefas = Tarefa.objects.filter(usuario=request.user).order_by('-data_criacao')
    
    # Renderiza a página
    return render(request, 'home.html', {'tarefas': tarefas})



@login_required
def criar_tarefa(request):
    # Se o formulário foi enviado via POST
    if request.method == 'POST':
        # Preenche o formulário com os dados enviados
        form = TarefaForm(request.POST)
        
        # Verifica se os dados são válidos
        if form.is_valid():
            # Cria uma nova tarefa, mas ainda não salva no banco (commit=False)
            nova_tarefa = form.save(commit=False)
            
            # Associa a tarefa ao usuário logado
            nova_tarefa.usuario = request.user
            
            # Agora salva no banco de dados
            nova_tarefa.save()

            messages.success(request, 'Tarefa criada com sucesso!')
            
            # Redireciona para a página inicial após criar a tarefa
            return redirect('home')
    else:
        # Se não for POST, apenas exibe um formulário vazio
        form = TarefaForm()
    
    # Renderiza o formulário para criar a tarefa
    return render(request, 'criar_tarefa.html', {'form': form})



@login_required
def editar_tarefa(request, tarefa_id):
    # Busca a tarefa pelo ID e garante que pertença ao usuário logado
    tarefa = get_object_or_404(Tarefa, id=tarefa_id, usuario=request.user)
    
    # Se o formulário foi enviado (POST)
    if request.method == 'POST':
        # Preenche o formulário com os dados do POST e da tarefa atual
        form = TarefaForm(request.POST, instance=tarefa)
        
        # Se os dados forem válidos, salva as alterações
        if form.is_valid():
            form.save()
            messages.success(request, 'Tarefa atualizada com sucesso!')
            return redirect('home')
    else:
        # Se for GET, exibe o formulário preenchido com os dados da tarefa
        form = TarefaForm(instance=tarefa)
    
    # Renderiza a página de edição de tarefa
    return render(request, 'editar_tarefa.html', {'form': form})

@login_required
def excluir_tarefa(request, tarefa_id):
    tarefa = get_object_or_404(Tarefa, id=tarefa_id, usuario=request.user)
    if request.method == 'POST':
        tarefa.delete()
        messages.success(request, 'Tarefa excluída com sucesso!')
    return redirect('home')


@login_required
def concluir_tarefa(request, tarefa_id):
    tarefa = get_object_or_404(Tarefa, id=tarefa_id, usuario=request.user)
    tarefa.concluida = True
    tarefa.save()
    messages.success(request, 'Tarefa marcada como concluída!')
    return redirect('home')

def registro(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            usuario = form.save()
            messages.success(request, 'Conta criada com sucesso! Faça login.')
            auth_login(request, usuario) 
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registro.html', {'form': form})



