<template>
  <footer class="bg-light text-center py-3">
    <div class="container">
      <p>&copy; {{ currentYear }} Rahadyan Widhi. All Rights Reserved..</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped></style>