// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  vite: {
      plugins: [
          tailwindcss(),
      ],
  },
  modules: [
      '@nuxt/ui',
      '@nuxt/image',
      '@sidebase/nuxt-auth'
  ],
  runtimeConfig: {
    baseURL: 'http://localhost:8000/api',
  },
  auth: {
    isEnabled: true,
    originEnvKey: 'NUXT_AUTH_ORIGIN',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/auth/login', method: 'post' },
        signUp: false,
        signOut: false,
        getSession: { path: '/user/me', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/data/token',
        type: 'Bearer',
        cookieName: 'auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
        sameSiteAttribute: 'lax',
        cookieDomain: 'localhost',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false
      },
      pages: {
        login: '/login'
      }
    },
    sessionRefresh: {
      enablePeriodically: true,
    }
  }

})