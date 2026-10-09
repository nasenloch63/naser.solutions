# Naser Solutions

Next.js-Website mit Payload CMS, PostgreSQL und Vercel Blob für CMS-Uploads.

## Entwicklung

```powershell
npm ci
npm run dev
```

Für eine lokale Vorschau ohne CMS-Datenbank:

```powershell
$env:LOCAL_CMS_PREVIEW = '1'
npm run dev
```

Die Vorschau zeigt Beispielinhalte und ersetzt keine Anmeldung im CMS. Auf Vercel ist dieser Vorschau-Modus deaktiviert.

## Struktur

- `app/(frontend)`: Website, Rechtstexte und Abschnittsseiten.
- `app/(payload)`, `cms`, `payload.config.ts`: CMS, Inhaltsblöcke, Zugriffsregeln und Admin-Oberfläche.
- `app/portal`: Kundenportal.
- `migrations`, `scripts`: Datenbankmigrationen und CMS-Einrichtung.
- `public`: lokal verwendete Bilder, Flaggen und Cursor. Alle Dateien hier sind öffentlich erreichbar; private Dokumente gehören nicht in diesen Ordner.
- `app/og`: generierte Link-Vorschaubilder.
- `lib/payment-services-copy.ts`: Krypto-Zahlungsintegration für Unternehmen und SumUp-Einrichtung, Wartung und Customizing in zwölf Sprachen.

CMS-Uploads werden separat verwaltet. Fehlende direkte Code-Referenzen reichen bei CMS-Daten, dynamischen Dateipfaden oder geteilten Dokumenten nicht als Nachweis für eine Löschung.

## Zugangsdaten

CMS-, Datenbank-, Blob-, Vorschau- und SMTP-Zugangsdaten werden ausschließlich über serverseitige Umgebungsvariablen konfiguriert. Geheimnisse dürfen weder im Repository noch in `NEXT_PUBLIC_*`-Variablen stehen.

Für die einmalige CMS-Einrichtung benötigt `npm run cms:seed` sowohl `PAYLOAD_SEED_EMAIL` als auch `PAYLOAD_SEED_PASSWORD`. Die Werte werden nicht als Standard vorgegeben. Das Skript setzt keine bestehenden Passwörter zurück und wird nicht vom Produktionsbuild ausgeführt.

Zeugnisse, Lebensläufe, Datenbank-Dumps und Sicherungen bleiben außerhalb des Repositorys. Eine normale Dateilöschung entfernt frühere Versionen nicht aus der Git-Historie.

Die früher importierten Zeugnisse und der Lebenslauf sind im CMS nur für Administratoren und Redakteure lesbar. Diese Zugriffskontrolle gilt auch für Originaldateien und generierte Bildgrößen. Die Medienverwaltung ist für öffentliche Website-Inhalte gedacht; Kundenanhänge verwenden weiterhin ihren separaten geschützten Download.

Konten und Rollen werden ausschließlich von Administratoren angelegt und verwaltet. Redakteure behalten die Bearbeitung der Website-Inhalte; Kunden können weiterhin ihr eigenes Konto aktualisieren.

## Prüfen und bauen

```powershell
npm test
npx tsc --noEmit
npm run build
```

Der reguläre Produktionsbuild führt zunächst die vorhandene additive Kundenportal-Migration aus. Eine lokale Prüfung ohne Datenbank erfolgt mit `LOCAL_CMS_PREVIEW=1` und `npx next build`.

Die Website bietet keine eigene Krypto-Zahlungsseite oder Wallet-Adressen an. Die Einrichtung solcher Lösungen für Kundenunternehmen ist eine Dienstleistung.
