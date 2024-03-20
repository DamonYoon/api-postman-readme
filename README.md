## Scripts
Always check the API definition ID before running scripts for readme update.
API definition ID is in the [api configs](configs/api.configs.ts) file.

1. Convert to Yaml file from Ts file
Run below script.
```sh
npm run convert-to-yaml -- ${filePath}
```

2. Update Docs to ReadMe
Before using it, must set Readme API key in `.env` file.
```
README_API_KEY="rdme_xn8..."

```

Run below script.

```sh
npm run update-to-readme -- ${filePath} ${id}
```

3. Convert and Update Docs to Readme
```sh
npm run convert-and-update -- ${filePath}
```