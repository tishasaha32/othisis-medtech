// import { CSS } from "@dnd-kit/utilities";
// import { useDraggable } from "@dnd-kit/core";

// type TemplateCardProps = {
//     template: TemplateData;
//     isDraggable?: boolean;
//     rootCanal?: boolean;
// };

// export function TemplateCard({ template, isDraggable = false, rootCanal }: TemplateCardProps) {
//     const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
//         id: template.id,
//         data: {
//             type: "template",
//             template
//         },
//         disabled: !isDraggable
//     });

//     const style = {
//         transform: CSS.Translate.toString(transform),
//         opacity: isDragging ? 0.4 : 1,
//     };

//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             className={`p-3 rounded-md shadow-sm ${rootCanal ? "text-left bg-gray-200 w-2/3" : "text-center bg-gray-100"} ${isDraggable ? "cursor-grab active:cursor-grabbing" : "w-full"} ${isDragging ? "ring-2 ring-blue-500" : ""}`}
//             {...(isDraggable ? { ...attributes, ...listeners } : {})}
//         >
//             <h3 className="font-medium">{template.title}</h3>
//             {rootCanal && (
//                 <div className="mt-2">
//                     <ul className="text-sm text-gray-600 list-none pl-4 space-y-1">
//                         {template.content?.map((content, index) => (
//                             <li key={index}>• {content}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }
