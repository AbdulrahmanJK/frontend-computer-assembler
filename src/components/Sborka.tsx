import React, { useEffect, useState } from 'react'
import style from '../css/sborka.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'
import { fetchAssembling } from '../features/AssemblingSlice'
import { div, log } from 'three/examples/jsm/nodes/Nodes.js'
import img from './img/info.svg'

function Sborka() {
  const assembling = useSelector((state) => state.assemblingSlice.assembling)
  const dispatch = useDispatch<AppDispatch>()
const[mb, setMb]=useState(false)
const[gpu, setGpu]=useState(false)
const[block, setBlock]=useState(false)
const[body, setBody]=useState(false)
const[cpu, setCpu]=useState(false)
  
  useEffect(() => {
    dispatch(fetchAssembling())

  }, [dispatch]);
const handleBody = ()=>{
setBody(!body)

}
const handleGpu = ()=>{
setGpu(!gpu)

}
const handleCpu = ()=>{
setCpu(!cpu)

}
const handleBlock = ()=>{
setBlock(!block)

}
const handleMB = ()=>{
setMb(!mb)

}

  return (
    <div>
    {assembling.map((item)=>{
        console.log(item.drive.scetchImg);
        
        return(
          <div className={style.rod}>
<div className={style.assembling}>
<div className={style.corpus} onClick={handleBody}><img src={item.body.scetchImg} alt="" />

</div>
<div className={style.mb} onClick={handleMB}><img  src={item.motherboard.scetchImg} alt="" />
</div>
<div className={style.cpu} onClick={handleCpu}><img src={item.cpu.scetchImg} alt="" /></div>
<div className={style.gpu} onClick={handleGpu}><img src={item.gpu.scetchImg} alt="" /></div>
<div className={style.fan}><img src={item.fan.scetchImg} alt="" /></div>
<div className={style.block} onClick={handleBlock}><img src={item.powerblock.scetchImg} alt="" /></div>
<div className={style.hdd}><img src={item.drive.scetchImg} alt="" /></div>
<div className={style.ram}><img src={item.ram.scetchImg} alt="" /></div>
    </div>
    <div className={style.openBlock}>
{body ? <div className={style.body}><img src={item.body.image} alt="" />
<div className={style.title}>{item.body.title}</div>
<div><button>Убрать</button></div></div> : null}
{gpu ? <div className={style.body}><img src={item.gpu.image} alt="" />
<div className={style.title}>{item.gpu.title}</div>
<div><button>Убрать</button></div></div> : null}
{cpu ? <div className={style.body}><img src={item.cpu.image} alt="" />
<div className={style.title}>{item.cpu.title}</div>
<div><button>Убрать</button></div></div> : null}
{block ? <div className={style.body}><img src={item.powerblock.image} alt="" />
<div className={style.title}>{item.powerblock.title}</div>
<div><button>Убрать</button></div></div> : null}
{mb ? <div className={style.body}><img src={item.motherboard.image} alt="" />
<div className={style.title}>{item.motherboard.title}</div>
<div><button>Убрать</button></div></div> : null}

    </div>
    </div>
        )
    })}
     
    </div>
     )
}

export default Sborka