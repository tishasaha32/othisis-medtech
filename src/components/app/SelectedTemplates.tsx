"use client";

import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import { useState, RefObject } from "react";
import type { CardItem } from "@/components/app/DraggableCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardInstance extends CardItem {
    instanceId: string;
}

export const SelectedTemplates = () => {
    const [droppedCards, setDroppedCards] = useState<CardInstance[]>([]);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [isDraggingFromLeft, setIsDraggingFromLeft] = useState(false);

    const [{ isOver }, drop] = useDrop({
        accept: "CARD",
        hover: (item: CardItem & { source: "left" | "right" }, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            // Only handle preview if dragging from left
            if (item.source === "left") {
                setIsDraggingFromLeft(true);

                const mouseY = monitor.getClientOffset()?.y;
                const cardPositions = document.querySelectorAll("[data-card-index]");
                let newIndex = droppedCards.length;

                for (let i = 0; i < cardPositions.length; i++) {
                    const el = cardPositions[i] as HTMLElement;
                    const rect = el.getBoundingClientRect();

                    if (mouseY! < rect.top + rect.height / 2) {
                        newIndex = i;
                        break;
                    }
                }

                setPreviewIndex(newIndex);
            }
        },
        drop: (item: CardItem & { source: "left" | "right" }) => {
            const instanceId = `${item.id}-${Date.now()}`;
            const insertAt =
                previewIndex !== null ? previewIndex : droppedCards.length;
            const newCard: CardInstance = { ...item, instanceId };

            const updated = [...droppedCards];
            updated.splice(insertAt, 0, newCard);
            setDroppedCards(updated);

            setPreviewIndex(null);
            setIsDraggingFromLeft(false);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop as unknown as RefObject<HTMLDivElement>}
            className={`w-full md:w-1/2 bg-muted/30 rounded-lg p-4 min-h-[300px] transition-colors ${isOver ? "bg-muted/50" : ""
                }`}
        >
            <h2 className="text-xl font-semibold mb-4">Right Sidebar</h2>

            {droppedCards.length === 0 && !isOver ? (
                <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Drop cards here</p>
                </div>
            ) : (
                <Reorder.Group
                    axis="y"
                    values={droppedCards}
                    onReorder={setDroppedCards}
                    className="flex flex-col gap-3"
                >
                    {droppedCards.map((card, index) => (
                        <div key={card.instanceId} data-card-index={index}>
                            {isDraggingFromLeft && previewIndex === index && (
                                <div className="h-[100px] bg-primary/10 border-2 border-dashed border-primary rounded-lg transition-all mb-2" />
                            )}
                            <Reorder.Item
                                key={card.instanceId}
                                value={card}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{card.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside">
                                            {card.description.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </Reorder.Item>
                        </div>
                    ))}
                    {isDraggingFromLeft && previewIndex === droppedCards.length && (
                        <div className="h-[100px] bg-primary/10 border-2 border-dashed border-primary rounded-lg transition-all" />
                    )}
                </Reorder.Group>
            )}
        </div>
    );
};
