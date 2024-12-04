import Image from 'next/image';
import productImage from '/public/assets/images/Client_productivity.png';

const ClientLineGraph = () => {
    return (
        <>
            <div id="ClientLineGraph" role="tabpanel">
                <div className="card custom-card">
                    <div className="card-header justify-content-between awards_card_header">
                        <div className="card-title">Client Line Graph</div>
                        <div className="filter-right d-flex gap-x-2">
                            <div className="align-items-end d-flex gap-x-2 selectbox">
                                <p className="fw-semibold mb-2">Select Year:</p>
                                <div className="input-group Year-width">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value="2024"
                                    />
                                    <div className="input-group-text">
                                        <i className="ri-calendar-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>
                            <Image
                                src={productImage}
                                alt="img"
                                height={20}
                                width={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ClientLineGraph;
