import { Card } from "antd";
import { useState } from "react";
import Attribute from "./Attribute";

export default function Character({
    character
}) {
    const [attributes, setAttributes] = useState(character.attributes);

    const handleAttributesChange = (attributeTitle, newPoints) => {
        setAttributes(prevAttributes => {
            const updatedAttributes = {
                ...prevAttributes,
                [attributeTitle]: {
                    ...prevAttributes[attributeTitle],
                    points: newPoints
                }
            };

            const totalAttributePoints = Object.keys(updatedAttributes).reduce((acc, curr) => acc + updatedAttributes[curr].points, 0);

            if (totalAttributePoints <= 70) {
                return updatedAttributes;
            } else {
                alert("Maximum attribute points reached");
                return prevAttributes;
            }
        })
    }

    return (
        <div className="flex gap-3">
            <Card title="Attributes">
                <div className="flex flex-col">
                    {Object.keys(attributes).map((attributeTitle, index) => (
                        <Attribute
                            key={index}
                            attribute={{
                                title: attributeTitle,
                                points: attributes[attributeTitle].points
                            }}
                            onPointsChange={handleAttributesChange}
                        />
                    ))}
                </div>
            </Card>
        </div>
    )
}