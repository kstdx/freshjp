---
description: |
    ルートにカスタムハンドラを追加して、HTTPヘッダをカスタマイズしたり、APIを実装したりすることができます。
    ルートやレンダリングページのデータフェッチ、フォーム送信の処理などを行います。
---

ルートは、実際にはハンドラとページコンポーネントの 2 つの部分から構成されています。最大で
この章では、ページコンポーネントについてのみ説明します。

ハンドラとは、`Request => Response`の形をした関数、あるいは
にリクエストがあったときに呼び出される `Request => Promise<Response>` というものである。
特定のルートで使用されます。すべての HTTP メソッドをカバーするハンドラーを 1 つ用意することもできますし、1 つの HTTP メソッドをカバーするハンドラーを用意することもできます。
ハンドラはメソッドごとに用意されています。

ハンドラは `Request` オブジェクトにアクセスすることができ、このオブジェクトはリクエストを
ルートで、`Response` オブジェクトを返す必要があります。レスポンスオブジェクトは
手動で作成することもできますし（例えば、API ルートの JSON レスポンスなど）。
は、ページコンポーネントのレンダリングによって作成されます。デフォルトでは、ページコンポーネントをレンダリングしないすべてのルートは
カスタムハンドラを定義する ページをレンダリングするだけのデフォルトハンドラを使用する
コンポーネントを使用します。

ルートモジュールでハンドラを定義するには、名前付きエクスポートとして
ハンドラ`という名前です。ハンドラには 2 つの形式があります：プレーンな関数(のキャッチコピー)
または、各プロパティが以下のような関数であるプレーンオブジェクトです。
は、そのハンドラが扱う HTTP メソッドを指定します。

以下は、ページコンポーネントをレンダリングするカスタム `GET` ハンドラの例です。
で、レスポンスにカスタムヘッダを追加してから返します。

``tsx
// ルート/about.tsx

インポート { ハンドラーズ } from '$fresh/server.ts'

export const handler: ハンドラー = {
非同期 GET(req, ctx) {。
const resp = await ctx.render()
resp.headers.set('X-Custom-Header', 'Hello')
リターンレスポンス
}
}

エクスポートデフォルト関数 AboutPage() {
返す
<main>
<h1>会社概要</h1>。
<p>これはアバウトなページです</p>。
</main>
)
}

```

なお、ハンドラは `ctx.render()` を呼び出す必要はない。この機能は以下のように使用することができます。
を使用してAPIルートを作成します。以下は、ランダムなUUIDをJSONとして返すAPIルートです。
のレスポンスがあります。

(`・ω・´)キリッ
// routes/api/random-uuid.ts

import { Handlers } from '$fresh/server.ts'

export const handler: ハンドラー = {
    GET（req）{
        const uuid = crypto.randomUUID()
        return new Response(JSON.stringify(uuid), {.
            ヘッダーを使用します。{ 'Content-Type': 'application/json' }.
        })
    }
}
```