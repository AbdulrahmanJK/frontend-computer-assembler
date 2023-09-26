import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategory } from "../features/CategorySlice";
import { CarouselHome } from "./cssComponent/Carousel";
import style from "../css/assembling.module.css";
import { fetchAccessories, fetchAccessoriesCategory, fetchOneAccessories } from "../features/AccessoriesSlice";
import { AppDispatch } from "../app/store";
import One from "./One";
import { log } from "three/examples/jsm/nodes/Nodes.js";
import { createAssembling } from "../features/AssemblingSlice";



function Assembling() {
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state) => state.categorySlice.category);
  const accessories = useSelector((state) => state.accessoriesSlice.accessories)
  const oneAcces = useSelector((state) => state.accessoriesSlice.oneAccessori)
  const [mb, setMb] = useState('')
  const [gpu, setGpu] = useState('')
  const [cpu, setCpu] = useState('')
  const [block, setBlock] = useState('')
  const [ram, setRam] = useState('')
  const [corpus, setCorpus] = useState('')
  const [drive, setDrive] = useState('')
  const [fan, setFan] = useState('')
  const [tit, setTit] = useState('')
  const [sideCost, setSideCost] = useState(0)
  const [sideItems, setSideItems] = useState(0)


  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAccessories());
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(fetchAccessoriesCategory(id))


  }
  const handleOpenClick = (id, acces) => {
    const inArray = oneAcces.filter((item) => item.category === acces.category)
    // setSideCost(sideCost + acces.price)
    setSideItems(sideItems + 1)
    setSideCost(sideCost+ acces.price)
  




    if (inArray.length < 1) {
      dispatch(fetchOneAccessories(id))
    }
    if (acces.category === "650812559113012b9f747d0b") {
      setGpu(id)
    }
    if (acces.category === "650812629113012b9f747d0d") {
      setCpu(id)
    }
    if (acces.category === "650b4bfd64b6a469ea6f9fa7") {
      setCorpus(id)
    }
    if (acces.category === "650d7f6e8ba3dc9cbdf9e4a8") {
      setBlock(id)
    }
    if (acces.category === "650812669113012b9f747d0f") {
      setRam(id)
    }
    if (acces.category === "650812c99113012b9f747d13") {
      setDrive(id)
    }
    if (acces.category === "650812969113012b9f747d11") {
      setMb(id)

    }
    if (acces.category === "650d7f8b8ba3dc9cbdf9e4aa") {
      setFan(id)

    }
  }


  const addAssembling = (e) => {
    if (tit !== "") {
      dispatch(createAssembling({ cpu: cpu, gpu: gpu, powerblock: block, ram: ram, fan: fan, motherboard: mb, body: corpus, drive: drive, title }))
      e.preventDefault
    }

  }

  console.log(tit);


  return (
    <> <CarouselHome />
      <div className={style.rod_add}>
        <div className={style.sborka_tit}> <button onClick={addAssembling} className={style.addBut}>Собрать сборку</button>
          <p>
            <span className={style.input}>
              <input onChange={(e) => setTit(e.target.value)} type="text" placeholder="Введите название сборки" />
              <span></span>
            </span>
          </p>

        </div>
      </div>
      <div className={style.rodblock_assem}>

        <div>
          <div className={style.compl}>
            <span>Комплектация</span>
          </div>
          {category?.map((item) => {
            return (
              <div onClick={() => handleClick(item._id)} className={style.title}>
                <div> <span>{item.title}</span></div>
                {oneAcces.map((ac) => {
                  if (item._id === ac.category) {
                    return (
                      <div className={style.tit_img}>
                        <div className={style.image_acces}><img src={ac.image} alt="" /></div>
                        <div className={style.title_acces}>{ac.title}</div>
                      </div>
                    )
                  }
                })}
              </div>
            );
          })}

        </div>

        <div className={style.twoRod}>
          {accessories?.map((acces) => <One setSideItems={setSideItems} sideItems={sideItems} sideCost={sideCost} setSideCost={setSideCost}  setTit={setTit} addAssembling={addAssembling} handleOpenClick={handleOpenClick} acces={acces} />)}
        </div>
        <div className={style.sideBar}>
        <span>СУММА ТОВАРОВ: {sideCost}₽</span>
        <span>КОЛ-ВО ТОВАРОВ: {sideItems}</span>
        <button >В КОРЗИНУ</button>
        </div>

      </div>
    </>
  );
}

export default Assembling;
