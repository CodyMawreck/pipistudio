<template>
  <div class="about__photo">
    <img src="../../../assets/images/foto_piotrek.jpg"/>
  </div>
  <div class="about__text">
    <SectionTitle 
      title="O mnie" 
      class="title"
    />
    <div>
      <strong>Siema!</strong>
      <p>
        Jestem Piotrek i od 2019 roku zajmuję się
        muzyką. Zaczynałem od nagrywania swoich
        kawałków, ale szybko wciągnęła mnie techniczna
        strona dźwięku <br/>
        - mix, mastering i produkcja wokali.
      </p>
      <p>
        W 2021 roku zbudowałem własne studio na działce
        i zacząłem zdobywać pierwszych klientów.
        Dziś rozwijam się przy każdym projekcie,
        odkrywając nowe brzmienia.
      </p>
      <p>
        Jeśli chcesz nadać swojej muzyce charakter <br/>
        - zapraszam do współpracy!
      </p>
    </div>
    <Speaker 
      class="speaker" 
    />
  </div>
  <div class="about__triangles">
    <div class="about__triangles--triangle"></div>
    <div class="about__triangles--triangle"></div>
  </div>
</template>

<script setup>
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.vue';
import Speaker from '../../../assets/icons/Speaker.svg'
</script>

<style lang="scss">
@use 'About.scss';
</style>
