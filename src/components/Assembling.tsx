import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategory } from "../features/CategorySlice";
import { CarouselHome } from "./cssComponent/Carousel";
import { Suspense } from "react";
import img from './img/3D.svg'

import style from "../css/assembling.module.css";
import {
  fetchAccessories,
  fetchAccessoriesCategory,
  fetchOneAccessories,
} from "../features/AccessoriesSlice";
import { AppDispatch } from "../app/store";
import Test from "../components/threeJsComponents/test";
import One from "./One";
import { createAssembling } from "../features/AssemblingSlice";

function Assembling() {
  const handleClickThreeJs = () => {
    setThreeJs(!threejs);
  };
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state) => state.categorySlice.category);
  const accessories = useSelector(
    (state) => state.accessoriesSlice.accessories
  );
  const [threejs, setThreeJs] = useState(false);
  const oneAcces = useSelector((state) => state.accessoriesSlice.oneAccessori);
  const modelslink = useSelector(
    (state) => state.accessoriesSlice.oneAccessori
  );
  const [accessoriesActive, setAccessoriesActive] = useState({});

  const [mb, setMb] = useState("");
  const [gpu, setGpu] = useState("");
  const [cpu, setCpu] = useState("");
  const [block, setBlock] = useState("");
  const [ram, setRam] = useState("");
  const [corpus, setCorpus] = useState("");
  const [drive, setDrive] = useState("");
  const [fan, setFan] = useState("");
  const [tit, setTit] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAccessories());
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(fetchAccessoriesCategory(id));
  };

  const handleOpenClick = (id, acces) => {
    const inArray = oneAcces.filter((item) => item.category === acces.category);
    setPrice(acces.price + price);

    if (inArray.length < 1) {
      dispatch(fetchOneAccessories(id));
    }
    if (acces.category === "650812559113012b9f747d0b") {
      setGpu(id);
    }
    if (acces.category === "650812629113012b9f747d0d") {
      setCpu(id);
    }
    if (acces.category === "650b4bfd64b6a469ea6f9fa7") {
      setCorpus(id);
    }
    if (acces.category === "650d7f6e8ba3dc9cbdf9e4a8") {
      setBlock(id);
    }
    if (acces.category === "650812669113012b9f747d0f") {
      setRam(id);
    }
    if (acces.category === "650812c99113012b9f747d13") {
      setDrive(id);
    }
    if (acces.category === "650812969113012b9f747d11") {
      setMb(id);
    }
    if (acces.category === "650d7f8b8ba3dc9cbdf9e4aa") {
      setFan(id);
    }
  };

  // const a = oneAcces.reduce((acc, num)=>{
  //   return acc + num.item.price
  // },0)
  // console.log(a);

  const addAssembling = () => {
    dispatch(
      createAssembling({
        cpu: cpu,
        gpu: gpu,
        powerblock: block,
        ram: ram,
        fan: fan,
        motherboard: mb,
        body: corpus,
        drive: drive,
        title: tit,
        price: price,
      })
    );

    setTit("");
    setBlock("");
    setCorpus("");
    setCpu("");
    setDrive("");
    setFan("");
    setGpu("");
    setRam("");
    location.reload();
  };

  return (
    <>
      {" "}
      <CarouselHome />
      <div className={style.rrr}>
      <div className={style.rod_add}>
        <div className={style.sborka_tit}>
          {" "}
          <button onClick={addAssembling} className={style.addBut}>
            Собрать сборку
          </button>
          <p>
            <span className={style.input}>
              <input
                onChange={(e) => setTit(e.target.value)}
                type="text"
                placeholder="Введите название сборки"
              />
              <span></span>
            </span>
          </p>
        </div>
      </div>
      <div className={style.rodblock_assem}>
        <div>
          <div className={style.compl}>
            
          </div>
          {category?.map((item) => {
            return (
              <div
                onClick={() => handleClick(item._id)}
                className={style.title}
              >
                <div>
                  {" "}
                  <span>{item.title}</span>
                </div>
                {oneAcces.map((ac) => {
                  if (item._id === ac.category) {
                    return (
                      <div className={style.tit_img}>
                        <div className={style.image_acces}>
                          <img src={ac.image} alt="" />
                        </div>
                        <div className={style.title_acces}>{ac.title}</div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
        {threejs ? (
          <div className={style.testDiv}>
            <Suspense fallback={<div>Loading...</div>}>
              {threejs && <Test modelslink={modelslink} category={category} />}
            </Suspense>
          </div>
        ) : (
          <div className={style.twoRod}>
            {accessories?.map((acces) => (
              <One
                key={acces._id} // Добавьте ключ для элементов списка
                handleOpenClick={handleOpenClick}
                acces={acces}
                setPrice={setPrice}
                price={price}
                active={accessoriesActive[acces._id] || false}
                setActive={(value) => {
                  setAccessoriesActive((prevState) => ({
                    ...prevState,
                    [acces._id]: value,
                  }));
                }}
              />
            ))}
          </div>
        )}
        <div className={style.switchThreeJs}>
          
          <button onClick={handleClickThreeJs}><img src={img} alt="" /></button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Assembling;
