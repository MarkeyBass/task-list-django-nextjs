from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(ListCreateAPIView):
    queryset = Task.objects.all().order_by('order')
    serializer_class = TaskSerializer
    # def get_queryset(self):
    #     return Task.objects.all().order_by('order')

class TaskDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

