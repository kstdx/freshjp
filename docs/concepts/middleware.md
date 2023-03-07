---
description: |
    ミドルウェアのルートを追加して、分析目的やアクセス制御などのためにリクエストやレスポンスをインターセプトします。
---

ミドルウェアは `_middleware.ts` ファイルで定義されます。このファイルは
の前後でカスタムロジックを実行できるようにするためです。
ハンドラーを使用します。これにより、リクエストやレスポンスの修正・確認が可能になります。一般的な
ロギング、認証、パフォーマンス監視などのユースケースです。

各ミドルウェアは、Context の引数に`next`関数を渡されます。
は、子ハンドラを起動するために使用されます。また、`ctx`は `state` プロパティを持ち、以下のことが可能である。
は、下流（または上流）のハンドラに任意のデータを渡すために使用されます。

```ts
// ルート/_middleware.ts
import { MiddlewareHandlerContext } from '$fresh/server.ts'

インタフェース State {
    data: 文字列
}

エクスポート非同期関数ハンドラ(
    req: リクエスト。
    ctx: MiddlewareHandlerContext<State>を使用する。
) {
    ctx.state.data = 'myData' です。
    const resp = await ctx.next()
    resp.headers.set('server', 'fresh server')
    リターンレスポンス
}
```

(`・ω・´)キリッ
// routes/myHandler.ts
export const handler: Handlers<any, { data: string }> = {。
    GET(_req, ctx) { ．
        return new Response(`middleware data is ${ctx.state.data}`)
}
}

````

ミドルウェアはスコープがあり、レイヤー化することが可能です。つまり、あるプロジェクトには
複数のミドルウェアがあり、それぞれが異なる経路をカバーする。もし、複数の
ミドルウェアがルートをカバーする場合、特定性の高い順（最も低い順）に、すべてのミドルウェアが実行されます。
specific first)を使用します。

例えば、以下のようなルートがあるプロジェクトを考えてみましょう。

- `routes/_middleware.ts` とします。
- `routes/index.ts` とする。
- `routes/admin/_middleware.ts` とする。
- `routes/admin/index.ts` とする。
- `routes/admin/signin.ts` とする。

`/` へのリクエストは次のように流れます。

1. ミドルウェア `routes/_middleware.ts` が起動される。
2. 2. `ctx.next()` を呼び出すと、`routes/index.ts` ハンドラが起動されます。

admin`へのリクエストの場合、リクエストの流れは以下のようになる。

1. routes/_middleware.ts`ミドルウェアが起動される。
2. 2. `ctx.next()` を呼び出すと、`routes/admin/_middleware.ts` が呼び出される。
   ミドルウェア
3. ctx.next()` を呼び出すと `routes/admin/index.ts` ハンドラが起動します。

admin/signin`へのリクエストは、以下のような流れになります。

1. routes/_middleware.ts`ミドルウェアが起動される。
2. 2. `ctx.next()` を呼び出すと、`routes/admin/_middleware.ts` ミドルウェアが起動される。
   ミドルウェア
3. ctx.next()` を呼び出すと、`routes/admin/signin.ts` ハンドラが呼び出されます。

一つのミドルウェアファイルで、複数のミドルウェアを定義することもできます。
ルート)を使用する場合は、単一のハンドラではなく、ハンドラの配列をエクスポートします。については
の例です。

例：```ts
// routes/_middleware.ts

エクスポートコンストハンドラー = [
    非同期関数 middleware1(req, ctx) {。
        // 何かする
        return ctx.next()
    },
    非同期関数 middleware2(req, ctx) {。
        // 何かする
        return ctx.next()
    }
]
````
