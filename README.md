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
- `public`: lokal verwendete Bilder, Flaggen, Cursor und direkt erreichbare Dokumente.
- `app/og`: generierte Link-Vorschaubilder.
- `lib/payment-services-copy.ts`: Krypto-Zahlungsintegration für Unternehmen und SumUp-Einrichtung, Wartung und Customizing in zwölf Sprachen.

CMS-Uploads werden separat verwaltet. Fehlende direkte Code-Referenzen reichen bei CMS-Daten, dynamischen Dateipfaden oder geteilten Dokumenten nicht als Nachweis für eine Löschung.

## Prüfen und bauen

```powershell
npm test
npx tsc --noEmit
npm run build
```

Der reguläre Produktionsbuild führt zunächst die vorhandene additive Kundenportal-Migration aus. Eine lokale Prüfung ohne Datenbank erfolgt mit `LOCAL_CMS_PREVIEW=1` und `npx next build`.

Die Website bietet keine eigene Krypto-Zahlungsseite oder Wallet-Adressen an. Die Einrichtung solcher Lösungen für Kundenunternehmen ist eine Dienstleistung.
