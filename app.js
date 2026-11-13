// GitHubスター急増ビューア
// dynamic-sort ガイドに従い、並び替え・切替ではDOMを作り直さず、
// 既存ノードを moveBefore() で並び替える。遷移はリスト要素への
// スコープ付き View Transition を優先する。
(function () {
  "use strict";

  var DATA = window.STAR_DATA;
  var state = { dataset: "trending", sort: "gain" };

  var rankingEl = document.getElementById("ranking");
  var noteEl = document.getElementById("dataset-note");
  var caveatEl = document.getElementById("dataset-caveat");
  var extrasSection = document.getElementById("extras");
  var extrasList = document.getElementById("extras-list");
  var announcer = document.getElementById("announcer");
  var detail = document.getElementById("detail");

  var fmt = new Intl.NumberFormat("ja-JP");

  // カード要素はデータセットごとに一度だけ作り、使い回す（作り直さない）
  var cardCache = new Map();

  function cardKey(datasetKey, repo) {
    return datasetKey + ":" + repo;
  }

  function transitionName(datasetKey, repo) {
    return "card-" + datasetKey + "-" + repo.replace(/[^a-zA-Z0-9_-]/g, "-");
  }

  function getCard(datasetKey, item) {
    var key = cardKey(datasetKey, item.repo);
    if (cardCache.has(key)) return cardCache.get(key);

    var li = document.createElement("li");
    li.className = "card";
    li.style.viewTransitionName = transitionName(datasetKey, item.repo);

    var rank = document.createElement("div");
    rank.className = "card-rank";
    li.appendChild(rank);

    var name = document.createElement("div");
    name.className = "card-name";
    var link = document.createElement("a");
    link.href = "https://github.com/" + item.repo;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = item.repo;
    name.appendChild(link);
    li.appendChild(name);

    var gain = document.createElement("div");
    gain.className = "card-gain";
    gain.textContent = "+" + fmt.format(item.gain) + " ";
    var gainUnit = document.createElement("small");
    gainUnit.textContent = "スター";
    gain.appendChild(gainUnit);
    li.appendChild(gain);

    var meta = document.createElement("div");
    meta.className = "card-meta";
    if (item.lang) {
      var chip = document.createElement("span");
      chip.className = "lang-chip";
      chip.textContent = item.lang;
      meta.appendChild(chip);
    }
    var total = document.createElement("span");
    total.textContent = "総スター " + fmt.format(item.total);
    meta.appendChild(total);
    if (item.forks != null) {
      var forks = document.createElement("span");
      forks.textContent = "forks " + fmt.format(item.forks);
      meta.appendChild(forks);
    }
    li.appendChild(meta);

    var desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = item.desc;
    li.appendChild(desc);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card-detail-btn";
    btn.textContent = "詳細を見る";
    btn.addEventListener("click", function () {
      openDetail(datasetKey, item, li.querySelector(".card-rank").textContent);
    });
    li.appendChild(btn);

    cardCache.set(key, li);
    return li;
  }

  // 現在の並び順のアイテムと順位（同点は同順位）を返す
  function orderedItems() {
    var items = DATA[state.dataset].items.slice();
    var key = state.sort;
    items.sort(function (a, b) { return b[key] - a[key]; });
    var rank = 0;
    return items.map(function (item, i) {
      if (i === 0 || items[i - 1][key] !== item[key]) rank = i + 1;
      return { item: item, rank: rank };
    });
  }

  function announce(message) {
    announcer.textContent = "";
    // 同じ文面でも通知されるよう、次フレームで入れ直す
    requestAnimationFrame(function () { announcer.textContent = message; });
  }

  function applyUpdate() {
    var dataset = DATA[state.dataset];
    var ordered = orderedItems();
    var nodes = ordered.map(function (entry) {
      return getCard(state.dataset, entry.item);
    });

    // データセット切替: 新しい集合に無いカードを取り除く
    Array.prototype.slice.call(rankingEl.children).forEach(function (child) {
      if (nodes.indexOf(child) === -1) child.remove();
    });
    // dynamic-sort: 既存ノードは moveBefore で並び替える（再生成しない）。
    // ただし moveBefore は「既にDOMにいるノード」を動かすためのAPIで、
    // 未挿入のノードには使えない（例外になる）ため、初回挿入は appendChild を使う。
    nodes.forEach(function (node) {
      if (node.parentNode === rankingEl && typeof rankingEl.moveBefore === "function") {
        rankingEl.moveBefore(node, null);
      } else {
        rankingEl.appendChild(node);
      }
    });

    // 順位バッジと1位の強調を更新
    ordered.forEach(function (entry, i) {
      var el = nodes[i];
      el.querySelector(".card-rank").textContent = entry.rank + "位";
      el.classList.toggle("is-first", entry.rank === 1);
    });

    noteEl.textContent = dataset.note;
    if (dataset.caveat) {
      caveatEl.textContent = dataset.caveat;
      caveatEl.hidden = false;
    } else {
      caveatEl.hidden = true;
    }

    // 番外（Trending版のみ）
    if (dataset.extras && dataset.extras.length > 0) {
      extrasSection.hidden = false;
      extrasList.textContent = "";
      dataset.extras.forEach(function (item) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "https://github.com/" + item.repo;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = item.repo;
        li.appendChild(a);
        li.appendChild(document.createTextNode(
          " ― 本日 +" + fmt.format(item.gain) + "スター／" +
          (item.lang ? item.lang + "／" : "") +
          "総スター " + fmt.format(item.total) + " ― " + item.desc
        ));
        extrasList.appendChild(li);
      });
    } else {
      extrasSection.hidden = true;
    }

    announce(
      dataset.label + "を表示しました。全" + ordered.length + "件、" +
      (state.sort === "gain" ? "増分順" : "総スター順") + "です。"
    );
  }

  function withTransition(update) {
    var transition = null;
    try {
      if (typeof rankingEl.startViewTransition === "function") {
        transition = rankingEl.startViewTransition(update);
      } else if (typeof document.startViewTransition === "function") {
        transition = document.startViewTransition(update);
      }
    } catch (e) {
      transition = null;
    }
    if (!transition) {
      update();
      return;
    }
    if (transition.finished && transition.finished.catch) {
      transition.finished.catch(function () {});
    }
    if (transition.updateCallbackDone && transition.updateCallbackDone.catch) {
      transition.updateCallbackDone.catch(function () {});
    }
  }

  function refresh(useTransition) {
    if (useTransition) withTransition(applyUpdate);
    else applyUpdate();
  }

  function openDetail(datasetKey, item, rankText) {
    document.getElementById("detail-rank").textContent =
      DATA[datasetKey].label + " ― " + rankText;
    document.getElementById("detail-name").textContent = item.repo;
    document.getElementById("detail-gain").textContent =
      "+" + fmt.format(item.gain) + " スター";
    document.getElementById("detail-lang").textContent = item.lang || "―";
    document.getElementById("detail-total").textContent = fmt.format(item.total);
    document.getElementById("detail-forks").textContent =
      item.forks != null ? fmt.format(item.forks) : "―";
    document.getElementById("detail-desc").textContent = item.desc;
    var link = document.getElementById("detail-link");
    link.href = "https://github.com/" + item.repo;
    if (typeof detail.showPopover === "function") detail.showPopover();
  }

  document.getElementById("detail-close").addEventListener("click", function () {
    if (typeof detail.hidePopover === "function") detail.hidePopover();
  });

  function wireToggle(id, onSelect) {
    var btn = document.getElementById(id);
    btn.addEventListener("click", function () { onSelect(btn); });
    return btn;
  }

  function setActive(buttons, activeBtn) {
    buttons.forEach(function (b) {
      var isActive = b === activeBtn;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  var datasetButtons = [];
  datasetButtons.push(wireToggle("btn-dataset-trending", function (btn) {
    if (state.dataset !== "trending") {
      state.dataset = "trending";
      setActive(datasetButtons, btn);
      refresh(true);
    }
  }));
  datasetButtons.push(wireToggle("btn-dataset-gharchive", function (btn) {
    if (state.dataset !== "gharchive") {
      state.dataset = "gharchive";
      setActive(datasetButtons, btn);
      refresh(true);
    }
  }));

  var sortButtons = [];
  sortButtons.push(wireToggle("btn-sort-gain", function (btn) {
    if (state.sort !== "gain") {
      state.sort = "gain";
      setActive(sortButtons, btn);
      refresh(true);
    }
  }));
  sortButtons.push(wireToggle("btn-sort-total", function (btn) {
    if (state.sort !== "total") {
      state.sort = "total";
      setActive(sortButtons, btn);
      refresh(true);
    }
  }));

  refresh(false);
})();
