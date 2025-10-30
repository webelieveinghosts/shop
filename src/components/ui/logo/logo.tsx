import Image from 'next/image'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Image 
            src="/logo.png" 
            alt="WBG Logo" 
            width={150} 
            height={80} 
            className={className}
            priority
        />
    )
}
