import React, {useState} from 'react';

export const Street = (mapKey) => {
    const key = useState(mapKey);
    const url = "https://images.mapillary.com/"+key[0].mapKey+"/thumb-640.jpg";
    console.log(url);
    return (
        <img alt="Loading..." src = {url} />
    )
}

export default Street;