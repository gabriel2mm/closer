import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Closer | Conteúdos',
	description: 'Poste seus conteúdos quando quiser e receba por isso',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	)
}
