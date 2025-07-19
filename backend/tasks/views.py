from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filterset_fields = ['completed']

    def get_queryset(self):
        return self.request.user.tasks.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)