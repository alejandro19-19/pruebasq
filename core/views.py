from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken, AuthTokenSerializer
from rest_framework.response import Response
from core.serializers import UserSerializer, RoomSerializer, AdminClientSerializer, StaffSerializer, AssignRoomSerializer, ClientRoomSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.settings import api_settings
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from django.views.decorators.http import require_http_methods
from django.template import loader
from .models import Administrador, User, Cliente, Habitacion, Recepcionista
from rest_framework.views import APIView

# constants 
ERROR_SERIALIZER = "The data sent is not correct"
ERROR_STAFF = "The user is not part of the staff"
ERROR_CLIENT = "The user is not a client"
ERROR_ADMIN = "The user is not an admin"
ERROR_RECEP = "The user is not a receptionist"

# Clase para crear el token
class CreateTokenView(ObtainAuthToken):
    """Create auth token"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    # Metodo para crear un usuario
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'error': False,
                'token': token.key,
                'email': user.email,
                'name': user.nombre,
                'apellido': user.apellido,
                'is_admin': user.is_admin,
                'is_client': user.is_client,
                'is_recepcionista': user.is_recepcionista,
                'created': created,
            },status=status.HTTP_302_FOUND)
        else:
            return Response({"error": True, "informacion": ERROR_SERIALIZER }, status=status.HTTP_400_BAD_REQUEST)

#Clase para crear los usuarios
class CreateUserAdminView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

# Clase para funciones del cliente
class client_view(APIView):
    permission_classes = [IsAuthenticated]

    # Metodo para que un cliente obtenga su informacion
    def get(self, request):
        try:
            user = Token.objects.get(key=request.auth.key).user
            user_client = Cliente.objects.get(id_user=user.id)
            serializer = AdminClientSerializer(user_client, many=False, context={'request': request})    
        except Cliente.DoesNotExist:
            return Response({"error": True, "info": ERROR_CLIENT }, status=status.HTTP_404_NOT_FOUND)
        return Response({"info_user": serializer.data} , status=status.HTTP_200_OK)
    
    # Metodo para que un cliente haga una recepcion
    def put(self, request):
        try:
            user = Token.objects.get(key=request.auth.key).user
            user_client = Cliente.objects.get(id_user=user.id)
        except Cliente.DoesNotExist:
            return Response({"error": True, "info": ERROR_CLIENT }, status=status.HTTP_404_NOT_FOUND)
        serializer = AssignRoomSerializer(
            user_client, data=request.data, context={'request': request})
        if serializer.is_valid():
            return verify_room(request, serializer)
        else:
            return Response({"error": True, "info": ERROR_SERIALIZER }, status=status.HTTP_400_BAD_REQUEST)

# Clase para funciones del administrador        
class admin_view(APIView):
    permission_classes = [IsAuthenticated]

    # Metodo para que un administrador obtenga su informacion
    def get(self, request):
        try:
            user = Token.objects.get(key=request.auth.key).user
            user_admin = Administrador.objects.get(id_user=user.id)
            serializer = StaffSerializer(user_admin, many=False, context={'request': request})    
        except Administrador.DoesNotExist:
            return Response({"error": True, "info": ERROR_ADMIN }, status=status.HTTP_404_NOT_FOUND)
        return Response({"info_user": serializer.data} , status=status.HTTP_200_OK)
    
    # Metodo para que un administrador registre una habitacion
    def post(self, request):
        user = Token.objects.get(key=request.auth.key).user
        if user.is_admin == False:
            return Response({"error": True , "info": ERROR_ADMIN }, status=status.HTTP_401_UNAUTHORIZED)
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            habitacion = Habitacion(**validated_data)
            habitacion.save()
            serializer_response = RoomSerializer(habitacion)
            return Response(serializer_response.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": True , "info": ERROR_SERIALIZER }, status=status.HTTP_404_NOT_FOUND)

# Clase para funciones del recepcionista
class receptionist_view(APIView):
    permission_classes = [IsAuthenticated]
    # Metodo para que un recepcionista obtenga su informacion
    def get(self, request):
        try:
            user = Token.objects.get(key=request.auth.key).user
            user_recep = Recepcionista.objects.get(id_user=user.id)
            serializer = StaffSerializer(user_recep, many=False, context={'request': request})    
        except Recepcionista.DoesNotExist:
            return Response({"error": True, "info": ERROR_RECEP }, status=status.HTTP_404_NOT_FOUND)
        return Response({"info_user": serializer.data} , status=status.HTTP_200_OK)

# Metodo para que un administrador obtenga la informacion de todos los clientes existentes
@api_view(['GET'])
@require_http_methods(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_clients(request):
    user = Token.objects.get(key=request.auth.key).user
    if user.is_admin == True or user.is_recepcionista == True:
        user_client = Cliente.objects.all()
        serializer = AdminClientSerializer(
            user_client, many=True, context={'request': request})
        return Response({'clients':serializer.data},status=status.HTTP_200_OK)
    else:
        return Response({"error": True, "info": ERROR_STAFF }, status=status.HTTP_401_UNAUTHORIZED)
    
# Metodo para que un administrador obtenga la informacion de todas las habitaciones disponibles 
@api_view(['GET'])
@require_http_methods(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_free_rooms(request):
    user = Token.objects.get(key=request.auth.key).user
    if user.is_admin == True or user.is_recepcionista == True:
        rooms = Habitacion.objects.filter(disponible = True)
        serializer = RoomSerializer(
            rooms, many=True, context={'request': request})
        return Response(serializer.data ,status=status.HTTP_200_OK)
    else:
        return Response({"error": True, "info": ERROR_STAFF }, status=status.HTTP_401_UNAUTHORIZED)
    
# Metodo para que un administrador obtenga la informacion de todas las habitaciones ocupadas
@api_view(['GET'])
@require_http_methods(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_occupied_rooms(request):
    user = Token.objects.get(key=request.auth.key).user
    if user.is_admin == True or user.is_recepcionista == True:
        user_client = Cliente.objects.all().exclude(habitacion_id = None)
        serializer = ClientRoomSerializer(
            user_client, many= True, context={'request': request})
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response({"error": True, "info": ERROR_STAFF }, status=status.HTTP_401_UNAUTHORIZED)

#metodos auxiliares

def verify_room(request,serializer):
    room = Habitacion.objects.get(pk=request.data['habitacion_id'])
    if room.disponible==False:
        return Response({"error": True, "info": "The room is occupied" }, status=status.HTTP_400_BAD_REQUEST)
    else:
        room.disponible = False
        room.save()
        serializer.save()
        return Response({"client":serializer.data}, status=status.HTTP_200_OK)
    
