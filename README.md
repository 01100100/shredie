# shredie

Shredie is a work-in-progress bike navigation app aimed at enhancing the shred.

## Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/44376ca7-81fe-429c-b33a-c183ec9570e8/deploy-status)](https://app.netlify.com/sites/shredie/deploys)

There is a basic static site in `site/` that uses solidjs and tailwindcss.

It is deployed on netlify and can be found at [https://shredie.com](https://shredie.com).

People can sign up for the beta there, and will be sent a invite via the resend API.


## App

The app uses kotlin multiplatform mobile (KMM) to share code between iOS and Android. The app is in the `app/` directory.

It is based off `maplibre-compose` 

> MapLibre Compose is a [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/) wrapper around the [MapLibre](MapLibre) SDKs for rendering interactive maps. You can use it to add maps to your Compose UIs on Android, iOS, Desktop, and Web.

[https://maplibre.org/maplibre-compose/](https://maplibre.org/maplibre-compose/) 
