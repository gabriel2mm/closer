import { Metadata } from 'next';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: 'Closer | Conteúdos',
    description: 'Poste seus conteúdos quando quiser e receba por isso',
}

export default function PrivateLayout({ children }: LayoutProps): React.ReactNode {
    return (
        <html lang="pt-BR">
            <body>
                <span>Layout privado</span>
                {children}
            </body>
        </html>
    )
}