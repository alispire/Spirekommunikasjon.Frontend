# Installer
Dette trenger du:
- [Node](https://nodejs.org/en/)
- [Node package manager (NPM)](https://www.npmjs.com/)
- [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start) på din maskin.

## Fremgangsmåte
1. Klon git-repoet
2. Gå til mappen med prosjektet
3. Kjør `npm init`
4. Kjør `npm install`
5. Kjør `gulp` i terminalen 

## Redigering
### html
Rediger html i mappen `./templates` og `./templates/modules`. Disse filene skrives ut i root-mappen.

### Css/scss
Redigeres I `./assets/scss` skrives ut som css I `./assets/css`.

### Javascript
Kildefiler som skal inkluderes legges i `./assets/js/src` .
Inkluder så filene i `assets/js/src/script.js`med følgende syntax. Eksempler:
```
//=require vendor/jquery.js
//=require vendor/**/*.js
//=include relative/path/to/file.js
//=include ./relative/path/to/file-even-when-includePaths-set.js
```
