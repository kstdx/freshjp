---
description: |
    Freshのアーキテクチャは、高速でスケーラブル、かつ信頼性の高いアプリケーションを簡単に構築できるように設計されています。
---

Fresh は、高速でスケーラブル、かつ信頼性の高いものを簡単に構築できるように設計されています。
のアプリケーションを提供します。そのために、どのようにすべきかを意見的に決定する。
ウェブアプリケーションを構築する。これらの判断は、強力な経験的データに裏打ちされたものです
は、その分野の専門家から集められたものです。これらの原則の例をいくつか挙げます。

-   ページのロード時間は最小限に抑えるべきである。
-   クライアントが行う作業を最小限にする。
-   エラーは小さな爆発半径であるべきであり、ものは優雅に劣化するものである。

Fresh が行う唯一最大のアーキテクチャの決定は、その使用方法です。
[islands アーキテクチャ][islands]パターンを採用しています。これは、Fresh アプリケーションの出荷が
は、デフォルトでクライアントに純粋な HTML を提供します。サーバーでレンダリングされたページの一部は、次のようにすることができます。
は、インタラクティブなウィジェット（島）で独立して再水和される。これは、次のことを意味します。
クライアントがレンダリングに責任を持つのは、ページの一部だけです。
余分な手間をかけるほどインタラクティブなもの。純粋なコンテンツは
static は、クライアントサイドの JavaScript が関係ないので、とても便利です。
を軽量化しました。

<!-- TODO(lucacasonato): リクエスト処理、フォームアクションなどを詳しく説明する。-->

[島々]: https://www.patterns.dev/posts/islands-architecture/