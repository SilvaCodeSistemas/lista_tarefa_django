from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('criar/', views.criar_tarefa, name='criar_tarefa'),
    path('editar/<int:tarefa_id>/', views.editar_tarefa, name='editar_tarefa'),
    path('excluir/<int:tarefa_id>/', views.excluir_tarefa, name='excluir_tarefa'),
    path('concluir/<int:tarefa_id>/', views.concluir_tarefa, name='concluir_tarefa'),
    path('registro/', views.registro, name='registro'), 
]
