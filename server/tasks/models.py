from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=150, default="", blank=True)
    is_done = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

