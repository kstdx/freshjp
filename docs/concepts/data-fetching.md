---
description: |
    Freshでのデータ取得は、ルートハンドラ関数の内部で行われます。これらは、page propsを介してページにルートデータを渡すことができます。
---

Server side data fetching in Fresh is accomplished through asynchronous handler
functions. These handler functions can call a `ctx.render()` function with the
data to be rendered as an argument. This data can then be retrieved by the page
component through the `data` property on the `props`.

Here is an example:

```tsx
interface Project {
    name: string
    stars: number
}

export const handler: Handlers<Project> = {
    async GET(_req, ctx) {
        const project = await db.projects.findOne({ id: ctx.params.id })
        if (!project) {
            return new Response('Project not found', { status: 404 })
        }
        return ctx.render(project)
    }
}

export default function ProjectPage(props: PageProps<Project>) {
    return (
        <div>
            <h1>{props.data.name}</h1>
            <p>{props.data.stars} stars</p>
        </div>
    )
}
```

PageProps`、`Handlers`、`ハンドラ`のtypeパラメータは、`PageProps`、`Handler`、`Handler`、`Handler`のいずれかになります。
HandlerContext`を使用すると、レンダリングに使用する TypeScript の型を指定することができます。
データで構成されています。Fresh は型チェックの際に、これらのフィールドのすべての型を強制します。
は、1 ページ内で互換性があります。
