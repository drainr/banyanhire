import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 bg-[#FAF3E8]">
            <h1 className="text-4xl font-bold text-[#583927]">404 — Page Not Found</h1>
            <div className="flex gap-4">
                <button onClick={() => navigate("/")} className="px-6 py-3 rounded-full border border-[#583927] text-[#583927] font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition">
                    Home
                </button>
                <button onClick={() => navigate("/auth")} className="px-6 py-3 rounded-full border border-[#583927] text-[#583927] font-semibold hover:bg-[#583927] hover:text-[#FAF3E8] transition">
                    Sign In
                </button>
            </div>
        </div>
    );
}