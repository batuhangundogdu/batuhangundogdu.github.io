<template>
  <div class="card mb-5" v-bind:class="{ 'card-outline-success' : message.isFirst  }">
    <div class="card-block">
      <div v-for="(user) in users"
        v-bind:user="user"
        :key="user.id"
        v-if="message.userID === user['.key']">
        <h5 class="card-title" >
          {{ user.uyelikBilgileri.isim + " " + user.uyelikBilgileri.soyisim }}
          </h5>
        <hr>
        <!-- böyle de BOLD yapılıyor - bootstrap yöntemi -->
        <p class="font-weight-bold">Ürünler</p>

        <ul class="list-group" v-for="(item, orderUrunKey) in message.urunler" v-bind:item="item" :key="item.id">

          <div v-for="urun in urunler"
           v-bind:urun="urun"
           :key="urun.id"
           v-if="urun['.key'] === orderUrunKey">
           <li class="list-group-item d-flex justify-content-between align-items-center">
             <!-- checkbox'lar marketin siparişi hazırlarken kullanabileceği kontrol listesi, kaldırılabilir ? -->
             <label class="form-check-label">
               <input type="checkbox" class="form-check-input">
               {{ urun['urunAdi'] }}
             </label>
             <span class="badge badge-default badge-pill"> {{ item.adet }} adet </span>
           </li>
          </div>

        </ul>
       <hr>
      <p class="card-text">
        <!-- burada kısım_id / kısım adı çevrimi olacak -->
        ataköy {{ user.uyelikBilgileri.kisim }}
        <br>
        {{ user.uyelikBilgileri.adres }}
        <br>
        {{ user.uyelikBilgileri.cepTelNo }}
      </p>
      <!-- böyle de BOLD yapılıyor - pure HTML yöntemi -->
      <p class="card-text">Ödeme yöntemi : <b> {{ message.odemeYontemi }} </b> </p>
      <p class="card-text" v-if="message.not != '' " >Sipariş notu : <b> {{ message.not }} </b> </p>
      <p class="card-text">Toplam tutar : <b>₺{{ message.toplamTutar }} </b> </p>

      <!-- buton'lara basınca model çıkacak, " sipariş yola çıkacak onaylıyor musunuz ? " diye soracak -->
      <button href="#" class="btn btn-warning btn-block " v-if="message.siparisDurumu === 101" v-on:click="agree(101)" >Yola çıktı</button>
      <button href="#" class="btn btn-primary btn-block disabled font-italic " v-else-if="message.siparisDurumu === 103">Teslim edildi</button>
      <button href="#" class="btn btn-success btn-block " v-else-if="message.siparisDurumu === 102" v-on:click="agree(102)">Teslim et</button>
      <button href="#" class="btn btn-danger btn-block disabled " v-else-if="message.siparisDurumu === 100">İptal edildi</button>

      <div v-if="newToOnWay">
        <br>
        <hr>
        <br>
        <p class="card-text"> Bu siparişin <b>yola çıkmasını</b> onaylıyor musunuz ? </p>
        <button class="btn btn-success btn-block " v-on:click="setStatusCode(message['.key'], 102)">Onayla</button>
        <button class="btn btn-danger btn-block " v-on:click="dontAgree(101)">İptal</button>
        <br>
      </div>
      <div v-if="onWayToDelivered">
        <br>
        <hr>
        <br>
        <p class="card-text"> Bu siparişin <b>teslim edilmesini</b> onaylıyor musunuz ? </p>
        <button class="btn btn-success btn-block " v-on:click="setStatusCode(message['.key'], 103)" >Onayla</button>
        <button class="btn btn-danger btn-block " v-on:click="dontAgree(102)">İptal</button>
        <br>
      </div>

      <p class="card-text"  v-if="message.siparisDurumu === 101"><small class="text-muted"> Bu sipariş {{ dateToString(message.yeniSiparisZaman) }} tarihinde <b>oluşturuldu.</b> </small></p>
      <p class="card-text"  v-if="message.siparisDurumu === 102"><small class="text-muted"> Bu sipariş {{ dateToString(message.yeniSiparisZaman) }} tarihinde <b>yola çıktı.</b>. </small></p>
      <p class="card-text"  v-if="message.siparisDurumu === 103"><small class="text-muted"> Bu sipariş {{ dateToString(message.yeniSiparisZaman) }} tarihinde <b>teslim edildi.</b>. </small></p>
    </div>
   </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { dateToString, getNow } from '../utils/utils'

// sıralanacak olan data'lar props ile alınabilir.
export default {
  data: function () {
    return {
      urunler: {},
      users: {},
      newToOnWay: false,
      onWayToDelivered: false
    }
  },
  name: 'OrderCard',
  props: ['message'],
  methods: {
    printy: function (e) {
      console.log(e)
    },
    getUser: function (userID) {
      return this.users[userID]
    },
    agree: function (status) {
      if (status === 101) {
        this.newToOnWay = true
      } else if (status === 102) {
        this.onWayToDelivered = true
      }
    },
    dontAgree: function (status) {
      if (status === 101) {
        this.newToOnWay = false
      } else if (status === 102) {
        this.onWayToDelivered = false
      }
    },
    setStatusCode (order, code) {
      if (code === 102) {
        db.ref('SiparislerDb').child(order + '').update({ siparisYoldaZaman: getNow() })
      } else if (code === 103) {
        db.ref('SiparislerDb').child(order + '').update({ siparisTeslimZaman: getNow() })
      }
      db.ref('SiparislerDb').child(order + '').update({ siparisDurumu: code })
    },
    dateToString,
    getNow
  },
  firebase: {
    urunler: {
      source: db.ref('UrunDb').child('urunler'),
      cancelCallback (err) {
        console.error(err)
      }
    },
    users: {
      source: db.ref('UsersDb').child('mobil_Users'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.card-block
  h5, p
  overflow hidden
  text-overflow ellipsis
  padding 10px
</style>
