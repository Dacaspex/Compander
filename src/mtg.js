
// https://scryfall.com/docs/api/layouts
const doubleFacedCardLayouts = [
    'transform',
    'modal_dfc',
    'double_faced_token',
    'art_series',
]

export class MtgClient {
    async cards(name) {
        return fetch('https://api.scryfall.com/cards/search?q=' + name)
            .then(response => response.json())
            .then(json => this.parseResults(json));
    }

    parseResults(json) {
        if (json.status === 404) return [];

        console.debug(json.data);

        return json.data
            .map(this.mapToCardObject)
            .filter(card => card !== null);
    }

    mapToCardObject = card => {
        // TODO: "some" as query fails
        // TODO: "fal" as query fails
        // Faithful Squire

        if (doubleFacedCardLayouts.includes(card.layout)) {
            return {
                id: card.id,
                name: card.name,
                faces: [
                    this.mapCardFace(card.card_faces[0]),
                    this.mapCardFace(card.card_faces[1])
                ],
                activeFace: 0
            }
        }

        if (Object.hasOwn(card, 'image_uris')) {
            return {
                id: card.id,
                name: card.name,
                faces: [
                    {
                        name: card.name,
                        manaCost: card.mana_cost,
                        artwork: {
                            small: card.image_uris.small,
                            large: card.image_uris.large,
                        }
                    }
                ],
                activeFace: 0
            }
        }

        return null;
    }

    mapCardFace = face => {
        return {
            name: face.name,
            manaCost: face.mana_cost,
            artwork: {
                small: face.image_uris.small,
                large: face.image_uris.large,
            }
        }
    };
}