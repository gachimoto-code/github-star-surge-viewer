// GitHubスター急増ビューアのデータ。
// 数値はいずれも取得・集計時点の確定値で、その後も増え続けます。
window.STAR_DATA = {
  trending: {
    label: "Trending版（2026年11月13日）",
    note: "GitHub Trending（daily）を2026年11月13日23時04分（日本時間）に取得し、「stars today」の大きい順に並べ替えたもの。TrendingはGitHubのアルゴリズムで選ばれた一覧であり、全リポジトリの網羅的なランキングではありません。「stars today」の区切りはGitHub側の日次集計（米国太平洋時間ベース）で、日本時間の当日や厳密な24時間とは一致しません。",
    caveat: null,
    items: [
      { repo: "GoogleChrome/modern-web-guidance-src", gain: 1875, lang: "TypeScript", total: 4285, forks: 247, desc: "Google Chrome公式。コーディングエージェントに最新のWeb開発ベストプラクティスを覚えさせるためのガイダンス集" },
      { repo: "we-promise/sure", gain: 944, lang: "Ruby", total: 14402, forks: 1090, desc: "「みんなのための、みんなで作る」個人向け家計アプリ（パーソナルファイナンス）" },
      { repo: "openai/codex-security", gain: 754, lang: "TypeScript", total: 12855, forks: 1008, desc: "OpenAI公式。脆弱性を見つけ、検証し、修正するためのCodex Security CLIとTypeScript SDK" },
      { repo: "ZhuLinsen/daily_stock_analysis", gain: 272, lang: "Python", total: 71304, forks: 57224, desc: "LLM駆動の株式分析システム。複数市場の行情データ、リアルタイムニュース、判断用ダッシュボード、自動通知を備える" },
      { repo: "Likely7/Veyra-NRVideo", gain: 245, lang: "C++", total: 1447, forks: 66, desc: "Windows向けの動画プレイヤー／キャプチャ強化ツール。AI超解像とフレーム生成を掲げる" },
      { repo: "alibaba/open-code-review", gain: 206, lang: "Go", total: 50241, forks: 3727, desc: "Alibaba製のコードレビューツール。Trendingの表示順では1位だったが、増分では6位" },
      { repo: "tailscale/tailcat", gain: 173, lang: "Go", total: 9238, forks: 426, desc: "Tailscale製。netcatをTailscaleのデータプレーン上で動かす道具" },
      { repo: "backnotprop/plannotator", gain: 100, lang: "TypeScript", total: 10289, forks: 780, desc: "AIエージェントと協働するためのワークスペース。計画、注釈、レビュー、フィードバック送信ができる" },
      { repo: "block/buzz", gain: 95, lang: "Rust", total: 37177, forks: 4931, desc: "Block（旧Square）による「集合知（hive mind）」コミュニケーションプラットフォーム" },
      { repo: "louislam/uptime-kuma", gain: 61, lang: "JavaScript", total: 93657, forks: 8711, desc: "定番のセルフホスト型の監視ツール" }
    ],
    extras: [
      { repo: "tradermonty/claude-trading-skills", gain: 60, lang: "Python", total: 3921, forks: null, desc: "Claude Code向けのトレーディング用skills集（株×AI）" },
      { repo: "ChromeDevTools/chrome-devtools-mcp", gain: 60, lang: "TypeScript", total: 55252, forks: null, desc: "コーディングエージェントからChrome DevToolsを使うためのMCP" }
    ]
  },
  gharchive: {
    label: "GH Archive日本時間版（2026年11月12日）",
    note: "GH Archiveのスターイベント（WatchEvent）を、日本時間2026年11月12日0:00〜24:00（UTC 2026-11-11 15:00〜2026-11-12 15:00）で自前集計したもの。",
    caveat: "注意: この集計は検証環境の小規模なサンプルフィードで行ったため、絶対数は本番GitHubの水準ではありません。集計方法の検証用データです。",
    items: [
      { repo: "aws/aws-emulator", gain: 60, lang: "Rust", total: 6428, forks: 240, desc: "AWS APIのローカルエミュレータ" },
      { repo: "morluto/rea", gain: 35, lang: "TypeScript", total: 456727, forks: 112133, desc: "エージェントで何でもリバースエンジニアリングするツール" },
      { repo: "GoogleChrome/modern-web-guidance", gain: 34, lang: null, total: 9776, forks: 333, desc: "コーディングエージェント向けに最新のWebベストプラクティスを提供するガイダンス（このビューアの構築に使ったガイダンスの本体リポジトリ）" },
      { repo: "janestreet/agent_skills", gain: 25, lang: null, total: 8082, forks: 526, desc: "Jane Streetのエージェントスキル集" },
      { repo: "storytold/craft-anything", gain: 23, lang: "Rust", total: 31038, forks: 6338, desc: "ソフトウェアの仕組みを理解し自分のものを作るためのツール" },
      { repo: "meta/astryx", gain: 23, lang: "TypeScript", total: 27186, forks: 2106, desc: "カスタマイズ可能でエージェント対応のオープンソース・デザインシステム" },
      { repo: "pingdotgg/t3code", gain: 21, lang: "TypeScript", total: 59134, forks: 10759, desc: "Claude CodeやCodexを任意のPC・スマホから操作するツール" },
      { repo: "Ebony-Vinyl/dsh-our-free-model", gain: 20, lang: "JavaScript", total: 72418, forks: 1987, desc: "dsh用プラグイン（ログイン不要でDeepSeek等のモデルを無料利用）" },
      { repo: "Lee-xeo/Claude-Cage", gain: 19, lang: "Go", total: 5174, forks: 574, desc: "Claude専用の軽量仮想マシン環境" },
      { repo: "addyosmani/agent-skills", gain: 17, lang: "JavaScript", total: 117018, forks: null, desc: "エージェント向けスキル集" }
    ],
    extras: []
  }
};
