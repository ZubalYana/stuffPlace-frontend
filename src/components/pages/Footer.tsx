import { MailIcon, Phone, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { API_URL } from '../../config'

type Contacts = {
	phone: string
	email: string
	facebook: string
	instagram: string
	telegram: string
	location: string
	adress: {
		en: string
		hu: string
	}
}

export function Footer() {
	const [footerSubtext, setFooterSubtext] = useState('')
	const [footerSubtextHu, setFooterSubtextHu] = useState('')
	const [contacts, setContacts] = useState<Contacts>({
		phone: '',
		email: '',
		facebook: '',
		instagram: '',
		telegram: '',
		location: '',
		adress: { en: '', hu: '' },
	})


	const fetchText = async () => {
		try {
			const res = await fetch(`${API_URL}/text`)
			if (!res.ok) throw new Error('Failed to fetch text')
			const data = await res.json()

			setFooterSubtext(data.footerSubtext.en)
			setFooterSubtextHu(data.footerSubtext.hu)
		} catch (err) {
			console.log('Error fetching text:', err)
		}
	}

	const fetchContacts = async () => {
		try {
			const res = await fetch(`${API_URL}/contacts`)
			if (!res.ok) throw new Error('Failed to fetch contacts')
			const data = await res.json()

			setContacts(data)
			console.log('Fetched contacts:', data)
		} catch (err) {
			console.log('Error fetching contacts:', err)
		}
	}

	useEffect(() => {
		fetchText()
		fetchContacts()
	}, [])

	return (
		<div className='w-full min-h-[48vh] relative mt-8'>
			<div className='p-4 lg:p-10 relative z-20 text-[#F5F5F5] w-full flex flex-col md:flex-row md:justify-between'>
				<div className='md:w-[40%] md:h-full'>
					<h3 className='uppercase text-[24px] md:text-[28px] lg:text-[32px] font-bold'>
						StuffPlace
					</h3>
					<p className='text-[12px] xs:text-[13px] md:text-[14px] lg:text-[16px] font-light'>
						{localStorage.getItem('language') === 'en'
							? footerSubtext
							: footerSubtextHu}
					</p>
					<a
						href={`tel:${contacts.phone}`}
						className='relative flex gap-2 items-center mt-4 group cursor-pointer w-fit select-none'
					>
						<Phone
							size={20}
							strokeWidth={2.5}
							className='group-hover:scale-110 transition duration-300'
						/>
						<p className='font-semibold text-[14px] md:text-[16px]'>
							{contacts.phone}
						</p>
					</a>
					<a
						href={`mailto:${contacts.email}`}
						className='relative flex gap-2 items-center mt-2 group cursor-pointer w-fit select-none'
					>
						<MailIcon
							size={20}
							strokeWidth={2.5}
							className='group-hover:scale-110 transition duration-300'
						/>
						<p className='font-semibold text-[14px] md:text-[16px]'>
							{contacts.email}
						</p>
					</a>
					<div
						className='relative flex gap-2 items-center mt-2 group cursor-pointer w-fit select-none'
					>
						<MapPin
							size={20}
							strokeWidth={2.5}
							className='group-hover:scale-110 transition duration-300'
						/>
						<p className='font-semibold text-[14px] md:text-[16px]'>
							{localStorage.getItem('language') === 'en' ? contacts.adress.en : contacts.adress.hu}
						</p>
					</div>
					<div className='flex gap-4 mt-6'>
						<a
							href={contacts.facebook}
							target='_blank'
							rel='noopener noreferrer'
							className='w-4 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300'
						>
							<img
								src='./socials/facebook.svg'
								alt='facebook'
								className='w-auto h-full'
							/>
						</a>
						<a
							href={contacts.instagram}
							target='_blank'
							rel='noopener noreferrer'
							className='w-6 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300'
						>
							<img
								src='./socials/instagram.svg'
								alt='instagram'
								className='w-auto h-full'
							/>
						</a>
						<a
							href={contacts.telegram}
							target='_blank'
							rel='noopener noreferrer'
							className='w-6 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300'
						>
							<img
								src='./socials/telegram.svg'
								alt='telegram'
								className='w-auto h-full'
							/>
						</a>
						<a
							href={`viber://chat?number=${contacts.phone.replace(/\s+/g, '')}`}
							target='_blank'
							rel='noopener noreferrer'
							className='w-6 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300'
						>
							<img
								src='./socials/viber.svg'
								alt='viber'
								className='w-auto h-full'
							/>
						</a>
					</div>
				</div>
				<div className='md:w-[50%] md:h-full md:flex md:justify-end md:items-center mt-8 md:mt-0'>
					<iframe
						src={`${contacts.location}`}
						width={'100%'}
						height={240}
						style={{ border: 0, borderRadius: '10px' }}
						allowFullScreen
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					/>
				</div>
			</div>

			<div className='absolute z-10 bg-[#AE7461] opacity-95 w-full h-full top-0 left-0'></div>
			<div className='absolute w-full h-full top-0 left-0 z-0'>
				<img
					src='./footer-bg.webp'
					alt='footer-background'
					className='w-full h-full object-cover object-center'
				/>
			</div>
		</div>
	)
}
