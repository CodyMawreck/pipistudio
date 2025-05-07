<template>
  <SectionTitle title="Studio" />
    <div class="studio__grid">
      <div class="speakerWrapper speakerWrapper__left">
        <Speaker 
          class="speakerWrapper__icon" 
          speakerTitle="Sprzęt" 
          contentTitle="Sprzęt:"
          :contentOption="equipmentList" />
      </div>
      <div class="leftColumn">
        <img src="../../../assets/images/foto3.jpg" alt="Studio 1">
      </div>
      <div class="rightColumn">
        <div>
          <img src="../../../assets/images/foto5.jpeg" alt="Studio 2">
        </div>
        <div>
          <img src="../../../assets/images/foto1.webp" alt="Studio 3">
        </div>
        <div>
          <img src="../../../assets/images/foto4.jpeg" alt="Studio 4">
        </div>
      </div>
      <div class="speakerWrapper speakerWrapper__right">
        <Speaker 
          class="speakerWrapper__icon" 
          speakerTitle="Software"
          contentTitle="Software:"
          :contentOption="softwareList"
          :isRightSide="true"
        />
      </div>
    </div>
    <div class="studio__info">
      <div>
        <h3>Sprzęt:</h3>
        <ul>
          <li v-for="(item, index) in equipmentList" :key="'equipment-' + index">{{ item }}</li>
        </ul>
      </div>
      <div>
        <h3>Software:</h3>
        <ul>
          <li v-for="(item, index) in softwareList" :key="'software-' + index">{{ item }}</li>
        </ul>
      </div>
    </div>
</template>

<script setup>
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.vue';
import Speaker from '../../organisms/Speaker/Speaker.vue';

const equipmentList = [
  'MIKROFON - Rode NT-1A',
  'Interfejs - Focusrite',
  'Laptop - Macbook Air M3',
  'Monitory odsłuchowe - M-AUDIO BX5',
]

const softwareList = [
  'CUBASE PRO 11',
  'SLATE DIGITAL VST',
  'VALHALLA VST',
  'SOUNDTOYS',
  'AND MORE...',
]

</script>

<style lang="scss">
@use 'Studio.scss';
</style>
