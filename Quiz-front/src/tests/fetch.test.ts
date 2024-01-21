import {getCategories, getQuizById} from "../fetchFunctions/getFunctions";

test('Pobieranie quizu po id', async ()=> {
    const data = await getQuizById('65a79526cf91941cd7cb1ea6');
    expect(data.questions[0].question).toBe('Pytanie 1');
    });
test('Pobieranie kategorii', async ()=> {
    const data = await getCategories();
    expect(data[0].categoryName).toBe('brak');
});

