## How to use Scripts
### 0. Requirements 
#### 0-1. ReadMe API Key
Before using scripts, must set Readme API key in `.env` file.
```
README_API_KEY="rdme_xn8..."
```
#### 0-2. API configs
The docs ID and title should be written in [api configs](configs/api.configs.ts) file for every versions.


### 1. Convert to Yaml file from Ts file
A version to edited is required. If you want to edit published version, you can enter "main" instead of the specific version.
```sh
npm run convert -- ${filePath} ${version}
```

### 2. Update Docs with API Definition ID

```sh
npm run update -- ${filePath} ${id}
```

### 3. Convert and Update Docs with Docs Version
A version to edited is required. If you want to edit published version, you can enter "main" instead of the specific version.
```sh
npm run convert-and-update -- ${filePath} ${version}
```

### 4. Delete EVM Node APIs with Docs Version
A version to edited is required. If you want to edit published version, you can enter "main" instead of the specific version.
```sh
npm run delete-evm -- ${version}
```