---
description: |
    新しいプロジェクトを開始するには、`deno task start`を実行するだけです。これによって
    プロジェクトをデフォルトのパーミッションフラグで、ウォッチモードで実行します。
---

新しいプロジェクトの足場を組んだら、次は実際にスタートさせます。には
この場合、「deno タスクスタート」を実行すればよい。

```
DENO タスクスタート
Watcher プロセスが開始されました。
http://localhost:8000 でリスニングしている。
```

Deno タスクなしで手動で起動したい場合は、`deno run`で`main.ts`を実行します。
には、適切なフラグを設定する必要があります。の許可フラグを指定する必要があります。

-   **--allow-net`**。これは HTTP サーバーを起動するために必要です。
-   **--allow-read`**。ディスクから（静的）ファイルを読み込むために必要です。
-   **--allow-env`**: 環境変数を読み込むために必要です。
    は、プロジェクトの設定に使用します。
-   **--allow-run`**: の下で `deno` と `esbuild` にシェルアウトするために必要です。
    は、開発時にボンネットを開けてタイプストリップを行います。製品版ではこれを行う
    を WebAssembly のバイナリを使って実行します。

開発では、[`--watch`フラグ][--watch]で実行したいこともあるので、その場合は
新鮮なサーバーは、あなたがコードに変更を加えるたびに自動的にリロードされます。
デフォルトでは `--watch` はモジュールグラフにあるファイルのみを監視します。いくつかのプロジェクト
静的ファイルのようなファイルは、モジュールグラフの一部ではありませんが、おそらくあなたが望むのは
を変更するたびに、再起動/再読み込みも行うようにします。これは、以下の方法で行うことができます。
引数として余分なフォルダを渡す： `--watch=static/`. また、次のように
routes/`をウォッチリストに追加し、サーバーが自動的に再起動するようにします。
は、新しいルートを追加するときに使用します。

ポートやホストを変更したい場合は、`start()`のオプションバッグを変更します。
を呼び出すと、ポート番号が明示されます。

``js
await start(manifest, { port: 3000 })

```

これをすべて組み合わせると、次のような `deno run` コマンドが得られます。

```

$ deno run --allow-net --allow-read --allow-env --allow-run --watch=static/,routes/ main.ts
Watcher プロセスが開始されました。
http://localhost:8000 でリスニングしています。

```

現在、http://localhost:8000 にアクセスすると、実行中のプロジェクトを見ることができます。試す
routes/index.tsx`のテキストの一部を変更し、ページの更新を確認する。
は、ファイルを保存するときに自動的に

[--watch]: https://deno.land/manual/getting_started/command_line_interface#watch-mode
```
