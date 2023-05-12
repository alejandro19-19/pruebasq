from.test_setup import TestSetUp
import pdb

class TestViews(TestSetUp):

    def test_user_register_without_data(self):
        res = self.client.post(self.create_url)
        self.assertEqual(res.status_code, 400)

    def test_user_register_data(self):
        res = self.client.post(self.create_url, self.admin_data, format='json')
        self.assertEqual(res.status_code, 201)
    
    def test_user_register_invalid_data(self):
        res = self.client.post(self.create_url, self.user_invalid_data, format='json')
        self.assertEqual(res.status_code, 400)

    def test_user_connot_login_without_data(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        res = self.client.post(self.login_url)
        self.assertEqual(res.data['error'], True)
        self.assertEqual(res.status_code, 400)

    def test_user_connot_login_with_data(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        res = self.client.post(self.login_url,self.login_admin_data, format='json')
        self.assertEqual(res.data['error'], False)
        self.assertEqual(res.status_code, 302)
    
    def test_admin_get_information(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.admin_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_admin_get_information_failure(self):
        self.client.post(self.create_url, self.recep_data, format='json')
        log = self.client.post(self.login_url,self.login_recep_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.admin_url, {}, **header)
        self.assertEqual(res.status_code, 404)
    
    def test_client_get_information(self):
        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.client_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_client_get_information_failure(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.client_url, {}, **header)
        self.assertEqual(res.status_code, 404)


    def test_recep_get_information(self):
        self.client.post(self.create_url, self.recep_data, format='json')
        log = self.client.post(self.login_url,self.login_recep_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.recep_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_recep_get_information_failure(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.recep_url, {}, **header)
        self.assertEqual(res.status_code, 404)

    def test_admin_register_room(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.post(self.admin_url, self.room1_data, **header)
        self.assertEqual(res.status_code, 201)
    
    def test_admin_register_room_bad_data(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.post(self.admin_url, self.room1_bad_data, **header)
        self.assertEqual(res.status_code, 404)

    def test_client_register_room_failure(self):
        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.post(self.admin_url, self.room1_data, **header)
        self.assertEqual(res.status_code, 401)
    
    def test_admin_get_clients(self):
        self.client.post(self.create_url, self.client_data, format='json')
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.clients_all_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_recep_get_clients(self):
        self.client.post(self.create_url, self.client_data, format='json')
        self.client.post(self.create_url, self.recep_data, format='json')
        log = self.client.post(self.login_url,self.login_recep_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.clients_all_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_client_get_clients_failure(self):
        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.clients_all_url, {}, **header)
        self.assertEqual(res.status_code, 401)

    def test_client_book_a_room(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log1 = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token1 = log1.data['token']
        header1 = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token1)}
        self.client.post(self.admin_url, self.room1_data, **header1)

        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.put(self.client_url, self.room1_book_data, **header)
        self.assertEqual(res.status_code, 200)

    def test_client_book_a_occupied_room(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log1 = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token1 = log1.data['token']
        header1 = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token1)}
        room = self.client.post(self.admin_url, self.room2_data, **header1)
        room_id = room.data['id']
        data = {"habitacion_id": room_id}

        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.put(self.client_url, data, **header)
        self.assertEqual(res.status_code, 400)





    def test_client_book_a_room_failure(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        self.client.post(self.admin_url, self.room1_data, **header)
        res = self.client.put(self.client_url, self.room1_book_data, **header)
        self.assertEqual(res.status_code, 404)

    def test_client_book_a_room_bad_data(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log1 = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token1 = log1.data['token']
        header1 = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token1)}
        self.client.post(self.admin_url, self.room1_data, **header1)

        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.put(self.client_url, self.room1_book_bad_data, **header)
        self.assertEqual(res.status_code, 400)

    def test_admin_get_free_rooms(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.free_rooms_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_admin_get_free_rooms_failure(self):
        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.free_rooms_url, {}, **header)
        self.assertEqual(res.status_code, 401)
    
    def test_admin_get_occupied_rooms(self):
        self.client.post(self.create_url, self.admin_data, format='json')
        log = self.client.post(self.login_url,self.login_admin_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.clients_rooms_url, {}, **header)
        self.assertEqual(res.status_code, 200)

    def test_client_get_occupied_rooms_failure(self):
        self.client.post(self.create_url, self.client_data, format='json')
        log = self.client.post(self.login_url,self.login_client_data, format='json')
        Token = log.data['token']
        header = {'HTTP_AUTHORIZATION': 'Token {}'.format(Token)}
        res = self.client.get(self.clients_rooms_url, {}, **header)
        self.assertEqual(res.status_code, 401)



        



        

        

