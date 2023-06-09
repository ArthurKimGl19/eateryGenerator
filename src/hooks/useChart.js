import React from 'react';
import PropTypes from 'prop-types';

export const useChart = function (category, data) {
    const [values, setValues] = React.useState({});
    const [labels, setLabels] = React.useState([]);
    const [counts, setCounts] = React.useState([]);

    React.useEffect(() => {
        const storage = {};
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
        const countsArray = [];
        categoryArray.forEach((type) => {
            countsArray.push(values[type]);
        });
        const newCategoryArray = [];
        if (category === 'price') {
            categoryArray.forEach((type) => {
                if (type === '1') {
                    newCategoryArray.push('$');
                } else if (type === '2') {
                    newCategoryArray.push('$$');
                } else if (type === '3') {
                    newCategoryArray.push('$$$');
                } else if (type === '4') {
                    newCategoryArray.push('$$$');
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
