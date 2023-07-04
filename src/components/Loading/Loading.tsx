import React from 'react';
import PropTypes from 'prop-types';

export default function Loading({ text = 'Loading', speed = 300 }) {
    const [content, setContent] = React.useState(text);

    React.useEffect(() => {
        const currentInterval = window.setInterval(() => {
            setContent((content) => {
                return content === `${text}...` ? text : `${content}.`;
            });
        }, speed);
        return () => window.clearInterval(currentInterval);
    }, [text, speed]);

    return <div>{content}</div>;
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
};
