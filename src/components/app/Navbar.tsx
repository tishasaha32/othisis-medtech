import { Bell, CircleUser } from "lucide-react"

const Navbar = () => {
    return (
        <div className='flex justify-between items-center bg-black p-2 px-20'>
            <div className="flex items-center gap-2">
                <img src="/src/assets/logo.png" alt="logo" className="w-8 h-8" />
                <h1 className='text-lg font-semibold text-white'>Othisis Medtech</h1>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Bell className='w-6 h-6 text-white' />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <CircleUser className='w-6 h-6 text-white' />
            </div>
        </div>
    )
}

export default Navbar