<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <strong> Sepet Market </strong>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Arama Yapın"/>
            <b-button size="sm" class="my-2 my-sm-0" type="success">Ara</b-button>
          </b-nav-form>
          <b-nav-item-dropdown text= "Ayarlar " right>
            <b-dropdown-item v-b-modal.iletisimModal>İletişim</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-b-modal.logoutModal>Çıkış Yap</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Modals -->
    <b-modal id="logoutModal" title="Çıkış Yap" @ok='logout'>
      <p class="my-4">Sepet Market'ten çkış yapmak istiyor musunuz ? Bir sonraki girişinize kadar kullanıcılar sizi göremeyecekler.</p>
    </b-modal>
    <b-modal id="iletisimModal" title="İletişim" ok-only>
      <p class="my-4">Her türlü sorunuz için <i>info@sepetapp.com</i> adresinden iletişime geçebilirsiniz.</p>
    </b-modal>

    <!-- <button type="submit" v-on:click="playSound('http://soundbible.com/grab.php?id=2084&type=mp3')">notify</button> -->

      <!-- <form @submit="addMessage">
        <div class="form-group">
          <input maxlength="40" autofocus class="form-control" v-model="newMessage.title" placeholder="Please introduce yourself :)" />
        </div>
        <div class="form-group">
          <textarea placeholder="Leave your message!" class="form-control" v-model="newMessage.text" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
      <hr /> -->

      <b-card no-body>
        <b-tabs card pills >
            <b-tab title="Yeni Siparişler" class="jumbotron" active>
              <h2 class="mb-5"><strong>Yeni Siparişler</strong></h2>
              <br>
              <div class="card-columns">
                <order-card
                v-for="message in reverse(siparisler)"
                v-bind:message="message"
                :key="message.id"
                v-if="message.siparisDurumu === 101 && match(message.marketID)">
                </order-card>
              </div>
            </b-tab>
            <b-tab title="Yoldaki Siparişler" class="jumbotron">
              <h2 class="mb-5"><strong>Yoldaki Siparişler</strong></h2>
              <br>
              <div class="card-columns">
                <order-card
                v-for="message in reverse(siparisler)"
                v-bind:message="message"
                :key="message.id"
                v-if="message.siparisDurumu === 102 && match(message.marketID)">
                </order-card>
              </div>
            </b-tab>
            <b-tab title="Teslim edilen siparişler" class="jumbotron">
              <h2 class="mb-5"><strong>Teslim edilen Siparişler</strong></h2>
              <br>
              <div class="card-columns">
                <order-card
                  v-for="message in reverse(siparisler)"
                  v-bind:message="message"
                  :key="message.id"
                  v-if="message.siparisDurumu === 103 && match(message.marketID)">
                </order-card>
              </div>
            </b-tab>
        </b-tabs>
      </b-card>

      <!--
      <div class="container-fluid jumbotron">
        <hr>
        <h2 class="mb-5"><strong>Yeni Siparişler</strong></h2>
        <div class="card-columns">
          <order-card
          v-for="message in reverse(siparisler)"
          v-bind:message="message"
          :key="message.id"
          v-if="message.siparisDurumu === 101 && match(message.marketID)">
          </order-card>
        </div>

        <br>
        <hr>
        <h2 class="mb-5"><strong>Yoldaki Siparişler</strong></h2>
        <div class="card-columns">
          <order-card
          v-for="message in reverse(siparisler)"
          v-bind:message="message"
          :key="message.id"
          v-if="message.siparisDurumu === 102 && match(message.marketID)">
          </order-card>
        </div>

        <br>
        <hr>
        <h2 class="mb-5"><strong>Teslim edilen siparişler</strong></h2>
        <div class="card-columns">
          <order-card
            v-for="message in reverse(siparisler)"
            v-bind:message="message"
            :key="message.id"
            v-if="message.siparisDurumu === 103 && match(message.marketID)">
          </order-card>
        </div>
      </div>
      -->

  </div>
</template>

<script>
import { db, auth } from '../firebase'
import OrderCard from '@/components/OrderCard'
import { reverse } from '../utils/utils'

export default {
  name: 'Home',
  data () {
    return {
      siparisler: {},
      uid: auth.currentUser.uid
    }
  },
  components: {
    OrderCard
  },
  updated: function () {
    // alert('update oldum')
    this.playSound('http://soundbible.com/grab.php?id=2084&type=mp3')
  },
  methods: {
    playSound: function (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      } else {
        alert('ses değil')
      }
    },
    logout: function () {
      auth.signOut().then(() => {
        alert('Çıkış başarılı.')
        this.$router.replace('Login')
      })
    },
    match: function (id) {
      if (id === this.uid) {
        return true
      } else {
        return false
      }
    },
    reverse
  },
  firebase: {
    siparisler: {
      source: db.ref('SiparislerDb'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
h1,h2
  font-weight normal
ul
  list-style-type none
  padding 0
li
  display inline-block
  margin 0 10px
a
  color #42b983
</style>
