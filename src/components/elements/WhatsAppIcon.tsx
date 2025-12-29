import { useEffect, useState } from 'react'
import { API_URL } from '../../config'
export function WhatsAppIcon() {
	const [phone, setPhone] = useState<string>('')

	const fetchContacts = async () => {
		try {
			const res = await fetch(`${API_URL}/contacts`)
			if (!res.ok) throw new Error('Failed to fetch contacts')
			const data = await res.json()

			setPhone(data.phone)
			console.log('Fetched contacts:', data)
		} catch (err) {
			console.log('Error fetching contacts:', err)
		}
	}
	useEffect(() => {
		fetchContacts()
	}, [])
	return (
		<a
			href={`https://wa.me/${phone.replace(/\s+/g, '')}`}
			target='_blank'
			rel='noopener noreferrer'
			className='animate-bounce-slow z-9999 relative'
		>
			<div className='w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] bg-[#F5F5F5] rounded-full cursor-pointer flex justify-center items-center fixed right-4 bottom-4 lg:right-10 lg:bottom-10 z-100 transition-transform duration-300 hover:scale-110 animate-bounce-slow'>
				<img src='./socials/whatsApp.svg' alt='whatsApp' width={'60%'} />
			</div>
		</a>
	)
}
