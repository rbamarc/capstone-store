import { useEffect, useState, useRef } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

function FilterOffCanvas({ show, onHide, onCategorySelect, onSearchApply }) {
    const [categories, setCategories] = useState([]);
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [checkedCategories, setCheckedCategories] = useState({}); 

    const previousSelectedCategoriesRef = useRef([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
                
                const initialCheckedCategories = {};
                uniqueCategories.forEach(cat => initialCheckedCategories[cat] = false);
                setCheckedCategories(initialCheckedCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const selectedCategories = Object.keys(checkedCategories).filter(cat => checkedCategories[cat]);
        
        // Only call onCategorySelect if the selected categories change
        if (JSON.stringify(selectedCategories.sort()) !== JSON.stringify(previousSelectedCategoriesRef.current.sort())) {
            onCategorySelect(selectedCategories);
        }

        previousSelectedCategoriesRef.current = selectedCategories;
    }, [checkedCategories, onCategorySelect]);

    function handleSearch() {
        onSearchApply(localSearchTerm);
        onHide();
    }

    function handleCategoryChange(category) {
        setCheckedCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    }

    return (
        <Offcanvas show={show} onHide={onHide} placement="start" title="Filter Products">
            <Offcanvas.Body>
                {/* Search Input */}
                <Form.Group className="mb-3">
                    <Form.Label>Search</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Search for products" 
                        value={localSearchTerm}
                        onChange={e => setLocalSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearch} className="mt-3">Search</Button>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categories</Form.Label>
                    {categories.map(category => (
                        <Form.Check
                            type="checkbox"
                            id={`category-${category}`}
                            label={category}
                            key={category}
                            checked={checkedCategories[category] || false}
                            onChange={() => handleCategoryChange(category)}
                        />
                    ))}
                </Form.Group>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default FilterOffCanvas;
