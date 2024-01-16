import {getQuizById} from "../fetchFunctions/getFunctions";

test('', ()=> {
    return getQuizById('1').then(data =>{
        expect(data.title).toBe('Dupa');
    })

})