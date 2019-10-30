<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Admin Login</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                label="Username"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                autocomplete="off"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" type="submit" :loading="btnLoading"
                >Login</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbarError" :timeout="0" bottom color="error">
      <span>{{ snackbarMessage }}</span>
      <v-btn
        text
        color="white"
        @click="
          {
            snackbarError = false
            snackbarMessage = ''
          }
        "
        >Close</v-btn
      >
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false
    }
  },
  methods: {
    login() {
      // post to server
      this.$router.push({ name: 'search' })
    }
  }
}
</script>

<style></style>
