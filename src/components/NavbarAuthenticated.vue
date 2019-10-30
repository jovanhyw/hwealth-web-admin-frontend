<template>
  <nav>
    <v-app-bar color="primary" dark class="px-12">
      <!-- Brand Logo -->
      <v-app-bar-nav-icon class="ml-4">
        <v-avatar>
          <v-img src="/favicon-32x32.png"></v-img>
        </v-avatar>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase title font-weight-bold">
        <span>HWealth Admin Portal</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        rounded
        v-for="tab in tabs"
        :key="tab.text"
        router
        :to="tab.route"
        class="ma-1"
        >{{ tab.text }}</v-btn
      >
      <v-btn text rounded class="ma-1" @click="logout">Logout</v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { LOGOUT } from '../store/modules/actions.type'

export default {
  name: 'NavbarAuthenticated',
  data() {
    return {
      tabs: [{ text: 'Settings', route: '/settings' }]
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: 'login' }))
        .catch(() => console.log('Error caught in logout.'))
    }
  }
}
</script>

<style></style>
