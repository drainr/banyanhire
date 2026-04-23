import React from 'react';

const FilterBar = ({ filters, setFilters, categories, locations }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setFilters({ location: "", category: "", salaryMin: "", salaryMax: "" });
    };

    return (
        <div className="flex flex-wrap gap-4 px-8 py-4 bg-[#FAF3E8] items-end">
            {/* Location */}
            <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1">
                    Location
                </label>
                <select
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    className="select select-bordered select-sm bg-white text-[#583927] border-[#e0d5c7] min-w-[180px]"
                >
                    <option value="">All Locations</option>
                    {locations.map((loc, i) => (
                        <option key={i} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* Category */}
            <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1">
                    Category
                </label>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="select select-bordered select-sm bg-white text-[#583927] border-[#e0d5c7] min-w-[180px]"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Salary Min */}
            <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1">
                    Min Salary
                </label>
                <input
                    name="salaryMin"
                    type="number"
                    value={filters.salaryMin}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    className="input input-bordered input-sm bg-white text-[#583927] border-[#e0d5c7] w-[130px]"
                />
            </div>

            {/* Salary Max */}
            <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-widest text-[#91D8D4] mb-1">
                    Max Salary
                </label>
                <input
                    name="salaryMax"
                    type="number"
                    value={filters.salaryMax}
                    onChange={handleChange}
                    placeholder="e.g. 100000"
                    className="input input-bordered input-sm bg-white text-[#583927] border-[#e0d5c7] w-[130px]"
                />
            </div>

            {/* Clear button */}
            {(filters.location || filters.category || filters.salaryMin || filters.salaryMax) && (
                <button
                    onClick={handleClear}
                    className="text-sm text-[#BB616D] font-bold hover:underline cursor-pointer pb-1"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default FilterBar;