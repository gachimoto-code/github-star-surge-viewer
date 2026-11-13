# GitHubスター急増ビューア

GitHubでスターが急増したリポジトリのランキングを、集計方式の異なる2つのデータセットで切り替えて眺めるビューアです。単一のHTMLファイル（`index.html`）で動くので、ダウンロードしてブラウザで開くだけで使えます。GitHub Pagesでそのまま公開することもできます。

note連載「GitHubスター急増top10」の試作号（2026年11月13日公開）でスター増分1位だった **GoogleChrome/modern-web-guidance**（Apache-2.0）のガイダンスを適用して構築した実験作です。

- 記事: [GitHubスター急増top10（2026年11月13日）― 24時間で星を集めたリポジトリ](https://note.com/fujimotec/n/nb267bde89d9a)

## データセット

### Trending版（2026年11月13日）

GitHub Trending（daily）を2026年11月13日23時04分（日本時間）に取得し、各リポジトリの「stars today」の大きい順に並べ替えたTop10＋番外2件。TrendingはGitHubのアルゴリズムで選ばれた一覧であり、全リポジトリの網羅的なランキングではありません。また「stars today」の区切りはGitHub側の日次集計（米国太平洋時間ベース）で、日本時間の当日や厳密な24時間とは一致しません。

### GH Archive日本時間版（2026年11月12日）

GH Archiveのスターイベント（WatchEvent）を、日本時間2026年11月12日0:00〜24:00（UTC 2026-11-11 15:00〜2026-11-12 15:00）で自前集計したTop10。

**注意**: この集計は検証環境の小規模なサンプルフィードで行ったため、絶対数は本番GitHubの水準ではありません。集計方法の検証用データとして収録しています。

## 適用したModern Web Guidance

ガイダンスは `npx modern-web-guidance@latest` のCLIで取得し、ガイド本文の実装指示に従いました。

- **group-element-transitions**: カードごとに固有の `view-transition-name`、共通の `view-transition-class`（`::view-transition-group(.ranking-card)`）、`:only-child` による入場（ease-out）・退場（ease-in）アニメーション
- **dynamic-sort**: 並び替え・データセット切替でDOMを作り直さず、既存ノードを `moveBefore()` で並び替え。リスト要素へのスコープ付き `startViewTransition` を優先し、`document.startViewTransition` にフォールバック。結果は `aria-live` で通知
- **motion**: `@media (prefers-reduced-motion: reduce)` でView Transitionのアニメーションを無効化
- その他: Container Queries（`container-type: inline-size` / `@container`）、Popover API（詳細表示）、`oklch` + `light-dark()` の配色、`content-visibility: auto`、`scrollbar-color`、`:focus-visible`

## 使い方

`index.html` をブラウザで開くだけです。データセット切替トグル、増分順／総スター順の並び替え、カードをタップ（クリック）すると詳細がポップオーバーで開きます。

## 備考

- 数値はいずれも取得・集計時点のもので、その後も増え続けます
- スター数は人気の目安であり、品質を保証するものではありません
- 各リポジトリの利用にあたっては、それぞれのライセンスをご確認ください
