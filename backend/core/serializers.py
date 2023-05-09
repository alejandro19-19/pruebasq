from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from core.models import *

class AuthTokenSerializer(serializers.Serializer):
    """serializer for the user authentication objectt"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Imposible autenticar con esas credenciales')
            raise serializers.ValidationError(msg, code='authentication')
        attrs['user'] = user
        return attrs
    

class UserSerializer(serializers.ModelSerializer):
    tipo = serializers.CharField(write_only=True)
    salario = serializers.FloatField(write_only=True, required=False)

    def create(self, validated_data):
        tipo = validated_data.pop('tipo')
        salario = validated_data.pop('salario')
       # user = User.objects.create(**validated_data)
        if tipo == "Admin":
            user = get_user_model().objects.create_user(**validated_data)
            user.is_admin = True
            user.save()
            user_admin = Administrador.objects.create(
                id_user=user, salario=salario)
        elif tipo == "Cliente":
            user = get_user_model().objects.create_user(**validated_data)
            user.is_client = True
            user.save()
            user_cliente = Cliente.objects.create(
                id_user=user)
        elif tipo == "Recepcionista":
            user = get_user_model().objects.create_user(**validated_data)
            user.is_recepcionista = True
            user.save()
            user_admin = Recepcionista.objects.create(
                id_user=user, salario=salario)
        #aqui falta implementar algo que retorne error 400 cuando no se ingrese un tipo valido
        return user

    class Meta:
        model = get_user_model()
        fields = ("tipo", "id", "nombre", "apellido", "email", "direccion", "fecha_nacimiento", "salario", "password")

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('id_user', 'habitacion_id')

class AssignRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('habitacion_id',)

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = ('id_user', 'salario')

class HabitacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Habitacion
        fields = ('id','disponible', 'numero')

class ClientDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nombre', 'apellido','fecha_nacimiento', 'direccion',
                  'email')
        
class AdminClientSerializer(serializers.ModelSerializer):
    id_user = ClientDataSerializer(many=False, read_only=True)

    class Meta:
        model = Cliente
        fields = ("id_user", "habitacion_id")

class ClientRoomSerializer(serializers.ModelSerializer):
    id_user = ClientDataSerializer(many=False, read_only=True)
    habitacion_id = HabitacionSerializer(many=False, read_only=True)
    class Meta:
        model = Cliente
        fields = ("id_user", "habitacion_id")
        
