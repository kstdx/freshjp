---
description: |
    カスタムハンドラを作成し、そのハンドラを渡すことで、ルートのデータを動的に取得することができます。
    のデータをレンダー関数に渡す。
---

これまでのデモプロジェクトでは、すべてのページで動的なデータを使用していない
レンダリング時に 実際のプロジェクトでは、これが異なることがよくあります。多くの場合
は、ディスクからファイルを読み込んだり（ブログ記事のマークダウンなど）、あるファイルを取得したりする必要があります。
API やデータベースからユーザーデータを取得します。

これらの操作はすべて非同期である。しかし、レンダリングは常に同期的である。
レンダリング中に直接データを取得するのではなく、レンダリング中にデータを読み込むために
ルートの `handler` 関数を経由してページコンポーネントに渡され、最初の
の引数で指定します。

ctx.render()`に渡されたデータは、その後に
ページコンポーネントの `props.data` フィールドを使用します。

GitHub API からユーザーデータを取得するルートの例です。
をページコンポーネントでレンダリングします。

``tsx
// routes/github/[username].tsx

import { Handlers, PageProps } from '$fresh/server.ts'.

インターフェイス ユーザー {
ログイン：文字列
name: 文字列
avatar_url: 文字列
}

export const handler: Handlers<User | null> = {
async GET(\_, ctx) {
const { username } = ctx.params
const resp = await fetch(`https://api.github.com/users/${username}`)
if (resp.status === 404) {
return ctx.render(null)
}
const user: User = await resp.json()
return ctx.render(user)
}
}

export default function Page({ data }: PageProps<User | null>) {
if (!data) {
return <h1>User not found</h1>
}

    return (
        <div>
            <img src={data.avatar_url} width={64} height={64} />
            <h1>{data.name}</h1>
            <p>{data.login}</p>
        </div>
    )

}

```

The data is first fetched inside of the handler by making an API call to GitHub.
If the API call succeeds, the data is passed to the page component. If the API
call fails, the page component is rendered with `null` as the data. The page
コンポーネントは、プロップからデータを取得し、レンダリングします。
```
