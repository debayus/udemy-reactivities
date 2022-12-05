import React from "react";
import { Duck } from "./demo";

interface Props{
    duck : Duck;
}

export default function DuckItem({duck} : Props){
    return(
        <div>
            <span>{duck.name}</span>
            {
                duck.makeSound != null ?
                <button onClick={() => duck.makeSound!(duck.name + ' quack')}>Make Sound</button>
                : null
            }
        </div>
    );
}