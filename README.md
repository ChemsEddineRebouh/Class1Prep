# Classe 1 Québec

**Application mobile de révision pour l'examen théorique du permis de conduire Classe 1 au Québec.**

Projet personnel développé en React Native et Expo, conçu pour aider les candidats à se préparer à l'examen de la SAAQ pour le permis de camion lourd.

---

## ✨ Fonctionnalités

- 📚 **Quiz par thème** — Pratique ciblée par catégorie, avec explications détaillées après chaque réponse
- ⏱️ **Simulation d'examen** — 32 questions tirées aléatoirement pour reproduire les conditions réelles de l'examen
- 🔧 **Ronde de sécurité** — Guide complet des défectuosités mineures et majeures par composante du véhicule
- 📊 **Suivi de progression** — Sauvegarde automatique des meilleurs scores et historique des questions échouées
- 💰 **Monétisation AdMob** — Intégration de bannières publicitaires Google Mobile Ads
- 🇫🇷 **Entièrement en français** — Adaptée au contexte québécois

## 📚 Catégories de questions

| Catégorie            | Description                        |
| -------------------- | ---------------------------------- |
| Général & Code       | Règles de base et signalisation    |
| Freins à air         | Systèmes pneumatiques              |
| Ronde de sécurité    | Inspection avant départ            |
| Lois & Règlements    | Heures de conduite et charges      |

## 🛠 Stack technique

- **React Native** + **Expo** (New Architecture)
- **TypeScript**
- **React Navigation** (native-stack)
- **AsyncStorage** pour la persistance locale
- **react-native-google-mobile-ads** pour la monétisation
- **Ionicons** pour l'iconographie

## 🚀 Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo Go, un émulateur Android ou un simulateur iOS
- Un compte Google AdMob (pour la configuration des publicités)

### Installation

```bash
git clone <url-du-repo>
cd Class1Prep
npm install
```

### Lancement

```bash
npm start            # Serveur Expo
npm run android      # Android
npm run ios          # iOS
npm run web          # Web
```

## 📢 Configuration AdMob

L'application utilise **react-native-google-mobile-ads** pour afficher des bannières publicitaires.

### 1. Créer un compte AdMob

Rendez-vous sur [admob.google.com](https://admob.google.com) et créez une application pour iOS et Android. Récupérez les **App IDs** générés.

### 2. Configurer les App IDs dans `app.json`

```json
"plugins": [
  [
    "react-native-google-mobile-ads",
    {
      "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
      "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
    }
  ]
]
```

> Pour le développement, vous pouvez utiliser les **IDs de test Google** fournis dans la [documentation officielle](https://developers.google.com/admob/android/test-ads).

### 3. Build natif requis

Les publicités AdMob **ne s'affichent que dans un build natif**. En mode Expo Go, un placeholder est affiché à la place.

Pour générer un build natif :

```bash
npx expo prebuild        # Génère les dossiers ios/ et android/
npx expo run:android     # Lance un build natif Android
npx expo run:ios         # Lance un build natif iOS
```

Ou utilisez **EAS Build** pour des builds dans le cloud :

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## 📁 Structure du projet

```
Class1Prep/
├── App.tsx                     # Point d'entrée
├── app.json                    # Configuration Expo + AdMob
└── src/
    ├── components/
    │   └── ads/AdBanner.tsx    # Composant bannière publicitaire
    ├── data/                   # Banque de questions
    ├── navigation/             # Configuration des écrans
    ├── screens/                # Écrans de l'application
    ├── styles/                 # Thème et styles globaux
    ├── types/                  # Types TypeScript
    └── utils/
        └── storage.ts          # Persistance locale (scores, erreurs)
```

## 🧭 Navigation

```
Dashboard
├── Quiz par thème      → Sélection → Quiz → Résultat
├── Simulation examen   → Quiz → Résultat
├── Ronde de sécurité
└── Paramètres
```

- **Mode pratique** : 10 questions par catégorie, avec explications
- **Mode examen** : 32 questions toutes catégories, sans explications

## 💾 Persistance des données

Les scores et l'historique des erreurs sont sauvegardés localement avec **AsyncStorage** :

- Conservation du **meilleur score** par catégorie
- Accumulation des questions échouées (déduplication par ID)
- Réinitialisation possible depuis les paramètres
