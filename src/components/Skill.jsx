import { Button } from "antd";

export default function Skill({
    skill,
    points,
    modifier,
    updateSkillPoints
}){
    return (
        <div className="flex gap-2">
            <span>{skill.name}</span>
            <span>{points}</span>
            <span>(Modifier: {skill.attributeModifier}): {modifier}</span>

            <div className="flex gap-1">
                <Button onClick={() => updateSkillPoints(skill.name,  -1)}>-</Button>
                <Button onClick={() => updateSkillPoints(skill.name,  1)}>+</Button>
            </div>

            <span>Total: {points + modifier}</span>
        </div>
    )
}