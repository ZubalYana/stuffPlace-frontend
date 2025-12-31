import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import { FacilityCard } from '../elements/FacilityCard'
import { FACILITY_ICON_MAP } from '../utils/facilityIcons'
type Facility = {
	icon: string
	title: {
		en: string
		hu: string
	}
	text: {
		en: string
		hu: string
	}
}

export function OnSiteFacilities() {
	const iconSize = 24
	const iconColor = '#F5F5F5'
	const [facilitiesText, setFacilitiesText] = useState('')
	const [facilitiesTextHu, setFacilitiesTextHu] = useState('')
	const [facilities, setFacilities] = useState<Facility[]>([])
	const fetchText = async () => {
		try {
			const res = await fetch(`${API_URL}/text`)
			if (!res.ok) throw new Error('Failed to fetch text')
			const data = await res.json()

			setFacilitiesText(data.facilitiesText.en)
			setFacilitiesTextHu(data.facilitiesText.hu)
		} catch (err) {
			console.log('Error fetching text:', err)
		}
	}

	const fetchFacilities = async () => {
		try {
			const res = await fetch(`${API_URL}/facilities`)
			if (!res.ok) throw new Error('Failed to fetch facilities')
			const data = await res.json()

			setFacilities(data)
		} catch (err) {
			console.log('Error fetching facilities:', err)
		}
	}

	useEffect(() => {
		fetchText()
		fetchFacilities()
	}, [])

	return (
		<div className='w-full min-h-screen p-4 lg:p-10 flex flex-col items-center relative mt-6 lg:mt-0'>
			<h2 className='text-[24px] md:text-[32px] lg:text-[36px] text-[#1E1E1E] font-bold text-center'>
				{localStorage.getItem('language') === 'en'
					? 'On-Site Facilities'
					: 'Felszereltség'}
			</h2>
			<p className='text-[12px] xs:text-[13px] w-full md:text-[16px] font-light md:w-[85%] xl:w-full text-center'>
				{localStorage.getItem('language') === 'en'
					? facilitiesText
					: facilitiesTextHu}
			</p>
			<div className='w-full flex justify-between flex-col gap-4 md:max-lg:flex-wrap md:max-lg:justify-center md:flex-row md:max-lg:gap-6 lg:gap-0 mt-6'>
				{facilities.map((facility, index) => {
					const Icon = FACILITY_ICON_MAP[facility.icon]

					return (
						<FacilityCard
							key={index}
							icon={Icon ? <Icon size={iconSize} color={iconColor} /> : null}
							title={
								localStorage.getItem('language') === 'en'
									? facility.title.en
									: facility.title.hu
							}
							description={
								localStorage.getItem('language') === 'en'
									? facility.text.en
									: facility.text.hu
							}
							index={index}
						/>
					)
				})}
			</div>
			<div className='w-full flex justify-center'>
				<img
					src='./facilities-illustration-widened.webp'
					alt='facilities-illustration-widened'
					className='w-[95%] hidden md:block md:max-lg:mt-6'
				/>
				<img
					src='./facilities-illustration-small.webp'
					alt='facilities-illustration-widened'
					className='w-full md:hidden mt-8'
				/>
			</div>
		</div>
	)
}
