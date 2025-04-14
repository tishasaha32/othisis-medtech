import { Edit, Search } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { TemplateCard } from "./TemplateCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
            className="relative flex flex-col h-[calc(100vh-5rem)] border rounded-md bg-gray-200 p-2"
        >
            <h3 className="text-2xl text-center font-semibold p-4">Templates</h3>
            <div className="flex-1 overflow-y-auto">
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
            <div className="mt-2 sticky flex items-center justify-center bottom-0 left-0 w-full">
                <Button className="w-full"><Edit className="w-4 h-4 mr-2" />Edit Template</Button>
            </div>
        </div>
    );
}