'use client'

import { useEffect, useState } from 'react'
import Navbar from '../../components/navigations/navbar'
import '../../styles/global.css'
import SideTrigger from '../../components/buttons/side-trigger'
import Sidebar from '../../components/navigations/sidebar'
import SideButton from '../../components/buttons/side-button'
import { authenticate } from '../../services/auth'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false)
	
	const check_admin = async () => {
		try {
			const res: any = await authenticate()
			console.log(res)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		check_admin()
		setIsAdmin(localStorage.getItem("isAdmin")==="true")
	}, [])

	const renderSideBar = () => {
		return (
			<Sidebar head={<Navbar />} open={sidebarOpen}>
				<SideButton text="Home" url="/userarea/home">
					<svg
						className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 21"
					>
						<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
						<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
					</svg>
				</SideButton>
			</Sidebar>
		)

	}

	const renderSideBarAdmin = () => {
		return (
			<Sidebar head={<Navbar />} open={sidebarOpen}>
				<SideButton text="Home" url="/userarea/home">
					<svg
						className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 21"
					>
						<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
						<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
					</svg>
				</SideButton>
				<SideButton text="Admin" url="/userarea/admin">
					<svg
						className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 21"
					>
						<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
						<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
					</svg>
				</SideButton>
			</Sidebar>
		)
	}

	return (
		<html lang="en">
			<body>
				<Navbar>
					<ul className="flex items-center pr-5">
						<li>
							<SideTrigger
								size={25}
								onClickTrigger={() => {
									sidebarOpen
										? setSidebarOpen(false)
										: setSidebarOpen(true)
								}}
							/>
						</li>
					</ul>
					<ul className="flex items-center">
						<li>
							<h1 className="pl-8 lg:pl-0 text-gray-700">
								Pokemon Info
							</h1>
						</li>
					</ul>
				</Navbar>
				<div className="flex flex-row min-h-screen min-w-full">
					<div className="transition-all duration-300 min-h-full grow flex">
						{isAdmin? renderSideBarAdmin() : renderSideBar()}
						<div className="grow">{children}</div>
					</div>
				</div>
			</body>
		</html>
	)
}
