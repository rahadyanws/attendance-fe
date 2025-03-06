<template>
  <div class="DashboardPage">
    <NavbarComponent />
    <h3>Welcome to Attendance App</h3>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import FooterComponent from './FooterComponent.vue';

export default {
  name: 'DashboardPage',
  components: {
    NavbarComponent,
    FooterComponent,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    position: relative;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

h3::before,
h3::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
}

h3::before {
    left: 0;
}

h3::after {
    right: 0;
}

</style>
