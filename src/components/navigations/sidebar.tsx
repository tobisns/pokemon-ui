import { PropsWithChildren, ReactNode } from 'react'

interface SidebarProps {
	head?: ReactNode
	open: boolean
}

export default function Sidebar(props: PropsWithChildren<SidebarProps>) {
	const { children, head, open } = props
	return (
		<>
			<div
				className={`${!open ? 'w-0' : 'w-64'} transition-all duration-300`}
			/>
			<aside
				id="default-sidebar"
				className={`${!open ? 'w-0' : 'w-64'} fixed top-0 left-0 z-40 h-screen transition-all duration-300 sm:translate-x-0 overflow-hidden`}
				aria-label="Sidebar"
			>
				{head}
				<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<ul className="space-y-2 font-medium">{children}</ul>
				</div>
			</aside>
		</>
	)
}
