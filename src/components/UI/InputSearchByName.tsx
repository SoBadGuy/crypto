import React, {ChangeEvent, FC} from "react";

interface ISearch {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}
const InputSearchByName: FC<ISearch> = ({onChange, value}) => {
    return (
        <input
            onChange={onChange}
            value={value} 
            className="search-by-name"
            type="text"
            placeholder="Поиск по имени...."
        />
    );
};

export default InputSearchByName;