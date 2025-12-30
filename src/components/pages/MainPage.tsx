import { ArrowDown, Eye, Handshake } from 'lucide-react'
import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import { Header } from '../elements/Header'
type MainPageProps = {
	refs: {
		aboutRef: React.RefObject<HTMLDivElement | null>
		unitsRef: React.RefObject<HTMLDivElement | null>
		facilitiesRef: React.RefObject<HTMLDivElement | null>
		locationRef: React.RefObject<HTMLDivElement | null>
	}
	toggleMenu: () => void
	isMenuOpen: boolean
}
export function MainPage({ refs, toggleMenu, isMenuOpen }: MainPageProps) {
	const [mainDescription, setMainDescription] = useState<{
		text: string
		highlights: string[]
	}>({
		text: '',
		highlights: [],
	})
	const [mainDescriptionHu, setMainDescriptionHu] = useState<{
		text: string
		highlights: string[]
	}>({
		text: '',
		highlights: [],
	})

	const scrollToUnits = () => {
		refs.unitsRef.current?.scrollIntoView({ behavior: 'smooth' })
	}
	const scrollToAbout = () => {
		refs.aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const fetchText = async () => {
		try {
			const res = await fetch(`${API_URL}/text`)
			if (!res.ok) throw new Error('Failed to fetch text')
			const data = await res.json()

			setMainDescription({
				text: data.mainDescription.en.text,
				highlights: data.mainDescription.en.highlights,
			})

			setMainDescriptionHu({
				text: data.mainDescription.hu.text,
				highlights: data.mainDescription.hu.highlights,
			})
		} catch (err) {
			console.log('Error fetching text:', err)
		}
	}

	useEffect(() => {
		fetchText()
	}, [])

	function renderHighlightedText(text: string, highlights: string[]) {
		if (!highlights.length) return text

		const escaped = highlights.map((h) =>
			h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		)

		const regex = new RegExp(`(${escaped.join('|')})`, 'gi')

		return text.split(regex).map((part, index) =>
			highlights.some((h) => part.toLowerCase() === h.toLowerCase()) ? (
				<span key={index} className='text-black font-semibold'>
					{part}
				</span>
			) : (
				<span key={index}>{part}</span>
			)
		)
	}

	return (
		<div className='w-full h-screen p-4 lg:p-10'>
			<div className='z-20 relative'>
				<Header refs={refs} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
				<div className='w-full max-h-[430px] md:max-lg:h-[410px] lg:min-h-[600px] xl:min-h-[450px] rounded-2xl flex flex-col items-center bg-[rgba(255, 255, 255, 0.5)] backdrop-blur-md p-4 md:p-6 mt-6'>
					<div className='absolute inset-0 bg-white/30 rounded-2xl pointer-events-none z-0'></div>

					<h1
						className={`w-full xs:text-[26px] md:text-[42px] ${
							localStorage.getItem('language') === 'en'
								? 'text-[24px] lg:text-[64px] lg:max-xl:w-[70%] xl:w-[60%] xl:text-[64px]'
								: 'text-[20px] xl:text-[64px] xl:w-[70%]'
						} md:w-[90%] text-center font-bold text-[#1E1E1E] leading-[1.2] relative z-20`}
					>
						{localStorage.getItem('language') === 'en'
							? 'Strategic Location and Modern Living in'
							: 'Stratégiai elhelyezkedés és modern életstílus'}{' '}
						<span className='text-[#AE7461]'>
							{localStorage.getItem('language') === 'en'
								? 'Budapest'
								: 'Budapesten'}
						</span>
					</h1>
					<div className='w-full flex flex-col items-center mt-3 relative z-20'>
						<p
							className='text-[12px] xs:text-[13px] w-full md:text-[14px]
               lg:max-xl:text-[20px] font-light md:w-[85%]
               xl:w-[65%] text-center'
							style={{ whiteSpace: 'pre-wrap' }}
						>
							{localStorage.getItem('language') === 'en'
								? renderHighlightedText(
										mainDescription.text,
										mainDescription.highlights
								  )
								: renderHighlightedText(
										mainDescriptionHu.text,
										mainDescriptionHu.highlights
								  )}
						</p>
					</div>

					<div className='w-full md:w-auto flex flex-col md:flex-row items-center gap-4 mt-5 md:gap-8 md:mt-12 relative z-20'>
						<div
							className='relative w-full h-13 md:w-[280px] md:h-18 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3 cursor-pointer overflow-hidden
    group transition duration-300'
						>
							<span className='absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300'></span>
							<Handshake
								strokeWidth={2.5}
								size={28}
								stroke='currentColor'
								className='relative z-10 transition duration-300 text-white group-hover:text-[#AE7461]'
							/>
							<h3
								className='relative z-10 uppercase text-white font-bold text-[18px] md:text-[24px]
        transition duration-300 group-hover:text-[#AE7461]'
							>
								{localStorage.getItem('language') === 'en'
									? 'Partnership'
									: 'Partnerség'}
							</h3>
						</div>

						<div
							className='relative w-full h-13 md:w-[300px] md:h-18 flex justify-center items-center rounded-2xl border-2 border-[#1E1E1E] gap-3 cursor-pointer overflow-hidden
    group transition duration-300 bg-transparent'
							onClick={scrollToUnits}
						>
							<span className='absolute inset-0 bg-[#1E1E1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300'></span>
							<Eye
								strokeWidth={2.5}
								size={28}
								stroke='currentColor'
								className='relative z-10 transition duration-300 text-[#1E1E1E] group-hover:text-white'
							/>
							<h3
								className='relative z-10 uppercase font-bold text-[18px] md:text-[24px]
        transition duration-300 text-[#1E1E1E] group-hover:text-white'
							>
								{localStorage.getItem('language') === 'en'
									? 'Explore Units'
									: 'Lakásokhoz'}
							</h3>
						</div>
					</div>
				</div>
			</div>

			<div
				className='uppercase text-white text-[14px] md:text-[16px] font-normal relative z-20 w-full flex justify-center items-center mt-4 xs:max-sm:mt-6 md:mt-6 lg:mt-10 gap-1 md:gap-2 cursor-pointer animate-bounce'
				onClick={scrollToAbout}
			>
				<h4>
					{localStorage.getItem('language') === 'en'
						? 'Feel free to learn more'
						: 'Tudjon meg többet'}
				</h4>
				<ArrowDown size={24} />
			</div>

			<div>
				<img
					src='/main page bg.webp'
					alt='main page background'
					className='h-screen w-full bg-center object-cover xl:w-full xl:max-h-screen absolute top-0 left-0 z-0'
				/>
			</div>
		</div>
	)
}
