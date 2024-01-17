import {getCategories, getQuizById} from "../fetchFunctions/getFunctions";

test('Pobieranie quizu po id', async ()=> {
    const data = await getQuizById('65a6afb373207862e29f7790');
    expect(data.questions[0].question).toBe('1');
    });
test('Pobieranie kategorii', async ()=> {
    const data = await getCategories();
    expect(data[0].categoryName).toBe('brak');
});

