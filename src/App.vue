<template>
  <v-app>
    <NavbarAuthenticated v-if="isAuthenticated" />
    <NavbarPublic v-else />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavbarAuthenticated from '@/components/NavbarAuthenticated'
import NavbarPublic from '@/components/NavbarPublic'

export default {
  name: 'App',
  components: { NavbarAuthenticated, NavbarPublic },
  data: () => ({
    //
  }),
  computed: {
    isAuthenticated() {
      return false
    }
  }
}
</script>
