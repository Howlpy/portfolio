# howl.wtf

Portfolio personal de Adrian Gomez: software engineer especializado en backend,
IA, automatizacion, datos y ciberseguridad.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm ci
npm run dev
```

## Verificacion

```bash
npm run build
npm test
```

## Produccion

El proyecto incluye una imagen Docker y un `compose.yaml`. El servicio escucha
en `127.0.0.1:3040` y esta pensado para publicarse detras de Caddy.

```bash
docker compose up -d --build
```
