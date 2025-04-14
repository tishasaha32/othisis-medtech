import { FileUp } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { TemplateCard } from "./TemplateCard";
import { useAutoScroll } from "@/hooks/useAutoScroll";

type SelectedTemplatesProps = {
    templates: TemplateData[];
};

export function SelectedTemplates({ templates }: SelectedTemplatesProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: "selected-templates-droppable",
        data: {
            accepts: ["template"]
        }
    });

    // Use auto-scroll when dragging over this container
    useAutoScroll("selected-templates", isOver);

    // Sort templates by position if available
    const sortedTemplates = [...templates].sort((a, b) =>
        (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER)
    );

    return (
        <div
            id="selected-templates"
            ref={setNodeRef}
            className={`bg-white overflow-y-auto border-2 h-[calc(100vh-10rem)] rounded-md p-5 ${isOver ? "border-dashed border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
        >
            {templates.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-gray-400">
                    <p className="flex flex-col items-center justify-center text-lg"><FileUp size={50} />Drag templates here</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {sortedTemplates.map((template) => (
                        <div key={template.id} id={`selected-template-${template.id}`}>
                            <TemplateCard
                                template={template}
                                isDraggable={true}
                                rootCanal={true}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
