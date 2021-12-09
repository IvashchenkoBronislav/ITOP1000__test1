import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import "../scss/count.scss"


// const secand = new Observable(function subscribe(subscriber) {
//     let se = 0;
//     let me = 0;
    
//     const id = setInterval(() => {
//         if(se <=59){
//             subscriber.next(se+=1)
//         }else{
//             se=0
//             me+=1
//             subscriber.next()
//         }
      
//     }, 1000);

// });

// secand.subscribe({
//   next(x) {return x},
// });

export const Con = () =>{
    const [s, setS] = useState(0);
    const [start, setstart] = useState(false);
    const [reset, setreset] = useState(false);
    const [waite, setWaite] = useState(null)

    // Секундомер 
    useEffect(() => {
        const counter = new Subject();
        interval(200)
            .pipe(takeUntil(counter))
            .subscribe(() => {
                if (start) {
                    setS(s+1000);
                }
            });
            return () => {
                counter.next();
                counter.complete()
            };
    });
    
    // ====== Перезапус секундамера ======
    
    const resetS = React.useCallback(() => {
        setS(0);
    });
    

    const countReset = () => {
        if(start){
            setstart(!start);
            setreset(!reset);
            
        }
        setTimeout(() => {
            if(!start){
                setstart(true);
            }
        }, 500);
        setreset(false);
        console.log(start,reset)
    }

    //====== Старт / Стоп ======

    const countStart = ()=>{
        
        setstart(!start)
        setWaite(null)

        if(waite === null){
            resetS()
        }
        console.log(waite, "waiteS")
    }

    //======= Ожидание ======

    const countWait = ()=>{
        setWaite(!waite)
        if(start){
            setTimeout(()=>{
                if(waite){
                    setstart(false);
                    setWaite(true)
                }else if(!waite){
                    setWaite(null)
                }
            },200)
        }
        console.log(waite, "waiteBCo")

    }
    
    return(
        <div className="case_count">
            <span>{new Date(s).toISOString().slice(11, 19)}</span>
            <div>
                <button className={!start? "button_count button_start":"button_count button_stop" } onClick={countStart}>{!start? "Start" : "Stop"}</button>
                <button className="button_count button_wait" onClick={countWait}>Wait</button>
                <button className="button_count button_reset" onClick={countReset,resetS}>Reset</button>
                
            </div>
        </div>
    )
}