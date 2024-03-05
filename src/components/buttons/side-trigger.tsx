import { PropsWithChildren } from 'react'
import { FiMenu } from 'react-icons/fi'

interface SideTriggerProps {
	onClickTrigger: () => void
	size?: number
}

export default function SideTrigger(
	props: PropsWithChildren<SideTriggerProps>,
) {
	const { onClickTrigger, size } = props

	return (
		<>
			<a href="#" onClick={onClickTrigger}>
				<FiMenu size={size} />
			</a>
		</>
	)
}
