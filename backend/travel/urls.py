

# travel/urls.py
from django.urls import path
from .views import RegisterView, SubmitTravelView, AdminDashboardView, UserTravelDetailView, EmailLoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', EmailLoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('submit/', SubmitTravelView.as_view(), name='submit-travel'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('travel/', UserTravelDetailView.as_view(), name='user-travel'),
]
