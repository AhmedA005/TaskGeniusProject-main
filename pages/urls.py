from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.loginPage, name='login'),
    path('register/', views.registerPage, name='register'),
    # path('signup/', views.user_register, name='user_register'),
    # path('signin/', views.user_login, name='signin'),
    path('TeacherHome/', views.TeacherHome, name='TeacherHome'),
    path('TeacherViewTasks/',views.TeacherViewTasks,name='TeacherViewTasks'),
    path('ViewTasks/',views.ViewTasks,name='ViewTasks'),
    path('home/',views.home,name='home'),
    path('AddTask/', views.AddTask,name='AddTask'),
    path('AddTask/addrecord/', views.addrecord, name='addrecord'),
    path('ViewTasks/delete/<int:id>', views.delete, name='delete'),
    path('TeacherViewTasks/check/<int:id>', views.check, name='check'),
    path('ViewTasks/UpdateTask/<int:id>', views.UpdateTask,name='updatetask'),
    path('ViewTasks/UpdateTask/updaterecord/<int:id>', views.updaterecord, name='updaterecord'),
    path('TeacherViewTasks/viewDetails/<int:id>', views.viewDetails, name='viewDetails'),

    

]