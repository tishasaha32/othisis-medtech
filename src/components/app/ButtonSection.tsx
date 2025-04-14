import { Button } from "../ui/button"

const ButtonSection = () => {
    return (
        <div className="flex justify-end gap-4 mt-3 pr-20">
            <Button variant="outline" className="border-black">
                Send Referral
            </Button>
            <Button>
                Save Note
            </Button>
        </div>
    )
}

export default ButtonSection