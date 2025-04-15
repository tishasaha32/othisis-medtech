import { Button } from "@/components/ui/button";
import { type CardItem, DraggableCard } from "@/components/app/DraggableCard";
import { Edit } from "lucide-react";
interface AvailableTemplatesProps {
    cards: CardItem[];
}

export const AvailableTemplates = ({ cards }: AvailableTemplatesProps) => {
    return (
        <div className="w-full md:w-1/3 h-[calc(100vh-11rem)] relative overflow-y-scroll bg-gray-200 rounded-lg m-4 pt-4 pb-0">
            <h2 className="text-xl text-center font-semibold mb-4">Templates</h2>
            <div className="flex flex-col gap-4 p-5 m-4 bg-white rounded-lg">
                {cards.map((card) => (
                    <DraggableCard
                        key={card.id}
                        card={card}
                        showDescription={false}
                        source="left"
                    />
                ))}
            </div>
            <div className="sticky bottom-0 left-0 w-full right-0 bg-white rounded-lg mt-2">
                <Button className="w-full"><Edit className="w-4 h-4 mr-2" />Edit Template</Button>
            </div>
        </div>
    );
};
