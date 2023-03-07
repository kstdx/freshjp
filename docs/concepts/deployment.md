---
description: |
    Freshは、様々なプラットフォームに簡単に展開することができます。
---

Fresh は[Deno Deploy][deno-deploy]にデプロイすることを想定していますが、以下のようなことも可能です。
Deno ベースの Web サーバーを実行できるすべてのシステムまたはプラットフォームに展開されます。

以下は、特定のプロバイダー/システム向けの手順です。

-   Deno デプロイ](#deno-deploy)
-   ドッカー】(#docker)

## デノ・デプロイ

Fresh のデプロイには、Deno Deploy を使用することが推奨されています。Deno デプロイ
は GitHub との統合を提供し、Fresh プロジェクトを GitHub にデプロイすることができます。
グローバルに分散したエッジネットワークを数秒で自動的に構築します。

スタートガイド][デプロイ-トゥ-プロダクション]をご覧ください。
で、Fresh を Deno Deploy にデプロイします。

## Docker

Docker コンテナを実行できるプラットフォームであれば、Fresh をデプロイすることができます。Docker は
ツールを使用してプロジェクトをコンテナ化し、サポートされているあらゆるプラットフォーム上でポータブルに実行することができます。

Fresh アプリを Docker 用にパッケージングする際には、Docker の起動に必要なパラメータを
コンテナ内の `DENO_DEPLOYMENT_ID` 環境変数を使用します。この変数には
には、アプリケーションのバージョンを表す不透明な文字列 ID が設定されます。
は、現在実行されている これは、Git コミットのハッシュであったり、あるいはすべての
をプロジェクトに追加する必要があります。Fresh の機能上、この ID が重要です。
プロジェクト内の任意のファイルが変更されると、そのファイルが変更されます - 変更されない場合は、不正確な
をキャッシュすると、プロジェクトが正しく機能しなくなる可能性があります。

以下は Fresh プロジェクトの`Dockerfile`の例です。

``dockerfile
FROM denoland/deno:1.25.0

arg git_revision
env deno_deployment_id=${git_revision} です。

WORKDIR /app

COPY .
RUN deno cache main.ts --import-map=import_map.json

EXPOSE 8000

CMD ["run", "-A", "main.ts"] を実行します。

````

Gitリポジトリ内にDockerイメージを構築する場合。

```sh
$ docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t my-fresh-app .
````

次に、Docker コンテナを実行します。

を実行します。
$ docker run -t -i -p 80:8000 my-fresh-app

```

クラウドプロバイダーにデプロイするには、コンテナレジストリにプッシュして、そのコンテナレジストリに従います。
のドキュメントを参照してください。

- アマゾン ウェブ サービス][aws-container-registry]です。
- Google Cloud][gcp-container-registry]です。

[aws-container-registry]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/create-container-image.html#create-container-image-push-ecr
[gcp-container-registry]: https://cloud.google.com/container-registry/docs/pushing-and-pulling
[deno-deploy]: https://deno.com/deploy
[deploy-to-production]です。/docs/getting-started/deploy-to-production
```
