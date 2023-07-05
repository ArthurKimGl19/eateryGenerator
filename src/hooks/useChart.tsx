import * as React from 'react';
import PropTypes from 'prop-types';

import { EateryInterface } from '../shared/interfaces/eatery.interface';
import { CategoryType } from '../shared/types/props.types';

export const useChart = function (category: CategoryType, data: EateryInterface[]) {
    type ValueType = {
        [key in number | string]: number;
    };
    const [values, setValues] = React.useState<ValueType>({});
    const [labels, setLabels] = React.useState<string[]>([]);
    const [counts, setCounts] = React.useState<number[]>([]);

    React.useEffect(() => {
        const storage: Record<string | number, number> = {};
        data.forEach((eatery) => {
            if (!storage[eatery[category]]) {
                storage[eatery[category]] = 1;
            } else {
                storage[eatery[category]]++;
            }
        });
        setValues({ ...storage });
    }, []);

    React.useEffect(() => {
        const categoryArray = Object.keys(values);
        const countsArray: number[] = [];
        categoryArray.forEach((type) => {
            countsArray.push(values[type]);
        });
        const newCategoryArray: string[] = [];
        if (category === 'price') {
            categoryArray.forEach((type) => {
                if (type === '1') {
                    newCategoryArray.push('$');
                } else if (type === '2') {
                    newCategoryArray.push('$$');
                } else if (type === '3') {
                    newCategoryArray.push('$$$');
                } else if (type === '4') {
                    newCategoryArray.push('$$$$');
                }
            });
        } else {
            categoryArray.forEach((type) => {
                const firstLetter = type.charAt(0);
                const firstLetterCap = firstLetter.toUpperCase();
                const remainingLetters = type.slice(1);
                const capitalizedWord = firstLetterCap + remainingLetters;
                newCategoryArray.push(capitalizedWord);
            });
        }
        setLabels([...newCategoryArray]);
        setCounts([...countsArray]);
    }, [values]);

    return { labels, counts };
};

useChart.propTypes = {
    category: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};
