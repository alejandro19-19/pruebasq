from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.chrome.service import Service
from chromedriver_py import binary_path # this will get you the path variable

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

service_object = Service(binary_path)
web = webdriver.Chrome(service=service_object,options=chrome_options)

# deprecated but works in older selenium versions
#web = webdriver.Chrome(executable_path=binary_path)
web.get('http://localhost:8000/core/create')


#web = webdriver.Chrome(options=chrome_options)
#web = webdriver.Chrome()
web.get('http://localhost:8000/core/create')
time.sleep(1)
"""
#crear un admin
type = "Admin"
tipo = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[1]/div/input')
tipo.send_keys(type)

name = "juan"
nombre = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[2]/div/input')
nombre.send_keys(name)

lastName = "santa"
apellido = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[3]/div/input')
apellido.send_keys(lastName)

email = "admin@admin.com"
correo = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[4]/div/input')
correo.send_keys(email)

address = "calle 5"
direccion = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[5]/div/input')
direccion.send_keys(address)

date = "05-05-2023"
fecha = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[6]/div/input')
fecha.send_keys(date)

salary = "4000"
salario = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[7]/div/input')
salario.send_keys(salary)

password = "1234"
contrasenha = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[8]/div/input')
contrasenha.send_keys(password)

submit = web.find_element(By.XPATH,'//*[@id="post-object-form"]/form/fieldset/div[9]/button')
submit.click()
print("se creo el administrador")
#loguearse con el admin

#web.find_element(By.XPATH,'')
time.sleep(1)
"""
#crear usuario
web.get('http://localhost:8085/')

register = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[1]/nav/div/button[2]')
register.click()



name1 = "alejandro"
nombre = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[1]/input')
nombre.send_keys(name1)

lastName1 = "escobar"
apellido = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[2]/input')
apellido.send_keys(lastName1)

email1 = "test1@test.com"
correo = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[3]/input')
correo.send_keys(email1)

address1 = "calle 5"
direccion = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[4]/input')
direccion.send_keys(address1)

date1 = "05-05-2023"
fecha = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[5]/input')
fecha.send_keys(date1)

password1 = "1234"
contrasenha = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[6]/input')
contrasenha.send_keys(password1)

submit = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[8]/button')
submit.click()

try:
    get_confirmation_user_create = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[2]')
    if not get_confirmation_user_create:
        raise AssertionError("El cliente no puede ver su perfil")
    print("se creo el cliente")
except NoSuchElementException:
    time.sleep(1)
    
#revisar si esto esta bien cuando el frontend arregle el codigo ---------------------------------------

#time.sleep(20)

volver = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[2]')
volver.click()



login = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[1]/nav/div/button[1]')
login.click()



lName = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[1]/input')
lName.send_keys(email1)
#logearse con el cliente 1
lPassword = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[2]/input')
lPassword.send_keys(password1)

lsubmit = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/div[3]/form/div[4]/button')
lsubmit.click()

time.sleep(1)

try:
    get_confirmation_login = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[4]/div[3]/form/div[3]/p')
    if "Invalid data, please try again" in get_confirmation_login.text:
        raise AssertionError("El cliente no puede logearse")
    print("se logeo el cliente")
except NoSuchElementException:
    time.sleep(5)

profile = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[2]/div[3]/div[1]/div/div[4]')
profile.click()

try:
    get_confirmation_profile = web.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/h4')
    if not get_confirmation_profile:
        raise AssertionError("El cliente no puede ver su perfil")
    print("el cliente puede revisar su perfil")
    time.sleep(1)
except NoSuchElementException:
    time.sleep(1)

volver = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[1]/img')
volver.click()

time.sleep(5)

reservation = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[2]/div[3]/div[2]/div/div[4]')
reservation.click()
#web.find_element(By.XPATH,'')
time.sleep(1)
get_room = web.find_element(By.XPATH,'//*[@id="root"]/div/div/div[3]/button')
get_room.click()

print("se han terminado las pruebas con exito")
time.sleep(1)
