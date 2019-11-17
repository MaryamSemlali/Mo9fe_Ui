
import React from 'react';
import SearchNav from './dashboard/search_nav';
import Posts from './dashboard/posts';

const visitor = () => {
    return(
        <div className="visitor">
            <SearchNav/>
            <Posts/>
        </div>
    )
};

export default visitor