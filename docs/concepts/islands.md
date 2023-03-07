---
description: |
    アイランドは、Freshのクライアントサイドのインタラクティブ性を可能にします。サーバでレンダリングされるだけでなく、クライアントでハイドレーションされます。
---

Islands enable client side interactivity in Fresh. Islands are isolated Preact
components that are rendered on the client. This is different from all other
components in Fresh, as they are usually just rendered on the server.

Islands are defined by creating a file in the `islands/` folder in a Fresh
project. The name of this file must be a PascalCase or kebab-case name of the
island. The file must have a default export that is a regular Preact component.

```tsx
// islands/MyIsland.tsx

import { useState } from 'preact/hooks'

export default function MyIsland() {
    const [count, setCount] = useState(0)

    return (
        <div>
            Counter is at {count}.{' '}
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}
```

An island can be used in a page like a regular Preact component. Fresh will take
care of automatically re-hydrating the island on the client.

Passing props to islands is supported, but only if the props are JSON
シリアライズ可能です。つまり、プリミティブな型、プレーンなオブジェクトしか渡すことができない。
と配列を渡すことができます。現在のところ、`Date`のような複雑なオブジェクトを渡すことはできない。
カスタムクラス、または関数を使用することができます。つまり
なぜなら、`children`は VNode であり、シリアライズできないからです。

また、島を他の島の中に入れ子にすることもサポートされていません。
