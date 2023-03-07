---
description: |
    HTML の `<form>` 要素を使ったユーザー入力をクライアントサイドで堅牢に処理し、フォームの
    サブミッションハンドラーをサーバーサイドに設置します。
---

フォームとは、ユーザーがアプリケーションと対話するための一般的な仕組みです。で
ここ数年、ウェブアプリケーションは、より一般的になってきています。
は、フォームの送信を完全にクライアントに移します。これは、以下のような有用な特性を持つことができます。
インタラクティブ性はともかく、耐障害性やユーザーエクスペリエンスにはかなり劣ります。
を丸ごと使っています。ブラウザーには、フォーム送信のための優れたシステムが組み込まれています。
HTML の `<form>` 要素を中心に構成されています。

Fresh は、フォーム送信のインフラストラクチャの中核を、ネイティブの
`<form>` 要素を使用します。このページでは、Fresh での `<form>` の使い方を説明し、次のページでは、Fresh での `<form>` の使い方を説明します。
の章では、クライアントサイドでフォームを段階的に強化する方法を説明します。
JavaScript を使用して、よりインタラクティブにすることができます。

ブラウザでフォームが機能する方法は、HTML のナビゲーションを実行することです。
アクションを実行します。ほとんどの場合、これは
フォームが送信されると、GET または POST リクエストがサーバーに送信されます。
データで応答し、レンダリングする新しいページで応答します。

Fresh は、GET と POST の両方のリクエストに対応するために
[カスタムハンドラー][custom-handlers]の機能を持つルートです。ハンドラーは、以下のことを実行することができます。
フォームデータに対して必要な処理を施した上で、データを渡す。
ctx.render()`を呼び出して、新しいページをレンダリングします。

以下は、名前の配列にフィルタをかける検索フォームを実装した例です。
サーバー側で

サーバ側： ``tsx
// routes/search.tsx

import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

インターフェース Data {
results: string[];
クエリ：文字列
}

export const handler: ハンドラーズ<データ> = {
GET(req, ctx) { ← クリックすると拡大します。
const url = new URL(req.url);
const query = url.searchParams.get("q") || "";
const results = NAMES.filter((name) => name.includes(query));
return ctx.render({ results, query });
},
};

エクスポートデフォルト関数 Page({ data }: PageProps<Data>) {.
const { results, query } = data;
リターン(
<div>
<form>
<input type="text" name="q" value={query} />
<button type="submit">Search</button>
</form>
<ul>
{results.map((name) => <li key={name}>{name}</li>)}
</ul>
</div>
);
}

```

When the user submits the form, the browser will navigate to `/search` with the
query set as the `q` query parameter in the URL. The `GET` handler will then
filter the names array based on the query, and pass it to the page component for
rendering.

<!-- TODO(lucacasonato): link to todo app example when that is built again -->

[custom-handlers]: /docs/getting-started/custom-handlers
```
