
# travel/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# Model to store each travel entry submitted by users
class TravelEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='travel_entries')
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    distance = models.FloatField()
    petrol_consumed = models.FloatField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} | {self.start_location} ➜ {self.end_location}"
