import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, RefObject, useRef, useEffect } from "react";
import type { CardItem } from "@/components/app/DraggableCard";
import { FilePlus, Info, Mic, Trash2, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardInstance extends CardItem {
    instanceId: string;
}

export const SelectedTemplates = () => {
    const [droppedCards, setDroppedCards] = useState<CardInstance[]>([]);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [isDraggingFromLeft, setIsDraggingFromLeft] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<CardItem | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

    const startAutoScroll = (direction: 'up' | 'down') => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
        }

        autoScrollInterval.current = setInterval(() => {
            if (scrollContainerRef.current) {
                const scrollAmount = direction === 'up' ? -10 : 10;
                scrollContainerRef.current.scrollTop += scrollAmount;
            }
        }, 16);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
        }
    };

    useEffect(() => {
        return () => {
            stopAutoScroll();
        };
    }, []);

    const [{ isOver }, drop] = useDrop({
        accept: "CARD",
        hover: (item: CardItem & { source: "left" | "right" }, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            if (item.source === "left") {
                setIsDraggingFromLeft(true);
                setHoveredItem(item);

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

                // Auto-scroll logic
                if (scrollContainerRef.current && mouseY) {
                    const containerRect = scrollContainerRef.current.getBoundingClientRect();
                    const scrollThreshold = 50; // pixels from top/bottom to start scrolling

                    if (mouseY < containerRect.top + scrollThreshold) {
                        startAutoScroll('up');
                    } else if (mouseY > containerRect.bottom - scrollThreshold) {
                        startAutoScroll('down');
                    } else {
                        stopAutoScroll();
                    }
                }
            }
        },
        drop: (item: CardItem & { source: "left" | "right" }) => {
            stopAutoScroll();
            const instanceId = `${item.id}-${Date.now()}`;
            const insertAt = previewIndex !== null ? previewIndex : droppedCards.length;
            const newCard: CardInstance = { ...item, instanceId };

            const updated = [...droppedCards];
            updated.splice(insertAt, 0, newCard);
            setDroppedCards(updated);

            setPreviewIndex(null);
            setIsDraggingFromLeft(false);
            setHoveredItem(null);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop as unknown as RefObject<HTMLDivElement>}
            className={`w-full md:w-3/4 bg-[#E3E3E3] h-[calc(100vh-10rem)] rounded-lg p-4 transition-colors ${isOver ? "bg-muted/50" : ""
                }`}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl flex items-center gap-2 font-semibold">
                    Root Canal
                    <Info className="w-6 h-6" />
                </h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-black">
                        <Mic className="w-4 h-4" />
                        Resume
                    </Button>
                    <Upload className="w-4 h-4" />
                    <Trash2 className="w-4 h-4 text-destructive" />
                </div>
            </div>

            {droppedCards.length === 0 && !isOver ? (
                <div className="flex flex-col items-center justify-center h-[90%] bg-white rounded-lg p-6">
                    <FilePlus size={60} className="text-muted-foreground" />
                    <p className="text-muted-foreground">Drop cards here</p>
                </div>
            ) : (
                <Reorder.Group
                    axis="y"
                    values={droppedCards}
                    onReorder={setDroppedCards}
                    className="flex flex-col gap-3 bg-white p-6 h-[calc(100vh-15rem)] overflow-y-scroll"
                    ref={scrollContainerRef}
                >
                    {droppedCards.map((card, index) => (
                        <div key={card.instanceId} data-card-index={index}>
                            {isDraggingFromLeft && previewIndex === index && hoveredItem && (
                                <div className="mb-2">
                                    <Card className="p-2 bg-[#ECECEC]">
                                        <CardHeader className="p-2 pb-0">
                                            <CardTitle>{hoveredItem.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2 pt-0">
                                            <ul className="list-disc list-inside">
                                                {hoveredItem.description.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            <Reorder.Item
                                key={card.instanceId}
                                value={card}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <Card className="p-2 bg-[#ECECEC] w-2/3">
                                    <CardHeader className="p-2 pb-0">
                                        <CardTitle>{card.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-2 pt-0">
                                        <ul className="list-disc list-inside">
                                            {card.description.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </Reorder.Item>
                        </div>
                    ))}
                    {isDraggingFromLeft && previewIndex === droppedCards.length && hoveredItem && (
                        <div>
                            <Card className="p-2 bg-[#ECECEC] bg-opacity-50 w-2/3">
                                <CardHeader className="p-2 pb-0">
                                    <CardTitle>{hoveredItem.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 pt-0">
                                    <ul className="list-disc list-inside">
                                        {hoveredItem.description.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </Reorder.Group>
            )}
        </div>
    );
};
