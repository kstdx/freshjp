const LINKS = [
    {
        title: 'ソースコード',
        href: 'https://github.com/kstdx/freshjp'
    },
    {
        title: 'ライセンス',
        href: 'https://github.com/kstdx/freshjp/blob/main/LICENSE'
    },
    {
        title: 'ルール等',
        href: 'https://github.com/denoland/fresh/blob/main/CODE_OF_CONDUCT.md'
    }
]

export default function Footer() {
    return (
        <footer class='border(t-2 gray-200) bg-gray-100 h-32 flex flex-col gap-4 justify-center'>
            <div class='mx-auto max-w-screen-lg flex items-center justify-center gap-8'>
                {LINKS.map((link) => (
                    <a href={link.href} class='text-gray-600 hover:underline'>
                        {link.title}
                    </a>
                ))}
            </div>
            <div class='text(gray-600 center)'>
                <span>
                    © {new Date().getFullYear()} Freshの開発者様と
                    <a href='//kstdx.com' className='underline' target='_blank'>
                        kstdx
                    </a>
                </span>
            </div>
        </footer>
    )
}
