import Navbar from '@/components/app/Navbar'
import templateData from '@/data/templateData'
import ButtonSection from '@/components/app/ButtonSection'
import { AvailableTemplates } from '@/components/app/AvailableTemplates'
import { SelectedTemplates } from '@/components/app/SelectedTemplates'

const Index = () => {
    return (
        <div>
            <Navbar />
            <div className='flex gap-4 px-10 pt-10'>
                <AvailableTemplates cards={templateData} />
                <SelectedTemplates />
            </div>
            <ButtonSection />
        </div>)
}

export default Index