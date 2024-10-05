import { default as axios} from 'axios';
import { SKILL_LIST } from './consts';

const characterApi = axios.create({
    baseURL: "https://recruiting.verylongdomaintotestwith.ca/api/{shaneromel748}"
});

export const getCharacters = () => characterApi.get("/character").then(response => response.data?.body);

export const postCharacters = (characters) => characterApi.post("/character", characters).then(response => response.data);

export const getModifierValue = points => Math.floor((points - 10) / 2)

export const getTotalSkillPoints = character => {
    let totalSkillPoints = Object.keys(character.skillPoints).reduce((acc, curr) => {
        const points = character.skillPoints[curr];
        const skillDetails = SKILL_LIST.find(s => s.name === curr);
        const modifier = getModifierValue(character.attributes[skillDetails.attributeModifier].points);

        return acc + Math.max(0, (modifier + points))
    }, 0);

    return totalSkillPoints;
}