## Scripts
0. Requirements 
Before using scripts, must set Readme API key in `.env` file.
```
README_API_KEY="rdme_xn8..."
```


1. Convert to Yaml file from Ts file
If version is not provided, it will use the default version.
The default version is set in the [api configs](configs/api.configs.ts) file.
```sh
npm run convert -- ${filePath} ${version}
```

2. Update Docs with API Definition ID

```sh
npm run update -- ${filePath} ${id}
```

3. Convert and Update Docs with Docs Version
Before using it, must set Readme API key in `.env` file.
If version is not provided, it will use the default version.
The default version is set in the [api configs](configs/api.configs.ts) file.
```sh
npm run convert-and-update -- ${filePath} ${version}
```