// src/components/CreateBid.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateBid.css';

const CreateBid = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7137/api/SellWithUs/${id}`
                );
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [id]);

    const handleBidSubmit = async () => {
        try {
            await axios.post('https://localhost:7137/api/Bids', {
                itemId: id,
                bidAmount,
                userId: localStorage.getItem('sessionId'),
            });
            navigate('/MyBids');
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    };

    return (
        <div className="create-bid-container">
            {item ? (
                <>
                    <h1 className="create-bid-title">
                        Place a Bid for {item.itemName}
                    </h1>
                    <p className="bid-info">Starting Price: ${item.price}</p>
                    <label className="bid-info">
                        Bid Amount:
                        <input
                            type="number"
                            className="bid-input"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            min={item.price}
                        />
                    </label>
                    <button
                        onClick={handleBidSubmit}
                        className="submit-bid-button"
                    >
                        Submit Bid
                    </button>
                </>
            ) : (
                <p className="bid-info">Loading item details...</p>
            )}
        </div>
    );
};

export default CreateBid;
