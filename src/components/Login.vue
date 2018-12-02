<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="primary" sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#"><strong> Sepet Market </strong></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text= "Ayarlar " right>
            <b-dropdown-item href="#" v-b-modal.iletisimModal>İletişim</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal id="iletisimModal" title="İletişim" ok-only>
      <p class="my-4">Her türlü sorunuz için <i>info@sepetapp.com</i> adresinden iletişime geçebilirsiniz.</p>
    </b-modal>
    <div class="jumbotron-fluid">
      <div class="container pt-3">
        <div class="row justify-content-sm-center">
          <div class="col-sm-6 col-md-4">
            <div class="card border-default text-center">
              <div class="card-header">Sepet Market Yönetim Paneli</div>
              <div class="card-body">
                <h4 class="text-center">Giriş</h4>
                <br>
                <form class="form-signin">
                  <input type="text" class="form-control mb-2" placeholder="Email adresi" v-model="email" required autofocus autocomplete >
                  <input type="password" class="form-control mb-2" placeholder="Şifre" v-model="password" required>
                  <br>
                  <button class="btn btn-lg btn-primary btn-block mb-1" type="submit" v-on:click="login">Giriş Yap</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</template>

<script>
import { db, auth } from '../firebase'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
        // giriş yapmaya çalışan user market user'ı mı mobil user mı check
        // if (this.marketUserId == null) {
        //   alert('Hatalı giriş. ' + '\n' + this.getUidFromUser(user) + '\n' + user.uid)
        //   auth.signOut()
        // } else {
        //   alert('Giriş başarılı ' + '\n' + this.getUidFromUser(user) + '\n' + user.uid)
        //   this.$router.replace('Home')
        // }

        // burada giriş yapan user market user'ı mı yoksa mobil user mı kontrol yapılmalı, üstte onu yapmayı denedim devam edilebilir.
        if (user.uid != null) {
          alert('Giriş başarılı ' + '\n' + user.uid + '\n' + auth.currentUser.uid)
          this.$router.replace('NewOrder')
        } else {
          alert('Giriş hatalı ')
        }
      },
      (err) => {
        alert('Amanın! Yanlış bir şeyler oldu :(\n' + err.message)
        this.$router.replace('Login')
      })
    },
    getUidFromUser: function (user) {
      return {
        uid: db.ref('UsersDb').child('market_Users').child(user.uid)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  box-shadow 0 10px 20px rgba(0,0,0,0.19) 0 6px 6px rgba(0,0,0,0.23)
</style>
