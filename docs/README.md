# 📕 Documentation

## \[WIP\] ✒ For Editors

1. GitHub アカウントが[宮下研究室](https://github.com/MiyashitaLab)に所属しているか確認してください
2. https://miyashita.com/admin/ から編集画面へログインできます

## \[WIP\] 🛠 For Developers

### Getting Started

#### Install depenencies

```bash
yarn
```

#### Develop editor

```bash
# Run once for building mockdata
node scripts/generateTestRepoFiles.js
# Start dev server
yarn start:cms
```

Then, access http://localhost:3000/admin/

#### Develop website

```bash
# Start dev server
yarn start:react-static
```

Then, access http://localhost:3000/

#### Check publication

```bash
# Export to ./dist/
yarn build
# Run server (e.g. http-server)
http-server -p 3000 ./dist/
```

### Tech stack

- [Netlify CMS](https://github.com/netlify/netlify-cms)
  - > エディタ画面
- [React Static](https://github.com/nozzle/react-static)
  - > サイト全体
- [cssnext](https://github.com/MoOx/postcss-cssnext)
  - > AltCSS

### Note

- `~/` は `src/` に alias されている
  - e.g. `~/containers/Home.jsx` -> `src/containers/Home.jsx`

### Directories

- `articles` | サイト記事の内容が Markdown で格納されている
- `config` | 各種設定ファイル（e.g. webpack.config.js）
  - `cms` | エディタの設定
  - `react-static` | サイトの設定
  - `redirects` | リダイレクトの設定
- `docs` | ドキュメント
- `public` | 公開ファイル
- `scripts` | ビルド時に使うスクリプトなど
- `src` | コード本体
  - `assets` | フォントや画像など
  - `cms` | エディタ関係
    - `backends` | モック用リポジトリ
    - `lib` | ライブラリ群
    - `previews` | プレビュー画面
    - `widgets` | 編集画面のウィジェット
    - `config.yml` | Netlify CMS の設定
    - `index.ejs` | /admin/ のテンプレート
  - `components` | コンポーネント
  - `containers` | ページ
  - `lib` | ライブラリ群
  - `styles` | 変数やグローバル CSS など
  - `types` | 型定義ファイル
- `static.config.js` | React Static の設定ファイル
