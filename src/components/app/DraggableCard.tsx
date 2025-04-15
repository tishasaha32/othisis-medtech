import { useDrag } from "react-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CardItem {
    id: string;
    title: string;
    description: string[];
}

interface DraggableCardProps {
    card: CardItem;
    showDescription?: boolean;
    source: "left" | "right";
}

export const DraggableCard = ({
    card,
    showDescription = false,
    source,
}: DraggableCardProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "CARD",
        item: { ...card, source },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag as unknown as React.RefObject<HTMLDivElement>}
            className={`cursor-grab ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            <Card className="w-full p-0 bg-[#F2F2F2]">
                <CardHeader className="p-3">
                    <CardTitle className="text-base font-normal text-center">{card.title}</CardTitle>
                </CardHeader>
                {showDescription && (
                    <CardContent className="p-3 pt-0">
                        <ul className="list-disc pl-5 text-sm">
                            {card.description.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};
