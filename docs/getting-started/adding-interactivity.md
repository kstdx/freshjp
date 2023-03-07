---
description: |
    ユーザーを犠牲にすることなく、JavaScriptベースのインタラクティブ性をプロジェクトに追加することができます。
    フレッシュの強力なアイランドシステムを活用することで、より快適な体験を提供します。
---

これまで、デモプロジェクトのどのページにも、クライアントサイドは含まれていませんでした。
JavaScript です。これは弾力性とパフォーマンスの面では素晴らしいことですが、次のような制限もあります。
インタラクティブの可能性 多くの現世代ウェブフレームワークで
クライアントへの JavaScript の配布を行わないか、または、JavaScript の配布を行うかを選択することができます。
をページ全体のレンダラーとして使用します。

これはあまり柔軟ではありません。特に、ほとんどのページでは、レンダラには
インタラクティブ性を必要とする小さなコンテンツ。例えば、そうでない場合は
静的なページでは、画像カルーセルや画像編集のために JavaScript が必要になることがあります。
"今すぐ買う "ボタン。と呼ばれることが多いモデルです。
[島嶼部建築][島嶼部-建築]です。を持つページを指します。
静的なコンテンツの海に、インタラクティブな小さな "島 "を作る。

Fresh はこのモデルを採用しています。すべてのページがサーバーサイドでレンダリングされますが、その際
クライアント側でもレンダリングされる「島コンポーネント」を作成します。これを行うには
フレッシュプロジェクトには、特別な `islands/` フォルダがあります。このフォルダの中のモジュールは、それぞれ
は、1 つの島コンポーネントをカプセル化します。モジュールの名称は
[パスカルケース][パスカルケース]または[ケバブケース][ケバブケース]島の名前
コンポーネントを定義します。例えば、カウンターコンポーネントは、ファイル
islands/Counter.tsx`となります。今すぐ買うボタンは、次のファイルで定義できます。
`islands/buy-now-button.tsx` です。

以下は、特定の時間までカウントダウンする島コンポーネントの例です。

``tsx
// islands/Countdown.tsx

import { useEffect, useState } from 'preact/hooks'.

const timeFmt = new Intl.RelativeTimeFormat('en-US')

// ターゲットの日付は `Date` ではなく、文字列として渡されます。
// アイランドコンポーネントの props は、JSON（デ）シリアライズ可能である必要があります。
エクスポート デフォルト関数 Countdown(props: { target: string }) { ...
const target = new Date(props.target)
const [now, setNow] = useState(new Date())

    // 1秒ごとに `now` の日付を更新するインターバルを設定し、現在の
    // コンポーネントがマウントされている限り、日付を表示します。
    useEffect(() => {)
        const timer = setInterval(() => {
            setNow((now) => {
                if (now > target) {
                    clearInterval(timer)
                }
                return new Date()
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [props.target])

    // If the target date has passed, we stop counting down.
    if (now > target) {
        return <span>🎉</span>
    }

    // Otherwise, we format the remaining time using `Intl.RelativeTimeFormat` and
    // render it.
    const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000)
    return <span>{timeFmt.format(secondsLeft, 'seconds')}</span>

}

````

To include this in a page component, one can just use the component normally.
Fresh will take care of automatically mounting the island component on the
client with the correct props:

```tsx
// routes/countdown.tsx

import Countdown from '../islands/Countdown.tsx'

エクスポートデフォルト関数Page() {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    返す
        <p>
            ビッグイベントが起こる <カウントダウン target={date.toISOString()} />。
            .
        </p>
    )
}
````

クライアントでレンダリングされるページには、インタラクティブなカウントダウンが表示されるようになりました。

[アイランズ-アーキテクチャー]: https://jasonformat.com/islands-architecture
[パスカルケース】：https://en.wiktionary.org/wiki/pascal_case [ケバブケース]: https://en.wiktionary.org/wiki/kebab_case
