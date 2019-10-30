<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-5">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Admin Login</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="login">
            <v-card-text>
              <v-text-field
                label="Username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
              />

              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                autocomplete="off"
                v-model="password"
              />
            </v-card-text>
            <v-card-actions class="pb-4 pr-4">
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
import { LOGIN } from '../store/modules/actions.type'

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
      let username = this.username
      let password = this.password
      this.btnLoading = true
      this.$store
        .dispatch(LOGIN, { username, password })
        .then(res => {
          this.btnLoading = false

          /**
           * Deny login if account is not admin
           * Possible to be broken by amending the res
           * data i think. However, API calls still rely on the JWT,
           * so the user will not be able to call admin
           * APIs. Hence, no data loss.
           */
          if (res.role !== 'Admin') {
            this.snackbarError = true
            this.snackbarMessage =
              'You are not authorized to access this portal.'
            return
          }

          this.$router.push({ name: 'search' })
        })
        .catch(err => {
          this.btnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    }
  }
}
</script>

<style></style>
