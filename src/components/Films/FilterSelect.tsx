import { FC, useEffect, useState } from "react";
import { ReactComponent as Arrow } from "../../svg/arrow.svg";
import { useAppDispatch } from "../../store/hooks";
import { setFilter } from "../../store/modal";

interface IFilmSelect {
  type: string;
  list: string[];
}

interface ISelectList {
  id: number;
  text: string;
  isActive: boolean;
}

export const FilterSelect: FC<IFilmSelect> = ({ list, type }) => {
  const [extraClass, setExtraClass] = useState(false);
  const [selectList, setSelectList] = useState<ISelectList[]>([
    { id: 0, text: "", isActive: false },
  ]);
  const [selectTitle, setSelectTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilter({ type: type, value: selectTitle }));
  }, [selectTitle]);

  useEffect(() => {
    setSelectTitle(list[0]);
    const items: ISelectList[] = [];
    let id = 0;
    list.forEach((item) => {
      const isActive = id === 0 ? true : false;
      items.push({ id: id, text: item, isActive: isActive });
      id += 1;
    });
    setSelectList(items);
  }, [list]);

  const changeSelected = (id: number) => {
    selectList.map((item) => {
      if (item.id === id) {
        setSelectTitle(item.text);
        item.isActive = true;
        return item;
      } else {
        item.isActive = false;
        return item;
      }
    });
    setExtraClass(false);
  };

  const openFilter = () => {
    setExtraClass(!extraClass);
  };
  return (
    <div onClick={openFilter} className="filterSelectBox__filterContainer">
      <div className="filterContainer__selectedItem">
        <p className="selectedItem__text">{selectTitle}</p>
        <Arrow
          onClick={openFilter}
          className={`selectedItem__arrow ${
            (extraClass && "active") || "unactive"
          }`}
        />
      </div>
      <div
        className={`filterContainer__selectList ${
          (extraClass && "active") || "unactive"
        }`}
      >
        {selectList.map(({ id, text, isActive }) => {
          if (!isActive)
            return (
              <p
                onClick={() => changeSelected(id)}
                key={id}
                className="selectList__text"
              >
                {text}
              </p>
            );
        })}
      </div>
    </div>
  );
};
