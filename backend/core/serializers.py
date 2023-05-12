from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.models import Cliente, Administrador, Recepcionista, Habitacion, User

class AuthTokenSerializer(serializers.Serializer):
    """serializer for the user authentication objectt"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

class UserSerializer(serializers.ModelSerializer):
    tipo = serializers.CharField(write_only=True)
    salario = serializers.FloatField(write_only=True, required=False)

    def create(self, validated_data):
        tipo = validated_data.pop('tipo')
        salario = validated_data.pop('salario')
        if tipo == "Admin":
            user = get_user_model().objects.create_user(**validated_data)
            user.is_admin = True
            user.save()
            Administrador.objects.create(
                id_user=user, salario=salario)
        elif tipo == "Client":
            user = get_user_model().objects.create_user(**validated_data)
            user.is_client = True
            user.save()
            Cliente.objects.create(
                id_user=user)
        elif tipo == "Recepcionist":
            user = get_user_model().objects.create_user(**validated_data)
            user.is_recepcionista = True
            user.save()
            Recepcionista.objects.create(
                id_user=user, salario=salario)
        else:
            raise serializers.ValidationError("Invalid user type")
        return user

    class Meta:
        model = get_user_model()
        fields = ("tipo", "id", "nombre", "apellido", "email", "direccion", "fecha_nacimiento", "salario", "password")

class AssignRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('habitacion_id',)

class ClientDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nombre', 'apellido','fecha_nacimiento', 'direccion',
                  'email')

class StaffSerializer(serializers.ModelSerializer):
    id_user = ClientDataSerializer(many=False, read_only=True)

    class Meta:
        model = Administrador
        fields = ('id_user', 'salario')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitacion
        fields = ('id', 'disponible', 'numero')
        
class AdminClientSerializer(serializers.ModelSerializer):
    id_user = ClientDataSerializer(many=False, read_only=True)

    class Meta:
        model = Cliente
        fields = ("id_user", "habitacion_id")

class ClientRoomSerializer(serializers.ModelSerializer):
    id_user = ClientDataSerializer(many=False, read_only=True)
    habitacion_id = RoomSerializer(many=False, read_only=True)

    class Meta:
        model = Cliente
        fields = ("id_user", "habitacion_id")
        
