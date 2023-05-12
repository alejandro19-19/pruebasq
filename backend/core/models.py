from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=True)
    apellido = models.CharField(max_length=100, null=True)
    fecha_nacimiento = models.DateField(null=True)
    direccion = models.CharField(max_length=500, null=True)
    email = models.EmailField(max_length=80, unique=True)
    password =  models.CharField(max_length=500, null=False)
    is_admin = models.BooleanField('admin status', default=False)
    is_client = models.BooleanField('client status', default=False)
    is_recepcionista = models.BooleanField('recepcionista status', default=False)
    is_active = models.BooleanField(default=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'


class Habitacion(models.Model):
    id = models.AutoField(primary_key=True)
    disponible = models.BooleanField()
    numero = models.IntegerField(unique=True)

class Cliente(models.Model):
    id_user= models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="client")
    habitacion_id = models.ForeignKey(
        Habitacion, on_delete=models.CASCADE, related_name="Habitacion_id_rep", null=True)
    
class Administrador(models.Model):
    id_user= models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="admin")
    salario= models.FloatField()
    
class Recepcionista(models.Model):
    id_user= models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="recep")
    salario= models.FloatField()
