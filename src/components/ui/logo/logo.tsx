import Image from 'next/image'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Image 
            src="/logo.png" 
            alt="WBG Logo" 
            width={5307} 
            height={5307} 
            className={className}
            priority
        />
    )
}
