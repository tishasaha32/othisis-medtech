import { Button } from "../ui/button"

const ButtonSection = () => {
    return (
        <div className="flex justify-end gap-4 pr-20 my-3">
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