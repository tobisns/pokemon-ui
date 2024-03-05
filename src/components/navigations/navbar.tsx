import { PropsWithChildren } from 'react'

export default function Navbar(props: PropsWithChildren) {
	const { children } = props

	return (
		<>
			<div className="flex-1 flex flex-col flex-grow">
				<nav className="px-2 flex  justify-start bg-[#c0c0c0] h-16 fixed z-50 w-screen">
					{children}
				</nav>
				<nav className="px-2 flex justify-start h-16" />
			</div>
		</>
	)
}
