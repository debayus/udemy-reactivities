// let data: any = 24;
// let data: number | string = 24;
// data = '24';

export interface Duck {
    name : string;
    numLegs : number;
    makeSound?: (sound : string) => void;
}

const duck1 : Duck = {
    name : 'heu',
    numLegs : 2,
    makeSound : (sound : string) => console.log(sound), 
};

duck1.makeSound!('quack');

export const ducks = [duck1];