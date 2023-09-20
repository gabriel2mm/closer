import type { Metadata } from 'next'
import { ThemeProvider } from '@/src/Providers/theme-provide'
import '../globals.css'


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
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
			</head>
			<body>
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
