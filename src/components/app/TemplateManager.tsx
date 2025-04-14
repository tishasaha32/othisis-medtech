import { useState } from "react";
import { TemplateCard } from "./TemplateCard";
import templateData from "@/data/templateData";
import { Mic, Trash2, Upload } from "lucide-react";
import { SelectedTemplates } from "./SelectedTemplates";
import { AvailableTemplates } from "./AvailableTemplates";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
    DragOverlay,
    DragStartEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import { Button } from "../ui/button";
import { arrayMove } from "@dnd-kit/sortable";

const TemplateManager = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTemplates, setSelectedTemplates] = useState<TemplateData[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        setActiveId(active.id.toString());
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const isNewTemplate = !selectedTemplates.some((t) => t.id === active.id);
        const draggedTemplate = isNewTemplate
            ? templateData.find((t) => t.id === active.id)
            : selectedTemplates.find((t) => t.id === active.id);

        if (!draggedTemplate) return;

        // Handle dropping in selected templates area
        if (over.id === "selected-templates-droppable" || over.id.toString().startsWith("selected-template-")) {
            let targetIndex;

            if (over.id === "selected-templates-droppable") {
                // If dropping in the container, calculate position based on pointer
                const overRect = (over.rect as DOMRect);
                const pointerY = (event.activatorEvent as PointerEvent).clientY;
                const relativeY = pointerY - overRect.top;
                const templateHeight = overRect.height / (selectedTemplates.length + 1);

                targetIndex = selectedTemplates.length;
                for (let i = 0; i < selectedTemplates.length; i++) {
                    const templateTop = overRect.top + (i * templateHeight);
                    if (relativeY < templateTop + templateHeight / 2) {
                        targetIndex = i;
                        break;
                    }
                }
            } else {
                // If dropping on a template, insert at that position
                const targetId = over.id.toString().replace("selected-template-", "");
                targetIndex = selectedTemplates.findIndex((t) => t.id === targetId);
                if (targetIndex === -1) return;
            }

            let newTemplates = [...selectedTemplates];

            if (isNewTemplate) {
                // Insert new template
                newTemplates.splice(targetIndex, 0, {
                    ...draggedTemplate,
                    position: targetIndex,
                });
            } else {
                // Reorder existing template
                const sourceIndex = selectedTemplates.findIndex((t) => t.id === active.id);
                if (sourceIndex === -1) return;

                // Adjust target index if moving down
                if (sourceIndex < targetIndex) {
                    targetIndex--;
                }

                newTemplates = arrayMove(selectedTemplates, sourceIndex, targetIndex);
            }

            // Update positions for all templates
            const updatedTemplates = newTemplates.map((template, index) => ({
                ...template,
                position: index,
            }));

            setSelectedTemplates(updatedTemplates);
        }
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    const activeTemplate = activeId
        ? [...templateData, ...selectedTemplates].find(
            (t) => t.id === activeId
        )
        : null;

    return (
        <div className="flex gap-4 h-[calc(100vh-7rem)] px-20 pt-5">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <div className="w-full md:w-1/3">
                    <AvailableTemplates templates={templateData} />
                </div>

                <div className="w-full md:w-2/3 bg-gray-200 rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Root Canal</h2>
                        <div className="flex gap-3 items-center cursor-pointer">
                            <Button variant="outline" className="flex gap-2 rounded-lg border-1 border-black">
                                <Mic className="w-5 h-5" />
                                <p className="text-xs font-semibold">Resume</p>
                            </Button>
                            <Upload className="w-5 h-5" />
                            <Trash2 className="w-5 h-5 text-destructive" />
                        </div>
                    </div>
                    <SelectedTemplates templates={selectedTemplates} activeId={activeId} />
                </div>

                <DragOverlay>
                    {activeId ? (
                        <div className="opacity-80 bg-white rounded-md shadow-md">
                            {activeTemplate && (
                                <TemplateCard template={activeTemplate} rootCanal={true} />
                            )}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default TemplateManager;
