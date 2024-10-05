import { useEffect, useState } from "react"
import { getModifierValue } from "../utils";
import { Button } from "antd";

export default function Attribute({
    attribute
}) {
    const [modifier, setModifier] = useState(0);

    useEffect(() => {
        const modifier = getModifierValue(attribute.points);
        setModifier(modifier); 
    }, []);

    return (
        <div className="flex gap-4 items-center justify-between">
            <span>{attribute.title}: {attribute.points} (Modifier: {modifier})</span>

            <div className="flex gap-1">
                <Button>-</Button>
                <Button>+</Button>
            </div>
        </div>
    )
}