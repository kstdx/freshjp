import { ServerCodePage } from './_404.tsx'

export default function InternalServerError() {
    return ServerCodePage({
        serverCode: 500,
        codeDescription: 'おっと、誰か来たようだ'
    })
}
