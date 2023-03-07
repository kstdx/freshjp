---
description: |
    エラーページは、アプリケーションでエラーが発生したときに表示されるページをカスタマイズするために使用します。
---

Fresh は `404 Not Found` のカスタマイズをサポートしています。
500 Internal Server Error」ページ。これは、リクエストを行ったにもかかわらず、サーバーが起動しなかった場合に表示されます。
が存在し、かつ、ミドルウェア、ルートハンドラ、ページコンポーネントのいずれかが該当する場合
は、それぞれエラーを投げます。

### 404: 見つかりませんでした

404 ページは、`routes/` に `_404.tsx` ファイルを作成することでカスタマイズすることができます。
フォルダーに保存されます。このファイルには、通常の Preact コンポーネントであるデフォルトのエクスポートが必要です。
引数として `UnknownPageProps` 型の props オブジェクトが渡される。

``tsx
import { UnknownPageProps } from '$fresh/server.ts'

export default function NotFoundPage({ url }: UnknownPageProps) { 。
return <p>404 not found: {url.pathname}</p>
}

```

#### 404ページを手動でレンダリングする

URL に一致するルートがない場合、`_404.tsx` ファイルが自動的に起動されます。
場合によっては、404ページのレンダリングを手動でトリガーする必要があります。
例えば、ルートは一致したが、要求されたリソースが存在しない場合です。
これは `ctx.renderNotFound` を使って実現することができます。

``tsx
import { Handlers, PageProps } from '$fresh/server.ts'.

export const handler: ハンドラー = {
    非同期GET(req, ctx) {。
        const blogpost = await fetchBlogpost(ctx.params.slug)
        if (!blogpost) {
            return ctx.renderNotFound()
        }
        return ctx.render({ blogpost })
    }
}

export default function BlogpostPage({ data }) {。
    返す
        <article>のページです。
            <h1>{data.blogpost.title}</h1>。
            {/* 残りのページ */}。
        </article>
    )
}
```

### 500: 内部サーバーエラー

500 ページは、`routes/`に`_500.tsx`ファイルを作成することでカスタマイズすることができます。
フォルダーに保存されます。このファイルには、通常の Preact コンポーネントであるデフォルトのエクスポートが必要です。
引数として `ErrorPageProps` 型の props オブジェクトが渡される。

``tsx
import { ErrorPageProps } from '$fresh/server.ts'

export default function Error500Page({ error }: ErrorPageProps) { 。
return <p>500 内部エラーです。{(error as Error).message}</p>
}

```

```
