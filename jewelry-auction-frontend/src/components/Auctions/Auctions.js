import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Auctions.css';
import axios from 'axios';

function Auctions() {
    const [activeTab, setActiveTab] = useState('live');
    const [auctionItems, setAuctionItems] = useState([]);

    useEffect(() => {
        const fetchAuctionItems = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7137/api/SellWithUs'
                );
                setAuctionItems(response.data);
            } catch (error) {
                console.error('Error fetching auction items:', error);
            }
        };
        fetchAuctionItems();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const liveAuctions = auctionItems.filter((item) => !item.sold);
    const pastAuctions = auctionItems.filter((item) => item.sold);

    return (
        <div>
            <Navbar />
            <div className="auctions-container">
                <h1 className="auctions-title">Auctions</h1>
                <div className="tabs">
                    <button
                        className={`tab-button ${
                            activeTab === 'live' ? 'active' : ''
                        }`}
                        onClick={() => handleTabClick('live')}
                    >
                        Live Auctions
                    </button>
                    <button
                        className={`tab-button ${
                            activeTab === 'past' ? 'active' : ''
                        }`}
                        onClick={() => handleTabClick('past')}
                    >
                        Past Auctions
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'live' ? (
                        liveAuctions.length > 0 ? (
                            <div className="auction-cards">
                                {liveAuctions.map((item) => (
                                    <div key={item.id} className="auction-card">
                                        <h2>{item.itemName}</h2>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                        <p>
                                            Latest Price: $
                                            {item.latestPrice.toFixed(2)}
                                        </p>
                                        <p>
                                            Auction Date:{' '}
                                            {new Date(
                                                item.auctionDate
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No live auctions available.</p>
                        )
                    ) : pastAuctions.length > 0 ? (
                        <div className="auction-cards">
                            {pastAuctions.map((item) => (
                                <div key={item.id} className="auction-card">
                                    <h2>{item.itemName}</h2>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>
                                        Sold for: ${item.latestPrice.toFixed(2)}
                                    </p>
                                    <p>
                                        Auction Date:{' '}
                                        {new Date(
                                            item.auctionDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No past auctions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auctions;
