import React from 'react';

const Pagination = () => {
    return (
        <div className="join ">
            <button className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4]">1</button>
            <button className="join-item btn btn-active bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4]">2</button>
            <button className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4]">3</button>
            <button className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4]">4</button>
        </div>
    );
};

export default Pagination;