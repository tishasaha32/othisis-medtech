import { type CardItem, DraggableCard } from "@/components/app/DraggableCard";

interface AvailableTemplatesProps {
    cards: CardItem[];
}

export const AvailableTemplates = ({ cards }: AvailableTemplatesProps) => {
    return (
        <div className="w-full md:w-1/2 bg-muted/30 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Left Sidebar</h2>
            <div className="flex flex-col gap-3">
                {cards.map((card) => (
                    <DraggableCard
                        key={card.id}
                        card={card}
                        showDescription={false}
                        source="left"
                    />
                ))}
            </div>
        </div>
    );
};
