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
      <strong class="heading">Umów się!</strong>
      <p>
        Jeśli jesteś zainteresowany realizacją twojego <br />
        numeru to zapraszam do umówienia sesji <br />
        poprzez formularz dostępny na stronie.
      </p>
      <div>
        <strong>Cennik</strong>
        <p>1h realizacja - 70 PLN </p>
        <p>Mix/Mastering - 100 PLN</p>
      </div>
      <div>
        <strong>Godziny:</strong>
        <p>Pn - Pt: 12:00 - 21:00</p>
        <p>Sb - Nd: 13:00 - 21:00</p>
      </div>
    </div>
    <div class="session__booking--form">
      <Form />
      <div>
        <strong>Kontakt ze studiem:</strong>
        <p>tel: <a href="tel:+48508807781" alt="Numer telefonu">+48 508807781</a></p>
        <p>email: <a href="mailto:pipistudiooo@gmail.com" alt="Adres mailowy">pipistudiooo@gmail.com</a></p>
      </div>
      <div class="session__booking--mobile">
        <div>
          <strong>Cennik</strong>
          <p>1h realizacja - 70 PLN </p>
          <p>Mix/Mastering - 100 PLN</p>
        </div>
        <hr>
        <div>
          <strong>Godziny:</strong>
          <p>Pn - Pt: 12:00 - 21:00</p>
          <p>Sb - Nd: 13:00 - 21:00</p>
        </div>
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
import Form from '../../organisms/Form/Form.vue';
</script>

<style lang="scss">
@use 'Session.scss';
</style>