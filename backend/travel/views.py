
# Create your views here.
# travel/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, TravelEntry
from .serializers import RegisterSerializer, TravelEntrySerializer, UserTravelSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample

#  Authentication Endpoints


@extend_schema(
    request=RegisterSerializer,
    responses={201: RegisterSerializer},
    tags=["Authentication"]
)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

#  Travel Data Endpoints


@extend_schema(
    request=TravelEntrySerializer,

    responses={201: TravelEntrySerializer},
    tags=["Travel Data"]
)
class SubmitTravelView(generics.CreateAPIView):
    serializer_class = TravelEntrySerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@extend_schema(
    responses={200: TravelEntrySerializer},
    tags=["Travel Data"]
)
class UserTravelDetailView(generics.RetrieveAPIView):
    serializer_class = TravelEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.travel_entries.all()



#  Admin Dashboard Endpoints

@extend_schema(
    responses={200: UserTravelSerializer(many=True)},
    description="Admin-only access to list of users with travel data",
    tags=["Admin Dashboard"]
)
class AdminDashboardView(generics.ListAPIView):
    serializer_class = UserTravelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin:
            return User.objects.filter(travel_entries__isnull=False)
        return User.objects.none()

    def list(self, request, *args, **kwargs):
        if not request.user.is_admin:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# login
@extend_schema(tags=["Authentication"])
class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

