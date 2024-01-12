import React, {FC, ReactNode} from 'react';

interface ISortList {
    sortingElements: {name: string | ReactNode, value: string}[],
    sortingSelection: (value: string) => void
}
const SortList:FC<ISortList>= ({sortingElements, sortingSelection}) => {
    return (
        <div className="sort-list">
            {sortingElements.map(el =>
                <div key={el.value} className="sort-item" onClick={() => sortingSelection(el.value)}>
                    {el.name}
                </div>
            )}
        </div>
    );
};

export default SortList;