
# travel/serializers.py
from rest_framework import serializers
from .models import User, TravelEntry
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample, extend_schema
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from .models import User

#  RegisterSerializer

@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Register Example',
            value={
                "username": "john_doe",
                "email": "john@example.com",
                "password": "securePassword123"
            },
            request_only=True
        )
    ]
)
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'is_admin')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_admin=validated_data.get('is_admin', False)
        )
        return user

#  TravelEntrySerializer

@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Submit Travel Example',
            value={
                "destination": "Bengaluru",
                "start_date": "2025-08-01",
                "end_date": "2025-08-05",
                "purpose": "Conference"
            },
            request_only=True
        )
    ]
)
class TravelEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelEntry
        fields = '__all__'
        read_only_fields = ['user']

#  UserTravelSerializer
class UserTravelSerializer(serializers.ModelSerializer):
    travel_entries = TravelEntrySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'travel_entries']


#  Custom Email Login Serializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        print("Custom EmailTokenObtainPairSerializer reached") 
        email = attrs.get("email")
        password = attrs.get("password")
        
        # print(" Incoming login data:", attrs)
        # print(" Email:", email)
        # print(" Password:", password)

        user = User.objects.filter(email=email).first()
        # print(" Found user:", user)

        if user and user.check_password(password):
            # print(" Password matched")

            data = super().validate({
                'username': user.username,
                'password': password
            })
            data['user'] = {
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin
            }
            return data
        print(" Invalid login attempt")
        raise serializers.ValidationError("Invalid email or password.")
