import { asset, Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import Counter from '../islands/Counter.tsx'
import LemonDrop from '../islands/LemonDrop.tsx'
import Footer from '../components/Footer.tsx'
import VERSIONS from '../versions.json' assert { type: 'json' }
import * as FeatureIcons from '../components/FeatureIcons.tsx'
import CopyArea from '../islands/CopyArea.tsx'
import * as Icons from '../components/Icons.tsx'
import Projects from '../components/Projects.tsx'
import projects from '../data/showcase.json' assert { type: 'json' }
import Header from '../components/Header.tsx'

export const handler: Handlers = {
    GET(req, ctx) {
        const accept = req.headers.get('accept')
        if (accept && !accept.includes('text/html')) {
            const path = `https://deno.land/x/fresh@${VERSIONS[0]}/init.ts`
            return new Response(`Redirecting to ${path}`, {
                headers: { Location: path },
                status: 307
            })
        }
        return ctx.render()
    }
}

const TITLE = 'fresh: 次世代のWebフレームワーク'
const DESCRIPTION =
    'JITのエッジレンダリング、Island Architectureによる動的要素、Denoを使った設定不要のTypeScriptサポート。'

export default function MainPage(props: PageProps) {
    const ogImageUrl = new URL(asset('/home-og.png'), props.url).href
    const origin = `${props.url.protocol}//${props.url.host}`

    return (
        <>
            <Head>
                <title>{TITLE}</title>
                <meta name='description' content={DESCRIPTION} />
                <meta property='og:title' content={TITLE} />
                <meta property='og:description' content={DESCRIPTION} />
                <meta property='og:type' content='website' />
                <meta property='og:url' content={props.url.href} />
                <meta property='og:image' content={ogImageUrl} />
            </Head>

            <div class='flex flex-col min-h-screen'>
                <div class='bg-green-300 flex flex-col'>
                    <HelloBar />
                    <Header title='' active='/' />

                    <Hero />
                </div>
                <div class='flex-1'>
                    <Intro />
                    <GettingStarted origin={origin} />
                    <Example />
                    <Showcase />
                </div>
                <Footer />
            </div>
        </>
    )
}

function HelloBar() {
    return (
        <a
            class='bg-green-400 text-black border(b green-500) p-3 text-center group'
            href='https://deno.com/blog/fresh-1.1'
        >
            <b>自動的なJSX</b>、<b>プラグイン</b>、<b>DevToolsのサポート</b>
            などの機能を持って 新しく<b>Fresh v1.1</b>が帰ってきました。
            <span class='group-hover:underline'>→</span>
        </a>
    )
}

function Hero() {
    return (
        <>
            <section class='w-full flex justify-center items-center flex-col bg-green-300'>
                <LemonDrop />
            </section>
        </>
    )
}

function Features() {
    const item = 'flex md:flex-col items-center gap-5'
    const desc = 'flex-1 md:text-center'

    return (
        <div class='grid md:grid-cols-3 gap-6 md:gap-14'>
            <div class={item}>
                <FeatureIcons.Globe />
                <div class={desc}>
                    <b>JITレンダリング</b>
                </div>
            </div>

            <div class={item}>
                <FeatureIcons.Island />
                <div class={desc}>
                    <b>Island Architecture</b>ベース
                </div>
            </div>

            <div class={item}>
                <FeatureIcons.LightWeight />
                <div class={desc}>
                    デフォルトで<b>JavaScriptを送信しません</b>
                </div>
            </div>

            <div class={item}>
                <FeatureIcons.NoBuild />
                <div class={desc}>
                    ビルドステップは<b>不要です</b>
                </div>
            </div>

            <div class={item}>
                <FeatureIcons.Gabage />
                <div class={desc}>
                    設定も<b>不要です</b>
                </div>
            </div>

            <div class={item}>
                <FeatureIcons.TypeScript />
                <div class={desc}>
                    デフォルトで<b>TypeScriptをサポートします</b>
                </div>
            </div>
        </div>
    )
}

function Intro() {
    return (
        <section class='max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-12'>
            <div class='md:flex items-center'>
                <div class='flex-1 text-center md:text-left'>
                    <h2 class='py-2 text(5xl sm:5xl lg:5xl gray-900) sm:tracking-tight sm:leading-[1.1]! font-extrabold'>
                        <span class='text-green-600'>次世代の</span>
                        Webフレームワーク
                    </h2>

                    <p class='mt-4 text-gray-600'>
                        高速で信頼性も高く、シンプルです。
                    </p>
                </div>

                <picture class='block mt-4 md:mt-0'>
                    <img
                        src='/illustration/lemon-squash.svg'
                        class='w-80 mx-auto'
                        width={800}
                        height={678}
                        alt='deno is drinking fresh lemon squash'
                    />
                </picture>
            </div>

            <Features />

            <p class='text-gray-600'>
                Freshは大量のテストなどの試行錯誤の末、サーバサイドのレンダリングとクライアントサイドのプログレッシブエンハンスメントというデザインを採用しています。
            </p>
        </section>
    )
}

function GettingStarted(props: { origin: string }) {
    return (
        <section class='max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4'>
            <h2 id='getting-started' class='text(3xl gray-600) font-bold'>
                <a href='#getting-started' class='hover:underline'>
                    始めましょう
                </a>
            </h2>
            <div class='text-gray-600 flex gap-1 mb-4 bg-gray-100 p-2 rounded'>
                <div class='text-gray-400'>
                    <Icons.Info />
                </div>
                <p>
                    v1.25.0以上の
                    <a
                        href='https://deno.land'
                        class='text-blue-600 hover:underline'
                    >
                        Deno CLI
                    </a>{' '}
                    が必要です。{' '}
                    <a
                        href='https://deno.land/manual/getting_started/installation'
                        class='text-blue-600 hover:underline'
                    >
                        インストール
                    </a>{' '}
                    または
                    <a
                        href='https://deno.land/manual/getting_started/installation#updating'
                        class='text-blue-600 hover:underline'
                    >
                        アップデート
                    </a>
                </p>
            </div>
            <p class='text-gray-600'>新たなプロジェクトの作成</p>

            <CopyArea>{`deno run -A -r ${props.origin} my-project`}</CopyArea>

            <p class='text-gray-600'>
                作成したプロジェクトのディレクトリに移動し、以下のコマンドを実行して開発サーバを立ち上げてください。
            </p>

            <CopyArea>{`deno task start`}</CopyArea>

            <p class='text-gray-600'>
                そうすると、{' '}
                <a
                    href='http://localhost:8000'
                    class='text-blue-600 hover:underline'
                >
                    http://localhost:8000
                </a>{' '}
                をブラウザで開くことでアプリを確認できます。
            </p>
            <p class='text-gray-600'>
                より詳細な情報は
                <a href='/docs' class='text-blue-600 hover:underline'>
                    ドキュメント
                </a>
                の{' '}
                <a
                    href='/docs/getting-started'
                    class='text-blue-600 hover:underline'
                >
                    <i>始めましょう</i>
                </a>{' '}
                に記述してあります。
            </p>
        </section>
    )
}

const timeFmt = new Intl.DateTimeFormat('en-US', {
    timeStyle: 'long',
    hour12: false
})

function Example() {
    return (
        <section class='max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4'>
            <h2 id='example' class='text(3xl gray-600) font-bold'>
                <a href='#example' class='hover:underline'>
                    アプリの例
                </a>
            </h2>
            <p class='text-gray-600'>
                このテキストはサーバサイドでリクエスト毎時にレンダリングされています。(ちなみにこれは
                {new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
                にレンダリングされました。)
                以下のカウンターは、サーバー上で3を起点としてレンダリングされ、クライアント上でハイドレートされて双方向性のカウンタに変化します。
                ボタンを試してみましょう。
            </p>
            <Counter start={3} />
            <p class='text-gray-600'>
                この時カウンターを実装するために必要なJavaScriptのみが送信されています。
            </p>
        </section>
    )
}

function Showcase() {
    return (
        <section class='max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4'>
            <h2 id='showcase' class='text(3xl gray-600) font-bold'>
                <a href='#showcase' class='hover:underline'>
                    ショーケース
                </a>
            </h2>
            <p class='text-gray-600'>
                以下は、Fresh でビルドされたプロジェクトの一部です。
            </p>
            <Projects items={projects.slice(0, 3)} class='gap-8' />
            <div class='flex gap-2 items-center justify-end text-blue-600'>
                <Icons.ArrowRight />
                <a href='./showcase' class='hover:underline focus:underline'>
                    もっと見る
                </a>
            </div>
        </section>
    )
}
