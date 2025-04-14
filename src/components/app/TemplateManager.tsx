import templateData from "@/data/templateData"
import { AvailableTemplates } from "./AvailableTemplates"

const TemplateManager = () => {
    return (
        <div>
            <AvailableTemplates templates={templateData} />
        </div>
    )
}

export default TemplateManager