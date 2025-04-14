import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

type TemplateCardProps = {
    template: TemplateData;
    isDraggable?: boolean;
};

export function TemplateCard({ template, isDraggable = false }: TemplateCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: template.id,
        data: {
            type: "template",
            template
        },
        disabled: !isDraggable
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`p-3 bg-gray-100 rounded-md shadow-sm ${isDraggable ? "cursor-grab active:cursor-grabbing" : ""
                } ${isDragging ? "ring-2 ring-blue-500" : ""}`}
            {...(isDraggable ? { ...attributes, ...listeners } : {})}
        >
            <h3 className="font-medium">{template.title}</h3>
        </div>
    );
}
