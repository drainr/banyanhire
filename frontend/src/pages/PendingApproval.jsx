import Footer from '../components/Footer.jsx';
import ApprovalVideoBox from '../components/ApprovalPageComponents/VideoBoxapproval.jsx';

const ApprovalPage = () => {
    return (
        <div className="bg-[#583927]">
            {/* main body */}
            {/* control the static size of the home screen */}
            <main className="h-[800px] py-6 px-4">
                {/* movie box */}
                <ApprovalVideoBox />
                <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                </div>
            </main>


            {/* footer */}
            <Footer />
        </div>
    );
};

export default ApprovalPage;