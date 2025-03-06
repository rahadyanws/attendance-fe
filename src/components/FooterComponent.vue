<template>
    <footer class="bg-light text-center py-3">
      <div class="container">
        <p>&copy; {{ currentYear }} Nama Perusahaan. Hak Cipta Dilindungi.</p>
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="/privacy" class="text-muted">Kebijakan Privasi</a>
          </li>
          <li class="list-inline-item">
            <a href="/terms" class="text-muted">Syarat dan Ketentuan</a>
          </li>
          <li class="list-inline-item">
            <a href="/contact" class="text-muted">Hubungi Kami</a>
          </li>
        </ul>
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
  
  <style scoped>
  </style>