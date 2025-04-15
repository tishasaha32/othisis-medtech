import Navbar from '@/components/app/Navbar'
import ButtonSection from '@/components/app/ButtonSection'
import { AvailableTemplates } from '@/components/app/AvailableTemplates'
import { SelectedTemplates } from '@/components/app/SelectedTemplates'
import templateData from '@/data/templateData'

const Index = () => {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <AvailableTemplates cards={templateData} />
                <SelectedTemplates />
            </div>
            <ButtonSection />
        </div>)
}

export default Index