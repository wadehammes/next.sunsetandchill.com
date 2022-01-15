# Sunset & Chill

Site powered by Next.js/Typescript/Styled Components.

## Development Setup
```bash
yarn install
```

Create a .env.local file at the project root containing the Contentful API keys:

```bash
touch .env.local
```

See `.env.sample` for necessary environment variables. Message Wade or Steve for Contentful API credentials.

Run the dev environment:
```bash
yarn run dev
```
## Development & Deployment
1. checkout `staging` and pull the latest changes
2. Run `make release tag=` with the tag name:
```
make release tag=vX.X.X
```

### Component creation
We have a script to scaffold out a new component in the `src/components` directory, which will provide the necessary files to get started hacking on a new component for the site.

```
yarn scaffold_component <ComponentName>
```

## Other Resources / Documentation
- Vercel - https://vercel.com/gotrhythm/rhythm-marketing/
- Next.js Documentation - https://nextjs.org/docs/getting-started
- Styled Components Documentation - https://styled-components.com/docs
- Contentful Documentation - https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/