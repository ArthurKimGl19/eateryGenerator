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
            console.log('types', type);
            countsArray.push(values[type]);
        });
        if (category === 'price') {
            const newCategoryArray = [];
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
            setLabels([...newCategoryArray]);
        } else {
            setLabels([...categoryArray]);
        }
        setCounts([...countsArray]);
    }, [values]);

    return { labels, counts };
};

useChart.propTypes = {
    category: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};
