import {
	BedDouble,
	Building2,
	BusFront,
	Cctv,
	Check,
	CircleDollarSignIcon,
	Heart,
	LampDesk,
	ShoppingBasketIcon,
	Star,
	ThumbsUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import { AdvantagesCard } from '../elements/AdvantagesCard'
const ICON_MAP: Record<string, React.ElementType> = {
	Building2,
	CircleDollarSignIcon,
	BedDouble,
	BusFront,
	Cctv,
	ShoppingBasketIcon,
	LampDesk,
	Check,
	Star,
	ThumbsUp,
	Heart,
}

type Advantage = {
	_id: string
	text: {
		en: string
		hu: string
	}
	icon: string
	type: 'Companies' | 'Individuals'
}

export function AdvantagesPage() {
	const [advantagesText, setadvantagesText] = useState('')
	const [advantagesTextHu, setadvantagesTextHu] = useState('')
	const [companiesAdvantages, setCompaniesAdvantages] = useState<
		{ icon: React.ReactNode; text: string }[]
	>([])
	const [individualsAdvantages, setIndividualsAdvantages] = useState<
		{ icon: React.ReactNode; text: string }[]
	>([])
	const [companiesAdvantagesHu, setCompaniesAdvantagesHu] = useState<
		{ icon: React.ReactNode; text: string }[]
	>([])
	const [individualsAdvantagesHu, setIndividualsAdvantagesHu] = useState<
		{ icon: React.ReactNode; text: string }[]
	>([])

	const iconsSize = 28
	const iconsStrokeWidth = 2
	const iconsColor = '#AE7461'

	const fetchText = async () => {
		try {
			const res = await fetch(`${API_URL}/text`)
			if (!res.ok) throw new Error('Failed to fetch text')
			const data = await res.json()

			setadvantagesText(data.advantagesText.en)
			setadvantagesTextHu(data.advantagesText.hu)
		} catch (err) {
			console.log('Error fetching text:', err)
		}
	}
	const fetchAdvantages = async () => {
		try {
			const res = await fetch(`${API_URL}/advantages`)
			if (!res.ok) throw new Error('Failed to fetch advantages')

			const data: Advantage[] = await res.json()

			const companies = data
				.filter((a) => a.type === 'Companies')
				.map((a) => {
					const Icon = ICON_MAP[a.icon]
					return {
						text: a.text.en,
						icon: Icon ? (
							<Icon
								size={iconsSize}
								strokeWidth={iconsStrokeWidth}
								color={iconsColor}
							/>
						) : null,
					}
				})
			const companiesHu = data
				.filter((a) => a.type === 'Companies')
				.map((a) => {
					const Icon = ICON_MAP[a.icon]
					return {
						text: a.text.hu,
						icon: Icon ? (
							<Icon
								size={iconsSize}
								strokeWidth={iconsStrokeWidth}
								color={iconsColor}
							/>
						) : null,
					}
				})
			const individuals = data
				.filter((a) => a.type === 'Individuals')
				.map((a) => {
					const Icon = ICON_MAP[a.icon]
					return {
						text: a.text.en,
						icon: Icon ? (
							<Icon
								size={iconsSize}
								strokeWidth={iconsStrokeWidth}
								color={iconsColor}
							/>
						) : null,
					}
				})
			const individualsHu = data
				.filter((a) => a.type === 'Individuals')
				.map((a) => {
					const Icon = ICON_MAP[a.icon]
					return {
						text: a.text.hu,
						icon: Icon ? (
							<Icon
								size={iconsSize}
								strokeWidth={iconsStrokeWidth}
								color={iconsColor}
							/>
						) : null,
					}
				})

			setCompaniesAdvantages(companies)
			setIndividualsAdvantages(individuals)

			setCompaniesAdvantagesHu(companiesHu)
			setIndividualsAdvantagesHu(individualsHu)
		} catch (err) {
			console.error('Error fetching advantages:', err)
		}
	}

	useEffect(() => {
		fetchText()
		fetchAdvantages()
	}, [])

	return (
		<div className='w-full p-4 lg:p-10 flex flex-col items-center relative mt-6 lg:mt-0'>
			<h2 className='text-[24px] md:text-[32px] lg:text-[36px] text-[#1E1E1E] font-bold text-center'>
				{localStorage.getItem('language') === 'en'
					? 'Why Choose StaffPlace?'
					: 'Miért a StaffPlace?'}
			</h2>
			<p className='text-[12px] xs:text-[13px] w-full md:text-[16px] font-light md:w-[85%] xl:w-full text-center'>
				{localStorage.getItem('language') === 'en'
					? advantagesText
					: advantagesTextHu}
			</p>

			<div className='flex flex-col mt-5 gap-6 lg:flex-row lg:gap-13 lg:mt-8'>
				<AdvantagesCard
					bg='/advantages-bg-1.webp'
					title={
						localStorage.getItem('language') === 'en'
							? 'Companies Get:'
							: 'Cégeknek'
					}
					advantages={
						localStorage.getItem('language') === 'en'
							? companiesAdvantages
							: companiesAdvantagesHu
					}
				/>
				<AdvantagesCard
					bg='/advantages-bg-2.webp'
					title={
						localStorage.getItem('language') === 'en'
							? 'Individuals Get:'
							: 'Magánszemélyeknek'
					}
					advantages={
						localStorage.getItem('language') === 'en'
							? individualsAdvantages
							: individualsAdvantagesHu
					}
				/>
			</div>
		</div>
	)
}
