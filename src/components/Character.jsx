import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import Attribute from "./Attribute";
import { CLASS_LIST } from "../consts";

export default function Character({
    character
}) {
    const [attributes, setAttributes] = useState(character.attributes);
    const [selectedClass, setSelectedClass] = useState();
    const [eligibleClasses, setEligibleClasses] = useState([]);

    useEffect(() => {
        for (let classTitle in CLASS_LIST) {
            const requirements = CLASS_LIST[classTitle];
            let isEligible = true;

            for (let requirement in requirements) {
                const requirementValue = requirements[requirement];
                const characterValue = attributes[requirement].points || 0;

                if(requirementValue > characterValue) {
                    isEligible = false;
                }
            }

            if(isEligible) {
                setEligibleClasses(prevEligibleClasses => [...prevEligibleClasses, classTitle]);
            }
        }
    }, [attributes]);

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

            <Card title="Classes">
                <div className="flex flex-col items-center">
                    {Object.keys(CLASS_LIST).map((classTitle, index) => (
                        <span key={index} onClick={() => setSelectedClass({
                            title: classTitle,
                            requirements: CLASS_LIST[classTitle]
                        })} className="cursor-pointer" style={{
                            color: eligibleClasses.includes(classTitle) ? "green" : "black"
                        }}>{classTitle}</span>
                    ))}
                </div>
            </Card>

            {selectedClass && (
                <Card 
                    actions={[<Button onClick={() => setSelectedClass()}>Close Requirements</Button>]}
                    title={<>{selectedClass.title} minimum requirements</>}
                >
                    {Object.keys(selectedClass.requirements).map((requirement, index) => (
                        <div key={index} className="flex gap-2 justify-between">
                            <span>{requirement}</span>
                            <span>{selectedClass.requirements[requirement]}</span>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    )
}