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
} from "@dnd-kit/core";
import { Button } from "../ui/button";

const TemplateManager = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTemplates, setSelectedTemplates] = useState<TemplateData[]>(
        []
    );
    const [availableTemplates, setAvailableTemplates] =
        useState<TemplateData[]>(templateData);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    function handleDragStart(event: any) {
        const { active } = event;
        setActiveId(active.id);
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        // Handle dropping from available to selected
        if (over.id === "selected-templates-droppable") {
            const draggedTemplate = availableTemplates.find(
                (t) => t.id === active.id
            );
            // Check if template already exists in selectedTemplates
            if (
                draggedTemplate &&
                !selectedTemplates.some((t) => t.id === active.id)
            ) {
                setSelectedTemplates([
                    ...selectedTemplates,
                    {
                        ...draggedTemplate,
                        position: selectedTemplates.length, // Add position for ordering
                    },
                ]);
            }
            return;
        }

        // Handle reordering within selected templates
        if (over.id.toString().startsWith("selected-template-")) {
            const sourceIndex = selectedTemplates.findIndex(
                (t) => t.id === active.id
            );
            if (sourceIndex === -1) return;

            const targetId = over.id.toString().replace("selected-template-", "");
            const targetIndex = selectedTemplates.findIndex((t) => t.id === targetId);
            if (targetIndex === -1) return;

            // Don't reorder if dropping on the same item
            if (sourceIndex === targetIndex) return;

            const reorderedTemplates = [...selectedTemplates];
            const [movedTemplate] = reorderedTemplates.splice(sourceIndex, 1);
            reorderedTemplates.splice(targetIndex, 0, movedTemplate);

            // Update positions
            const updatedTemplates = reorderedTemplates.map((template, index) => ({
                ...template,
                position: index,
            }));

            setSelectedTemplates(updatedTemplates);
        }
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    // const toggleSidebar = () => {
    //     setSidebarOpen(!sidebarOpen);
    // };

    const activeTemplate = activeId
        ? [...availableTemplates, ...selectedTemplates].find(
            (t) => t.id === activeId
        )
        : null;

    return (
        <div className="flex gap-4 h-[calc(100vh-5rem)]">
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
                                Resume
                            </Button>
                            <Upload className="w-5 h-5" />
                            <Trash2 className="w-5 h-5 text-destructive" />
                        </div>
                    </div>
                    <SelectedTemplates templates={selectedTemplates} />
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
