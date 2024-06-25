from django.contrib import messages
from django.shortcuts import redirect, render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from .models import UserForm, UserProfile
from django.db.models.signals import post_save
from django.dispatch import receiver
# from pages.models import AdminUser, TeacherUser
from django.contrib.auth.models import User
from .models import UserProfile,UserForm
from django.contrib.auth.forms import UserCreationForm
from .forms import SignupForm,LoginForm
from django.urls import reverse
from .models import Tasks

def index(request):
    template = loader.get_template('HTML/index.html')
    return HttpResponse(template.render())
    # return HttpResponse("Hi")

def loginBtn(request):
    template = loader.get_template('HTML/Log-in.html')
    return HttpResponse(template.render())
    
def registerBtn(request):
    template = loader.get_template('HTML/Register.html')
    return HttpResponse(template.render())


def TeacherHome(request):
    alltasks = Tasks.objects.filter(teacher=request.session.get('new_user', 'Guest'))
    template = loader.get_template('HTML/TeacherHome.html')
    NO_copmleted = 0
    for task in alltasks:
        if(task.completed == "Checked"):
            NO_copmleted += 1
    pendingtasks = alltasks.count() - NO_copmleted
    all =  alltasks.count()
    alltasks = alltasks.order_by('-id')[:3]

    context = {
        'pendingtasks': pendingtasks,
        'no_tasks': all,
        'no_comp': NO_copmleted,
        'myTasks': alltasks,
        'username': request.session.get('new_user', 'Guest')  # Get the username from session
    }
   
    return render(request, 'HTML/TeacherHome.html', context)

def TeacherViewTasks(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        selectedpriority = request.POST.get('priority')
        showCompleted = request.POST.get('showCompleted')
        alltasks = Tasks.objects.filter(teacher=request.session.get('new_user', 'Guest'))

        if(selectedpriority != "all"):
            alltasks = alltasks.filter(priority=selectedpriority)
        if(showCompleted == 'Checked'):
            alltasks = alltasks.filter(completed='Checked')

        tasks_list = list(alltasks.values())  # Convert QuerySet to list of dicts
        return JsonResponse(tasks_list, safe=False) 
    alltasks = Tasks.objects.filter(teacher=request.session.get('new_user', 'Guest'))
    template = loader.get_template('HTML/TeacherViewTasks.html')
    NO_copmleted = 0
    for task in alltasks:
        if(task.completed == "Checked"):
            NO_copmleted += 1
    selectedpriority = request.POST.get('priority')

    if(selectedpriority == None):
        selectedpriority = "all"

    if(selectedpriority != "all"):
        alltasks=Tasks.objects.filter(teacher=request.session.get('new_user', 'Guest'), priority=selectedpriority)
    if(request.POST.get('showCompleted') == 'Checked' and selectedpriority != "all"):
        alltasks=Tasks.objects.filter(teacher=request.session.get('new_user', 'Guest'), priority=selectedpriority, completed='Checked')
    if(request.POST.get('showCompleted') == 'Checked' and selectedpriority == "all"):
        alltasks=Tasks.objects.filter(teacher=request.session.get('new_user', 'Guest'), completed='Checked')
    context = {
        'no_comp': NO_copmleted,
        'myTasks': alltasks,
        'username': request.session.get('new_user', 'Guest')  # Get the username from session
    }
    return render(request,'HTML/TeacherViewTasks.html',context)

def ViewTasks(request):
    myTasks = Tasks.objects.all().values()
    template = loader.get_template('HTML/ViewTasks.html')
    context = {
    'myTasks': myTasks,
  }
    return HttpResponse(template.render(context, request))

def home(request):
    myTasks = Tasks.objects.all().order_by('-id')[:3]
    template = loader.get_template('HTML/home.html')
    context = {
           'myTasks': myTasks,
           'username': request.session.get('new_user', 'Guest')  # Get the username from session
    }
    return render(request, 'HTML/home.html', context)

def AddTask(request):
        return render(request,'HTML/AddTask.html',{})

def addrecord(request):
    if request.method == 'POST':
        Title = request.POST['title']
        Tname = request.POST['teacher name']
        Description = request.POST['Description']
        Details = request.POST['Details']
        Priority = request.POST['priority']
        Completed = "Check"

        if not User.objects.filter(username=Tname).exists():
            return JsonResponse({'error': 'No teacher with that name'}, status=400)

        messages.success(request, 'Task added successfully')

        newid = Tasks.objects.last().task_id + 1 if Tasks.objects.exists() else 1
        task = Tasks(
            title=Title,
            teacher=Tname,
            priority=Priority,
            description=Description,
            completed=Completed,
            details=Details,
            task_id=newid
        )
        task.save()
        return JsonResponse({'success': 'Task added successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def UpdateTask(request, id):
        task = Tasks.objects.get(id=id)
        context= {
            'task': task
        }
        return render(request,'HTML/UpdateTask.html',context)

def updaterecord(request, id):
    if 'priority' not in request.POST:
        messages.error(request, 'Please choose priority')
        return redirect(f'http://127.0.0.1:8000/ViewTasks/UpdateTask/{id}')

    Title = request.POST.get('title')
    Tname = request.POST.get('teacher name')
    Description = request.POST.get('Description')
    Details = request.POST.get('Details')
    Priority = request.POST.get('priority')

    task = Tasks.objects.get(id=id)
    if not User.objects.filter(username=Tname).exists():
        messages.error(request, 'No teacher with that name')
        return redirect(f'http://127.0.0.1:8000/ViewTasks/UpdateTask/{id}')
    messages.success(request,'Task updated successfully')

    task.title = Title
    task.teacher = Tname
    task.description = Description
    task.details = Details
    task.priority = Priority
    task.save()

    return redirect(f'http://127.0.0.1:8000/ViewTasks/UpdateTask/{id}')


def delete(request, id):
    task = Tasks.objects.get(id = id)
    task.delete()
    alltasks = Tasks.objects.all()
    for i, task in enumerate(alltasks):
        task.task_id = i+1
        task.save()
    return HttpResponseRedirect(reverse('ViewTasks'))

def check(request , id):
    task = Tasks.objects.get(id = id)
    if(task.completed == "Check"):
        task.completed ="Checked"
    else:
        task.completed = "Check"
    task.save()
    no_comp = Tasks.objects.filter(completed="Checked").count()
    no_comp-=1
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'completed': task.completed,'no_comp':no_comp})
    return HttpResponseRedirect(reverse('TeacherViewTasks'))

    





def registerPage(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request,"Account is created")
            request.session['new_user'] = user.username  # Store the username in session
            if form.cleaned_data.get('is_admin'):
                user.is_superuser=True
                user = form.save()
                return redirect('home')
            else:
                user = form.save()
                return redirect('TeacherHome')
        else:
            print('')
    else:   
        form = SignupForm()
    return render(request, "HTML/Register.html", {"form": form})


def loginPage(request):
    if request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)    
                request.session['new_user'] = user.username 
                if user.is_superuser:
                    return redirect('home')
                else:
                    return redirect('TeacherHome')
            else:
                messages.error(request,("Invalid username or password."))
                return redirect('login')
        
    else:
        return render(request, 'HTML/Log-in.html',{})
    

    
def viewDetails(request, id):
        task = Tasks.objects.get(id=id)
        data = {
            'details': task.details
        }

        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            print("Hello")
            return JsonResponse({'data':data})
        return HttpResponseRedirect(reverse('TeacherViewTasks'))
    
