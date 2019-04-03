from django.shortcuts import render,redirect

# Create your views here.
def map(request):
    title = "地图视图"
    username = request.user.username
    if not username:
        return redirect('/user/login.html')
    else:
        return render(request, 'map.html', locals())