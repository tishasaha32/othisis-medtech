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
            className={`relative bg-white overflow-y-auto h-[calc(100vh-14rem)] rounded-md transition-all duration-200 ease-in-out ${activeId ? 'bg-opacity-95' : ''}`}
        >
            <div
                className={`h-full transition-all duration-200 ease-in-out
                    ${isOver ? "border-2 border-dashed border-gray-300 m-5 rounded-lg bg-gray-50/30" : "p-5"}
                `}
            >
                {templates.length === 0 ? (
                    <div className="flex flex-col h-full items-center justify-center text-gray-400">
                        <p className="flex flex-col items-center justify-center text-lg">
                            <FileUp size={50} />
                            Drag templates here
                        </p>
                    </div>
                ) : (
                    <SortableContext items={sortedTemplates.map(t => t.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {sortedTemplates.map((template, index) => (
                                <div
                                    key={template.id}
                                    id={`selected-template-${template.id}`}
                                    className={`relative transition-transform duration-200 ease-in-out ${activeId && activeId !== template.id ? 'opacity-50' : ''
                                        }`}
                                    style={{
                                        zIndex: activeId === template.id ? 20 : 1,
                                        transform: `translateY(0)`,
                                    }}
                                >
                                    {isOver && activeId && index === 0 && (
                                        <div className="absolute inset-x-0 -top-3 border-t-2 border-dashed border-gray-300" />
                                    )}
                                    <TemplateCard
                                        template={template}
                                        isDraggable={true}
                                        rootCanal={true}
                                    />
                                    {isOver && activeId && (
                                        <div className="absolute inset-x-0 -bottom-3 border-t-2 border-dashed border-gray-300" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </SortableContext>
                )}
            </div>
        </div>
    );
}
