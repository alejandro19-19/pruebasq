from.test_setup import TestSetUp

class TestViews(TestSetUp):

    def test_user_register_without_data(self):
        res = self.client.post(self.create_url)
        self.assertEqual(res.status_code, 400)

    def test_user_register_data(self):
        res = self.client.post(self.create_url, self.user_data, format='json')
        self.assertEqual(res.status_code, 201)

    def test_user_connot_login_without_data(self):
        self.client.post(self.create_url, self.user_data, format='json')
        res = self.client.post(self.login_url)
        self.assertEqual(res.data['error'], True)
        self.assertEqual(res.status_code, 400)

    def test_user_connot_login_with_data(self):
        self.client.post(self.create_url, self.user_data, format='json')
        res = self.client.post(self.login_url,self.login_data, format='json')
        self.assertEqual(res.data['error'], False)
        self.assertEqual(res.status_code, 302)
