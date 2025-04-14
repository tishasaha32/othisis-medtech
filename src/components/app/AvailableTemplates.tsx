import { Search } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { TemplateCard } from "./TemplateCard";
import { Input } from "@/components/ui/input";
import { useAutoScroll } from "@/hooks/useAutoScroll";

type AvailableTemplatesProps = {
    templates: TemplateData[];
};

export function AvailableTemplates({ templates }: AvailableTemplatesProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: "available-templates-droppable",
    });

    // Use auto-scroll when dragging over this container
    useAutoScroll("available-templates", isOver);

    return (
        <div
            id="available-templates"
            ref={setNodeRef}
            className="overflow-y-auto border rounded-md bg-gray-200 p-2"
        >
            <h3 className="text-lg font-medium p-4">Templates</h3>
            <div className="bg-white rounded-md p-4">
                <Input placeholder="Search templates" className="mb-2" endContent={<Search className="w-4 h-4 text-muted-foreground" />} />
                <div className="space-y-2">
                    {templates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            isDraggable={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}