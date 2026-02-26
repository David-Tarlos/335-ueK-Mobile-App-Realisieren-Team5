# 335-ueK-Mobile-App-Realisieren-Team5

Mobile App für Country Details – entwickelt im Rahmen des üK 335 «Mobile-Applikationen realisieren».

---

## Voraussetzungen

Folgende Tools müssen auf dem Gerät installiert sein:

| Tool | Version | Link |
|---|---|---|
| Node.js | >= 18 | https://nodejs.org |
| npm | >= 9 | (wird mit Node.js installiert) |
| Expo CLI | aktuell | `npm install -g expo-cli` |
| Docker Desktop | aktuell | https://www.docker.com/products/docker-desktop |
| Android Studio | aktuell | https://developer.android.com/studio (für Android Emulator) |

---

## Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd 335-ueK-Mobile-App-Realisieren-Team5
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Backend starten (Docker)

Das Backend läuft als Docker Container auf Basis von `noseryoung/rest-jsondb` (JSON Server mit Auth).

```bash
docker run -p 3030:3000 --name restdb -d noseryoung/rest-jsondb
```

**Erklärung der Flags:**
- `-p 3030:3000` – mappt Port 3000 im Container auf Port 3030 auf dem Host
- `--name restdb` – gibt dem Container den Namen `restdb`
- `-d` – startet den Container im Hintergrund (detached)
- `noseryoung/rest-jsondb` – das Docker Image

> Der Container muss laufen, bevor die App gestartet wird. Ohne Backend schlagen Login und Register fehl.

**Container-Status prüfen:**
```bash
docker ps
```

**Backend testen (optional):**
```bash
curl http://localhost:3030/
```

---

### 4. App starten

```bash
npx expo start
```

Anschliessend erscheint ein QR-Code und folgende Optionen:

| Taste | Aktion |
|---|---|
| `a` | Android Emulator starten |
| `i` | iOS Simulator starten (nur macOS) |
| `w` | Im Browser öffnen |

---

## Netzwerk-Hinweis (Android Emulator)

Der Android Emulator läuft in einer eigenen virtuellen Umgebung und kann `localhost` des Host-Rechners nicht direkt erreichen. Stattdessen wird die IP `10.0.2.2` verwendet, die auf den Host zeigt.

Dies ist in `constants/api.ts` bereits automatisch konfiguriert:

```ts
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3030',  // Emulator → Host
  ios:     'http://localhost:3030',
  default: 'http://localhost:3030',
});
```

Es sind keine manuellen Änderungen nötig.

---

## Container stoppen und neu starten

```bash
# Stoppen
docker stop restdb

# Neu starten (falls Container bereits existiert)
docker start restdb

# Container löschen und neu erstellen
docker rm restdb
docker run -p 3030:3000 --name restdb -d noseryoung/rest-jsondb
```

---

## Verfügbare Scripts

```bash
npm start          # Expo Dev Server starten
npm run android    # Direkt auf Android Emulator starten
npm run ios        # Direkt auf iOS Simulator starten (macOS)
npm run web        # Im Browser starten
```

---

## Technologie-Stack

| Technologie | Zweck |
|---|---|
| React Native + Expo | Mobile App Framework |
| TypeScript | Typsicherheit |
| React Navigation | Navigation zwischen Screens |
| React Native Paper | UI-Komponenten |
| JSON Server (Docker) | Backend / REST API |
