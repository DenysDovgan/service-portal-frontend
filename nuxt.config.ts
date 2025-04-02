// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import {process} from "std-env";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
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

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
    }
  },
  routeRules: {
    '/': { redirect: '/login' }
  },
  auth: {
    isEnabled: true,
    originEnvKey: 'NUXT_BASE_URL',
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/auth/login', method: 'post' },
        signUp: false,
        signOut: false,
        getSession: { path: '/api/users/me', method: 'get' },
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
      session: {
        dataType: {
          id: 'string | number',
          email: 'string',
          phoneNumber: 'string',
          firstName: 'string',
          lastName: 'string',
          city: 'string',
          country: 'string',
          companyName: 'string',
          role: 'string',
        },
        dataResponsePointer: '/data'
      },
      pages: {
        login: '/login'
      }
    },
    sessionRefresh: {
      enablePeriodically: 600000, // 10 minutes
    }
  },

})