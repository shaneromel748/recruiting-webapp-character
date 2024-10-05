import { Card } from "antd";
import { useState } from "react";
import Attribute from "./Attribute";

export default function Character({
    character
}) {
    const [attributes, setAttrbutes] = useState(character.attributes);

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
                        />
                    ))}
                </div>
            </Card>
        </div>
    )
}