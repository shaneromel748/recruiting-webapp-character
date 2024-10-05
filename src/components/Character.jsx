import { Button, Card } from "antd";
import { useCallback, useEffect, useState } from "react";
import Attribute from "./Attribute";
import { CLASS_LIST, SKILL_LIST } from "../consts";
import { getModifierValue } from "../utils";
import Skill from "./Skill";
import SkillCheck from "./SkillCheck";

export default function Character({
    character,
    onCharacterChanged
}) {
    const [attributes, setAttributes] = useState(character.attributes);
    const [selectedClass, setSelectedClass] = useState();
    const [eligibleClasses, setEligibleClasses] = useState([]);
    const [skillPoints, setSkillPoints] = useState(character.skillPoints);
    const [availableSkillPoints, setAvailableSkillPoints] = useState(0);

    useEffect(() => {
        const updatedCharacter = {
            ...character,
            attributes,
            skillPoints
        };

        onCharacterChanged(updatedCharacter);
    }, [attributes, skillPoints]);

    useEffect(() => {
        for (let classTitle in CLASS_LIST) {
            const requirements = CLASS_LIST[classTitle];
            let isEligible = true;

            for (let requirement in requirements) {
                const requirementValue = requirements[requirement];
                const characterValue = attributes[requirement].points || 0;

                if (requirementValue > characterValue) {
                    isEligible = false;
                }
            }

            if (isEligible) {
                setEligibleClasses(prevEligibleClasses => [...prevEligibleClasses, classTitle]);
            }
        }

        const intelligencePoints = attributes["Intelligence"]?.points || 0;
        const intelligenceModifier = getModifierValue(intelligencePoints);
        const skillPoints = Math.max(0, 10 + 4 * intelligenceModifier);

        setAvailableSkillPoints(skillPoints);
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

    const updateSkillPoints = useCallback((skillName, value) => {
        const totalSkillPoints = Object.keys(skillPoints).reduce((acc, curr) => acc + skillPoints[curr], 0);

        if ((totalSkillPoints + value) <= availableSkillPoints) {
            setSkillPoints({ ...skillPoints, [skillName]: skillPoints[skillName] + value });
        } else {
            alert("Not enough skill points available");
        }
    }, [skillPoints, availableSkillPoints]);

    return (
        <div className="flex flex-col gap-3 bg-white text-black pt-5">
            <h1 className="text-center block text-xl">{character.title}</h1>
            <Card title="Skill Check">
                <SkillCheck character={character} attributes={attributes} skillPoints={skillPoints} />
            </Card>
            <div className="flex gap-3 justify-around">
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

                <Card title="Skills">
                    <span className="block text-center">Total Skill Points available: {availableSkillPoints}</span>

                    <div className="flex flex-col gap-2">
                        {SKILL_LIST.map((skill, index) => (
                            <Skill
                                key={index}
                                skill={skill}
                                modifier={getModifierValue(attributes[skill.attributeModifier].points)}
                                points={skillPoints[skill.name]}
                                updateSkillPoints={updateSkillPoints}
                            />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}