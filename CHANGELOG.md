# [6.0.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v5.0.0...v6.0.0) (2023-11-09)


### Bug Fixes

* **docs:** add new README contents ([e67840c](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/e67840ccae38e620d205db49da18896f3461dfc6))
* **docs:** change documentation file to another directory ([b4d6fc7](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/b4d6fc732f36cbe16019d21919f02c55b02d73be))
* **lint:** disable lint for empty useEffect dependency ([3b09ef2](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/3b09ef2e5c8bf385ffe438be06086e6ac235ce2d))


### Features

* **dep:** add new dependencies ([754450a](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/754450af9977fae8f773a291c6e6611a2b6203f4))
* **test:** add dashboard e2e test ([1991fa6](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/1991fa630108a46d83a912154103b14c5843e26b))
* **test:** add playwright as an e2e testing tools ([23462c8](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/23462c8549efb7944c6bc0d56e076cba39b692fb))


### Performance Improvements

* **app:** add ESLint config ([7d736c8](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/7d736c86228aa213cee5febf021252a7ecaeb802))
* **app:** add million.js as function replacement ([c52ba06](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/c52ba06cb759efbb8c323f16f4d33726901d60e8))


### BREAKING CHANGES

* **app:** Million.js will handle component and render forEach
* **app:** ESLint will be used for app linter
* **test:** Playwright will be used as an E2E testing tools
* **docs:** documentation file will be create in docs folder

# [5.0.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v4.0.1...v5.0.0) (2023-10-19)


### Bug Fixes

* **file:** rename .js to .jsx ([883b05b](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/883b05b396e59e21e43b1a570edc4c9dd817a5eb))
* **flow:** save access_token in cookies ([34fb990](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/34fb990048733a0231061bed3be71fd0318508ae))


### Features

* **dependencies:** add new dependencies ([fc6f0a5](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/fc6f0a5792989575b7baaa6c5596686f27f43ede))
* **flow:** auto redirect after login ([47f6dc1](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/47f6dc19926d6a1ae1ffbf0a9b23d3fb835429de))
* **util:** add empty object checker function ([733561f](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/733561f0b1faa6fc54794ded18c9c11567d1541f))


### Performance Improvements

* **bundler:** change react-script to vite ([dcfa021](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/dcfa021ac037d6618731ce499089ad15dc9f00e2))
* **file:** remove unused file and do linting ([cdf7af4](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/cdf7af4f40641bc916f9418f0ab220ca641aad91))
* **test:** add some unit and component test ([20f62d7](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/20f62d7f2afbdd37456018db15d5b7f0039fed10))


### BREAKING CHANGES

* **dependencies:** use vite for module bundler
* **dependencies:** use vitest for testing
* **dependencies:** use eslint for linters

## [4.0.1](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v4.0.0...v4.0.1) (2023-09-06)


### Bug Fixes

* **env:** update example variable ([5a1f6af](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/5a1f6af51994c01873c973ac24d3e8a3b55df9ca))

# [4.0.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v3.0.0...v4.0.0) (2023-09-06)


### Bug Fixes

* **env:** update example variable ([e6f7670](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/e6f76706086f9a913c07583dab7d589b39326d57))


### chore

* **release:** 1.0.0 [skip ci] ([cc7cf0e](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/cc7cf0ec787b91e573c94f0adaa01f3a07855a5c))


### BREAKING CHANGES

