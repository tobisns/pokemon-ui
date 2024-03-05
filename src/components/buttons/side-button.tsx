import { Component, PropsWithChildren, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavButtonProps {
	text?: string
	url?: string
	notif?: number
}

export default function SideButton(props: PropsWithChildren<NavButtonProps>) {
	const { children, text, url, notif } = props

	return (
		<>
			<li>
				<a
					href={`${url ? url : '#'}`}
					className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<div className="flex-shrink-0 w-5 h-5 overflow-clip">
						{children}
					</div>
					<span className="flex-1 ms-3 whitespace-nowrap">
						{text}
					</span>
					{notif ? (
						<span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
							{notif}
						</span>
					) : (
						<></>
					)}
				</a>
			</li>
		</>
	)
}
