import { Button, Input, Modal, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { SKILL_LIST } from "../consts";
import { getModifierValue } from "../utils";

const SkillCheckResult = ({
    character,
    skill,
    roll,
    dc,
    isSuccessful
}) => {
    return (
        <div className="flex flex-col gap-2">
            <h2>{character.title}</h2>

            <span>Skill: {skill.name}: {skill.points}</span>
            <span>You Rolled: {roll}</span>
            <span>The DC was: {dc}</span>
            <span>Result: {isSuccessful ? "Successful" : "Unsuccessful"}</span>
        </div>
    )
}

export default function SkillCheck({
    attributes,
    skillPoints,
    character
}) {
    const [selectedSkill, setSelectedSkill] = useState("");
    const [dc, setDc] = useState(0);
    const [totalSkillPoints, setTotalSkillPoints] = useState(0);
    const [skillCheckModalOpened, setSkillCheckModalOpened] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        if (selectedSkill) {
            const skillDetails = SKILL_LIST.find(s => s.name === selectedSkill);
            const points = skillPoints[selectedSkill] + getModifierValue(attributes[skillDetails.attributeModifier].points);

            setTotalSkillPoints(points);
        }
    }, [selectedSkill]);

    const roll = useCallback(() => {
        const randomNumber = Math.floor(Math.random() * (19) + 1);
        setRandomNumber(randomNumber);
        setIsSuccessful((totalSkillPoints + randomNumber) >= dc);
        setSkillCheckModalOpened(true);
    }, [totalSkillPoints, dc]);

    return (
        <>
            <div className="flex gap-3">
                <Select
                    onChange={event => {
                        setSelectedSkill(event);
                    }}
                    className="w-40"
                    placeholder="Skill"
                >
                    {SKILL_LIST.map((skill, index) => (
                        <Select.Option key={index} value={skill.name}>{skill.name}</Select.Option>
                    ))}
                </Select>

                <Input onChange={event => setDc(event.target.value)} className="w-40" type="number" placeholder="DC" />

                <Button onClick={roll} disabled={!selectedSkill || !dc}>Roll</Button>
            </div>

            <Modal
                open={skillCheckModalOpened}
                onCancel={() => setSkillCheckModalOpened(false)}
                title="Skill Check Results"
                onOk={() => setSkillCheckModalOpened(false)}
                cancelButtonProps={{
                    style: {
                        display: "none"
                    }
                }}
            >
                <SkillCheckResult 
                    character={character}
                    dc={dc}
                    isSuccessful={isSuccessful}
                    roll={randomNumber}
                    skill={{
                        name: selectedSkill,
                        points: totalSkillPoints
                    }}
                />
            </Modal>
        </>
    )
}