import { useCallback, useEffect, useState } from "react"
import { getModifierValue } from "../utils";
import { Button } from "antd";

export default function Attribute({
    attribute,
    onPointsChange
}) {
    const [modifier, setModifier] = useState(0);

    useEffect(() => {
        const modifier = getModifierValue(attribute.points);
        setModifier(modifier); 
    }, [attribute]);

    const updatePoints = useCallback((value) => {
        onPointsChange(attribute.title, attribute.points + value);
    }, [attribute]);

    return (
        <div className="flex gap-4 items-center justify-between">
            <span>{attribute.title}: {attribute.points} (Modifier: {modifier})</span>

            <div className="flex gap-1">
                <Button onClick={() => updatePoints(-1)}>-</Button>
                <Button onClick={() => updatePoints(1)}>+</Button>
            </div>
        </div>
    )
}