* **release:** developer need to store global variable or else into redux store, except function ([308c98a](https://gitlab.dwp.io/itapps/react-boilerplate/commit/308c98a46409ee5d7be96839e4c8c2400d427a38))

### Features

* **app:** add new provider to app ([d09e1bc](https://gitlab.dwp.io/itapps/react-boilerplate/commit/d09e1bcb8890ac93489b2dd4f55cbfc43558939f))
* **app:** add PWA to this app ([4da4f46](https://gitlab.dwp.io/itapps/react-boilerplate/commit/4da4f462bea84b85eac2b69251a377d45255cc20))
* **app:** internalization using i18next ([29cddc6](https://gitlab.dwp.io/itapps/react-boilerplate/commit/29cddc602e490edd5b50b483370d0577f05b3ce8))
* **CI:** add gitlab action CI for versioning ([1cdfe0a](https://gitlab.dwp.io/itapps/react-boilerplate/commit/1cdfe0a1890a94084a23b82e577741dbbdc73101))
* **component:** add notification ([7f36a93](https://gitlab.dwp.io/itapps/react-boilerplate/commit/7f36a93e0c64b8dcd3d882fadeaf5438ab81db11))
* **dep:** add new depedencies ([46995d1](https://gitlab.dwp.io/itapps/react-boilerplate/commit/46995d1ff26d5885423a2b58091ea898241bf4d1))
* **library:** add new library ([93db1d1](https://gitlab.dwp.io/itapps/react-boilerplate/commit/93db1d108f4a33f90fb77d35c948b7ad7dd5807a))
<!-- * **system:** new realtime feature using laravel-echo and pusher-js ([cc5c9be](https://gitlab.dwp.io/itapps/react-boilerplate/commit/cc5c9be632811280d61faf91fb91b3a8d679d131)) -->

### BREAKING CHANGES

* **system:** new .env variables
* **system:** add websocket for realtime event
* **system:** add new dependencies
* **release:** developer need to store global variable or else into redux store, except function ([308c98a](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/308c98a46409ee5d7be96839e4c8c2400d427a38))

### BREAKING CHANGES

* now this app support multiple language
* now this app support multiple language

# 1.0.0 (2023-09-06)


### Bug Fixes

* **CI:** add @semantic-release/changelog dependency ([0d873d7](https://gitlab.dwp.io/itapps/react-boilerplate/commit/0d873d73e8621daeb8b4ba404b675944298eed72))
* **component:** add new url variable ([52bdc4c](https://gitlab.dwp.io/itapps/react-boilerplate/commit/52bdc4c79cd1a802a886c320e6c87e4a9e717bbc))
* **component:** remove unused parameter ([38bc0f6](https://gitlab.dwp.io/itapps/react-boilerplate/commit/38bc0f6ebe9c3157b9cc5575dd0ead33742fbed6))
* **docs:** add "how to deploy" documentation ([da17c71](https://gitlab.dwp.io/itapps/react-boilerplate/commit/da17c717db6f0dfe3f1db5e109a2fa75aabb5e2a))
* **docs:** update deploy script ([3a5d74b](https://gitlab.dwp.io/itapps/react-boilerplate/commit/3a5d74ba6ad6b4496db03df60da46ca8ae2a7424))
* **docs:** update documentation ([82922f8](https://gitlab.dwp.io/itapps/react-boilerplate/commit/82922f89944d862b343026bd1e04bf0c6d94cf49))
* **docs:** update documentation ([f35b139](https://gitlab.dwp.io/itapps/react-boilerplate/commit/f35b139e5957284d6e29fc808b1bda86ccc83f3e))
* **docs:** update semantic-versioning documentation ([20a747d](https://gitlab.dwp.io/itapps/react-boilerplate/commit/20a747df0f11ebafccdb203b9653222c18a7bf4e))
* **docs:** update semantic-versioning documentation ([6435382](https://gitlab.dwp.io/itapps/react-boilerplate/commit/6435382b68f2ecd8efdc527fc0d6ec87df3a8a6f))
* **func:** change constant variable into a function ([7094cae](https://gitlab.dwp.io/itapps/react-boilerplate/commit/7094caee3010440a94e923eb264848e5b687d647))
* **func:** change some cookies methode to redux ([ad426a8](https://gitlab.dwp.io/itapps/react-boilerplate/commit/ad426a83e7f142f7097a44ee67f74eb150d6f846))
* **page:** change global variable from using context to redux ([0d03cf2](https://gitlab.dwp.io/itapps/react-boilerplate/commit/0d03cf24fe802c309f01d4aa295c0813e964d565))
* **page:** remove log ([c0e31d3](https://gitlab.dwp.io/itapps/react-boilerplate/commit/c0e31d3883fd96b775f89aa93936ca53945f190c))
* **system:** remove unused CICD script ([6de9602](https://gitlab.dwp.io/itapps/react-boilerplate/commit/6de96021f1373824ec7baa0dc43162193fb336ad))
* **system:** remove unused CICD script ([43a12c1](https://gitlab.dwp.io/itapps/react-boilerplate/commit/43a12c1c3da68f51135f373976dea1bc191d3313))


### chore

* **release:** 2.0.0 [skip ci] ([0d1fc8b](https://gitlab.dwp.io/itapps/react-boilerplate/commit/0d1fc8b54907fc5278f0f746c23e1d68e6eea2bf))


* BREAKING CHANGE: developer need to store global variable or else into redux store, except function ([308c98a](https://gitlab.dwp.io/itapps/react-boilerplate/commit/308c98a46409ee5d7be96839e4c8c2400d427a38))


### Features

* **app:** add new provider to app ([d09e1bc](https://gitlab.dwp.io/itapps/react-boilerplate/commit/d09e1bcb8890ac93489b2dd4f55cbfc43558939f))
* **app:** add PWA to this app ([4da4f46](https://gitlab.dwp.io/itapps/react-boilerplate/commit/4da4f462bea84b85eac2b69251a377d45255cc20))
* **app:** internalization using i18next ([29cddc6](https://gitlab.dwp.io/itapps/react-boilerplate/commit/29cddc602e490edd5b50b483370d0577f05b3ce8))
* **CI:** add gitlab action CI for versioning ([1cdfe0a](https://gitlab.dwp.io/itapps/react-boilerplate/commit/1cdfe0a1890a94084a23b82e577741dbbdc73101))
* **component:** add notification ([7f36a93](https://gitlab.dwp.io/itapps/react-boilerplate/commit/7f36a93e0c64b8dcd3d882fadeaf5438ab81db11))
* **dep:** add new depedencies ([46995d1](https://gitlab.dwp.io/itapps/react-boilerplate/commit/46995d1ff26d5885423a2b58091ea898241bf4d1))
* **library:** add new library ([93db1d1](https://gitlab.dwp.io/itapps/react-boilerplate/commit/93db1d108f4a33f90fb77d35c948b7ad7dd5807a))
<!-- * **system:** new realtime feature using laravel-echo and pusher-js ([cc5c9be](https://gitlab.dwp.io/itapps/react-boilerplate/commit/cc5c9be632811280d61faf91fb91b3a8d679d131)) -->


### BREAKING CHANGES

* **system:** new .env variables
* **system:** add websocket for realtime event
* **system:** add new dependencies
* **release:** developer need to store global variable or else into redux store, except function ([308c98a](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/308c98a46409ee5d7be96839e4c8c2400d427a38))

### BREAKING CHANGES

* now this app support multiple language
* now this app support multiple language

# [3.0.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v2.1.0...v3.0.0) (2023-09-05)


### Bug Fixes

* **system:** remove unused CICD script ([6de9602](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/6de96021f1373824ec7baa0dc43162193fb336ad))
* **system:** remove unused CICD script ([43a12c1](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/43a12c1c3da68f51135f373976dea1bc191d3313))


### Features
<!-- 
* **system:** new realtime feature using laravel-echo and pusher-js ([cc5c9be](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/cc5c9be632811280d61faf91fb91b3a8d679d131)) -->


### BREAKING CHANGES

* **system:** new .env variables
* **system:** add websocket for realtime event
* **system:** add new dependencies

# [2.1.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v2.0.0...v2.1.0) (2023-09-05)


### Bug Fixes

* **component:** add new url variable ([52bdc4c](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/52bdc4c79cd1a802a886c320e6c87e4a9e717bbc))
* **component:** remove unused parameter ([38bc0f6](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/38bc0f6ebe9c3157b9cc5575dd0ead33742fbed6))


### Features

* **component:** add notification ([7f36a93](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/7f36a93e0c64b8dcd3d882fadeaf5438ab81db11))

# [2.0.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v1.1.0...v2.0.0) (2023-08-10)


* BREAKING CHANGE: developer need to store global variable or else into redux store, except function ([308c98a](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/308c98a46409ee5d7be96839e4c8c2400d427a38))


### BREAKING CHANGES

* now this app support multiple language

# [1.1.0](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v1.0.1...v1.1.0) (2023-08-10)


### Bug Fixes

* **docs:** update documentation ([82922f8](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/82922f89944d862b343026bd1e04bf0c6d94cf49))
* **func:** change constant variable into a function ([7094cae](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/7094caee3010440a94e923eb264848e5b687d647))
* **func:** change some cookies methode to redux ([ad426a8](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/ad426a83e7f142f7097a44ee67f74eb150d6f846))
* **page:** change global variable from using context to redux ([0d03cf2](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/0d03cf24fe802c309f01d4aa295c0813e964d565))
* **page:** remove log ([c0e31d3](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/c0e31d3883fd96b775f89aa93936ca53945f190c))


### Features

* **app:** add new provider to app ([d09e1bc](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/d09e1bcb8890ac93489b2dd4f55cbfc43558939f))
* **app:** add PWA to this app ([4da4f46](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/4da4f462bea84b85eac2b69251a377d45255cc20))
* **app:** internalization using i18next ([29cddc6](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/29cddc602e490edd5b50b483370d0577f05b3ce8))
* **dep:** add new depedencies ([46995d1](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/46995d1ff26d5885423a2b58091ea898241bf4d1))

## [1.0.1](https://gitlab.dwp.io/dharma.putra/react-boilerplate/compare/v1.0.0...v1.0.1) (2023-08-08)


### Bug Fixes

* **docs:** add "how to deploy" documentation ([da17c71](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/da17c717db6f0dfe3f1db5e109a2fa75aabb5e2a))
* **docs:** update deploy script ([3a5d74b](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/3a5d74ba6ad6b4496db03df60da46ca8ae2a7424))

# 1.0.0 (2023-08-05)


### Bug Fixes

* **CI:** add @semantic-release/changelog dependency ([0d873d7](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/0d873d73e8621daeb8b4ba404b675944298eed72))
* **docs:** update documentation ([f35b139](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/f35b139e5957284d6e29fc808b1bda86ccc83f3e))
* **docs:** update semantic-versioning documentation ([20a747d](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/20a747df0f11ebafccdb203b9653222c18a7bf4e))
* **docs:** update semantic-versioning documentation ([6435382](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/6435382b68f2ecd8efdc527fc0d6ec87df3a8a6f))


### Features

* **CI:** add gitlab action CI for versioning ([1cdfe0a](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/1cdfe0a1890a94084a23b82e577741dbbdc73101))
* **library:** add new library ([93db1d1](https://gitlab.dwp.io/dharma.putra/react-boilerplate/commit/93db1d108f4a33f90fb77d35c948b7ad7dd5807a))
