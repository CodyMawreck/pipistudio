<template>
  <SectionTitle 
    title="Umów sesję"
    class="session__title" 
  />
  <div class="session__leftTriangles">
    <div class="session__leftTriangles--top"></div>
    <div class="session__leftTriangles--bottom"></div>
  </div>
  <div class="session__booking">
    <div class="session__booking--info">
      <strong>Umów się!</strong>
      <p>
        Jeśli jesteś zainteresowany realizacją twojego <br />
        numeru to zapraszam do umówienia sesji <br />
        poprzez formularz dostępny na stronie.
      </p>
      <div>
        <p>Kontakt ze studiem:</p>
        <p>tel: <a href="tel:+48508807781" alt="Numer telefonu">+48 508807781</a></p>
        <p>email: <a href="mailto:pipistudiooo@gmail.com" alt="Adres mailowy">pipistudiooo@gmail.com</a></p>
      </div>
      <div>
        <p>Godziny:</p>
        <p>Pn - Pt: 12:00 - 21:00</p>
        <p>Sb - Nd: 13:00 - 21:00</p>
      </div>
    </div>
    <div class="session__booking--form">
      <form @submit.prevent="sendMessage" class="form">
        <input v-model="name" placeholder="Imię i nazwisko" required />
        
        <input v-model="datetime" placeholder="Data i" type="datetime-local" required />
        
        <input v-model="email" type="email" placeholder="E-mail" required />

        <button type="submit">Zapytaj o sesję</button>
      </form>
      <div>
        <strong>Cennik</strong>
        <p>1h realizacja - 70 PLN </p>
        <p>Mix/Mastering - 100 PLN</p>
      </div>
    </div>  
  </div>
  <div class="session__rightTriangles">
    <div class="session__rightTriangles--top"></div>
    <div class="session__rightTriangles--bottom"></div>
  </div>
</template>

<script setup>
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.vue';

</script>

<style lang="scss">
@use 'Session.scss';
</style>