import LemonDrop from '../islands/LemonDrop.tsx'

export function ServerCodePage(props: {
    serverCode: number
    codeDescription: string
}) {
    return (
        <>
            <section>
                <div class='w-full flex justify-center items-center flex-col bg-green-300'>
                    <LemonDrop />
                </div>
                <div class='text-center'>
                    <h1 class='text(6xl) md:text(9xl) font-extrabold'>
                        {props.serverCode}
                    </h1>

                    <p class='p-4 text(2xl) md:text(3xl)'>
                        {props.codeDescription}
                    </p>

                    <p class='p-4'>
                        <a href='/' class='hover:underline'>
                            ホームページに戻る
                        </a>
                    </p>
                </div>
            </section>
        </>
    )
}

export default function PageNotFound() {
    return ServerCodePage({
        serverCode: 404,
        codeDescription: 'あなたの探しているページを見つけられませんでした'
    })
}