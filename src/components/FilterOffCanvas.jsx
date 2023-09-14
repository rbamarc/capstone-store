import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

function FilterOffCanvas({ show, onHide, onCategorySelect }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Offcanvas show={show} onHide={onHide} placement="start" title="Filter Products">
            <Offcanvas.Body>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {categories.map(category => (
                        <li key={category}>
                            <button 
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }} 
                                onClick={() => onCategorySelect(category)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default FilterOffCanvas;