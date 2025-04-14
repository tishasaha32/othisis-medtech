import { FileUp } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { TemplateCard } from "./TemplateCard";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type SelectedTemplatesProps = {
    templates: TemplateData[];
    activeId: string | null;
};

export function SelectedTemplates({ templates, activeId }: SelectedTemplatesProps) {
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
            className={`relative bg-white overflow-y-auto h-[calc(100vh-14rem)] rounded-md p-5 ${isOver ? "after:absolute after:inset-5 after:border-2 after:border-dashed after:border-blue-400 after:rounded-lg after:pointer-events-none" : ""
                }`}
        >
            {templates.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-gray-400">
                    <p className="flex flex-col items-center justify-center text-lg"><FileUp size={50} />Drag templates here</p>
                </div>
            ) : (
                <SortableContext items={sortedTemplates.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                        {sortedTemplates.map((template, index) => (
                            <div
                                key={template.id}
                                id={`selected-template-${template.id}`}
                                className="relative"
                            >
                                {isOver && activeId && index === 0 && (
                                    <div className="absolute inset-x-0 -top-3 h-1 bg-blue-400 rounded-full transform -translate-y-1/2 z-10" />
                                )}
                                <TemplateCard
                                    template={template}
                                    isDraggable={true}
                                    rootCanal={true}
                                />
                                {isOver && activeId && (
                                    <div className="absolute inset-x-0 -bottom-3 h-1 bg-blue-400 rounded-full transform translate-y-1/2 z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </SortableContext>
            )}
        </div>
    );
}
