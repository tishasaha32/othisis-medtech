import { useState } from "react";
import { Edit, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type CardItem, DraggableCard } from "@/components/app/DraggableCard";

interface AvailableTemplatesProps {
    cards: CardItem[];
}

export const AvailableTemplates = ({ cards }: AvailableTemplatesProps) => {
    const [, setSearch] = useState("");
    const [cardsState, setCardsState] = useState<CardItem[]>(cards);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCardsState(cards.filter((card) => card.title.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <div className="w-full md:w-1/4 h-[calc(100vh-10rem)] bg-[#E3E3E3] rounded-lg pt-4 pb-0 flex flex-col">
            <h2 className="text-2xl text-center font-semibold">Template</h2>
            <div className="flex flex-col flex-1 min-h-0">
                <div className="flex flex-col gap-4 p-5 m-4 bg-white rounded-lg flex-1 min-h-0">
                    <Input placeholder="Search templates" endContent={<Search className="w-4 h-4" />} onChange={(e) => handleSearch(e.target.value)} />
                    <div className="overflow-y-auto flex flex-col gap-3">
                        {cardsState.map((card) => (
                            <DraggableCard
                                key={card.id}
                                card={card}
                                showDescription={false}
                                source="left"
                            />
                        ))}
                    </div>
                    {cardsState.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-muted-foreground">No templates found</p>
                        </div>
                    )}
                </div>
                <div className="sticky bottom-0 left-0 w-full right-0 bg-white rounded-lg mt-2">
                    <Button className="w-full"><Edit className="w-4 h-4 mr-2" />Edit Template</Button>
                </div>
            </div>
        </div>
    );
};
