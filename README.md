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
- `filePath`: (required) The file path of OAS. It should be end with ".ts". (e.g., ./apis/web3DataAPI/index.ts)
- `version`: (required) The version of Readme. It should be in the format of "x.x.x". (e.g., 1.0.2)
- `protocol`: (conditional) This parameter is required only for the EVM APIs. Only supported protocol is allowed. (e.g., "ethereum").
```sh
npm run convert ${filePath} ${version} ${protocol}
```

### 2. Update Docs with API Definition ID
- `filePath`: (required) The file path of OAS. It should be end with ".ts". (e.g., ./apis/web3DataAPI/index.ts)
```sh
npm run update ${filePath} ${id}
```

### 3. Convert and Update Docs with Docs Version
- `filePath`: (required) The file path of OAS. It should be end with ".ts". (e.g., ./apis/web3DataAPI/index.ts)
- `version`: (required) The version of Readme. It should be in the format of "x.x.x". (e.g., 1.0.2)
```sh
npm run convert-update ${filePath} ${version}
```

### 4. Delete EVM Node APIs with Docs Version
- `version`: (required) The version of Readme. It should be in the format of "x.x.x". (e.g., 1.0.2)
```sh
npm run delete-evm ${version}
```