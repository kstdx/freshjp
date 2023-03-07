import { ComponentChildren } from 'preact'
import LemonIcon from 'https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/lemon-2.tsx'
import BrandGithub from 'https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx'
type Props = {
    children: ComponentChildren
}

export default function Footer({ children }: Props) {
    const menus = [
        {
            title: 'ドキュメント',
            children: [
                { name: '始めましょう', href: '#' },
                { name: 'ガイド', href: '#' },
                { name: 'API', href: '#' },
                { name: 'ショーケース', href: '#' },
                { name: '価格', href: '#' }
            ]
        },
        {
            title: 'コミュニティ',
            children: [
                { name: 'フォーラム', href: '#' },
                { name: 'Discord', href: '#' }
            ]
        }
    ]

    return (
        <div class='bg-white flex flex-col md:flex-row w-full max-w-screen-lg gap-8 md:gap-16 px-8 py-8 text-sm'>
            <div class='flex-1'>
                <div class='flex items-center gap-1'>
                    <LemonIcon class='inline-block' />
                    <div class='font-bold text-2xl'>Fresh</div>
                </div>
                <div class='text-gray-500'>フルスタックフレームワーク</div>
            </div>

            {menus.map((item) => (
                <div class='mb-4' key={item.title}>
                    <div class='font-bold'>{item.title}</div>
                    <ul class='mt-2'>
                        {item.children.map((child) => (
                            <li class='mt-2' key={child.name}>
                                <a
                                    class='text-gray-500 hover:text-gray-700'
                                    href={child.href}
                                >
                                    {child.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <div class='text-gray-500 space-y-2'>
                <div class='text-xs'>
                    Copyright © 2020 DenoLand
                    <br />
                    All right reserved.
                </div>

                <a
                    href='https://github.com/denoland/fresh'
                    class='inline-block hover:text-black'
                >
                    <BrandGithub />
                </a>
            </div>
        </div>
    )
}
